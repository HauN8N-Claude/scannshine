"use client";

import { Typography } from "@/components/nowts/typography";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { LoadingButton } from "@/features/form/submit-button";
import { Form, useForm } from "@/features/form/tanstack-form";
import { authClient } from "@/lib/auth-client";
import { unwrapSafePromise } from "@/lib/promises";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { AnimatePresence, motion } from "motion/react";
import { Lock } from "lucide-react";
import { useState } from "react";
import { useMeasure } from "react-use";
import { toast } from "sonner";
import { z } from "zod";

type Step = "email" | "otp" | "password";

const EmailFormSchema = z.object({
  email: z.string().email(),
});

const PasswordFormSchema = z.object({
  password: z
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères"),
});

export function ForgetPasswordPage() {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [ref, bounds] = useMeasure<HTMLDivElement>();
  const [direction, setDirection] = useState(1);

  const sendOtpMutation = useMutation({
    mutationFn: async (values: { email: string }) => {
      return unwrapSafePromise(
        authClient.forgetPassword.emailOtp({
          email: values.email,
        }),
      );
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (_, values) => {
      setEmail(values.email);
      setDirection(1);
      setStep("otp");
    },
  });

  const verifyOtpMutation = useMutation({
    mutationFn: async (otpValue: string) => {
      return unwrapSafePromise(
        authClient.emailOtp.checkVerificationOtp({
          email,
          type: "forget-password",
          otp: otpValue,
        }),
      );
    },
    onError: (error) => {
      toast.error(error.message);
      setOtp("");
    },
    onSuccess: () => {
      setDirection(1);
      setStep("password");
    },
  });

  const resetPasswordMutation = useMutation({
    mutationFn: async (values: { password: string }) => {
      return unwrapSafePromise(
        authClient.emailOtp.resetPassword({
          email,
          otp,
          password: values.password,
        }),
      );
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Mot de passe réinitialisé");
      window.location.href = "/auth/signin";
    },
  });

  const handleOtpChange = (value: string) => {
    setOtp(value);
    if (value.length === 6) {
      verifyOtpMutation.mutate(value);
    }
  };

  const goBack = () => {
    setDirection(-1);
    if (step === "otp") {
      setStep("email");
      setOtp("");
    } else if (step === "password") {
      setStep("otp");
      setOtp("");
    }
  };

  return (
    <Card className="mx-auto w-full max-w-md lg:max-w-lg lg:p-6">
      <CardHeader>
        <div className="flex justify-center">
          <Avatar className="size-16">
            <AvatarFallback>
              <Lock />
            </AvatarFallback>
          </Avatar>
        </div>
        <CardHeader className="text-center">Mot de passe oublié</CardHeader>
        <CardDescription className="text-center">
          {step === "email" &&
            "Saisissez votre e-mail pour réinitialiser votre mot de passe"}
          {step === "otp" && "Saisissez le code envoyé à votre adresse e-mail"}
          {step === "password" && "Saisissez votre nouveau mot de passe"}
        </CardDescription>
      </CardHeader>

      <CardFooter className="border-t pt-6">
        <motion.div animate={{ height: bounds.height }} className="w-full">
          <div ref={ref}>
            <AnimatePresence mode="wait" custom={direction}>
              {step === "email" && (
                <motion.div
                  key="email-step"
                  variants={variants}
                  initial="initial"
                  animate="active"
                  exit="exit"
                  transition={{ duration: 0.15 }}
                  custom={direction}
                >
                  <EmailStep
                    onSubmit={(emailValue) =>
                      sendOtpMutation.mutate({ email: emailValue })
                    }
                    isPending={sendOtpMutation.isPending}
                    defaultEmail={email}
                  />
                </motion.div>
              )}

              {step === "otp" && (
                <motion.div
                  key="otp-step"
                  variants={variants}
                  initial="initial"
                  animate="active"
                  exit="exit"
                  transition={{ duration: 0.15 }}
                  custom={direction}
                >
                  <OtpStep
                    email={email}
                    otp={otp}
                    onOtpChange={handleOtpChange}
                    onResend={() => sendOtpMutation.mutate({ email })}
                    isResendPending={sendOtpMutation.isPending}
                    isVerifyPending={verifyOtpMutation.isPending}
                    onBack={goBack}
                  />
                </motion.div>
              )}

              {step === "password" && (
                <motion.div
                  key="password-step"
                  variants={variants}
                  initial="initial"
                  animate="active"
                  exit="exit"
                  transition={{ duration: 0.15 }}
                  custom={direction}
                >
                  <PasswordStep
                    onSubmit={(password) =>
                      resetPasswordMutation.mutate({ password })
                    }
                    isPending={resetPasswordMutation.isPending}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </CardFooter>
    </Card>
  );
}

const variants = {
  initial: (direction: number) => {
    return { x: `${20 * direction}px`, opacity: 0 };
  },
  active: { x: "0%", opacity: 1 },
  exit: (direction: number) => {
    return { x: `${-20 * direction}px`, opacity: 0 };
  },
};

const EmailStep = (props: {
  onSubmit: (email: string) => void;
  isPending: boolean;
  defaultEmail?: string;
}) => {
  const form = useForm({
    schema: EmailFormSchema,
    defaultValues: {
      email: props.defaultEmail ?? "",
    },
    onSubmit: async (values) => {
      props.onSubmit(values.email);
    },
  });

  return (
    <Form form={form} className="w-full space-y-4">
      <form.AppField name="email">
        {(field) => (
          <field.Field>
            <field.Label>E-mail</field.Label>
            <field.Content>
              <field.Input type="email" placeholder="votre@email.com" />
              <field.Message />
            </field.Content>
          </field.Field>
        )}
      </form.AppField>

      <LoadingButton loading={props.isPending} type="submit" className="w-full">
        Envoyer le code de réinitialisation
      </LoadingButton>
    </Form>
  );
};

const OtpStep = (props: {
  email: string;
  otp: string;
  onOtpChange: (otp: string) => void;
  onResend: () => void;
  isResendPending: boolean;
  isVerifyPending: boolean;
  onBack: () => void;
}) => {
  return (
    <div className="flex w-full flex-col items-start gap-4">
      <Typography variant="muted">
        Un code à usage unique a été envoyé à{" "}
        <span className="font-bold">{props.email}</span>{" "}
        <Typography
          variant="link"
          as="button"
          onClick={props.onBack}
          className={cn("underline")}
        >
          Modifier l’e-mail
        </Typography>
      </Typography>
      <div className="flex items-center gap-2">
        <InputOTP
          maxLength={6}
          value={props.otp}
          onChange={props.onOtpChange}
          className={cn({
            "animate-pulse": props.isVerifyPending,
          })}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
        <ResendOtpButton
          isPending={props.isResendPending}
          onResend={props.onResend}
        />
      </div>
    </div>
  );
};

const PasswordStep = (props: {
  onSubmit: (password: string) => void;
  isPending: boolean;
}) => {
  const form = useForm({
    schema: PasswordFormSchema,
    defaultValues: {
      password: "",
    },
    onSubmit: async (values) => {
      props.onSubmit(values.password);
    },
  });

  return (
    <Form form={form} className="w-full space-y-4">
      <form.AppField name="password">
        {(field) => (
          <field.Field>
            <field.Label>Nouveau mot de passe</field.Label>
            <field.Content>
              <field.Input type="password" placeholder="••••••••" />
              <field.Message />
            </field.Content>
          </field.Field>
        )}
      </form.AppField>

      <LoadingButton loading={props.isPending} type="submit" className="w-full">
        Réinitialiser le mot de passe
      </LoadingButton>
    </Form>
  );
};

const ResendOtpButton = (props: {
  isPending: boolean;
  onResend: () => void;
}) => {
  const [countdown, setCountdown] = useState(0);

  const handleResend = () => {
    setCountdown(60);
    props.onResend();

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <Typography
      variant="link"
      as="button"
      onClick={handleResend}
      disabled={props.isPending || countdown > 0}
      className={cn(
        "underline",
        {
          "animate-pulse": props.isPending,
        },
        "disabled:opacity-50",
      )}
    >
      Renvoyer {countdown > 0 ? `(${countdown})` : ""}
    </Typography>
  );
};

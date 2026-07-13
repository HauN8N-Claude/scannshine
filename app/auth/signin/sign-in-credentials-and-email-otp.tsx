"use client";

import { Typography } from "@/components/nowts/typography";
import { useLocalStorage } from "react-use";
import { SignInWithEmailOTP } from "./_components/sign-in-otp-form";
import { SignInPasswordForm } from "./_components/sign-in-password-form";

export const SignInCredentialsAndEmailOTP = (props: {
  callbackUrl?: string;
}) => {
  const [isUsingCredentials, setIsUsingCredentials] = useLocalStorage(
    "sign-in-with-credentials",
    false,
  );

  if (!isUsingCredentials) {
    return (
      <div className="max-w-lg space-y-4">
        <SignInWithEmailOTP callbackUrl={props.callbackUrl} />
        <Typography variant="muted" className="text-xs">
          Vous préférez vous connecter avec un mot de passe ?{" "}
          <Typography
            variant="link"
            as="button"
            type="button"
            onClick={() => {
              setIsUsingCredentials(true);
            }}
          >
            Utiliser un mot de passe
          </Typography>
        </Typography>
      </div>
    );
  }

  return (
    <div className="max-w-lg space-y-4">
      <SignInPasswordForm callbackUrl={props.callbackUrl} />
      <Typography variant="muted" className="text-xs">
        Envie d’une connexion plus rapide ?{" "}
        <Typography
          variant="link"
          as="button"
          type="button"
          onClick={() => {
            setIsUsingCredentials(false);
          }}
        >
          Se connecter avec un code par e-mail
        </Typography>
      </Typography>
    </div>
  );
};

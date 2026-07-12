import { AutomaticPagination } from "@/components/nowts/automatic-pagination";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/features/page/layout";
import { getRequiredUser } from "@/lib/auth/auth-user";
import { prisma } from "@/lib/prisma";
import { getBusinessByUserId } from "@/query/business/get-business";
import { Mail, MessageCircle, Phone, Smile } from "lucide-react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { MarkReadButton } from "./mark-read-button";

export const metadata: Metadata = {
  title: "Retours privés",
};

const PAGE_SIZE = 20;

export default function Page(props: PageProps<"/feedbacks">) {
  return (
    <Suspense fallback={null}>
      <FeedbacksPage {...props} />
    </Suspense>
  );
}

async function FeedbacksPage(props: PageProps<"/feedbacks">) {
  const user = await getRequiredUser();
  const business = await getBusinessByUserId(user.id);

  if (!business) {
    redirect("/onboarding");
  }

  const searchParams = await props.searchParams;
  const rawPage = Array.isArray(searchParams.page)
    ? searchParams.page[0]
    : searchParams.page;
  const currentPage = Math.max(1, Number.parseInt(rawPage ?? "1", 10) || 1);

  const [feedbacks, total] = await Promise.all([
    prisma.feedbackPrivate.findMany({
      where: { businessId: business.id },
      orderBy: { createdAt: "desc" },
      skip: (currentPage - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.feedbackPrivate.count({ where: { businessId: business.id } }),
  ]);

  return (
    <Layout size="lg">
      <LayoutHeader>
        <LayoutTitle>Retours privés</LayoutTitle>
      </LayoutHeader>
      <LayoutContent className="flex flex-col gap-4">
        {feedbacks.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
              <Smile className="text-muted-foreground size-10" aria-hidden />
              <p className="font-semibold">
                Aucun retour négatif — c'est bon signe&nbsp;!
              </p>
              <p className="text-muted-foreground max-w-sm text-sm">
                Quand un client insatisfait scannera votre QR, son message
                arrivera ici (et par email) au lieu de finir en avis 1★ sur
                Google.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="flex flex-col gap-3">
            {feedbacks.map((feedback) => {
              const phoneDigits = feedback.contactPhone?.replaceAll(
                /[^\d]/g,
                "",
              );
              return (
                <Card
                  key={feedback.id}
                  className={feedback.isRead ? "" : "border-red-200"}
                >
                  <CardContent className="flex flex-col gap-3 pt-4">
                    <div className="flex flex-wrap items-center gap-2">
                      {!feedback.isRead ? (
                        <Badge variant="destructive">Non lu</Badge>
                      ) : null}
                      {feedback.rating ? (
                        <Badge variant="secondary">
                          Ressenti {feedback.rating}/5
                        </Badge>
                      ) : null}
                      <span className="text-muted-foreground text-xs">
                        {feedback.createdAt.toLocaleDateString("fr-FR", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                      {feedback.contactName ? (
                        <span className="text-muted-foreground text-xs">
                          — {feedback.contactName}
                        </span>
                      ) : null}
                    </div>

                    <p className="text-sm whitespace-pre-line">
                      {feedback.message}
                    </p>

                    <div className="flex flex-wrap items-center gap-2">
                      {phoneDigits ? (
                        <>
                          <a
                            href={`https://wa.me/${phoneDigits}`}
                            target="_blank"
                            rel="noreferrer"
                            className={buttonVariants({
                              variant: "outline",
                              size: "sm",
                            })}
                          >
                            <MessageCircle className="size-4" aria-hidden />
                            WhatsApp
                          </a>
                          <a
                            href={`tel:${feedback.contactPhone}`}
                            className={buttonVariants({
                              variant: "outline",
                              size: "sm",
                            })}
                          >
                            <Phone className="size-4" aria-hidden />
                            Appeler
                          </a>
                        </>
                      ) : null}
                      {feedback.contactEmail ? (
                        <a
                          href={`mailto:${feedback.contactEmail}`}
                          className={buttonVariants({
                            variant: "outline",
                            size: "sm",
                          })}
                        >
                          <Mail className="size-4" aria-hidden />
                          Email
                        </a>
                      ) : null}
                      {!feedback.isRead ? (
                        <MarkReadButton feedbackId={feedback.id} />
                      ) : null}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {total > PAGE_SIZE ? (
          <AutomaticPagination
            currentPage={currentPage}
            totalPages={Math.ceil(total / PAGE_SIZE)}
          />
        ) : null}
      </LayoutContent>
    </Layout>
  );
}

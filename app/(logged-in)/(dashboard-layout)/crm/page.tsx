import { AutomaticPagination } from "@/components/nowts/automatic-pagination";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Layout,
  LayoutActions,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/features/page/layout";
import { getRequiredUser } from "@/lib/auth/auth-user";
import { prisma } from "@/lib/prisma";
import { startOfMonthPF } from "@/lib/date/pf-timezone";
import { getBusinessByUserId } from "@/query/business/get-business";
import { Download, Sparkles, UsersRound } from "lucide-react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { CrmSearch } from "./crm-search";
import { DeleteContactButton } from "./delete-contact-button";

export const metadata: Metadata = {
  title: "Contacts",
};

const PAGE_SIZE = 20;

export default function Page(props: PageProps<"/crm">) {
  return (
    <Suspense fallback={null}>
      <CrmPage {...props} />
    </Suspense>
  );
}

async function CrmPage(props: PageProps<"/crm">) {
  const user = await getRequiredUser();
  const business = await getBusinessByUserId(user.id);

  if (!business) {
    redirect("/onboarding");
  }

  const searchParams = await props.searchParams;
  const search =
    typeof searchParams.recherche === "string" ? searchParams.recherche : "";
  const rawPage = Array.isArray(searchParams.page)
    ? searchParams.page[0]
    : searchParams.page;
  const currentPage = Math.max(1, Number.parseInt(rawPage ?? "1", 10) || 1);

  const where = {
    businessId: business.id,
    ...(search
      ? {
          OR: [
            { name: { contains: search, mode: "insensitive" as const } },
            { phone: { contains: search } },
            { email: { contains: search, mode: "insensitive" as const } },
          ],
        }
      : {}),
  };

  // Début de mois dans le fuseau Tahiti (UTC-10), pas celui du serveur (UTC) :
  // sinon le « +X ce mois » bascule ~10 h trop tôt aux bornes de mois.
  const monthStart = startOfMonthPF(new Date());

  const [contacts, total, thisMonth] = await Promise.all([
    prisma.contact.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (currentPage - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      select: {
        id: true,
        name: true,
        phone: true,
        email: true,
        consentAt: true,
      },
    }),
    prisma.contact.count({ where: { businessId: business.id } }),
    prisma.contact.count({
      where: { businessId: business.id, createdAt: { gte: monthStart } },
    }),
  ]);

  return (
    <Layout size="lg">
      <LayoutHeader>
        <LayoutTitle>Contacts</LayoutTitle>
        <p className="text-muted-foreground text-sm">
          {total} contact{total > 1 ? "s" : ""} avec consentement
          {thisMonth > 0 ? ` · +${thisMonth} ce mois-ci` : ""}
        </p>
      </LayoutHeader>
      <LayoutActions className="flex gap-2">
        <a
          href="/api/crm/export"
          download
          className={buttonVariants({ variant: "outline" })}
        >
          <Download className="size-4" aria-hidden />
          Export CSV
        </a>
      </LayoutActions>
      <LayoutContent className="flex flex-col gap-4">
        <div className="bg-muted/50 text-muted-foreground flex items-center gap-2 rounded-lg border border-dashed p-3 text-sm">
          <Sparkles className="size-4 shrink-0" aria-hidden />
          <span>
            Bientôt : envoyez vos promos par SMS à toute votre base, en deux
            clics.
          </span>
        </div>

        <CrmSearch />

        {contacts.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
              <UsersRound
                className="text-muted-foreground size-10"
                aria-hidden
              />
              <p className="font-semibold">
                {search
                  ? "Aucun contact ne correspond à cette recherche"
                  : "Votre base clients se remplira toute seule"}
              </p>
              {!search ? (
                <p className="text-muted-foreground max-w-sm text-sm">
                  Vos clients laisseront leurs coordonnées en scannant votre
                  QR — avec leur consentement, prêtes pour vos futures
                  campagnes.
                </p>
              ) : null}
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="pt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Téléphone</TableHead>
                    <TableHead className="hidden sm:table-cell">
                      Email
                    </TableHead>
                    <TableHead className="hidden sm:table-cell">
                      Consentement
                    </TableHead>
                    <TableHead className="w-10" />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contacts.map((contact) => (
                    <TableRow key={contact.id}>
                      <TableCell className="font-medium">
                        {contact.name ?? "—"}
                      </TableCell>
                      <TableCell>{contact.phone ?? "—"}</TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {contact.email ?? "—"}
                      </TableCell>
                      <TableCell className="text-muted-foreground hidden text-xs sm:table-cell">
                        {contact.consentAt.toLocaleDateString("fr-FR")}
                      </TableCell>
                      <TableCell>
                        <DeleteContactButton
                          contactId={contact.id}
                          contactLabel={
                            contact.name ??
                            contact.phone ??
                            contact.email ??
                            "ce contact"
                          }
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
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

import { ZodRouteError } from "@/lib/errors/zod-route-error";
import { prisma } from "@/lib/prisma";
import { authRoute } from "@/lib/zod-route";

/**
 * Export CSV de la base contacts (UTF-8 BOM pour Excel).
 * Réservé au propriétaire du commerce connecté.
 */
export const GET = authRoute.handler(async (req, { ctx }) => {
  const business = await prisma.business.findUnique({
    where: { userId: ctx.user.id },
    select: { id: true, slug: true },
  });

  if (!business) {
    throw new ZodRouteError("Commerce introuvable", 404);
  }

  const contacts = await prisma.contact.findMany({
    where: { businessId: business.id },
    orderBy: { createdAt: "desc" },
    select: {
      name: true,
      phone: true,
      email: true,
      consentAt: true,
      createdAt: true,
    },
  });

  const escapeCsv = (value: string | null): string => {
    if (!value) return "";
    const escaped = value.replaceAll('"', '""');
    return /[";\n]/.test(escaped) ? `"${escaped}"` : escaped;
  };

  const header = "nom;telephone;email;consentement;ajoute_le";
  const rows = contacts.map((contact) =>
    [
      escapeCsv(contact.name),
      escapeCsv(contact.phone),
      escapeCsv(contact.email),
      contact.consentAt.toISOString(),
      contact.createdAt.toISOString(),
    ].join(";"),
  );

  // BOM UTF-8 pour qu'Excel ouvre les accents correctement
  const BOM = String.fromCharCode(0xfeff);
  const csv = BOM + [header, ...rows].join("\r\n");

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="contacts-${business.slug}.csv"`,
    },
  });
});

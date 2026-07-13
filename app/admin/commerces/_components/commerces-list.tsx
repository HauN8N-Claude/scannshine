"use client";

import { AutomaticPagination } from "@/components/nowts/automatic-pagination";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { SubStatus } from "@/generated/prisma";
import { dayjs } from "@/lib/dayjs";
import { ExternalLink, QrCode, Search, Store } from "lucide-react";
import { parseAsString, useQueryState } from "nuqs";

export type CommerceRow = {
  id: string;
  name: string;
  slug: string;
  brandColor: string;
  subscriptionStatus: SubStatus;
  trialEndsAt: Date | null;
  cancelledAt: Date | null;
  createdAt: Date;
  ownerName: string;
  ownerEmail: string;
  scans30d: number;
};

type CommercesSummary = {
  total: number;
  active: number;
  trialing: number;
  pastDue: number;
  cancelled: number;
  onboarding: number;
};

type CommercesListProps = {
  rows: CommerceRow[];
  summary: CommercesSummary;
  total: number;
  limit: number;
  currentPage: number;
};

const STATUS_CONFIG: Record<
  SubStatus,
  { label: string; className: string }
> = {
  ONBOARDING: {
    label: "Inscription en cours",
    className: "bg-muted text-muted-foreground border-transparent",
  },
  TRIALING: {
    label: "En essai",
    className:
      "bg-sky-500/15 text-sky-700 border-transparent dark:text-sky-400",
  },
  ACTIVE: {
    label: "Abonné",
    className:
      "bg-emerald-500/15 text-emerald-700 border-transparent dark:text-emerald-400",
  },
  PAST_DUE: {
    label: "Paiement en retard",
    className:
      "bg-amber-500/15 text-amber-700 border-transparent dark:text-amber-400",
  },
  CANCELLED: {
    label: "Annulé",
    className:
      "bg-red-500/15 text-red-700 border-transparent dark:text-red-400",
  },
};

const StatusBadge = ({ row }: { row: CommerceRow }) => {
  const config = STATUS_CONFIG[row.subscriptionStatus];
  return (
    <div className="flex flex-col gap-0.5">
      <Badge className={config.className}>{config.label}</Badge>
      {row.subscriptionStatus === "TRIALING" && row.trialEndsAt ? (
        <span className="text-muted-foreground text-xs">
          jusqu&rsquo;au {dayjs(row.trialEndsAt).format("DD/MM/YYYY")}
        </span>
      ) : null}
      {row.subscriptionStatus === "CANCELLED" && row.cancelledAt ? (
        <span className="text-muted-foreground text-xs">
          le {dayjs(row.cancelledAt).format("DD/MM/YYYY")}
        </span>
      ) : null}
    </div>
  );
};

const SummaryTile = ({ label, value }: { label: string; value: number }) => (
  <div className="bg-muted/40 flex flex-col rounded-lg border px-3 py-2">
    <span className="text-lg font-semibold tabular-nums">{value}</span>
    <span className="text-muted-foreground text-xs">{label}</span>
  </div>
);

export function CommercesList({
  rows,
  summary,
  total,
  limit,
  currentPage,
}: CommercesListProps) {
  const [query, setQuery] = useQueryState(
    "q",
    parseAsString
      .withDefault("")
      .withOptions({ shallow: false, throttleMs: 1000 }),
  );

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
        <SummaryTile label="Commerces" value={summary.total} />
        <SummaryTile label="Abonnés" value={summary.active} />
        <SummaryTile label="En essai" value={summary.trialing} />
        <SummaryTile label="Paiement en retard" value={summary.pastDue} />
        <SummaryTile label="Annulés" value={summary.cancelled} />
      </div>

      <Card>
        <CardHeader>
          <InputGroup>
            <InputGroupAddon>
              <Search className="size-4" />
            </InputGroupAddon>
            <InputGroupInput
              placeholder="Rechercher un commerce, un slug ou un e-mail…"
              value={query}
              onChange={async (event) => setQuery(event.target.value)}
            />
          </InputGroup>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {rows.length === 0 ? (
            <div className="text-muted-foreground flex flex-col items-center gap-2 py-10 text-center">
              <Store className="size-8" />
              <p className="text-sm">
                {query
                  ? "Aucun commerce ne correspond à cette recherche."
                  : "Aucun commerce inscrit pour le moment."}
              </p>
            </div>
          ) : (
            <>
              {/* Vue desktop : tableau */}
              <div className="hidden md:block">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Commerce</TableHead>
                      <TableHead>Gérant</TableHead>
                      <TableHead>Abonnement</TableHead>
                      <TableHead className="text-right">Scans (30 j)</TableHead>
                      <TableHead className="text-right">Inscrit le</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <span
                              aria-hidden
                              className="size-3 shrink-0 rounded-full border"
                              style={{ backgroundColor: row.brandColor }}
                            />
                            <div className="flex flex-col">
                              <span className="font-medium">{row.name}</span>
                              <a
                                href={`/r/${row.slug}`}
                                target="_blank"
                                rel="noreferrer"
                                className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-xs"
                              >
                                /r/{row.slug}
                                <ExternalLink className="size-3" />
                              </a>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span>{row.ownerName}</span>
                            <a
                              href={`mailto:${row.ownerEmail}`}
                              className="text-muted-foreground hover:text-foreground text-xs"
                            >
                              {row.ownerEmail}
                            </a>
                          </div>
                        </TableCell>
                        <TableCell>
                          <StatusBadge row={row} />
                        </TableCell>
                        <TableCell className="text-right tabular-nums">
                          {row.scans30d}
                        </TableCell>
                        <TableCell className="text-muted-foreground text-right text-sm">
                          {dayjs(row.createdAt).format("DD/MM/YYYY")}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Vue mobile : cartes */}
              <div className="flex flex-col gap-3 md:hidden">
                {rows.map((row) => (
                  <div
                    key={row.id}
                    className="flex flex-col gap-2 rounded-lg border p-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span
                          aria-hidden
                          className="size-3 shrink-0 rounded-full border"
                          style={{ backgroundColor: row.brandColor }}
                        />
                        <span className="font-medium">{row.name}</span>
                      </div>
                      <StatusBadge row={row} />
                    </div>
                    <div className="text-muted-foreground flex flex-col gap-0.5 text-xs">
                      <span>
                        {row.ownerName} ·{" "}
                        <a
                          href={`mailto:${row.ownerEmail}`}
                          className="hover:text-foreground underline underline-offset-2"
                        >
                          {row.ownerEmail}
                        </a>
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <QrCode className="size-3" /> {row.scans30d} scans (30
                        j) · inscrit le{" "}
                        {dayjs(row.createdAt).format("DD/MM/YYYY")}
                      </span>
                      <a
                        href={`/r/${row.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-foreground inline-flex items-center gap-1"
                      >
                        /r/{row.slug}
                        <ExternalLink className="size-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {totalPages > 1 && (
                <AutomaticPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  paramName="page"
                />
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

import { getServerUrl } from "@/lib/server-url";
import { NextResponse } from "next/server";

/**
 * ScanNShine est mono-établissement (1 user = 1 Business) : le module
 * « organisations » de NOW.TS est dormant. On redirige toute arrivée sur
 * /orgs vers le tableau de bord du commerce.
 */
export const GET = async () => {
  return NextResponse.redirect(`${getServerUrl()}/dashboard`);
};

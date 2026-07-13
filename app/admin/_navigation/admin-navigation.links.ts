import type { NavigationGroup } from "@/features/navigation/navigation.type";
import { Building2, Home, MessageSquare, Store, Users } from "lucide-react";

const ADMIN_PATH = `/admin`;

const ADMIN_LINKS: NavigationGroup[] = [
  {
    title: "Admin",
    links: [
      {
        href: ADMIN_PATH,
        Icon: Home,
        label: "Tableau de bord",
      },
      {
        href: `${ADMIN_PATH}/commerces`,
        Icon: Store,
        label: "Commerces",
      },
      {
        href: `${ADMIN_PATH}/users`,
        Icon: Users,
        label: "Utilisateurs",
      },
      {
        href: `${ADMIN_PATH}/organizations`,
        Icon: Building2,
        label: "Organisations",
      },
      {
        href: `${ADMIN_PATH}/feedback`,
        Icon: MessageSquare,
        label: "Retours produit",
      },
    ],
  },
] satisfies NavigationGroup[];

export const getAdminNavigation = (): NavigationGroup[] => {
  return ADMIN_LINKS;
};

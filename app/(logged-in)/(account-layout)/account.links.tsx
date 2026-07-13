import type { NavigationGroup } from "@/features/navigation/navigation.type";
import { AlertCircle, Mail, User2 } from "lucide-react";

export const getAccountNavigation = (): NavigationGroup[] => {
  return ACCOUNT_LINKS;
};

const ACCOUNT_LINKS: NavigationGroup[] = [
  {
    title: "Votre profil",
    links: [
      {
        href: "/account",
        Icon: User2,
        label: "Profil",
      },
      {
        href: "/account/email",
        Icon: Mail,
        label: "E-mails",
      },
      {
        href: "/account/danger",
        Icon: AlertCircle,
        label: "Zone de danger",
      },
    ],
  },
];

import type { NavigationGroup } from "@/features/navigation/navigation.type";
import {
  ChartLine,
  MessageCircleWarning,
  QrCode,
  Settings,
  Users,
} from "lucide-react";

export const getDashboardNavigation = (): NavigationGroup[] => {
  return DASHBOARD_LINKS;
};

const DASHBOARD_LINKS: NavigationGroup[] = [
  {
    title: "Mon commerce",
    links: [
      {
        href: "/dashboard",
        Icon: ChartLine,
        label: "Tableau de bord",
      },
      {
        href: "/qr",
        Icon: QrCode,
        label: "Mon QR code",
      },
      {
        href: "/feedbacks",
        Icon: MessageCircleWarning,
        label: "Retours privés",
      },
      {
        href: "/crm",
        Icon: Users,
        label: "Contacts",
      },
      {
        href: "/settings",
        Icon: Settings,
        label: "Réglages",
      },
    ],
  },
];

// ScanNShine : la facturation passe par Dodo Payments sur le modèle Business
// (src/lib/dodo.ts). Les organisations NOW.TS sont dormantes (mono-établissement) ;
// ce module ne garde que les types/limites utilisés par le code org hérité.
import { FolderArchive, HardDrive, Users } from "lucide-react";

const DEFAULT_LIMIT = {
  projects: 5,
  storage: 10,
  members: 3,
};

export type PlanLimit = typeof DEFAULT_LIMIT;

export type OverrideLimits = Partial<PlanLimit>;

export type AppAuthPlan = {
  name: string;
  description: string;
  price: number;
  currency: string;
  limits: PlanLimit;
};

export const AUTH_PLANS: AppAuthPlan[] = [
  {
    name: "free",
    description: "Plan par défaut",
    limits: DEFAULT_LIMIT,
    price: 0,
    currency: "EUR",
  },
];

// Limits transformation object
export const LIMITS_CONFIG: Record<
  keyof PlanLimit,
  {
    icon: React.ElementType;
    getLabel: (value: number) => string;
    description: string;
  }
> = {
  projects: {
    icon: FolderArchive,
    getLabel: (value: number) =>
      `${value} ${value === 1 ? "Project" : "Projects"}`,
    description: "Create and manage projects",
  },
  storage: {
    icon: HardDrive,
    getLabel: (value: number) => `${value} GB Storage`,
    description: "Cloud storage for your files",
  },
  members: {
    icon: Users,
    getLabel: (value: number) =>
      `${value} Team ${value === 1 ? "Member" : "Members"}`,
    description: "Invite team members to collaborate",
  },
};

export const getPlanLimits = (
  plan = "free",
  overrideLimits?: OverrideLimits | null,
): PlanLimit => {
  const planLimits = AUTH_PLANS.find((p) => p.name === plan)?.limits;

  const baseLimits = planLimits ?? DEFAULT_LIMIT;

  if (!overrideLimits) {
    return baseLimits;
  }

  return {
    ...baseLimits,
    ...overrideLimits,
  };
};

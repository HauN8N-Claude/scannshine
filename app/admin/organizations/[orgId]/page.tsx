import {
  Layout,
  LayoutContent,
  LayoutHeader,
} from "@/features/page/layout";
import { OrganizationTitleForm } from "./_components/organization-title-form";
import { getRequiredAdmin } from "@/lib/auth/auth-user";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { OrganizationMembers } from "./_components/organization-members";

export default function Page(props: PageProps<"/admin/organizations/[orgId]">) {
  return (
    <Suspense fallback={null}>
      <OrganizationDetailPage {...props} />
    </Suspense>
  );
}

async function OrganizationDetailPage(
  props: PageProps<"/admin/organizations/[orgId]">,
) {
  const params = await props.params;
  await getRequiredAdmin();

  const organization = await prisma.organization.findUnique({
    where: {
      id: params.orgId,
    },
    include: {
      members: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true,
            },
          },
        },
      },
      subscription: true,
    },
  });

  if (!organization) {
    notFound();
  }

  return (
    <Layout size="lg">
      <LayoutHeader>
        <OrganizationTitleForm
          organizationId={organization.id}
          name={organization.name}
          logo={organization.logo}
        />
      </LayoutHeader>

      <LayoutContent>
        <div className="space-y-6">
          <OrganizationMembers members={organization.members} />
        </div>
      </LayoutContent>
    </Layout>
  );
}

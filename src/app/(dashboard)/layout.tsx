import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { DashboardNav } from "@/components/dashboard-nav";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  return (
    <div className="flex h-screen overflow-hidden bg-polar">
      <DashboardNav
        user={{
          name: session.user.name || "",
          email: session.user.email || "",
          image: session.user.image || "",
        }}
        orgName={(session as any).organizationName || "My Org"}
      />
      <main className="flex-1 overflow-y-auto p-6 lg:p-8">{children}</main>
    </div>
  );
}

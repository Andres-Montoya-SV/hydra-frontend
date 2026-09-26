import { redirect } from "next/navigation";
import { session } from "@/lib/session";
import { Shell } from "@/components/shell";
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!(await session())) redirect("/login");
  return <Shell>{children}</Shell>;
}

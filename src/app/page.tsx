import { redirect } from "next/navigation";
import { session } from "@/lib/session";
export default async function Page() {
  redirect((await session()) ? "/overview" : "/login");
}

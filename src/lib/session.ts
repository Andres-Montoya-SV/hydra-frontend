import "server-only";
import { cookies } from "next/headers";
import { COOKIE, unseal } from "./security";
export async function session() {
  return unseal(
    (await cookies()).get(COOKIE)?.value ?? "",
    process.env.SESSION_SECRET ?? "",
  );
}

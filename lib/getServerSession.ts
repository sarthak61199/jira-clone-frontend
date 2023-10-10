import { getServerSession as getServerSessionNextAuth } from "next-auth";

import { authOptions } from "@/lib/auth-options";

export default async function getServerSession() {
  const session = await getServerSessionNextAuth(authOptions);
  return session;
}

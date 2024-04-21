import { authOptions } from "@/config/nextauthOptions";
import NextAuth from "next-auth";

export interface User {
  id: number;
  username: string;
  password: string;
}
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

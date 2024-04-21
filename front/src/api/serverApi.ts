import { authOptions } from "@/config/nextauthOptions";
import { Session } from "next-auth";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";

export const SERVER_URL = "https://mintbearapi.click";
export type CustomSession = Session & {
  user: Session["user"] & {
    accessToken: string;
    refreshToken: string;
    username: string;
  };
};

export const defaultInitFetchConfig: (session: CustomSession) => RequestInit = (
  session
) => ({
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${session?.user?.accessToken}`,
  },
});

export const getUserServerSession = async (
  options: Parameters<typeof getServerSession>[0] = {}
): Promise<CustomSession | NextResponse<unknown>> => {
  const session = await getServerSession({
    ...authOptions,
    ...options,
  });
  if (!session) {
    return NextResponse.redirect("/auth/sign-in");
  }
  return session as CustomSession;
};

export default async function ServerApi() {
  const session = await getUserServerSession();
  if (!session) {
    return NextResponse.redirect("/auth/sign-in");
  }
  return {
    get: (url: string) =>
      fetch(`${SERVER_URL}${url}`, {
        ...defaultInitFetchConfig(session as CustomSession),
        method: "GET",
      }).then((res) => res.json()),
    post: (url: string, data: any) =>
      fetch(`${SERVER_URL}${url}`, {
        ...defaultInitFetchConfig(session as CustomSession),
        method: "POST",
        body: JSON.stringify(data),
      }).then((res) => res.json()),
    patch: (url: string, data: any) =>
      fetch(`${SERVER_URL}${url}`, {
        ...defaultInitFetchConfig(session as CustomSession),
        method: "PATCH",
        body: JSON.stringify(data),
      }).then((res) => res.json()),
    delete: (url: string) =>
      fetch(`${SERVER_URL}${url}`, {
        ...defaultInitFetchConfig(session as CustomSession),
        method: "DELETE",
      }).then((res) => res.json()),
  };
}

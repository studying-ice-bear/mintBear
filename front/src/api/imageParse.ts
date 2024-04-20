import { getSession } from "next-auth/react";
import { CustomSession, SERVER_URL } from "./serverApi";

export interface ParseResult {
  status: string;
  message: string;
  data: string;
}

export const getUserSession = async (): Promise<CustomSession | null> => {
  const session = await getSession();
  return session as CustomSession | null;
};

export async function postImageOCRData({
  url,
  option,
}: {
  url: string;
  option?: string;
}): Promise<string> {
  const session = await getUserSession();
  if (!session || !session?.user?.accessToken) {
    throw new Error("로그인이 필요한 서비스입니다.");
  }
  try {
    const res = await fetch(`${SERVER_URL}/v1/ocr/translate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.user.accessToken}`,
      },
      body: JSON.stringify({
        url,
        option,
      }),
    });
    if (res.status >= 400) {
      console.log("error", res);
      throw new Error("Failed to fetch data", { cause: res });
    }
    const parsedData = await res.text();
    return parsedData;
  } catch (error) {
    console.log("error", error);
    throw new Error("Failed to fetch data", { cause: error });
  }
}

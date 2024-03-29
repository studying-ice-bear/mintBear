import axios, { AxiosResponse } from "axios";

export interface ParseResult {
  status: string;
  message: string;
  data: string;
}

export const SERVER_URL = "https://mintbearapi.click";

export async function postImageOCRData({
  url,
  option,
}: {
  url: string;
  option?: string;
}): Promise<AxiosResponse<string>> {
  try {
    const origin = window.location.origin;
    const res = await axios.post(
      `${SERVER_URL}/v1/ocr/translate`,
      {
        url,
        option,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (res.status >= 400) {
      // This will activate the closest `error.js` Error Boundary
      console.log("error", res);
      throw new Error("Failed to fetch data", { cause: res });
    }

    return res;
  } catch (error) {
    console.log("error", error);
    throw new Error("Failed to fetch data", { cause: error });
  }
}

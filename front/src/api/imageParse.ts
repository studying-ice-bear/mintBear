export interface ParseResult {
  status: string;
  message: string;
  data: string;
}

export async function postImageOCRData({
  url,
  option,
}: {
  url: string;
  option?: string;
}): Promise<ParseResult> {
  const res = await fetch("http://52.193.209.99:8080/parse/img", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      url,
      option,
    }),
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

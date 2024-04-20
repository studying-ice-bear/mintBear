"use client";
import useParser from "@/app/store/useParser";
import { Button } from "@nextui-org/react";
import React from "react";
import { postImageOCRData } from "@/api/imageParse.ts";

// const useParserQuery = ({ imageUrl }: { imageUrl: string | null }) => {
//   if (imageUrl === null) {
//     return [null, null] as const;
//   }
//   const query = useSuspenseQuery({
//     queryKey: ["parse"],
//     queryFn: async () => ,
//   });

//   return [query.data, query] as const;
// };
const ImageParserButton = () => {
  const { imageUrl, setParsedText } = useParser();
  const handleParseClick: React.MouseEventHandler<HTMLButtonElement> = async (
    event
  ) => {
    event.preventDefault();
    if (!imageUrl) {
      return alert("image url is required");
    }
    const parsedResult = await postImageOCRData({ url: imageUrl });
    setParsedText(parsedResult);
  };
  return (
    <Button
      onClick={handleParseClick}
      className="bg-primary-500 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded"
    >
      인식
    </Button>
  );
};

export default ImageParserButton;

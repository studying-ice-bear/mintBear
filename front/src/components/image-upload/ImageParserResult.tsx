"use client";
import useParser from "@/app/store/useParser";
import { Locale } from "@/i18n-config";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Progress,
  Textarea,
} from "@nextui-org/react";
import React from "react";
const titleDic: Record<Locale, string> = {
  "en-US": "Image parsing result",
  "ko-KR": "이미지 분석 결과",
  "ja-JA": "画像の解析結果",
};
const ImageParserResult = ({ lng }: { lng: Locale }) => {
  const { parsedText, isParseLoading } = useParser();
  return (
    <Card className="min-w-[500px] max-w-[1920px] min-h-[600px]">
      <CardHeader className="flex items-center justify-between">
        <h2 className={"text-primary text-xl"}>{titleDic[lng]}</h2>
      </CardHeader>
      <Progress
        size="sm"
        isIndeterminate={isParseLoading}
        aria-label="Loading..."
        className="w-100"
      />
      <Divider />
      <CardBody className="flex items-stretch justify-center">
        <Textarea
          isReadOnly
          variant="bordered"
          labelPlacement="outside"
          value={parsedText ?? ""}
          classNames={{
            base: "min-w-100 grow",
            input: "grow",
            inputWrapper: "grow",
          }}
        />
      </CardBody>
    </Card>
  );
};

export default ImageParserResult;

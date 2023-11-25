"use client";
import useParser from "@/app/store/useParser";
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

const ImageParserResult = () => {
  const { parsedText, isParseLoading } = useParser();
  return (
    <Card className="min-w-[800px] max-w-[1920px]">
      <CardHeader className="flex items-center justify-between">
        <h2 className={"text-primary text-3xl"}>Parsed Text</h2>
      </CardHeader>
      <Divider />
      <Progress
        size="sm"
        isIndeterminate={isParseLoading}
        aria-label="Loading..."
        className="w-100"
      />
      <CardBody className="flex items-center justify-center min-h-[600px]">
        <Textarea
          isReadOnly
          variant="bordered"
          labelPlacement="outside"
          value={parsedText ?? "이미지를 선택해주세요"}
          className="min-w-100 h-100"
        />
      </CardBody>
    </Card>
  );
};

export default ImageParserResult;

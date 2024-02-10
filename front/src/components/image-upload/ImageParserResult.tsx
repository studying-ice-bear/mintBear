"use client";
import useParser, { OCRLangOption } from "@/app/store/useParser";
import { Locale, getCurrentLanguage } from "@/i18n-config";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Progress,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import React from "react";
const titleDic: Record<Locale, string> = {
  "en-US": "Image parsing result",
  "ko-KR": "이미지 분석 결과",
  "ja-JA": "画像の解析結果",
};
const selectLabelDic: Record<Locale, string> = {
  "en-US": "Language",
  "ko-KR": "언어",
  "ja-JA": "言語",
};

const languages = [
  {
    value: "ko-KR",
    label: "한국어",
  },
  {
    value: "en-US",
    label: "English",
  },
  {
    value: "ja-JA",
    label: "日本語",
  },
];
const ImageParserResult = ({ lng }: { lng: Locale }) => {
  const {
    parsedText,
    isParseLoading,
    imageUrl,
    getParsing,
    option,
    setOption,
  } = useParser();
  const pathname = usePathname();
  const currentLanguage = getCurrentLanguage(pathname);
  const handleSelect: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    const value = event.target.value;
    const selectedOption =
      OCRLangOption[value as keyof typeof OCRLangOption] ??
      OCRLangOption[currentLanguage as keyof typeof OCRLangOption];

    setOption(selectedOption);
    getParsing({
      url: imageUrl!,
      option: selectedOption,
    });
  };
  return (
    <Card className="min-w-[365px] sm:min-w-[500px] max-w-[1920px] min-h-[370px] sm:min-h-[600px]">
      <CardHeader className="flex items-center justify-between">
        <h2 className={"text-primary sm:text-md sm:text-xl"}>
          {titleDic[lng]}
        </h2>
        <Select
          label={selectLabelDic[lng]}
          className="max-w-xs w-1/3 min-w-[100px] h-10"
          classNames={{
            trigger: "h-10",
          }}
          isDisabled={!imageUrl || isParseLoading}
          onChange={handleSelect}
          defaultSelectedKeys={[currentLanguage]}
          value={option}
        >
          {languages.map(({ value, label }) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </Select>
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

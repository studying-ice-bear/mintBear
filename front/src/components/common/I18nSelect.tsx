"use client";
import {
  LANGUAGE_OPTIONS,
  Locale,
  getCurrentLanguage,
  getHref,
} from "@/i18n-config";
import { Select, SelectItem } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ChangeEventHandler } from "react";
import { usePathname } from "next/navigation";
import useParser, { OCRLangOption } from "@/app/store/useParser";

const selectLabel: Record<Locale, string> = {
  "ko-KR": "한국어",
  "en-US": "English",
  "ja-JA": "日本語",
};

const I18nSelect = ({ lng }: { lng: Locale }) => {
  const options = Object.entries(LANGUAGE_OPTIONS).map(([key, value]) => ({
    label: value,
    value: key,
  }));
  const { imageUrl, getParsing } = useParser();
  const router = useRouter();
  const pathname = usePathname();
  const currentLanguage = getCurrentLanguage(pathname);
  const onChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const value = event.target.value;
    router.push(getHref(value, pathname));
    const selectedOption =
      OCRLangOption[value as keyof typeof OCRLangOption] ??
      OCRLangOption[currentLanguage as keyof typeof OCRLangOption];
    getParsing({
      url: imageUrl!,
      option: selectedOption,
    });
  };
  return (
    <Select
      placeholder={selectLabel[lng] ?? "Select language"}
      className="min-w-[100px]"
      onChange={onChange}
      classNames={{
        trigger: "h-10",
      }}
    >
      {options.map(({ value }) => (
        <SelectItem key={value} value={value}>
          {selectLabel[value as keyof typeof selectLabel]}
        </SelectItem>
      ))}
    </Select>
  );
};

export default I18nSelect;

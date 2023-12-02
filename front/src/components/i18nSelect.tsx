"use client";
import { LANGUAGE_OPTIONS } from "@/i18n-config";
import { Select, SelectItem } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ChangeEventHandler } from "react";
import { usePathname } from "next/navigation";

const selectLabel = {
  "ko-KR": "한국어",
  "en-US": "English",
  "ja-JA": "日本語",
};

const I18nSelect = () => {
  const options = Object.entries(LANGUAGE_OPTIONS).map(([key, value]) => ({
    label: value,
    value: key,
  }));
  const router = useRouter();
  const pathname = usePathname();
  const getHref = (value: string) => {
    const exceptLanguagePathname = pathname
      .split("/")
      .filter((path) => !Object.keys(LANGUAGE_OPTIONS).includes(path));
    const href = `/${value}${exceptLanguagePathname.join("/")}`;
    return href;
  };
  const onChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const value = event.target.value;
    router.push(getHref(value));
  };
  return (
    <Select
      placeholder="Select language"
      className="max-w-xs w-40"
      onChange={onChange}
    >
      {options.map(({ label, value }) => (
        <SelectItem key={value} value={value}>
          {selectLabel[value as keyof typeof selectLabel]}
        </SelectItem>
      ))}
    </Select>
  );
};

export default I18nSelect;

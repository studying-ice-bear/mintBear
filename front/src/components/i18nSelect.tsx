"use client";
import { LANGUAGE_OPTIONS, Locale } from "@/i18n-config";
import { Select, SelectItem } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ChangeEventHandler } from "react";
import { usePathname } from "next/navigation";

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
      placeholder={selectLabel[lng] ?? "Select language"}
      className="min-w-[100px]"
      onChange={onChange}
      classNames={{
        trigger: "h-10",
      }}
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

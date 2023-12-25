"use client";
import {
  Select,
  SelectSection,
  SelectItem,
  SelectProps,
} from "@nextui-org/react";
import {
  useTextTranslateAction,
  useTextTranslateValue,
} from "./textTranslateProvider";
import { ChangeEventHandler } from "react";
import { LANGUAGE_OPTIONS } from "@/i18n-config";

interface LanguageSelectProps extends Omit<SelectProps, "children"> {}

export default function LanguageSelect({ ...rest }: LanguageSelectProps) {
  const { selectedLanguage } = useTextTranslateValue();
  const { languageChanged } = useTextTranslateAction();

  const onSelectLanguage: ChangeEventHandler<HTMLSelectElement> = (event) => {
    languageChanged(event.target.value);
  };

  const selectOptions = Object.entries(LANGUAGE_OPTIONS).map(
    ([key, value]) => ({
      label: value,
      value: key,
    })
  );

  return (
    <Select
      aria-label="Language"
      label="Select Language to translate"
      value={selectedLanguage}
      onChange={onSelectLanguage}
      {...rest}
    >
      {selectOptions.map((option) => (
        <SelectItem key={option.value} value={option.value}>
          {option.label}
        </SelectItem>
      ))}
    </Select>
  );
}

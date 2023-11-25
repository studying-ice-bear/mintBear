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
import { LANGUAGE_OPTIONS } from "@/config/languages";

interface LanguageSelectProps extends Omit<SelectProps, "children"> {}

export default function LanguageSelect({ ...rest }: LanguageSelectProps) {
  const alreadySelectedLanguage = "en"; // 이후 i18n 적용시 설정되어 있는 값
  const { selectedLanguage } = useTextTranslateValue();
  const { languageChanged } = useTextTranslateAction();

  const onSelectLanguage: ChangeEventHandler<HTMLSelectElement> = (event) => {
    languageChanged(event.target.value);
    console.log(selectedLanguage);
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
      defaultValue="en"
      value={
        selectedLanguage === "" ? alreadySelectedLanguage : selectedLanguage
      }
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

"use client";

import { Button } from "@nextui-org/react";
import {
  useTextTranslateAction,
  useTextTranslateValue,
} from "./TextTranslateProvider";

export default function TranslateButton() {
  const { selectedLanguage, selectedText } = useTextTranslateValue(); // 원래는 request 이후 받아와야 하는 번역된 Value
  const { addTranslatedText } = useTextTranslateAction();
  const onClickTranslate: React.MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    const output = Math.random().toString(36).substring(2, 9); // 번역된 Value
    addTranslatedText({
      language: selectedLanguage,
      input: selectedText,
      output,
    });
  };
  return <Button onClick={onClickTranslate}>Translate</Button>;
}

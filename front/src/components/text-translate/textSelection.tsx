"use client";
import { Card, Textarea, TextAreaProps } from "@nextui-org/react";
import { ChangeEventHandler, useRef } from "react";
import { useTextTranslateAction } from "./textTranslateProvider";

export interface TextSelectionProps extends TextAreaProps {}

export default function TextSelection({
  placeholder,
  fullWidth,
  ...rest
}: TextSelectionProps) {
  const { changeSelectedText } = useTextTranslateAction();
  const textareaRef = useRef<HTMLInputElement>(null);
  const onSelectionChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const startPos = event.target.selectionStart;
    const endPos = event.target.selectionEnd;
    if (!startPos || !endPos) {
      return;
    }
    const selectedText = event.target.value.substring(startPos, endPos);
    changeSelectedText(selectedText);

    // highlight selected text
    const textarea = event.target;
    const highlightedText = `<span class="text-primary">${selectedText}</span>`;

    const newText =
      textarea.value.substring(0, startPos) +
      highlightedText +
      textarea.value.substring(endPos);
    textarea.innerHTML = newText;
  };

  const onBlur = () => {
    // TODO 포커스 잃었을때 텍스트 선택 유지
    const textarea = textareaRef.current;
    if (!textarea) {
      return;
    }
  };
  return (
    <Textarea
      label="Drag text to translate"
      placeholder="hasn't been recognized yet"
      fullWidth
      className="max-w-3xl"
      onSelect={onSelectionChange}
      onBlur={onBlur}
      ref={textareaRef}
      {...rest}
    />
  );
}

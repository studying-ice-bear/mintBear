"use client";
import { createContext, useContext, useMemo, useState } from "react";

export interface TextTranslateContextValue {
  selectedLanguage: string;
  translatedTextList: {
    language: string;
    input: string;
    output: string;
    key: string;
  }[];
  selectedText: string;
}

const defaultValue: TextTranslateContextValue = {
  selectedLanguage: "",
  translatedTextList: [],
  selectedText: "",
};

export const TextTranslateContextValue =
  createContext<TextTranslateContextValue>(defaultValue);

export interface TextTranslateAction {
  changeSelectedText: (text: string) => void;
  languageChanged: (language: string) => void;
  addTranslatedText: ({
    language,
    input,
    output,
  }: {
    language: string;
    input: string;
    output: string;
  }) => void;
}

export const TextTranslateActionContext = createContext<TextTranslateAction>({
  changeSelectedText: () => {},
  languageChanged: () => {},
  addTranslatedText: () => {},
});

export function TextTranslateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [translatedTextList, setTranslatedTextList] = useState<
    TextTranslateContextValue["translatedTextList"]
  >([]);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedText, setSelectedText] = useState("");

  const actions = useMemo(
    () => ({
      changeSelectedText(text: string) {
        setSelectedText(text);
      },
      languageChanged(language: string) {
        setSelectedLanguage(language);
      },
      addTranslatedText({
        language,
        input,
        output,
      }: {
        language: string;
        input: string;
        output: string;
      }) {
        const key = Math.random().toString(36).substring(2, 9);
        setTranslatedTextList((prev) => [
          ...prev,
          {
            language,
            input,
            output,
            key,
          },
        ]);
      },
    }),
    []
  );
  return (
    <TextTranslateActionContext.Provider value={actions}>
      <TextTranslateContextValue.Provider
        value={{
          selectedLanguage,
          translatedTextList,
          selectedText,
        }}
      >
        {children}
      </TextTranslateContextValue.Provider>
    </TextTranslateActionContext.Provider>
  );
}

export function useTextTranslateValue() {
  return useContext(TextTranslateContextValue);
}

export function useTextTranslateAction() {
  return useContext(TextTranslateActionContext);
}

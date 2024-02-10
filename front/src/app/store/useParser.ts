import { postImageOCRData } from "@/api/imageParse";
import { Locale } from "@/i18n-config";

import { create } from "zustand";

export type TOCRLangOption = "KO" | "EN-US" | "JA";
export const OCRLangOption: Record<Locale, TOCRLangOption> = {
  "ko-KR": "KO",
  "en-US": "EN-US",
  "ja-JA": "JA",
};

interface ParserState {
  imageUrl: string | null;
  setImageUrl: (imageUrl: string | null) => void;
  parsedText: string | null;
  setParsedText: (text: string | null) => void;
  isParseLoading: boolean;
  setIsParseLoading: (isParseLoading: boolean) => void;
  getParsing: ({
    url,
    option,
  }: {
    url: string;
    option: TOCRLangOption | undefined;
  }) => Promise<void>;
  option: TOCRLangOption | undefined;
  setOption: (option: TOCRLangOption | undefined) => void;
}

const useParser = create<ParserState>()((set, get) => ({
  imageUrl: null,
  setImageUrl: (imageUrl: string | null) => set({ imageUrl }),
  parsedText: null,
  setParsedText: (text: string | null) => set({ parsedText: text }),
  isParseLoading: false,
  setIsParseLoading: (isParseLoading: boolean) => set({ isParseLoading }),
  getParsing: async ({
    url,
    option,
  }: {
    url: string;
    option: TOCRLangOption | undefined;
  }) => {
    set({ isParseLoading: true, parsedText: null });
    try {
      const response = await postImageOCRData({
        url,
        option,
      });
      const result = response.data;
      set({ parsedText: result, isParseLoading: false });
    } catch (error) {
      set({ parsedText: null, isParseLoading: false });
    }
  },
  option: undefined,
  setOption: (option: TOCRLangOption | undefined) => set({ option }),
}));

export default useParser;

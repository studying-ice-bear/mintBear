import { postImageOCRData } from "@/api/imageParse";
import {
  OCRLangOption,
  TOCRLangOption,
} from "@/components/image-upload/ImageUpload";
import { create } from "zustand";

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
    set({ isParseLoading: true });
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
}));

export default useParser;

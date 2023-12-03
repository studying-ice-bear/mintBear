import { create } from "zustand";

interface ParserState {
  imageUrl: string | null;
  setImageUrl: (imageUrl: string | null) => void;
  parsedText: string | null;
  setParsedText: (text: string | null) => void;
  isParseLoading: boolean;
  setIsParseLoading: (isParseLoading: boolean) => void;
}

const useParser = create<ParserState>()((set) => ({
  imageUrl: null,
  setImageUrl: (imageUrl: string | null) => set({ imageUrl }),
  parsedText: null,
  setParsedText: (text: string | null) => set({ parsedText: text }),
  isParseLoading: false,
  setIsParseLoading: (isParseLoading: boolean) => set({ isParseLoading }),
}));

export default useParser;

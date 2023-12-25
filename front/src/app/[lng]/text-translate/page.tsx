import TranslatedTextList from "@/components/text-translate/TranslatedTextList";
import LanguageSelect from "@/components/text-translate/languageSelect";
import TextSelection from "@/components/text-translate/textSelection";
import { TextTranslateProvider } from "@/components/text-translate/textTranslateProvider";
import TranslateButton from "@/components/text-translate/translateButton";

export default function Page({ params: { lng } }: { params: { lng: string } }) {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 w-full">
      <div>
        <h1 className="text-left justify-start">Drag text to translate</h1>
      </div>
      <TextTranslateProvider>
        <TextSelection value="lorem ipsum dolor sit amet consectetur adipisicing elit" />
        <div className="flex justify-between max-w-3xl w-full">
          <LanguageSelect className="w-3/5" />
          <TranslateButton />
        </div>
        <div className="w-full max-w-3xl">
          <TranslatedTextList />
        </div>
      </TextTranslateProvider>
    </section>
  );
}

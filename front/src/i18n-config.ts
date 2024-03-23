export type i18n = {
  defaultLocale: Locale;
  locales: Locale[];
};

export const i18n: i18n = {
  defaultLocale: "en-US",
  locales: ["en-US", "ko-KR", "ja-JA"],
} as const;

export const LANGUAGE_OPTIONS = {
  "en-US": "English",
  "ko-KR": "Korean",
  "ja-JA": "Japanese",
} as const;

export type Locale = "en-US" | "ko-KR" | "ja-JA";

export const getHref = (value: string, pathname: string) => {
  const exceptLanguagePathname = pathname
    .split("/")
    .filter((path) => !Object.keys(LANGUAGE_OPTIONS).includes(path));
  const href = `/${value}${exceptLanguagePathname.join("/")}`;
  return href;
};

export const getCurrentLanguage = (pathname: string) => {
  const exceptLanguagePathname = pathname
    .split("/")
    .filter((path) => Object.keys(LANGUAGE_OPTIONS).includes(path));
  return exceptLanguagePathname[0];
};

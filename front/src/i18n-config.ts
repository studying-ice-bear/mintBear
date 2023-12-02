export const i18n = {
  defaultLocale: "en-US",
  locales: ["en-US", "ko-KR", "ja-JA"],
} as const;

export const LANGUAGE_OPTIONS = {
  "en-US": "English",
  "ko-KR": "Korean",
  "ja-JA": "Japanese",
} as const;

export type Locale = (typeof i18n)["locales"][number];

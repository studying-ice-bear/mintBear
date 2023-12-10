// import "server-only";
// import type { Locale } from "./i18n-config";

// // We enumerate all dictionaries here for better linting and typescript support
// // We also get the default import for cleaner types
// const dictionaries = {
//   "en-US": () =>
//     import("./dictionaries/en-US.ts").then((module) => module.default),
//   "ja-JA": () =>
//     import("./dictionaries/ja-JA.ts").then((module) => module.default),
//   "ko-KR": () =>
//     import("./dictionaries/ko-KR.ts").then((module) => module.default),
// };

// export const getDictionary = async (locale: Locale) =>
//   dictionaries[locale]?.() ?? dictionaries["en-US"]();

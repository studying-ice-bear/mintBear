import { LANGUAGE_OPTIONS } from "@/i18n-config";

export type SiteConfig = typeof siteConfig;

export const navLabelDictionary: Record<
  string,
  Record<keyof typeof LANGUAGE_OPTIONS, string>
> = {
  Home: {
    "ko-KR": "홈",
    "en-US": "Home",
    "ja-JA": "ホーム",
  },
  ImageUpload: {
    "ko-KR": "이미지 업로드",
    "en-US": "Image Upload",
    "ja-JA": "イメージアップロード",
  },
};

export const siteConfig = {
  name: "mintBear",
  description: "easy image upload and editor",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "ImageUpload",
      href: "/image-upload",
    },
    // {
    //   label: "TextTranslate",
    //   href: "/text-translate",
    // },
    // {
    //   label: "Blog",
    //   href: "/blog",
    // },
    // {
    //   label: "About",
    //   href: "/about",
    // },
  ],
  navMenuItems: [
    // {
    //   label: "Profile",
    //   href: "/profile",
    // },
    // {
    //   label: "Dashboard",
    //   href: "/dashboard",
    // },
    // {
    //   label: "Projects",
    //   href: "/projects",
    // },
    {
      label: "Team",
      href: "/team",
    },
    // {
    //   label: "Calendar",
    //   href: "/calendar",
    // },
    // {
    //   label: "Settings",
    //   href: "/settings",
    // },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    github: "https://github.com/studying-ice-bear/mintBear",
  },
  myPageHref: "/my-page",
};

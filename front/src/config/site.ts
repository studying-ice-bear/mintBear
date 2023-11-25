export type SiteConfig = typeof siteConfig;

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
    {
      label: "TextTranslate",
      href: "/text-translate",
    },
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
};

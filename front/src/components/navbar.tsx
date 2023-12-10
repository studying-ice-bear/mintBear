"use client";

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";

import { link as linkStyles } from "@nextui-org/theme";

import { navLabelDictionary, siteConfig } from "@/config/site";
import NextLink from "next/link";
import clsx from "clsx";

import { ThemeSwitch } from "@/components/theme-switch";
import { GithubIcon } from "@/components/icons";

import { Logo } from "@/components/logo";
import I18nSelect from "./i18nSelect";
import { LANGUAGE_OPTIONS } from "@/i18n-config";
import React from "react";
import { usePathname } from "next/navigation";

export const Navbar = ({ lng }: { lng: keyof typeof LANGUAGE_OPTIONS }) => {
  const [isToggled, setToggle] = React.useState(false);
  const pathName = usePathname();
  const getIsActive = (href: string) => {
    const hrefWithoutHome = href === "/" ? "" : href;
    const hrefPathName = `/${lng}${hrefWithoutHome}`;
    console.log(hrefPathName, pathName);
    if (pathName === hrefPathName) {
      return true;
    }
    return false;
  };
  const handleToggle = () => {
    setToggle(!isToggled);
  };
  return (
    <NextUINavbar
      maxWidth="xl"
      position="sticky"
      isMenuOpen={isToggled}
      onMenuOpenChange={handleToggle}
      classNames={{
        item: ["text-inherit", "relative", "data-[active=true]:text-primary"],
      }}
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />
            <p className="font-bold text-inherit">Mint Bear</p>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href} isActive={getIsActive(item.href)}>
              <NextLink
                className={clsx(
                  linkStyles({
                    color: getIsActive(item.href) ? "primary" : "foreground",
                  })
                )}
                href={`/${lng}${item.href}`}
                locale={false}
              >
                {
                  navLabelDictionary[
                    item.label as keyof typeof navLabelDictionary
                  ][lng]
                }
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>
      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <I18nSelect lng={lng} />
          <Link isExternal href={siteConfig.links.github} aria-label="Github">
            <GithubIcon className="text-default-500" />
          </Link>
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <I18nSelect lng={lng} />
        <Link isExternal href={siteConfig.links.github} aria-label="Github">
          <GithubIcon className="text-default-500" />
        </Link>
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navItems.map((item, index) => (
            <NavbarMenuItem
              key={`${item}-${index}`}
              isActive={getIsActive(item.href)}
              className="data-[active=true]:text-primary"
            >
              <NextLink
                className={clsx(
                  linkStyles({
                    color: getIsActive(item.href) ? "primary" : "foreground",
                  })
                )}
                href={`/${lng}${item.href}`}
                locale={false}
                onClick={handleToggle}
              >
                {
                  navLabelDictionary[
                    item.label as keyof typeof navLabelDictionary
                  ][lng]
                }
              </NextLink>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};

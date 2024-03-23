import { title, subtitle } from "@/components/primitives";
import { Locale } from "@/i18n-config";
import {
  highlightTitle,
  title1,
  title2,
  subtitle as subtitleDictionary,
} from "./dictionary";
import { GithubIcon } from "@/components/common/Icons";
import { siteConfig } from "@/config/site";
import { Link } from "@nextui-org/link";
import { button as buttonStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import { Button } from "@nextui-org/react";
import SignIn from "@/components/common/SignIn";

export default async function Page({
  params: { lng },
}: {
  params: { lng: Locale };
}) {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 flex-grow">
      <div className="flex flex-col max-w-lg text-center justify-center whitespace-nowrap">
        <h1 className={title()}>{title1[lng]}</h1>
        <br />
        <h1 className={title({ color: "violet" })}>{highlightTitle[lng]}</h1>
        <br />
        <h1 className={title()}>{title2[lng]}</h1>
        <h2 className={subtitle({ class: "mt-10" })}>
          {subtitleDictionary[lng]}
        </h2>
        <br />
        <div className="flex flex-row justify-center">
          <SignIn />
        </div>
      </div>
      <footer className="w-full fixed bottom-0 flex justify-center gap-4 p-4 bg-background">
        <Link
          isExternal
          as={NextLink}
          className={buttonStyles({
            variant: "bordered",
            radius: "full",
          })}
          href={`${siteConfig.links.github}`}
        >
          <GithubIcon size={20} />
          GitHub
        </Link>
      </footer>
    </section>
  );
}

// localhost:3000/en/image-upload

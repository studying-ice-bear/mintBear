import { title, subtitle } from "@/components/primitives";
import { Locale } from "@/i18n-config";
import {
  highlightTitle,
  title1,
  title2,
  subtitle as subtitleDictionary,
} from "./dictionary";
import { GithubIcon } from "@/components/icons";
import { siteConfig } from "@/config/site";
import { Link } from "@nextui-org/link";
import { button as buttonStyles } from "@nextui-org/theme";
import NextLink from "next/link";

export default async function Page({
  params: { lng },
}: {
  params: { lng: Locale };
}) {
  await fetch("http://52.193.209.99:8080/parse/img", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      url: "https://content.surfit.io/thumbs/image/3MGXw/qV0yG/173663860365362819b86dc/cover-center-2x.webp",
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className={title()}>{title1[lng]}</h1>
        <br />
        <h1 className={title({ color: "violet" })}>{highlightTitle[lng]}</h1>
        <br />
        <h1 className={title()}>{title2[lng]}</h1>
        <h2 className={subtitle({ class: "mt-4" })}>
          {subtitleDictionary[lng]}
        </h2>
      </div>
      <div className="flex gap-3"></div>
      <footer className="w-full flex items-center justify-center py-3">
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

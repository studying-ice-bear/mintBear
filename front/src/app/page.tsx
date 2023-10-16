import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import ImageUpload from "@/components/image-upload/ImageUpload";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className={title()}>Unlock&nbsp;</h1>
        <h1 className={title({ color: "violet" })}>
          a World of Possibilities&nbsp;
        </h1>
        <br />
        <h1 className={title()}>with Image OCR Recognition and Translation</h1>
        <h2 className={subtitle({ class: "mt-4" })}>
          easy, fast, and secure image recognition and translation
        </h2>
      </div>
      <div className="flex gap-3">
        {/* <Link
          isExternal
          as={NextLink}
          href={siteConfig.links.docs}
          className={buttonStyles({
            color: "primary",
            radius: "full",
            variant: "shadow",
          })}
        >
          Documentation
        </Link> */}
      </div>
    </section>
  );
}

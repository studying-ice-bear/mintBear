import ImageParserButton from "@/components/image-upload/ImageParserButton";
import ImageParserResult from "@/components/image-upload/ImageParserResult";
import ImageUpload, {
  ImageUploadLoading,
} from "@/components/image-upload/ImageUpload";
import { Locale } from "@/i18n-config";
import { Suspense } from "react";

export default async function Page({
  params: { lng },
}: {
  params: { lng: Locale };
}) {
  return (
    <section className="flex flex-row flex-wrap items-center justify-center gap-4 py-8 md:py-10">
      <Suspense fallback={<ImageUploadLoading />}>
        <ImageUpload lng={lng} />
      </Suspense>
      {/* <ImageParserButton /> */}
      <Suspense fallback={<div className="rounded-lg" />}>
        <ImageParserResult lng={lng} />
      </Suspense>
    </section>
  );
}

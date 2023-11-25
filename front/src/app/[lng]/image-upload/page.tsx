import ImageParserButton from "@/components/image-upload/ImageParserButton";
import ImageParserResult from "@/components/image-upload/ImageParserResult";
import ImageUpload from "@/components/image-upload/ImageUpload";
import { Suspense } from "react";

export default async function Page({
  params: { lng },
}: {
  params: { lng: string };
}) {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <Suspense fallback={<div>Loading...</div>}>
        <ImageUpload />
      </Suspense>
      {/* <ImageParserButton /> */}
      <Suspense fallback={<div>Loading...</div>}>
        <ImageParserResult />
      </Suspense>
    </section>
  );
}

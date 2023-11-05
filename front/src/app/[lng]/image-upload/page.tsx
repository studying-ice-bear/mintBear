import ImageUpload from "@/components/image-upload/ImageUpload";
import { Card } from "@nextui-org/react";

export default function Page({ params: { lng } }: { params: { lng: string } }) {
  console.log(lng);
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <ImageUpload />
    </section>
  );
}

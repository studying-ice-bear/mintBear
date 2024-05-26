import { CustomSession, getUserServerSession } from "@/api/serverApi";
import ImageParserButton from "@/components/image-upload/ImageParserButton";
import ImageParserResult from "@/components/image-upload/ImageParserResult";
import ImageUpload, {
  ImageUploadLoading,
} from "@/components/image-upload/ImageUpload";
import { Locale } from "@/i18n-config";
import { NextResponse } from "next/server";
import { Suspense } from "react";

export default async function Page({
  params: { lng },
}: {
  params: { lng: Locale };
}) {
  const session = await getUserServerSession();
  if (!session.user?.accessToken) {
    return NextResponse.redirect("/auth/sign-in");
  }
  return (
    <section className="flex flex-row flex-wrap items-center justify-center gap-4 py-8 md:py-10"></section>
  );
}

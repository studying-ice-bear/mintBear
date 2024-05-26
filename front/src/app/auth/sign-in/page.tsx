import { Logo } from "@/components/common/Logo";
import SignIn from "@/components/common/SignIn";
import SignUp from "@/components/common/SignUp";
import { MAX_ID_LENGTH, MAX_PASSWORD_LENGTH } from "@/components/primitives";
import { Locale } from "@/i18n-config";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Input,
} from "@nextui-org/react";
import { FormHTMLAttributes, MouseEventHandler } from "react";
const env = process.env.NODE_ENV;

const apiURL =
  env === "development" ? "http://localhost:3000" : "https://mintbear.com";

export default async function Page({
  params: { lng },
}: {
  params: { lng: Locale };
}) {
  return (
    <Card className="min-w-[400px] max-w-[700px]">
      <SignIn />
    </Card>
  );
}

import { SERVER_URL } from "@/api/serverApi";
import { Logo } from "@/components/common/Logo";
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
  Link,
} from "@nextui-org/react";
import { FormEventHandler } from "react";

export default async function Page({
  params: { lng },
}: {
  params: { lng: Locale };
}) {
  const csrfToken = Math.random().toString(36).substring(2);
  const handleSubmit: (formData: FormData) => void = async (formData) => {
    "use server";
    const bodyData = {
      username: formData.get("username"),
      password: formData.get("password"),
      nickname: formData.get("nickname"),
    };

    const res = await fetch(`${SERVER_URL}/v1/members/sign-up`, {
      method: "POST",
      body: JSON.stringify(bodyData),
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
      const user = await res.json();
      return user;
    }

    return null;
  };

  return (
    <Card className="min-w-[400px] max-w-[700px]">
      <form method="post" action={handleSubmit}>
        <CardHeader className="flex flex-col items-center gap-4">
          <Logo size={100} />
          <h1 className="text-2xl">Sign Up</h1>
        </CardHeader>
        <Divider />
        <CardBody className="flex w-full flex-wrap md:flex-nowrap gap-4">
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <Input
            size="lg"
            label="Username"
            name="username"
            className="max-w-100"
            type="text"
            maxLength={MAX_ID_LENGTH}
            isRequired
          />
          <Input
            size="lg"
            label="Password"
            name="password"
            className="max-w-100"
            type="password"
            maxLength={MAX_PASSWORD_LENGTH}
            isRequired
          />
          <Input
            size="lg"
            label="Nickname"
            name="nickname"
            className="max-w-100"
            type="text"
            maxLength={MAX_ID_LENGTH}
            isRequired
          />
        </CardBody>
        <Divider />
        <CardFooter className="w-full flex items-center justify-end space-x-2 text-small">
          <Link href="/auth/sign-in">
            <Button>Sign In</Button>
          </Link>
          <Button className="" color="primary" type="submit">
            Sign Up
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

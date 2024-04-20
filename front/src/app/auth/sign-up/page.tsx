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
} from "@nextui-org/react";

export default async function Page({
  params: { lng },
}: {
  params: { lng: Locale };
}) {
  const csrfToken = "";

  return (
    <Card className="min-w-[400px] max-w-[700px]">
      <form method="post" action="/api/auth/callback/credentials">
        <CardHeader className="flex flex-col items-center gap-4">
          <Logo size={100} />
          <h1 className="text-2xl">Sign In</h1>
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
        </CardBody>
        <Divider />
        <CardFooter className="flex flex-row-reverse">
          <Button className="" color="primary" type="submit">
            Sign in
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

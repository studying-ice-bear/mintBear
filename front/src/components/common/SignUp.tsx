import React, { FormHTMLAttributes } from "react";
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
import { MAX_ID_LENGTH, MAX_PASSWORD_LENGTH } from "../primitives";
import { Logo } from "./Logo";
import { SERVER_URL } from "@/api/serverApi";
const env = process.env.NODE_ENV;

const apiURL =
  env === "development" ? "http://localhost:3000" : "https://mintbear.com";

export default function SignUp() {
  const handleSubmit: FormHTMLAttributes<HTMLFormElement>["action"] = async (
    formData
  ) => {
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
    <Card>
      <form method="POST" action={handleSubmit}>
        <CardHeader className="flex flex-col items-center gap-4">
          <Logo size={100} />
          <h1 className="text-2xl">Sign up</h1>
        </CardHeader>
        <Divider />
        <CardBody className="flex w-full flex-wrap md:flex-nowrap gap-4">
          {/* <input name="csrfToken" type="hidden" defaultValue={csrfToken} /> */}
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
            maxLength={MAX_PASSWORD_LENGTH}
            isRequired
          />
        </CardBody>
        <Divider />
        <CardFooter className="flex flex-row-reverse">
          <Button className="" color="primary" type="submit">
            Sign up
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

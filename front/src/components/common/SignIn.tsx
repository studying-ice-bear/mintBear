"use client";
import React, { FormHTMLAttributes } from "react";
import {
  Button,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Input,
} from "@nextui-org/react";
import { signIn, useSession } from "next-auth/react";
import { MAX_ID_LENGTH, MAX_PASSWORD_LENGTH } from "../primitives";
import { Logo } from "./Logo";
const env = process.env.NODE_ENV;

const apiURL =
  env === "development" ? "http://localhost:3000" : "https://mintbear.com";

export default function SignIn() {
  const { data: session } = useSession();
  const handleSubmit: FormHTMLAttributes<HTMLFormElement>["action"] = async (
    formData
  ) => {
    const data = {
      username: formData.get("username"),
      password: formData.get("password"),
    };

    const res = await signIn("credentials", {
      ...data,
      redirect: false,
    });
  };
  return (
    <form method="POST" action={handleSubmit}>
      <CardHeader className="flex flex-col items-center gap-4">
        <Logo size={100} />
        <h1 className="text-2xl">Sign In</h1>
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
      </CardBody>
      <Divider />
      <CardFooter className="flex flex-row-reverse">
        <Button className="" color="primary" type="submit">
          Sign in
        </Button>
      </CardFooter>
    </form>
  );
}

import { Button, ButtonProps } from "@nextui-org/react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

export default function SignOut({ ...buttonProps }: ButtonProps) {
  const router = useRouter();
  const onClickSignOut: React.MouseEventHandler<
    HTMLButtonElement
  > = async () => {
    const signOutRes = await signOut({
      redirect: false,
    });

    if (signOutRes) {
      router.push("/auth/sign-in");
      return toast.success("Sign out successfully!");
    }
  };
  return (
    <Button {...buttonProps} onClick={onClickSignOut}>
      Sign Out
    </Button>
  );
}

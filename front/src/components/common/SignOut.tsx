import { requireAuthPages } from "@/config/site";
import { Button, ButtonProps } from "@nextui-org/react";
import { getServerSession } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import { revalidatePath } from "next/cache";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

export default function SignOut({ ...buttonProps }: ButtonProps) {
  const router = useRouter();
  const pathname = usePathname();
  const session = useSession();
  const onClickSignOut: React.MouseEventHandler<
    HTMLButtonElement
  > = async () => {
    const signOutRes = await signOut({
      redirect: false,
    });
    const isRequireAuthPage = requireAuthPages.every((path) =>
      pathname.endsWith(path)
    );
    if (isRequireAuthPage) {
      router.push("/");
      router.refresh();
    }
    if (signOutRes) {
      return toast.success("Sign out successfully!");
    }
  };
  const isSigned = session.status === "authenticated";
  return (
    <>
      {isSigned ? (
        <Button {...buttonProps} onClick={onClickSignOut}>
          Sign Out
        </Button>
      ) : (
        <Button
          onClick={() => {
            router.push("/auth/sign-in");
          }}
        >
          Sign In
        </Button>
      )}
    </>
  );
}

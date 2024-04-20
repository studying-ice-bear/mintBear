import {
  useDisclosure,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import { MyPageIcon } from "./Icons";
import { getSession } from "next-auth/react";
import { Locale } from "@/i18n-config";
import { CustomSession } from "@/api/serverApi";

const titleLabel: Record<Locale, string> = {
  "ko-KR": "마이 페이지",
  "en-US": "My Page",
  "ja-JA": "マイページ",
};

const deleteUserButtonLabel: Record<Locale, string> = {
  "ko-KR": "회원 탈퇴",
  "en-US": "Delete User",
  "ja-JA": "退会する",
};

export default function MyPageButton({
  session,
  lng,
}: {
  session: CustomSession | null;
  lng: Locale;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  if (!session) {
    return null;
  }

  return (
    <>
      <button>
        <MyPageIcon
          style={{
            width: 28,
            height: 28,
            cursor: "pointer",
            color: "default",
          }}
          width={28}
          onClick={onOpen}
          className="text-default-500"
        />
      </button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {titleLabel[lng]}
              </ModalHeader>
              <ModalBody>
                <p>
                  <b>{session.user?.username}</b>
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  {deleteUserButtonLabel[lng]}
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

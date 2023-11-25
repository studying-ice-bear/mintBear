"use client";
import React, { useRef, useState } from "react";
import {
  Input,
  Button,
  Image as ImageComponent,
  Card,
  CardHeader,
  Divider,
  CardBody,
  useDisclosure,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  CircularProgress,
} from "@nextui-org/react";
import dynamic from "next/dynamic";
import { firebaseStorage } from "@/config/firebaseStorage";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
const ImageEditor = dynamic(() => import("./imageEditor"));

const ImageUpload = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  // const [imageWidth, setImageWidth] = useState<number | null>(null);
  // const [imageHeight, setImageHeight] = useState<number | null>(null);

  const fileInput = useRef<HTMLInputElement>(null);

  const handleImage: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    e.preventDefault();
    const file = e.target.files;
    if (!file) {
      return;
    }

    const storageRef = ref(firebaseStorage, `files/${file[0].name}`);
    const uploadTask = uploadBytesResumable(storageRef, file[0]);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        console.log(error);
        setUploadProgress(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageUrl(downloadURL);
          setUploadProgress(null);
        });
      }
    );
  };

  const handleImageEdit: React.MouseEventHandler<HTMLButtonElement> = () => {
    onOpen();
  };

  return (
    <>
      <Card className="min-w-[800px] max-w-[1920px]">
        <CardHeader className="flex items-center justify-between">
          <h2 className={"text-primary text-3xl"}>Image Upload</h2>
          <div>
            <Button onClick={() => fileInput.current?.click()}>
              이미지 선택
            </Button>{" "}
            <Button onClick={handleImageEdit}>이미지 편집</Button>
          </div>
        </CardHeader>
        <Divider />
        <CardBody className="flex items-center justify-center">
          <input
            type="file"
            name="image_URL"
            id="input-file"
            accept="image/*"
            style={{ display: "none" }}
            ref={fileInput}
            onChange={handleImage}
          />
          {!!imageUrl && typeof imageUrl === "string" && (
            <ImageComponent src={imageUrl} alt="업로드 이미지" />
          )}
          {uploadProgress && (
            <CircularProgress
              value={uploadProgress}
              color="primary"
              aria-label="Loading"
              size="lg"
              showValueLabel
            />
          )}
        </CardBody>
      </Card>
      {/* {!!image && typeof image === "string" && (
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          isDismissable={false}
          size="5xl"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalBody className="max-h-[95vh] overflow-auto flex items-center justify-center">
                  <ImageEditor
                    includeUI={{
                      menu: ["shape", "filter"],
                      initMenu: "filter",
                      loadImage: {
                        path: image,
                        name: "test",
                      },
                      uiSize: {
                        width: `58rem`,
                        height: `85vh`,
                      },
                      menuBarPosition: "bottom",
                    }}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    닫기
                  </Button>
                  <Button color="primary" onPress={onClose}>
                    저장
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      )} */}
    </>
  );
};

export default ImageUpload;

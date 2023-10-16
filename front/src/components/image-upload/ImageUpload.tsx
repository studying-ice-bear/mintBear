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
} from "@nextui-org/react";
import ImageEditor from "./imageEditor";

const ImageUpload = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const [imageWidth, setImageWidth] = useState<number | null>(null);
  const [imageHeight, setImageHeight] = useState<number | null>(null);

  const fileInput = useRef<HTMLInputElement>(null);

  const handleImage: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    const _image = new Image();
    _image.src = url;
    _image.onload = () => {
      const width = _image.width;
      const height = _image.height;
      if (width > 1920 && height > 1080) {
        setImageWidth(1920);
        setImageHeight(1080);
        setImage(url);
        return;
      }
      setImageWidth(_image.width);
      setImageHeight(_image.height);
      setImage(url);
    };

    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = (e) => {
      // 파일 onLoad가 성공하면 2, 로딩은 1, 실패는 0 반환
      switch (reader.readyState) {
        case 0:
          setImage(null);
          break;
        case 1:
          setImage(e.target?.result ?? null);
          break;
        case 2:
          setImage(e.target?.result ?? null);
          break;
        default:
          setImage(null);
          break;
      }
    };

    const formData = new FormData(); // 나중에 가져다가 쓰면됨
    formData.append("image", file);
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
          {!!image && typeof image === "string" && (
            <ImageComponent
              src={image}
              width={imageWidth ?? 0}
              height={imageHeight ?? 0}
              alt="업로드 이미지"
            />
          )}
        </CardBody>
      </Card>
      {!!image && typeof image === "string" && (
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
                    Close
                  </Button>
                  <Button color="primary" onPress={onClose}>
                    Action
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default ImageUpload;

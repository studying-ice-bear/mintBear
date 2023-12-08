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
  Skeleton,
} from "@nextui-org/react";
import dynamic from "next/dynamic";
import { firebaseConfig, firebaseStorage } from "@/config/firebaseStorage";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import useParser from "@/app/store/useParser";
import { postImageOCRData } from "@/api/imageParse";
import { Locale } from "@/i18n-config";
const ImageEditor = dynamic(() => import("./imageEditor"));
export const OCRLangOption = {
  "ko-KR": "KO",
  "en-US": "EN",
  "ja-JA": "JA",
};
const imageSelectDic: Record<Locale, string> = {
  "ko-KR": "이미지 선택",
  "en-US": "Select Image",
  "ja-JA": "画像選択",
};

const imageEditDic: Record<Locale, string> = {
  "ko-KR": "이미지 수정",
  "en-US": "Edit Image",
  "ja-JA": "画像編集",
};

const titleDic: Record<Locale, string> = {
  "ko-KR": "이미지 번역",
  "en-US": "Image Translation",
  "ja-JA": "画像翻訳",
};
const ImageUpload = ({ lng }: { lng: Locale }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { imageUrl, setImageUrl, setParsedText, setIsParseLoading } =
    useParser();
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  const handleImage: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files;
    if (!file) {
      return;
    }
    setImageUrl(null);
    setParsedText(null);

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
        setUploadProgress(null);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setImageUrl(downloadURL);
          setUploadProgress(null);
          setIsParseLoading(true);
          const parsedResult = await postImageOCRData({
            url: downloadURL,
            option: OCRLangOption[lng as keyof typeof OCRLangOption],
          });
          setParsedText(parsedResult.data);
          setIsParseLoading(false);
        } catch (error) {
          console.log(error);
          setIsParseLoading(false);
        }
      }
    );
  };

  const handleImageEdit: React.MouseEventHandler<HTMLButtonElement> = () => {
    onOpen();
  };

  return (
    <>
      <Card className="min-w-[365px] sm:min-w-[500px] max-w-[1920px] min-h-[370px] sm:min-h-[600px]">
        <CardHeader className="flex items-center justify-between">
          <h2 className={"text-primary sm:text-md sm:text-xl"}>
            {titleDic[lng]}
          </h2>
          <div>
            <Button
              onClick={() => fileInput.current?.click()}
              className="bg-primary-500 text-white text-xs font-bold md:px-4 rounded mr-2"
              size="sm"
            >
              {imageSelectDic[lng]}
            </Button>
            <Button
              onClick={handleImageEdit}
              className="bg-primary-500 text-xs disabled:opacity-50
               text-white font-bold md:px-4 rounded"
              size="sm"
              disabled={!imageUrl}
            >
              {imageEditDic[lng]}
            </Button>
          </div>
        </CardHeader>
        <Divider />
        <CardBody className="flex items-center justify-center min-w-[365px] sm:max-w-[500px]">
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
            <ImageComponent
              className="object-contain"
              src={imageUrl}
              alt={
                {
                  "ko-KR": "이미지",
                  "en-US": "image",
                  "ja-JA": "画像",
                }[lng]
              }
            />
          )}
          {!!uploadProgress && (
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

export function ImageUploadLoading() {
  return <Skeleton className="sm:min-w-[500px] max-w-[1920px]" />;
}

export default ImageUpload;

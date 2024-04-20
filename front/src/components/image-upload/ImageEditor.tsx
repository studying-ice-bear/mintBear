"use client";
import "tui-image-editor/dist/tui-image-editor.css";
import { default as ToastImageEditor } from "@toast-ui/react-image-editor";

export interface ImageEditorProps
  extends React.ComponentProps<typeof ToastImageEditor> {}

export default function ImageEditor({ ...rest }: ImageEditorProps) {
  return (
    <div>
      <ToastImageEditor {...rest} />
    </div>
  );
}

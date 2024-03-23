"use client";
import { IconSvgProps } from "@/types";
import { useTheme } from "next-themes";
import { WhiteBearLogo, BearLogo } from "./Icons";

export const Logo: React.FC<IconSvgProps> = ({
  size = 36,
  width,
  height,
  ...props
}) => {
  const { theme } = useTheme();
  const logoProps = { size, width, height, ...props };
  if (!theme) return <WhiteBearLogo {...logoProps} />;
  return theme === "dark" ? (
    <WhiteBearLogo {...logoProps} />
  ) : (
    <BearLogo {...logoProps} />
  );
};

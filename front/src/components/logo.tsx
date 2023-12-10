"use client";
import { IconSvgProps } from "@/types";
import { useTheme } from "next-themes";
import { WhiteBearLogo, BearLogo } from "./icons";

export const Logo: React.FC<IconSvgProps> = ({
  size = 36,
  width,
  height,
  ...props
}) => {
  const { theme } = useTheme();
  if (!theme) return <WhiteBearLogo />;
  return theme === "dark" ? <WhiteBearLogo /> : <BearLogo />;
};

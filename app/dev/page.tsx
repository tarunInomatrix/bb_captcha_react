import type { Metadata } from "next";
import DevSignIn from "@/components/DevSignIn";

export const metadata: Metadata = {
  title: "Sign in (Dev) - BotBuster Captcha",
  description: "Development environment login testing page for Botbuster Captcha",
};

export default function DevPage() {
  return <DevSignIn />;
}

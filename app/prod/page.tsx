import type { Metadata } from "next";
import ProdSignIn from "@/components/ProdSignIn";

export const metadata: Metadata = {
  title: "Sign in (Prod) - BotBuster Captcha",
  description: "Production environment login testing page for Botbuster Captcha",
};

export default function ProdPage() {
  return <ProdSignIn />;
}

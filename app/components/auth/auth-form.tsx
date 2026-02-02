import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import TitleHeader from "~/ui/section-header/title-header";
import EmailAuthForm from "./email-auth-form";

interface AuthFormProps {
  actionData: string | undefined;
}

export default function AuthForm({ actionData }: AuthFormProps) {
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");

  return (
    <div className="w-full flex flex-col items-center justify-center md:flex-row md:gap-8">
      <div className="hidden md:block w-[80%] h-screen">
        <img
          src="/image/Rectangle 8.png"
          alt=""
          className="h-screen w-full"
        />
      </div>

      <div className="w-full flex flex-col">
        <div className="absolute top-0 p-3 md:p-2 md:top-10">
          <Link to="/">
            <ArrowLeft className="lg:size-8 cursor-pointer hover:scale-95" />
          </Link>
          <span className="sr-only">Back Button</span>
        </div>

        <div className="w-full mt-3 flex flex-col p-3 items-center h-screen justify-center md:mt-0">
          <TitleHeader text={authMode === "login" ? "Login" : "Sign Up"} />
          {actionData && (
            <p className="mt-6 text-sm text-red-500 lg:text-base lg:mt-10">
              {actionData}
            </p>
          )}
          <EmailAuthForm authMode={authMode} setAuthMode={setAuthMode} />
        </div>
      </div>
    </div>
  );
}

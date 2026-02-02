import { LockKeyhole, Mail, UserCheck } from "lucide-react";
import Input from "./input";
import { Form } from "react-router";
import type { Dispatch, SetStateAction } from "react";

interface EmailAuthFormProps {
  authMode: "login" | "signup";
  setAuthMode: Dispatch<SetStateAction<"login" | "signup">>;
}

export default function EmailAuthForm({
  authMode,
  setAuthMode,
}: EmailAuthFormProps) {
  const isAuthModeLogin = authMode === "login";
  const authLabel = authMode === "login" ? "Sign Up" : "Login";

  return (
    <Form
      method="post"
      className="w-full flex flex-col p-3 gap-6 border border-gray-200 rounded mt-4 lg:w-[80%] lg:mt-6"
    >
      {!isAuthModeLogin && (
        <>
          <Input
            label="Full Name"
            id="full_name"
            name="full_name"
            type="text"
            placeholder="e.g. John Doe"
            icon={UserCheck}
          />
        </>
      )}

      <Input
        label="Email"
        id="email"
        name="email"
        type="email"
        placeholder="example@gmail.com"
        icon={Mail}
      />

      <Input
        label="Password"
        id="password"
        name="password"
        type="password"
        placeholder="••••••••"
        icon={LockKeyhole}
      />

      <input type="hidden" name="auth_mode" value={authMode} />

      <p className="text-sm">
        {isAuthModeLogin ? "Don't" : "Already"} have an account?{" "}
        <span
          onClick={() => setAuthMode(isAuthModeLogin ? "signup" : "login")}
          className="text-blue-400 cursor-pointer"
        >
          {authLabel}
        </span>
      </p>

      <div className="mt-3 w-full flex justify-center">
        <button
          type="submit"
          className="w-2/3 p-1.5 bg-main rounded text-white text-[15.5px] lg:text-lg cursor-pointer hover:bg-[#406b68] transition-all duration-300 active:scale-95"
        >
          {authMode.charAt(0).toUpperCase() + authMode.slice(1)}
        </button>
      </div>
    </Form>
  );
}

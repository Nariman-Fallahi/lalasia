import type { Route as AuthRouteType } from "./+types/auth";
import { redirect, replace } from "react-router";
import { createClient } from "~/utils/supabase/server";
import AuthForm from "~/components/auth/auth-form";

export function meta({}: AuthRouteType.MetaArgs) {
  return [
    { title: "Auth" },
    { name: "description", content: "Lalasia Auth Page" },
  ];
}

export async function action({ request }: AuthRouteType.ActionArgs) {
  const formData = await request.formData();
  const { supabase, headers } = createClient(request);

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const fullName = formData.get("full_name") as string;
  const isLogin = formData.get("auth_mode") === "login";

  if (!email || !password || (!isLogin && !fullName)) {
    return "Please fill in all required fields.";
  }

  const registrationErrorMessage =
    "Something went wrong during registration. Please try again.";

  if (isLogin) {
    const { data: signInData, error: signInError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    console.log(signInData, signInError, "signInData signInError");

    if (signInError || !signInData.user?.id) {
      switch (signInError?.code) {
        case "invalid_credentials":
          return "No account found with this email address.";
        case "email_not_confirmed":
          return "Please confirm your email then login.";
        default:
          return registrationErrorMessage;
      }
    }

    return replace("/", { headers });
  } else {
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp(
      {
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      },
    );

    console.log(signUpData, signUpError, "signUpData signUpError");

    if (signUpError || !signUpData.user?.id) {
      switch (signUpError?.code) {
        case "over_email_send_rate_limit":
          return "You have exceeded the email sending limit. Please try again later.";
        case "user_already_exists":
          return "An account with this email already exists.";
        default:
          return registrationErrorMessage;
      }
    }

    return redirect("/auth/verify-email?status=idle");
  }
}

export default function Auth({ actionData }: AuthRouteType.ComponentProps) {
  return <AuthForm actionData={actionData} />;
}

import { Link, redirect } from "react-router";
import type { Route } from "./+types/verify-email";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "VerifyEmail" },
    { name: "description", content: "Lalasia VerifyEmail Page" },
  ];
}

export async function loader({ request }: Route.ActionArgs) {
  const url = new URL(request.url);

  const code = url.searchParams.get("code") as string;
  const status = url.searchParams.get("status") as "idle" | "success";

  if (
    (!code && status == "success") ||
    (status !== "idle" && status !== "success")
  ) {
    return redirect("/");
  }

  return { status };
}

export default function VerifyEmail({ loaderData }: Route.ComponentProps) {
  const { status } = loaderData;

  return (
    <div className="w-full h-screen overflow-hidden p-4 flex items-center justify-center">
      <div className="w-full border-2 border-dotted border-gray-200 flex flex-col items-center rounded p-3 md:w-2/3">
        <img
          src="/icons/verify-email-icon.svg"
          alt="verifyEmailIcon"
          className="size-60 mix-blend-darken"
        />

        <b className="text-lg lg:text-3xl text-center">
          {status === "success"
            ? "Email Verified Successfully"
            : "Verification Email Sent"}
        </b>

        <p className="text-sm text-paragraphColor mt-3 text-center lg:text-base lg:mt-6 whitespace-pre-line">
          {status === "success"
            ? "Great! Your email is now verified. Head back to the login page and log in to continue.\n You can now safely close this page."
            : "We've sent a verification email to your address. Please check your inbox and follow the link to verify your email.\n After verifying, click the button below to return to the login page and sign in."}
        </p>

        {status === "idle" && (
          <Link
            to="/auth"
            className="mt-8 p-1.5 px-6 bg-main text-white rounded lg:text-[17px]"
          >
            Back to Login
          </Link>
        )}
      </div>
    </div>
  );
}

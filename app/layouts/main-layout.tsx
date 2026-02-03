import { Outlet } from "react-router";
import FooterMenu from "~/components/menu/footer-menu";
import HeaderMenu from "~/components/menu/header-menu";
import type { Route } from "./+types/main-layout";
import { createClient } from "~/utils/supabase/server";

export async function loader({ request }: Route.LoaderArgs) {
  const { supabase } = createClient(request);

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    return { isLogin: false };
  }

  return { isLogin: true, user: data.user };
}

export default function MainLayout({ loaderData }: Route.ComponentProps) {
  const { isLogin, user } = loaderData;

  return (
    <div>
      <HeaderMenu isLogin={isLogin} user={user!} />
      <main>
        <Outlet context={{ isLogin, user }} />
      </main>
      <FooterMenu />
    </div>
  );
}

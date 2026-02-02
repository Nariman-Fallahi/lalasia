import {
  AlignJustify,
  ArrowRight,
  ShoppingBasket,
  UserRound,
  UserRoundPen,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { HEADER_MENU_PATHS } from "~/constants/paths";
import { useLocation, Link, NavLink } from "react-router";
import type { User } from "@supabase/supabase-js";

interface HeaderMenuProps {
  isLogin: boolean;
  user: User;
}

export default function HeaderMenu({ isLogin, user }: HeaderMenuProps) {
  const [menuStatus, setMenuStatus] = useState<"open" | "close" | null>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    if (menuStatus === "open" && typeof window !== "undefined") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [menuStatus]);

  return (
    <>
      <nav className="w-full flex bg-[#fafafa] p-3 px-4 justify-between border-b border-b-gray-200 items-center lg:p-3.5 lg:px-5">
        <NavLink to={"/"} className="flex items-center gap-2">
          <img
            src="/favicon.ico"
            alt=""
            className="size-9 lg:size-10 cursor-pointer"
          />
          <h1 className="font-bold lg:text-lg cursor-pointer!">Lalasia</h1>
        </NavLink>

        <AlignJustify
          onClick={() => setMenuStatus("open")}
          className="md:hidden"
        />

        <ul className="hidden md:flex items-center gap-5 text-lg lg:gap-10">
          {HEADER_MENU_PATHS.map((item) => (
            <li
              key={item.id}
              className={`cursor-pointer hover:text-cyan-800 transition-all decoration-300 ${
                pathname === item.path && "text-main"
              }`}
            >
              <Link to={item.path}>{item.name}</Link>
            </li>
          ))}
        </ul>

        <ul className="hidden md:flex items-center gap-4">
          {isLogin && (
            <p className="text-sm lg:text-base">
              Hello, {user.user_metadata.full_name}
            </p>
          )}

          {!isLogin && (
            <Link to="/auth">
              <UserRound
                size={26}
                className="text-gray-700 cursor-pointer hover:text-cyan-800 transition-all decoration-300"
              />
            </Link>
          )}
          <ShoppingBasket
            size={26}
            className="text-gray-700 cursor-pointer hover:text-cyan-800 transition-all decoration-300"
          />
        </ul>
      </nav>

      <div
        className={`absolute w-full h-screen bg-white hidden z-50 top-0 overflow-y-auto md:hidden ${
          menuStatus === "open"
            ? "openMenu"
            : menuStatus === "close"
              ? "closeMenu"
              : ""
        }`}
      >
        <div className="w-full flex flex-col py-5">
          <div className="w-full flex justify-end px-3">
            <X onClick={() => setMenuStatus("close")} />
          </div>

          <div className="w-full bg-gray-100 px-3 py-5 mt-4 flex items-center justify-between">
            <div className="flex gap-5 items-center">
              <UserRound className="text-gray-700" />
              <p className="text-[15px]">Login or Register</p>
            </div>
            <UserRoundPen className="text-gray-700" />
          </div>

          <ul className="w-full flex flex-col mt-6 gap-6">
            {HEADER_MENU_PATHS.map((item) => (
              <li
                onClick={() => setMenuStatus("close")}
                key={item.id}
                className="w-full flex justify-between px-3"
              >
                <div className="flex items-center gap-3">
                  <item.icon className="size-5.5 text-gray-700" />
                  <Link to={item.path}>
                    <p>{item.name}</p>
                  </Link>
                </div>
                <ArrowRight className="size-5.5 text-gray-700" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Logo } from "components/brand/Logo";
import Image from "next/image";
import { cx } from "lib/cx";
import { useSession, signIn, signOut } from "next-auth/react";
import {
  HomeIcon,
  DocumentPlusIcon,
  MagnifyingGlassCircleIcon,
  ArrowLeftOnRectangleIcon
} from "@heroicons/react/24/outline";

export const TopNavBar = () => {
  const pathName = usePathname();
  const isHomePage = pathName === "/";
  const { data: session } = useSession();

  const NAV_ITEMS = [
    { href: "/", name: "Home", icon: HomeIcon },
    { href: "/resume-builder", name: "Builder", icon: DocumentPlusIcon },
    { href: "/resume-parser", name: "ATS Checker", icon: MagnifyingGlassCircleIcon },
  ];

  return (
    <header
      aria-label="Site Header"
      className={cx(
        "sticky top-0 z-50 flex h-16 items-center border-b border-slate-200/60 bg-white/70 backdrop-blur-xl transition-all duration-300",
        !isHomePage && "bg-white/95"
      )}
    >
      <div className="mx-auto flex h-full w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo size="md" className="group" />

        <nav
          aria-label="Site Nav Bar"
          className="flex items-center gap-2 sm:gap-6 text-sm font-semibold"
        >
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cx(
                  "flex items-center gap-2 rounded-xl px-4 py-2 transition-all duration-200",
                  pathName === item.href
                    ? "bg-primary-50 text-primary-700 shadow-tiny ring-1 ring-primary-100"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            ))}
          </div>

          <div className="h-6 w-px bg-slate-200 mx-2 hidden md:block" />

          <div className="flex items-center gap-3">
            {session ? (
              <div className="flex items-center gap-3 pl-2">
                <div className="hidden sm:block text-right">
                  <p className="text-xs font-bold text-slate-900 leading-none">{session.user?.name}</p>
                  <p className="text-[10px] text-slate-500 mt-1 leading-none">{session.user?.email}</p>
                </div>
                {session.user?.image ? (
                  <button onClick={() => signOut()} className="group relative">
                    <Image
                      src={session.user.image}
                      alt="User profile"
                      width={38}
                      height={38}
                      className="rounded-full border-2 border-white ring-1 ring-slate-200 transition-all group-hover:ring-primary-300 shadow-sm"
                    />
                    <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-white border border-slate-200 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                       <ArrowLeftOnRectangleIcon className="h-2.5 w-2.5 text-slate-500" />
                    </div>
                  </button>
                ) : (
                   <button
                    onClick={() => signOut()}
                    className="btn-secondary px-3 py-1.5 text-xs"
                  >
                    Log Out
                  </button>
                )}
              </div>
            ) : (
              <button
                onClick={() => signIn("google")}
                className="btn-primary px-5 py-2 text-xs h-10"
              >
                Get Started
              </button>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

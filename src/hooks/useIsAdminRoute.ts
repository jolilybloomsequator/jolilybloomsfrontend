"use client";

import { usePathname } from "next/navigation";

function normalizePathname(pathname: string | null) {
  if (!pathname) {
    return "/";
  }

  const trimmed = pathname.replace(/\/+$/, "");
  return (trimmed || "/").toLowerCase();
}

export default function useIsAdminRoute() {
  const pathname = usePathname();
  const normalizedPathname = normalizePathname(pathname);

  return /^\/admin(?:\/|$)/.test(normalizedPathname);
}

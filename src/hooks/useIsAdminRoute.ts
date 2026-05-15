"use client";

import { usePathname } from "next/navigation";

function normalizePathname(pathname: string) {
  const trimmed = pathname.replace(/\/+$/, "");
  return (trimmed || "/").toLowerCase();
}

export default function useIsAdminRoute() {
  const pathname = usePathname();
  const normalizedPathname = normalizePathname(pathname);

  return normalizedPathname === "/admin" || normalizedPathname.startsWith("/admin/");
}

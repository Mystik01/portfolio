"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/navbar/Navbar";

export function NavOnHomeOnly() {
  const pathname = usePathname();
  if (pathname !== "/") return null;
  return <Navbar />;
}

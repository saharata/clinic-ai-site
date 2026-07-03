"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics";

// ติดตามการกดปุ่มสำคัญ (โทร / LINE / Facebook) เพื่อวัด conversion จริงของคลินิก
export default function AnalyticsEvents() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      const link = target?.closest?.("a");
      if (!link) return;
      const href = link.getAttribute("href") || "";
      if (href.startsWith("tel:")) {
        track("call_click", { location: window.location.pathname });
      } else if (href.includes("lin.ee") || href.includes("line.me")) {
        track("line_click", { location: window.location.pathname });
      } else if (href.includes("facebook.com")) {
        track("facebook_click", { location: window.location.pathname });
      }
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}

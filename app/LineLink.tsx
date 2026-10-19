"use client";

import { useSyncExternalStore, type AnchorHTMLAttributes } from "react";

// ลิงก์แอดเพื่อน (ใช้ได้ทุกอุปกรณ์ บนคอมจะขึ้น QR ให้สแกน)
export const lineAddUrl = "https://lin.ee/7Y8onWN";
const lineId = "@735deqqs";

// บนมือถือ เปิดห้องแชตของคลินิกพร้อมพิมพ์ข้อความไว้ให้ คนไข้กดส่งได้ทันที แอดมินรู้เรื่องโดยไม่ต้องถามซ้ำ
// บนคอม ลิงก์ oaMessage ของ LINE พาไปหน้าแรก line.me แทน จึงใช้ลิงก์แอดเพื่อนตามเดิม
export function lineMessageUrl(text: string) {
  return `https://line.me/R/oaMessage/${lineId}/?${encodeURIComponent(text)}`;
}

function isMobile() {
  const ua = navigator.userAgent;
  // iPadOS รายงานตัวเองเป็น Mac จึงดูจากจอสัมผัสด้วย
  return /Android|iPhone|iPad|iPod/i.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
}
const noop = () => () => {};

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "target" | "rel"> & {
  /** ข้อความที่พิมพ์ไว้ให้ในแชต */
  message: string;
};

export default function LineLink({ message, children, ...rest }: Props) {
  // ฝั่ง server และตอนยังไม่โหลด JS ใช้ลิงก์แอดเพื่อน ซึ่งใช้ได้ทุกเครื่อง
  const mobile = useSyncExternalStore(noop, isMobile, () => false);
  return (
    <a {...rest} href={mobile ? lineMessageUrl(message) : lineAddUrl} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
}

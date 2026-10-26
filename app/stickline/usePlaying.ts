"use client";

import { useState } from "react";

// ภาพเคลื่อนไหวทุกชิ้นในหน้านี้ "ไม่เล่นเอง" — ผู้ชมต้องกดเล่น และกดหยุดได้ (WCAG 2.2.2)
// ถ้าเครื่องตั้ง "ลดภาพเคลื่อนไหว" ไว้ CSS จะปิด animation ทั้งหมด เหลือภาพนิ่งที่สื่อความหมายครบ
export function usePlaying() {
  const [playing, setPlaying] = useState(false);
  const button = {
    type: "button" as const,
    className: "btn btn-outline sl-play",
    "aria-pressed": playing,
    onClick: () => setPlaying((p) => !p),
  };
  return { playing, button, label: playing ? "หยุดภาพเคลื่อนไหว" : "เล่นภาพเคลื่อนไหว" };
}

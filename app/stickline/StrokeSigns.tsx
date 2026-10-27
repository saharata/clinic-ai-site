"use client";

import { usePlaying } from "./usePlaying";
import { StrokeCards } from "./strokeArt";

// สัญญาณเตือนสโตรก BE FAST แบบกดเล่นภาพเคลื่อนไหวได้ (ภาพและข้อความอยู่ใน strokeArt.tsx)
export default function StrokeSigns() {
  const { playing, button, label } = usePlaying();
  return (
    <div className="sl-anim" data-playing={playing}>
      <StrokeCards />
      <div className="sl-controls">
        <button {...button}>
          <span aria-hidden="true">{playing ? "⏸" : "▶"}</span> {label}
        </button>
        <a href="tel:1669" className="btn btn-call big">
          โทร 1669
        </a>
      </div>
    </div>
  );
}

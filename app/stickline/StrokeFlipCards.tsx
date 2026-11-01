"use client";

import { useState } from "react";
import { signs } from "./strokeArt";

// การ์ด BE FAST แบบพลิกได้ 3 มิติ: หน้า = ภาพอาการ · หลัง = วิธีสังเกต
// กดหรือกด Enter เพื่อพลิก (ไม่พลิกเองเมื่อเลื่อนเมาส์ผ่าน) · ตั้ง "ลดภาพเคลื่อนไหว" = เปลี่ยนหน้าทันทีไม่หมุน
export default function StrokeFlipCards({ compact = false }: { compact?: boolean }) {
  const [flipped, setFlipped] = useState<Set<string>>(() => new Set());

  function toggle(letter: string) {
    setFlipped((prev) => {
      const next = new Set(prev);
      if (next.has(letter)) next.delete(letter);
      else next.add(letter);
      return next;
    });
  }

  return (
    <ol className={"sl-stroke sl-flip-list" + (compact ? " compact" : "")}>
      {signs.map((s) => {
        const on = flipped.has(s.letter);
        return (
          <li key={s.letter} className={s.letter === "T" ? "sl-stroke-time" : undefined}>
            <button
              type="button"
              className={"sl-flip" + (on ? " on" : "")}
              aria-pressed={on}
              onClick={() => toggle(s.letter)}
            >
              <span className="sl-flip-front">
                <svg viewBox="0 0 124 140" aria-hidden="true" focusable="false">
                  {s.art}
                </svg>
                <span className="sl-stroke-letter">
                  <span lang="en">{s.letter}</span>
                  <small lang="en">{s.word}</small>
                </span>
                <span className="sl-stroke-title">{s.title}</span>
                <span className="sl-flip-hint" aria-hidden="true">
                  แตะเพื่อดูวิธีสังเกต
                </span>
              </span>
              <span className="sl-flip-back" aria-hidden={!on}>
                <span className="sl-stroke-letter">
                  <span lang="en">{s.letter}</span>
                </span>
                <span className="sl-flip-check">{s.check}</span>
              </span>
            </button>
          </li>
        );
      })}
    </ol>
  );
}

"use client";

import { useRef, type ReactNode } from "react";

// เอียงการ์ดตามตำแหน่งเมาส์แบบ 3 มิติ (เบา ๆ ไม่เกิน ±7°)
// ทำงานเฉพาะเครื่องที่มีเมาส์และไม่ได้ตั้ง "ลดภาพเคลื่อนไหว" — บนมือถือและผู้ที่ไวต่อการเคลื่อนไหวจะเป็นภาพนิ่ง
const MAX = 7;

export default function Tilt3D({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  function allowed() {
    return (
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el || !allowed()) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `rotateX(${(-y * MAX * 2).toFixed(2)}deg) rotateY(${(x * MAX * 2).toFixed(2)}deg)`;
  }

  function reset() {
    if (ref.current) ref.current.style.transform = "";
  }

  return (
    <div className={"tilt3d " + className}>
      <div ref={ref} className="tilt3d-inner" onPointerMove={onMove} onPointerLeave={reset} onPointerCancel={reset}>
        {children}
      </div>
    </div>
  );
}

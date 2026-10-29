"use client";

import { useSyncExternalStore } from "react";
import { textSizeKey } from "./textSizeKey";

// ปุ่มขยายตัวอักษรสำหรับผู้สูงอายุและผู้ป่วยที่สายตาไม่ดี (เช่น หลังตาอักเสบจาก MS/NMOSD)
// ฟอนต์ทั้งเว็บเป็น rem → เปลี่ยนขนาดที่ <html> ที่เดียวพอ · จำค่าไว้ในเครื่อง (localStorage)
// ค่าที่จำไว้ถูกใส่ก่อนหน้าแสดงผลโดย textSizeInit ใน layout.tsx จึงไม่กระพริบเปลี่ยนขนาด
const sizes = [
  { value: "", label: "ปกติ" },
  { value: "lg", label: "ใหญ่" },
  { value: "xl", label: "ใหญ่มาก" },
];

const listeners = new Set<() => void>();
function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}
const getSize = () => document.documentElement.dataset.textSize ?? "";
const getServerSize = () => "";

function setSize(value: string) {
  if (value) document.documentElement.dataset.textSize = value;
  else delete document.documentElement.dataset.textSize;
  try {
    if (value) localStorage.setItem(textSizeKey, value);
    else localStorage.removeItem(textSizeKey);
  } catch {
    // โหมดส่วนตัว/ปิดการเก็บข้อมูล: ใช้ได้เฉพาะหน้านี้ ไม่เป็นไร
  }
  listeners.forEach((l) => l());
}

export default function TextSize() {
  const current = useSyncExternalStore(subscribe, getSize, getServerSize);
  return (
    <div className="textsize-bar">
      <div className="container textsize-inner" role="group" aria-labelledby="textsize-label">
        <span id="textsize-label">
          <span className="ts-long">ขนาด</span>ตัวอักษร
        </span>
        {sizes.map((s) => (
          <button
            key={s.value || "normal"}
            type="button"
            className={"textsize-btn size-" + (s.value || "normal")}
            aria-pressed={current === s.value}
            onClick={() => setSize(s.value)}
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}

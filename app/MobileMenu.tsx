"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

// ลิงก์ทั้งหมดของเว็บสำหรับมือถือ (บนมือถือเมนูข้อความด้านบนถูกซ่อน)
// ใช้ path เต็ม เพื่อให้ทำงานได้จากทุกหน้า
const links: { href: string; label: string; static?: boolean }[] = [
  { href: "/", label: "หน้าแรก" },
  { href: "/#hours", label: "เวลาทำการ" },
  { href: "/#services", label: "บริการของคลินิก" },
  { href: "/symptoms", label: "อาการทางระบบประสาทที่พบบ่อย" },
  { href: "/vaccine", label: "ราคาวัคซีนเด็ก" },
  { href: "/ms", label: "MS · NMOSD ดูแลตัวเองและสิทธิ" },
  { href: "/#doctors", label: "ทีมแพทย์" },
  { href: "/#location", label: "สถานที่และการเดินทาง" },
  { href: "/#faq", label: "คำถามที่พบบ่อย" },
  { href: "/learn", label: "Body 101 สื่อการเรียนรู้" },
  { href: "/cyber", label: "Cyber 101", static: true },
  { href: "/ai", label: "AI Tools สำหรับแพทย์" },
];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  function close(returnFocus: boolean) {
    setOpen(false);
    if (returnFocus) buttonRef.current?.focus();
  }

  // a11y: Esc ปิดเมนูแล้วคืน focus ที่ปุ่ม (ฟังเฉพาะตอนเมนูเปิด)
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        className="btn menu-toggle"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((v) => !v)}
      >
        <span aria-hidden="true">{open ? "✕" : "☰"}</span>
        {open ? "ปิดเมนู" : "เมนู"}
      </button>

      {/* disclosure ธรรมดา ไม่ขัง focus · อยู่ใน <nav> ของ header อยู่แล้ว */}
      <div
        id="mobile-menu"
        className="mobile-menu"
        hidden={!open}
      >
        <ul>
          {links.map((l) => (
            <li key={l.href}>
              {l.static ? (
                // หน้า static ใน public/ (ไม่ใช่ route ของ Next) ใช้ลิงก์ธรรมดา
                <a href={l.href} onClick={() => close(false)}>
                  {l.label}
                </a>
              ) : (
                <Link
                  href={l.href}
                  aria-current={l.href === pathname ? "page" : undefined}
                  onClick={() => close(false)}
                >
                  {l.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

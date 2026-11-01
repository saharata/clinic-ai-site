"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { publishedPosts } from "./brain60/posts";
import { symptoms } from "./symptoms/symptomsData";

// "คำถามที่คนถามบ่อย" ในหน้าแรก — หมุนทีละคำถามทุก 4 วินาที (เฉพาะเมื่อกดเล่น และไม่ได้ตั้งลดภาพเคลื่อนไหว)
// คำถามมาจากตอนที่เผยแพร่แล้วของ "สมองใน 60 วินาที" และหัวข้อหน้าอาการ ไม่มีข้อความใหม่
const items = [
  ...publishedPosts.map((p) => ({ title: p.title, href: `/brain60/${p.slug}` })),
  ...symptoms.map((s) => ({ title: s.title, href: `/symptoms/${s.slug}` })),
];

export default function HotQuestions() {
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => setI((n) => (n + 1) % items.length), 4000);
    return () => clearInterval(id);
  }, [playing]);

  const cur = items[i];
  return (
    <div className="hotq">
      <p className="hotq-label">คำถามที่คนถามบ่อย</p>
      <div className="hotq-row">
        <Link key={cur.href} href={cur.href} className="hotq-link">
          {cur.title}
        </Link>
        <div className="hotq-ctl">
          <button type="button" className="btn btn-outline" onClick={() => setI((n) => (n + 1) % items.length)}>
            ถัดไป<span className="sr-only"> คำถาม</span>
          </button>
          <button type="button" className="btn btn-outline" aria-pressed={playing} onClick={() => setPlaying((p) => !p)}>
            {playing ? "หยุดหมุน" : "หมุนอัตโนมัติ"}
          </button>
        </div>
      </div>
      <p className="hotq-more">
        <Link href="/search">ค้นหาในเว็บ</Link> · <Link href="/brain60">สมองใน 60 วินาที</Link>
      </p>
    </div>
  );
}

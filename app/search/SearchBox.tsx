"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { searchIndex } from "./index";

// ค้นหาในเว็บ: จับคำแบบ substring (ภาษาไทยไม่มีช่องว่างระหว่างคำ จึงเหมาะกว่าตัดคำ)
// ชื่อเรื่องตรงมาก่อน แล้วค่อยเนื้อหา · ทำงานในเครื่องผู้ใช้ทั้งหมด ไม่ส่งคำค้นไปที่ไหน
function score(q: string, item: { title: string; text: string }) {
  const t = item.title.toLowerCase();
  const b = item.text.toLowerCase();
  if (t.includes(q)) return 2;
  if (b.includes(q)) return 1;
  return 0;
}

export default function SearchBox() {
  const params = useSearchParams();
  const [q, setQ] = useState(params.get("q") ?? "");
  const needle = q.trim().toLowerCase();
  const results = needle
    ? searchIndex
        .map((item) => ({ item, s: score(needle, item) }))
        .filter((r) => r.s > 0)
        .sort((a, b) => b.s - a.s)
        .slice(0, 30)
    : [];

  return (
    <div className="srch">
      <form action="/search" method="get" role="search" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="srch-q">ค้นหาในเว็บ</label>
        <div className="srch-row">
          <input
            id="srch-q"
            name="q"
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="เช่น ปวดหัว วัคซีน 4 เดือน เป็นลม"
            autoComplete="off"
          />
          <button type="submit" className="btn btn-dark">
            ค้นหา
          </button>
        </div>
      </form>
      <p className="srch-count" role="status">
        {needle ? `พบ ${results.length} รายการ` : `ค้นได้ ${searchIndex.length} หัวข้อทั่วเว็บ`}
      </p>
      {needle && results.length === 0 && (
        <p className="srch-empty">
          ไม่พบ ลองคำสั้นลง หรือ <Link href="/symptoms">ดูอาการที่พบบ่อย</Link>
        </p>
      )}
      <ol className="srch-list">
        {results.map(({ item }) => (
          <li key={item.href + item.title}>
            <Link href={item.href}>
              <span className="srch-group">{item.group}</span>
              <strong>{item.title}</strong>
              <span className="srch-text">{item.text.slice(0, 140)}</span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}

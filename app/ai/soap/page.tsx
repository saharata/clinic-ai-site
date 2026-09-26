"use client";

import { useEffect, useRef, useState } from "react";

const COOKBOOK = "/SOAP_Cookbook_TH.pdf";
const CONTACT_EMAIL = "saharatau@gmail.com";

/** เงื่อนไขที่ผู้ขอรับต้องรับทราบก่อนดาวน์โหลด — ทุกข้อต้องติ๊กครบ */
const TERMS = [
  "ข้าพเจ้าเป็นแพทย์ บุคลากรทางการแพทย์ หรือผู้แทนหน่วยงานสถานพยาบาล",
  "ข้าพเจ้าเข้าใจว่าโปรแกรมนี้เป็นเครื่องมือช่วยจัดทำเอกสาร ไม่ใช่เครื่องมือวินิจฉัยโรคหรือแนะนำการรักษา",
  "ข้าพเจ้าจะตรวจทานและแก้ไขเวชระเบียนทุกฉบับ และรับผิดชอบเวชระเบียนฉบับจริงด้วยตนเอง",
  "ข้าพเจ้าจะจัดการเรื่องความยินยอมของผู้ป่วยและการคุ้มครองข้อมูลตาม PDPA ด้วยตนเอง",
  "ข้าพเจ้าจะไม่นำโปรแกรมไปจำหน่ายต่อ และจะไม่ใช้กับงานที่อยู่นอกขอบเขตข้างต้น",
];

export default function SoapGuidePage() {
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState<boolean[]>(TERMS.map(() => false));
  const allChecked = checked.every(Boolean);
  const [form, setForm] = useState({ name: "", role: "", org: "", email: "", note: "" });
  const [sent, setSent] = useState(false);
  const openerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // a11y (keyboard): เปิดกล่องแล้วย้าย focus เข้าไป, Esc ปิด, Tab วนอยู่ในกล่อง, ปิดแล้วคืน focus ที่ปุ่มเดิม
  useEffect(() => {
    if (!open) return;
    const opener = openerRef.current;
    closeRef.current?.focus();
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;
      const items = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled])'
      );
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      opener?.focus();
    };
  }, [open]);

  const mailto = () => {
    const body = [
      "ขอรับตัวโปรแกรม SOAP Note (ฉบับทดลองใช้)",
      "",
      `ชื่อ-นามสกุล: ${form.name}`,
      `ตำแหน่ง/สาขา: ${form.role}`,
      `หน่วยงาน: ${form.org}`,
      `อีเมลติดต่อกลับ: ${form.email}`,
      `วัตถุประสงค์การใช้งาน: ${form.note}`,
      "",
      "— รับทราบเงื่อนไขทั้งหมดแล้ว —",
      ...TERMS.map((t) => `[x] ${t}`),
    ].join("\n");
    return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      "ขอรับตัวโปรแกรม SOAP Note"
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <main id="main-content" tabIndex={-1} className="soapPage">
      <section className="soapHero">
        <a href="/ai" className="soapBack"><span aria-hidden="true">←</span> กลับหน้าเครื่องมือ AI</a>
        <p className="soapEyebrow">คู่มือการใช้งาน</p>
        <h1 className="soapTitle">SOAP Note ด้วย AI ที่รันในเครื่อง</h1>
        <p className="soapLead">
          แปลงบทสนทนาระหว่างแพทย์กับผู้ป่วยให้เป็นร่างเวชระเบียนภาษาไทย
          โดยประมวลผลทั้งหมดในเครื่องของผู้ใช้ ข้อมูลผู้ป่วยไม่ออกสู่อินเทอร์เน็ต
        </p>

        <div className="soapTags">
          <span className="soapTag on">ประมวลผลในเครื่อง 100%</span>
          <span className="soapTag warn">ร่างเอกสาร — แพทย์ตรวจทานทุกฉบับ</span>
        </div>
      </section>

      {/* ── ปุ่มหลัก: อ่านคู่มือฟรี / ขอรับตัวโปรแกรม ── */}
      <section className="soapActions">
        <a href={COOKBOOK} target="_blank" rel="noopener noreferrer" className="soapBtn primary">
          <span className="soapBtnTop">ดาวน์โหลดคู่มือ (PDF)</span>
          <span className="soapBtnSub">อ่านได้ทันที ไม่ต้องลงทะเบียน</span>
        </a>
        <button type="button" className="soapBtn" ref={openerRef} onClick={() => setOpen(true)}>
          <span className="soapBtnTop">ขอรับตัวโปรแกรม</span>
          <span className="soapBtnSub">สำหรับแพทย์และหน่วยงาน · ต้องรับทราบเงื่อนไข</span>
        </button>
      </section>

      <section className="soapBody">
        <h2>เหมาะกับใคร</h2>
        <ul>
          <li>แพทย์ที่ใช้เวลาไปกับการพิมพ์เวชระเบียนหลังตรวจเสร็จ</li>
          <li>คลินิกหรือหน่วยงานที่ต้องการให้ข้อมูลผู้ป่วยอยู่ในเครื่องตัวเองเท่านั้น</li>
          <li>ทีมโรงพยาบาลที่กำลังศึกษาการนำ AI มาใช้กับงานเวชระเบียนภาษาไทย</li>
        </ul>

        <h2>ในคู่มือมีอะไร</h2>
        <ol>
          <li>ขอบเขตและข้อจำกัดที่ต้องรู้ก่อนใช้</li>
          <li>สถาปัตยกรรมและสเปกเครื่องที่ต้องใช้</li>
          <li>ขั้นตอนการใช้งานประจำวันแบบไม่ต้องนั่งรอ</li>
          <li>เคล็ดลับการพูดให้ได้เวชระเบียนที่ดี</li>
          <li>การบันทึกผลตรวจร่างกาย</li>
          <li>ความเป็นส่วนตัวและ PDPA</li>
          <li>บทเรียนสำหรับทีมที่จะพัฒนาระบบเอง</li>
        </ol>

        <div className="soapNote">
          <strong>ข้อควรทราบ</strong> โปรแกรมอยู่ในระยะทดลองใช้ ยังไม่เปิดดาวน์โหลดสาธารณะ
          ฉบับที่แจกจ่ายตัดฟังก์ชันเสนอแนวทางการรักษาออก เหลือเฉพาะการช่วยจัดทำเอกสาร
          และแพทย์ผู้รักษาเป็นผู้รับผิดชอบเวชระเบียนฉบับจริงเสมอ
        </div>
      </section>

      {/* ── กล่องรับทราบเงื่อนไข + ฟอร์มขอรับ ── */}
      {open && (
        <div className="soapOverlay" onClick={() => setOpen(false)}>
          <div
            className="soapDialog"
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="soap-dialog-title"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="soapDialogHead">
              <h2 id="soap-dialog-title">ขอรับตัวโปรแกรม</h2>
              <button type="button" className="soapClose" ref={closeRef} onClick={() => setOpen(false)} aria-label="ปิด">×</button>
            </div>

            {!sent ? (
              <>
                <p className="soapDialogLead">กรุณาอ่านและติ๊กรับทราบให้ครบทุกข้อ</p>
                <div className="soapTerms">
                  {TERMS.map((t, i) => (
                    <label key={i} className="soapTerm">
                      <input
                        type="checkbox"
                        checked={checked[i]}
                        onChange={() =>
                          setChecked((c) => c.map((v, j) => (j === i ? !v : v)))
                        }
                      />
                      <span>{t}</span>
                    </label>
                  ))}
                </div>

                {/* a11y (keyboard): เดิมล็อกด้วย pointer-events อย่างเดียว คีย์บอร์ดยัง Tab เข้าไปพิมพ์ได้ → ใช้ fieldset disabled */}
                <fieldset className="soapForm" disabled={!allChecked}>
                  {/* a11y (labels): เดิมมีแค่ placeholder ซึ่งหายไปเมื่อเริ่มพิมพ์ → มีป้ายกำกับถาวร */}
                  <legend className="sr-only">ข้อมูลผู้ขอรับโปรแกรม</legend>
                  <label className="soapField">
                    <span>ชื่อ-นามสกุล <span aria-hidden="true">*</span></span>
                    <input value={form.name} aria-required="true" autoComplete="name"
                      onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  </label>
                  <label className="soapField">
                    <span>ตำแหน่ง / สาขา</span>
                    <input placeholder="เช่น ประสาทแพทย์" value={form.role} autoComplete="organization-title"
                      onChange={(e) => setForm({ ...form, role: e.target.value })} />
                  </label>
                  <label className="soapField">
                    <span>หน่วยงาน / สถานพยาบาล</span>
                    <input value={form.org} autoComplete="organization"
                      onChange={(e) => setForm({ ...form, org: e.target.value })} />
                  </label>
                  <label className="soapField">
                    <span>อีเมลติดต่อกลับ <span aria-hidden="true">*</span></span>
                    <input type="email" value={form.email} aria-required="true" autoComplete="email"
                      onChange={(e) => setForm({ ...form, email: e.target.value })} />
                  </label>
                  <label className="soapField">
                    <span>ต้องการนำไปใช้กับงานลักษณะใด (โดยย่อ)</span>
                    <textarea rows={3}
                      value={form.note}
                      onChange={(e) => setForm({ ...form, note: e.target.value })} />
                  </label>
                </fieldset>

                {/* a11y (error suggestion): บอกว่าทำไมยังกดส่งไม่ได้ และต้องทำอะไรเพิ่ม */}
                <p className="soapHint" aria-live="polite">
                  {!allChecked
                    ? "ติ๊กรับทราบเงื่อนไขให้ครบทุกข้อก่อน จึงจะกรอกข้อมูลได้"
                    : !form.name || !form.email
                      ? "กรอกชื่อ-นามสกุลและอีเมลติดต่อกลับ (ช่องที่มี *) แล้วจึงกดส่งได้"
                      : "ข้อมูลครบแล้ว กดส่งคำขอได้เลย"}
                </p>
                <a
                  className={`soapBtn primary full ${
                    allChecked && form.name && form.email ? "" : "disabled"
                  }`}
                  href={allChecked && form.name && form.email ? mailto() : undefined}
                  onClick={() => {
                    if (allChecked && form.name && form.email) setSent(true);
                  }}
                >
                  ส่งคำขอทางอีเมล
                </a>
                <p className="soapFine">
                  ระบบจะเปิดโปรแกรมอีเมลของท่านพร้อมข้อความที่กรอกไว้
                  ข้อมูลไม่ได้ถูกเก็บบนเว็บไซต์นี้
                </p>
              </>
            ) : (
              <div className="soapDone">
                <p><strong>เปิดโปรแกรมอีเมลแล้ว</strong></p>
                <p>กรุณากดส่งอีเมลเพื่อให้คำขอถึงผู้ดูแล จะติดต่อกลับตามอีเมลที่ให้ไว้</p>
                <button type="button" className="soapBtn full" onClick={() => { setOpen(false); setSent(false); }}>
                  ปิด
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        /* ── ออกแบบมือถือก่อน (mobile-first) แล้วค่อยขยายบนจอใหญ่ ── */
        .soapPage { max-width: 720px; margin: 0 auto; padding: 20px 16px 72px; }
        .soapBack { display: inline-flex; align-items: center; min-height: 44px; font-size: 0.875rem; color: #2f6a5b;
          text-decoration: none; margin-bottom: 18px; padding: 6px 0; }
        .soapEyebrow { font-size: 0.75rem; letter-spacing: .16em; text-transform: uppercase;
          color: #6b7280; font-weight: 600; margin: 0 0 6px; }
        .soapTitle { font-size: 1.625rem; line-height: 1.25; margin: 0 0 12px; color: #0f172a; }
        .soapLead { font-size: 1rem; line-height: 1.7; color: #374151; margin: 0 0 16px; }
        .soapTags { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 26px; }
        .soapTag { font-size: 0.7812rem; padding: 5px 11px; border-radius: 999px;
          border: 1px solid #e5e7eb; color: #6b7280; }
        .soapTag.on { background: #eef3f0; border-color: #cfe0d8; color: #2f6a5b; }
        .soapTag.warn { background: #fdf6e7; border-color: #f0e2c4; color: #92660f; }

        /* ปุ่มเต็มความกว้างบนมือถือ — นิ้วโป้งกดง่าย */
        .soapActions { display: flex; flex-direction: column; gap: 12px; margin-bottom: 32px; }
        .soapBtn { display: flex; flex-direction: column; align-items: center; gap: 3px;
          width: 100%; padding: 16px 18px; border-radius: 14px; border: 1px solid #d1d5db;
          background: #fff; color: #0f172a; font-family: inherit; cursor: pointer;
          text-decoration: none; text-align: center; min-height: 60px; }
        .soapBtn.primary { background: #2f6a5b; border-color: #2f6a5b; color: #fff; }
        .soapBtn.full { width: 100%; margin-top: 6px; }
        .soapBtn.disabled { opacity: .45; pointer-events: none; }
        .soapBtnTop { font-size: 1rem; font-weight: 600; }
        .soapBtnSub { font-size: 0.7812rem; opacity: .85; font-weight: 400; }

        .soapBody h2 { font-size: 1.125rem; margin: 28px 0 10px; color: #0f172a; }
        .soapBody ul, .soapBody ol { padding-left: 20px; margin: 0; }
        .soapBody li { font-size: 0.9688rem; line-height: 1.75; color: #374151; margin: 4px 0; }
        .soapNote { margin-top: 26px; background: #f8f7f3; border: 1px solid #e6e0d3;
          border-left: 3px solid #92660f; border-radius: 10px; padding: 14px 16px;
          font-size: 0.9062rem; line-height: 1.7; color: #3f3f46; }

        /* ── กล่องเงื่อนไข: บนมือถือเป็น sheet เลื่อนขึ้นจากล่าง ── */
        .soapOverlay { position: fixed; inset: 0; background: rgba(15,23,42,.55);
          display: flex; align-items: flex-end; justify-content: center; z-index: 50;
          padding: 0; }
        .soapDialog { background: #fff; width: 100%; max-height: 92vh; overflow-y: auto;
          border-radius: 18px 18px 0 0; padding: 20px 18px calc(20px + env(safe-area-inset-bottom)); }
        .soapDialogHead { display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 6px; }
        .soapDialogHead h2 { margin: 0; font-size: 1.1875rem; color: #0f172a; }
        .soapClose { background: none; border: none; font-size: 1.875rem; line-height: 1;
          color: #4b5563; cursor: pointer; padding: 0; min-width: 44px; min-height: 44px;
          display: inline-flex; align-items: center; justify-content: center; border-radius: 10px; }
        .soapDialogLead { font-size: 0.875rem; color: #6b7280; margin: 0 0 14px; }
        .soapTerms { display: flex; flex-direction: column; gap: 12px; margin-bottom: 20px; }
        .soapTerm { display: flex; gap: 11px; align-items: flex-start; font-size: 0.9062rem;
          line-height: 1.6; color: #374151; cursor: pointer; }
        .soapTerm input { margin-top: 3px; width: 20px; height: 20px; flex: 0 0 auto;
          accent-color: #2f6a5b; }
        .soapForm { display: flex; flex-direction: column; gap: 10px; border: 0; padding: 0; margin: 0; min-width: 0; }
        .soapForm:disabled { opacity: .4; }
        .soapForm input, .soapForm textarea { width: 100%; padding: 13px 14px; font-size: 1rem;
          border: 1px solid #6b7280; border-radius: 11px; font-family: inherit;
          color: #0f172a; background: #fff; }
        .soapField { display: flex; flex-direction: column; gap: 4px; font-size: 0.9062rem; color: #374151; font-weight: 600; }
        .soapHint { font-size: 0.9062rem; color: #374151; margin: 16px 0 4px; }
        .soapFine { font-size: 0.7812rem; color: #6b7280; line-height: 1.6; margin: 12px 0 0; }
        .soapDone { text-align: center; padding: 14px 0; }
        .soapDone p { font-size: 0.9375rem; line-height: 1.7; color: #374151; margin: 0 0 10px; }

        @media (min-width: 720px) {
          .soapPage { padding: 40px 24px 90px; }
          .soapTitle { font-size: 2.125rem; }
          .soapActions { flex-direction: row; }
          .soapBtn { flex: 1; }
          .soapOverlay { align-items: center; padding: 24px; }
          .soapDialog { max-width: 560px; border-radius: 18px; padding: 26px 28px; }
        }
      `}</style>
    </main>
  );
}

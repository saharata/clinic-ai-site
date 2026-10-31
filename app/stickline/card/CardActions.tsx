"use client";

import { useState } from "react";

// ปุ่มของบัตร BE FAST: พิมพ์ · แชร์เป็นรูป · แชร์ลิงก์ทาง LINE
// รูปบัตร (public/stickline/befast-card.png) สร้างล่วงหน้า ไม่ต้องวาดในเบราว์เซอร์ จึงเหมือนกันทุกเครื่อง
const cardUrl = "https://www.sahawanclinic.clinic/stickline/card";
const imageUrl = "/stickline/befast-card.png";
const shareText = "สัญญาณเตือนสโตรก BE FAST จำไว้ ช่วยชีวิตคนในบ้านได้ · สหวรรณคลินิก นนทบุรี";
const lineShareUrl = `https://line.me/R/share?text=${encodeURIComponent(`${shareText}\n${cardUrl}`)}`;

export default function CardActions() {
  const [status, setStatus] = useState("");

  async function shareImage() {
    try {
      const blob = await (await fetch(imageUrl)).blob();
      const file = new File([blob], "befast-card.png", { type: "image/png" });
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], title: shareText, text: `${shareText}\n${cardUrl}` });
        return;
      }
    } catch {
      // ผู้ใช้ยกเลิก หรือเครื่องไม่รองรับ → ดาวน์โหลดแทน
    }
    const a = document.createElement("a");
    a.href = imageUrl;
    a.download = "befast-card.png";
    a.click();
    setStatus("บันทึกรูปลงเครื่องแล้ว ส่งต่อใน LINE ได้เลย");
  }

  return (
    <div className="sl-controls card-actions-print">
      <button type="button" className="btn btn-dark big" onClick={() => window.print()}>
        พิมพ์ติดตู้เย็น
      </button>
      <button type="button" className="btn btn-outline big" onClick={shareImage}>
        แชร์เป็นรูป
      </button>
      <a href={lineShareUrl} target="_blank" rel="noreferrer" className="btn btn-line big">
        แชร์ลิงก์ทาง LINE<span className="sr-only"> (เปิดในแท็บใหม่)</span>
      </a>
      <a href={imageUrl} download="befast-card.png" className="btn btn-outline big">
        ดาวน์โหลดรูป
      </a>
      <p role="status" className="card-status">
        {status}
      </p>
    </div>
  );
}

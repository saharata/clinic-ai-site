"use client";

import { usePlaying } from "./usePlaying";

// MS กับปลอกประสาท — ภาพประกอบประโยคที่เผยแพร่แล้วใน FAQ หน้าแรก:
// "ระบบภูมิคุ้มกันทำลายปลอกประสาทในระบบประสาทส่วนกลาง ทำให้เกิดอาการ เช่น ตามัว ชา อ่อนแรง เดินเซ"
// แถวบน = ปลอกประสาทปกติ สัญญาณกระโดดข้ามช่วง · แถวล่าง = ปลอกประสาทเสียหาย สัญญาณช้าลงและสะดุด
const segments = [30, 125, 220, 315, 410, 505];
const damaged = new Set([2, 3]);

function Row({ y, broken }: { y: number; broken?: boolean }) {
  return (
    <g>
      <line x1="20" y1={y} x2="590" y2={y} className="sl-axon" />
      {segments.map((x, i) =>
        broken && damaged.has(i) ? (
          <rect key={x} x={x} y={y - 11} width="80" height="22" rx="11" className="sl-myelin-lost" />
        ) : (
          <rect key={x} x={x} y={y - 11} width="80" height="22" rx="11" className="sl-myelin" />
        ),
      )}
      <circle cx="22" cy={y} r="8" className={broken ? "sl-signal sl-signal-slow" : "sl-signal sl-signal-fast"} />
    </g>
  );
}

export default function MyelinAnimation() {
  const { playing, button, label } = usePlaying();
  return (
    <figure className="sl-anim sl-myelin-fig" data-playing={playing}>
      <svg viewBox="0 0 610 170" role="img" aria-labelledby="sl-myelin-cap">
        <text x="20" y="22" className="sl-svg-label">
          ปลอกประสาทปกติ สัญญาณส่งต่อได้เร็ว
        </text>
        <Row y={50} />
        <text x="20" y="112" className="sl-svg-label">
          ปลอกประสาทถูกทำลาย สัญญาณช้าลงหรือสะดุด
        </text>
        <Row y={140} broken />
      </svg>
      <figcaption id="sl-myelin-cap">
        MS และ NMOSD เป็นกลุ่มโรคที่ระบบภูมิคุ้มกันทำลายปลอกประสาทในระบบประสาทส่วนกลาง ทำให้เกิดอาการ
        เช่น ตามัว ชา อ่อนแรง เดินเซ
      </figcaption>
      <div className="sl-controls">
        <button {...button}>
          <span aria-hidden="true">{playing ? "⏸" : "▶"}</span> {label}
        </button>
      </div>
    </figure>
  );
}

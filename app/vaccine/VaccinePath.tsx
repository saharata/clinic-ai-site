"use client";

import { useState, useSyncExternalStore } from "react";
import LineLink from "../LineLink";
import { bangkokNow } from "../clinicHours";
import { vaccineSchedule } from "./vaccineData";

// เส้นทางวัคซีนของลูก: ใส่วันเกิด → เห็นว่าอยู่ช่วงอายุไหนในตารางวัคซีนของคลินิก
// คำนวณในเบราว์เซอร์เท่านั้น วันเกิดไม่ถูกส่งหรือบันทึกที่ไหน
// ไม่บอกว่า "ต้องฉีดอะไร" — ชี้ช่วงอายุถัดไปในตาราง แล้วให้กุมารแพทย์พิจารณาตามประวัติวัคซีนจริง

// "2 เดือน" → 2 · "4 ปี" → 48 · "11-12 ปี" → 132 · "ทุกอายุ" → ไม่อยู่บนเส้นทาง
function ageMonths(age: string) {
  const m = age.match(/^(\d+)(?:-\d+)?\s*(เดือน|ปี)$/);
  if (!m) return null;
  return Number(m[1]) * (m[2] === "ปี" ? 12 : 1);
}

const stops = vaccineSchedule
  .map((g, index) => ({ ...g, index, months: ageMonths(g.age) }))
  .filter((g): g is typeof g & { months: number } => g.months !== null);
const anyAge = vaccineSchedule.findIndex((g) => ageMonths(g.age) === null);

function monthsBetween(birth: string, today: string) {
  const [by, bm, bd] = birth.split("-").map(Number);
  const [ty, tm, td] = today.split("-").map(Number);
  return (ty - by) * 12 + (tm - bm) - (td < bd ? 1 : 0);
}

function ageText(months: number) {
  const y = Math.floor(months / 12);
  const m = months % 12;
  if (y === 0) return `${m} เดือน`;
  return m ? `${y} ปี ${m} เดือน` : `${y} ปี`;
}

// หน้า build แบบ static: วันที่ตอน build ไม่ใช่วันนี้ → อ่านวันที่จากเบราว์เซอร์เท่านั้น
const noop = () => () => {};
const getToday = () => bangkokNow(new Date()).ymd;
const getServerToday = () => "";

export default function VaccinePath({ tableHref = "" }: { tableHref?: string }) {
  const [birth, setBirth] = useState("");
  const today = useSyncExternalStore(noop, getToday, getServerToday);
  const months = birth && today ? monthsBetween(birth, today) : null;
  const invalid = months !== null && months < 0;
  const valid = months !== null && !invalid;

  // ช่วงอายุถัดไป = ช่วงแรกที่ยังไม่ผ่าน (อายุเดียวกันนับเป็น "ช่วงนี้")
  const nextIdx = valid ? stops.findIndex((s) => s.months >= months) : -1;
  const next = nextIdx >= 0 ? stops[nextIdx] : null;
  const progress = !valid ? 0 : nextIdx === -1 ? 1 : nextIdx / (stops.length - 1);

  return (
    <div className="vp">
      <div className="vp-input">
        <label htmlFor="vp-birth">วันเกิดของลูก</label>
        <input
          id="vp-birth"
          type="date"
          max={today || undefined}
          value={birth}
          onChange={(e) => setBirth(e.target.value)}
          aria-describedby="vp-privacy"
        />
        <p id="vp-privacy" className="vp-privacy">
          คำนวณในเครื่องนี้เท่านั้น ไม่มีการส่งหรือบันทึกวันเกิด
        </p>
      </div>

      <div className="vp-track" aria-hidden="true">
        <div className="vp-fill" style={{ width: `${progress * 100}%` }} />
      </div>
      <ol className="vp-stops">
        {stops.map((s, i) => {
          const state = !valid ? "" : i < nextIdx || nextIdx === -1 ? "done" : i === nextIdx ? "next" : "";
          return (
            <li key={s.age} className={state} aria-current={state === "next" ? "step" : undefined}>
              <a href={`${tableHref}#age-${s.index}`} className="vp-stop">
                {s.age}
                {state === "done" && <span className="sr-only"> (ผ่านช่วงนี้แล้ว)</span>}
                {state === "next" && <span className="sr-only"> (ช่วงอายุถัดไป)</span>}
              </a>
            </li>
          );
        })}
      </ol>

      <div aria-live="polite">
        {invalid && <p className="vp-result">วันเกิดอยู่หลังวันนี้ กรุณาตรวจสอบอีกครั้ง</p>}
        {valid && (
          <div className="vp-result">
            <p className="vp-age">
              ลูกอายุ <strong>{ageText(months)}</strong>
            </p>
            {next ? (
              <>
                <p>
                  ช่วงอายุ{next.months === months ? "นี้" : "ถัดไป"}ในตารางของคลินิก:{" "}
                  <a href={`${tableHref}#age-${next.index}`}>
                    <strong>{next.age}</strong>
                  </a>
                </p>
                <ul>
                  {next.items.map((item) => (
                    <li key={item.name}>
                      {item.name}
                      {item.type === "optional" && <span className="vp-tag">วัคซีนเสริม</span>}
                    </li>
                  ))}
                </ul>
                <div className="sl-controls">
                  <LineLink
                    message={`สวัสดี สนใจนัดฉีดวัคซีนลูก (อายุ ${ageText(months)})`}
                    className="btn btn-line"
                  >
                    นัดฉีดวัคซีนผ่าน LINE
                  </LineLink>
                </div>
              </>
            ) : (
              <p>
                ผ่านทุกช่วงอายุในตารางแล้ว
                {anyAge >= 0 && (
                  <>
                    {" "}
                    ดู<a href={`${tableHref}#age-${anyAge}`}>วัคซีนที่ฉีดได้ทุกอายุ</a>
                  </>
                )}
              </p>
            )}
            <p className="vp-note">
              ถ้าลูกยังไม่ได้ฉีดบางเข็ม หรือฉีดไม่ตรงช่วง กุมารแพทย์จะพิจารณาตามประวัติวัคซีนของลูก
              นำสมุดวัคซีนมาด้วยทุกครั้ง
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

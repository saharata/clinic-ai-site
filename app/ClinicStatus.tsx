"use client";

import { useSyncExternalStore } from "react";
import { bangkokNow, clinicState, clinics, hhmm, thaiDays } from "./clinicHours";

// อัปเดตทุก 30 วินาที ค่าที่คืนเป็น "นาที" จึงเปลี่ยนเฉพาะเมื่อข้ามนาที (ไม่ render ถี่เกินจำเป็น)
function subscribe(onChange: () => void) {
  const id = setInterval(onChange, 30_000);
  return () => clearInterval(id);
}
const getMinute = () => Math.floor(Date.now() / 60_000);
// หน้าเว็บ build แบบ static เวลาตอน build ไม่ใช่เวลาจริง → ฝั่ง server แสดงตารางเวลาแทน
const getServerMinute = () => null;

export default function ClinicStatus() {
  const minute = useSyncExternalStore(subscribe, getMinute, getServerMinute);
  const now = minute === null ? null : bangkokNow(new Date(minute * 60_000));

  return (
    <section className="clinic-status" aria-label="เวลาเปิดของคลินิก">
      <div className="container clinic-status-inner">
        <ul className="clinic-status-list">
          {clinics.map((c) => {
            const state = now ? clinicState(c, now.day, now.mins) : null;
            return (
              <li key={c.key}>
                <span
                  className={"status-dot" + (state?.isOpen ? " open" : "")}
                  aria-hidden="true"
                />
                <strong>{c.name}</strong>{" "}
                {state
                  ? state.text
                  : `${c.days.map((d) => thaiDays[d]).join(" และ ")} ${hhmm(c.open)}–${hhmm(c.close)} น.`}
              </li>
            );
          })}
        </ul>
        <a href="#hours" className="clinic-status-link">
          ดูเวลาทำการทั้งหมด
        </a>
      </div>
    </section>
  );
}

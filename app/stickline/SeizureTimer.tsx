"use client";

import { useEffect, useRef, useState } from "react";

// นาฬิกาจับเวลาตอนเห็นคนชักหรือหมดสติ — "จับเวลา" คือสิ่งแรกที่แพทย์แนะนำในแพ็ก EP01
// เกินห้านาที → เตือนให้โทร 1669 (ตาม emergency_th ของแพ็ก) · เปลี่ยนสีครั้งเดียว ไม่กะพริบ
const LIMIT = 5 * 60;

function mmss(sec: number) {
  return `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, "0")}`;
}

export default function SeizureTimer() {
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [elapsed, setElapsed] = useState(0); // วินาทีที่สะสมไว้ตอนหยุด
  const [now, setNow] = useState(0);
  const tick = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (startedAt === null) return;
    tick.current = setInterval(() => setNow(Date.now()), 250);
    return () => {
      if (tick.current) clearInterval(tick.current);
    };
  }, [startedAt]);

  const running = startedAt !== null;
  const sec = elapsed + (running ? Math.max(0, Math.floor((now - startedAt) / 1000)) : 0);
  const over = sec >= LIMIT;
  const progress = Math.min(sec / LIMIT, 1);

  function start() {
    const t = Date.now();
    setNow(t);
    setStartedAt(t);
  }
  function stop() {
    setElapsed(sec);
    setStartedAt(null);
  }
  function reset() {
    setElapsed(0);
    setStartedAt(null);
  }

  return (
    <div className={"sl-timer" + (over ? " over" : "")}>
      <svg viewBox="0 0 120 120" className="sl-timer-ring" aria-hidden="true" focusable="false">
        <circle cx="60" cy="60" r="52" className="sl-timer-track" />
        <circle
          cx="60"
          cy="60"
          r="52"
          className="sl-timer-fill"
          pathLength={100}
          strokeDasharray="100"
          strokeDashoffset={100 - progress * 100}
          transform="rotate(-90 60 60)"
        />
      </svg>
      <div className="sl-timer-body">
        {/* อ่านค่าเวลาเมื่อผู้ใช้ต้องการ — ไม่ประกาศทุกวินาที (รบกวน screen reader) */}
        <p className="sl-timer-time" aria-label={`เวลาที่ผ่านไป ${Math.floor(sec / 60)} นาที ${sec % 60} วินาที`}>
          {mmss(sec)}
        </p>
        <div className="sl-controls">
          {running ? (
            <button type="button" className="btn btn-dark big" onClick={stop}>
              หยุด
            </button>
          ) : (
            <button type="button" className="btn btn-dark big" onClick={start}>
              {sec > 0 ? "จับเวลาต่อ" : "เริ่มจับเวลา"}
            </button>
          )}
          {sec > 0 && !running && (
            <button type="button" className="btn btn-outline big" onClick={reset}>
              เริ่มใหม่
            </button>
          )}
        </div>
      </div>
      <div role="alert" className="sl-timer-alert">
        {over && (
          <p>
            <strong>เกินห้านาทีแล้ว</strong> โทร 1669 ทันที{" "}
            <a href="tel:1669" className="btn btn-call">
              โทร 1669
            </a>
          </p>
        )}
      </div>
    </div>
  );
}

// เวลาทำการของทั้งสองคลินิก — แหล่งเดียวสำหรับแถบ "เปิดอยู่ตอนนี้ / เปิดครั้งถัดไป"
// วัน: 0 = อาทิตย์ … 6 = เสาร์ · เวลาเป็นนาทีนับจากเที่ยงคืน ตามเวลาประเทศไทย (Asia/Bangkok)

export type Clinic = {
  key: "pediatric" | "neuro";
  name: string; // ชื่อสั้นที่ใช้ในแถบสถานะ
  days: number[];
  open: number;
  close: number;
};

export const clinics: Clinic[] = [
  { key: "pediatric", name: "คลินิกเด็ก", days: [1, 6], open: 17 * 60, close: 20 * 60 },
  { key: "neuro", name: "คลินิกประสาท", days: [3, 5], open: 17 * 60, close: 20 * 60 },
];

// ── วันหยุด / วันปิดพิเศษ ─────────────────────────────────────────────
// เพิ่มบรรทัดเมื่อคลินิกปิดในวันที่ปกติเปิด (วันหยุดนักขัตฤกษ์ หมอลา ไปประชุม ฯลฯ)
//   date   : "YYYY-MM-DD" (ปี ค.ศ.)
//   clinic : "pediatric" = คลินิกเด็ก, "neuro" = คลินิกประสาท, ไม่ใส่ = ปิดทั้งสองคลินิก
//   note   : เหตุผลสั้น ๆ ที่จะแสดงให้คนไข้เห็น (ไม่ใส่ก็ได้)
// แถบสถานะจะขึ้นว่า "วันนี้หยุด" ข้ามวันนั้นตอนบอก "เปิดครั้งถัดไป" และแจ้งล่วงหน้า 14 วัน
// วันที่ผ่านไปแล้วไม่มีผล ลบทิ้งได้ตามสะดวก
// ตัวอย่าง:
//   { date: "2026-10-23", note: "วันปิยมหาราช" },
//   { date: "2026-11-11", clinic: "neuro", note: "แพทย์ไปประชุมวิชาการ" },
export type Closure = { date: string; clinic?: Clinic["key"]; note?: string };

export const closures: Closure[] = [];

export const thaiDays = ["อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์"];

export function hhmm(mins: number) {
  return `${String(Math.floor(mins / 60)).padStart(2, "0")}:${String(mins % 60).padStart(2, "0")}`;
}

/** "YYYY-MM-DD" บวก n วัน → วันที่ใหม่และวันในสัปดาห์ (คิดแบบปฏิทิน ไม่ขึ้นกับเขตเวลา) */
export function addDays(ymd: string, n: number) {
  const [y, m, d] = ymd.split("-").map(Number);
  const t = new Date(Date.UTC(y, m - 1, d + n));
  return { ymd: t.toISOString().slice(0, 10), day: t.getUTCDay() };
}

/** "2026-10-23" → "23 ต.ค." */
export function thaiShortDate(ymd: string) {
  return new Date(`${ymd}T00:00:00Z`).toLocaleDateString("th-TH", {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  });
}

export function closureFor(c: Clinic, ymd: string, list: Closure[] = closures) {
  return list.find((x) => x.date === ymd && (!x.clinic || x.clinic === c.key));
}

export type Now = { ymd: string; day: number; mins: number };

export type ClinicState = {
  isOpen: boolean;
  text: string;
};

/** สถานะของคลินิก ณ เวลาที่ให้มา (เวลาไทย) โดยคิดวันปิดพิเศษด้วย */
export function clinicState(c: Clinic, now: Now, list: Closure[] = closures): ClinicState {
  const todayClosure = c.days.includes(now.day) ? closureFor(c, now.ymd, list) : undefined;

  if (c.days.includes(now.day) && !todayClosure) {
    if (now.mins < c.open) {
      return { isOpen: false, text: `เปิดวันนี้ ${hhmm(c.open)}–${hhmm(c.close)} น.` };
    }
    if (now.mins < c.close) {
      return { isOpen: true, text: `เปิดอยู่ตอนนี้ ถึง ${hhmm(c.close)} น.` };
    }
  }

  // หาวันเปิดถัดไป ข้ามวันที่ประกาศปิด (ดูล่วงหน้าได้ไกลสุด ~3 เดือน)
  let skipped = false;
  for (let d = 1; d <= 90; d++) {
    const next = addDays(now.ymd, d);
    if (!c.days.includes(next.day)) continue;
    if (closureFor(c, next.ymd, list)) {
      skipped = true;
      continue;
    }
    let when = d === 1 ? `พรุ่งนี้ (วัน${thaiDays[next.day]})` : `วัน${thaiDays[next.day]}`;
    // ถ้าข้ามวันหยุดไป ระบุวันที่ด้วย กันสับสนว่า "วันพุธ" คือพุธไหน
    if (skipped || d > 7) when += ` ${thaiShortDate(next.ymd)}`;
    const prefix = todayClosure
      ? `วันนี้หยุด${todayClosure.note ? ` (${todayClosure.note})` : ""}`
      : "ปิดอยู่";
    return { isOpen: false, text: `${prefix} · เปิดครั้งถัดไป ${when} ${hhmm(c.open)} น.` };
  }
  return { isOpen: false, text: "ปิดชั่วคราว กรุณาสอบถามทาง LINE หรือโทรศัพท์" };
}

/** วันปิดพิเศษที่ตรงกับวันเปิดปกติ ในอีก 1–14 วันข้างหน้า (ไม่รวมวันนี้ ซึ่งแสดงในสถานะแล้ว) */
export function upcomingClosures(now: Now, list: Closure[] = closures, withinDays = 14) {
  const out: { ymd: string; day: number; clinics: Clinic[]; note?: string }[] = [];
  for (let d = 1; d <= withinDays; d++) {
    const t = addDays(now.ymd, d);
    const hit = clinics.filter((c) => c.days.includes(t.day) && closureFor(c, t.ymd, list));
    if (hit.length) out.push({ ...t, clinics: hit, note: closureFor(hit[0], t.ymd, list)?.note });
  }
  return out;
}

/** วันที่ วันในสัปดาห์ และนาทีปัจจุบันตามเวลาประเทศไทย ไม่ว่าเครื่องผู้ใช้จะตั้งเขตเวลาอะไร */
export function bangkokNow(date: Date): Now {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Bangkok",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  return {
    ymd: `${get("year")}-${get("month")}-${get("day")}`,
    day,
    mins: Number(get("hour")) * 60 + Number(get("minute")),
  };
}

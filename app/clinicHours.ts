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

export const thaiDays = ["อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์"];

export function hhmm(mins: number) {
  return `${String(Math.floor(mins / 60)).padStart(2, "0")}:${String(mins % 60).padStart(2, "0")}`;
}

export type ClinicState = {
  isOpen: boolean;
  text: string;
};

/** สถานะของคลินิก ณ วัน (0–6) และนาทีที่ให้มา (เวลาไทย) */
export function clinicState(c: Clinic, day: number, mins: number): ClinicState {
  if (c.days.includes(day)) {
    if (mins < c.open) {
      return { isOpen: false, text: `เปิดวันนี้ ${hhmm(c.open)}–${hhmm(c.close)} น.` };
    }
    if (mins < c.close) {
      return { isOpen: true, text: `เปิดอยู่ตอนนี้ ถึง ${hhmm(c.close)} น.` };
    }
  }
  for (let d = 1; d <= 7; d++) {
    const next = (day + d) % 7;
    if (c.days.includes(next)) {
      const when = d === 1 ? `พรุ่งนี้ (วัน${thaiDays[next]})` : `วัน${thaiDays[next]}`;
      return { isOpen: false, text: `ปิดอยู่ · เปิดครั้งถัดไป ${when} ${hhmm(c.open)} น.` };
    }
  }
  return { isOpen: false, text: "" };
}

/** วันและนาทีปัจจุบันตามเวลาประเทศไทย ไม่ว่าเครื่องผู้ใช้จะตั้งเขตเวลาอะไร */
export function bangkokNow(date: Date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Bangkok",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  return { day, mins: Number(get("hour")) * 60 + Number(get("minute")) };
}

// ดัชนีค้นหาในเว็บ — สร้างตอน build จากข้อมูลที่มีอยู่แล้ว (ไม่ต้องดูแลแยก)
// เพิ่มหน้าใหม่ที่มีข้อมูลเป็น array → เพิ่ม map ที่นี่
import { symptoms } from "../symptoms/symptomsData";
import { publishedPosts } from "../brain60/posts";
import { lessonsL1, lessonsL2, lessonsX } from "../learn/lessons";
import { vaccineSchedule } from "../vaccine/vaccineData";
import pack from "../stickline/pack.json";

export type SearchItem = {
  title: string;
  text: string;
  href: string;
  group: string;
};

const ep = pack.episodes[0];

export const searchIndex: SearchItem[] = [
  { title: "สหวรรณคลินิก", text: "คลินิกเวชกรรมเด็กและระบบประสาท นนทบุรี เวลาทำการ ที่อยู่ นัดหมาย LINE โทร 065-480-8771", href: "/", group: "คลินิก" },
  { title: "คลินิกเด็ก กุมารแพทย์", text: "ไข้ ไอ ท้องเสีย วัคซีน การเจริญเติบโต พัฒนาการ พญ. วรรณวรา อังศุมาศ จันทร์ เสาร์", href: "/pediatric", group: "คลินิก" },
  { title: "นพ. สหรัฐ อังศุมาศ ประสาทแพทย์", text: "ประวัติ คุณวุฒิ ผลงานวิชาการ MS NMOSD พุธ ศุกร์", href: "/doctors/saharat-aungsumart", group: "คลินิก" },
  { title: "ราคาวัคซีนเด็กตามช่วงอายุ", text: "ตารางวัคซีน วัคซีนหลัก วัคซีนเสริม เส้นทางวัคซีนของลูก", href: "/vaccine", group: "วัคซีน" },
  ...vaccineSchedule.map((g, i) => ({
    title: `วัคซีนอายุ ${g.age}`,
    text: g.items.map((it) => it.name).join(" "),
    href: `/vaccine#age-${i}`,
    group: "วัคซีน",
  })),
  ...symptoms.map((s) => ({ title: s.title, text: `${s.blurb} ${s.redFlag}`, href: `/symptoms/${s.slug}`, group: "อาการ" })),
  { title: "สัญญาณเตือนสโตรก BE FAST", text: "เดินเซ เห็นภาพซ้อน ปากเบี้ยว แขนขาอ่อนแรงครึ่งซีก พูดไม่ชัด โทร 1669 บัตรติดตู้เย็น", href: "/stickline#stroke", group: "ประสาทแพทย์วาดเส้น" },
  { title: ep.title_th, text: `${ep.summary_th} ${ep.sections.map((s) => `${s.heading} ${s.faint} ${s.seizure}`).join(" ")} ${ep.actions.map((a) => a.title).join(" ")}`, href: "/stickline#faint-seizure", group: "ประสาทแพทย์วาดเส้น" },
  { title: "อาการแบบนี้ ไปห้องฉุกเฉิน หรือนัดหมอ", text: ep.red_flags.join(" "), href: "/stickline#er-check", group: "ประสาทแพทย์วาดเส้น" },
  { title: "แบบฝึก คนนี้เป็นลมหรือชัก", text: "ทาย 6 ข้อ พร้อมคำอธิบาย แชร์คะแนน", href: "/stickline/quiz", group: "ประสาทแพทย์วาดเส้น" },
  { title: "MS NMOSD ดูแลตัวเอง รู้สิทธิไม่ให้ขาด", text: "ปลอกประสาทเสื่อมแข็ง สิทธิประกันสังคม ม.33 ม.39 ม.40 ยืมอุปกรณ์ ภาพ 3 มิติ", href: "/ms", group: "MS · NMOSD" },
  ...publishedPosts.map((p) => ({ title: p.title, text: p.body.join(" "), href: `/brain60/${p.slug}`, group: "สมองใน 60 วินาที" })),
  ...[...lessonsL1, ...lessonsL2, ...lessonsX].map((l) => ({
    title: `Body 101: ${l.title}`,
    text: `${l.level} ${l.text} ${l.points.join(" ")}`,
    href: l.th,
    group: "Body 101",
  })),
  { title: "Body 101 สำหรับครู", text: "จัดชั่วโมงเรียน ใบงานพิมพ์ได้ ใช้ในห้องเรียนฟรี", href: "/learn/teachers", group: "Body 101" },
  { title: "Cyber 101 เส้นทางแฮกเกอร์สายขาว", text: "ความมั่นคงปลอดภัยไซเบอร์ 10 บท", href: "/cyber", group: "สื่อการเรียนรู้" },
  { title: "AI Tools สำหรับแพทย์", text: "EEG SOAP MRI", href: "/ai", group: "สำหรับแพทย์" },
];

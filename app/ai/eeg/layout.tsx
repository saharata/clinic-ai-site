import type { Metadata } from "next";

// หน้านี้เป็น client component จึงประกาศ metadata ไว้ที่ layout ของ segment
// canonical ของหน้าตัวเอง (ถ้าไม่มี จะสืบทอดจาก segment แม่ ทำให้ Google เห็นเป็นหน้าซ้ำ)
export const metadata: Metadata = {
  title: "AI EEG ช่วยอ่านคลื่นชักและ IED (SpikeSense)",
  description:
    "เครื่องมือวิจัยที่ใช้ deep learning ช่วยคัดกรองสัญญาณลมชักและคลื่น epileptiform (IED / sharp wave) จากไฟล์ EEG มาตรฐาน — เครื่องมือเพื่อการวิจัย ไม่ใช่เครื่องมือวินิจฉัย",
  alternates: { canonical: "https://www.sahawanclinic.clinic/ai/eeg" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from "next";

// หน้านี้เป็น client component จึงประกาศ metadata ไว้ที่ layout ของ segment
// canonical ของหน้าตัวเอง (ถ้าไม่มี จะสืบทอดจาก segment แม่ ทำให้ Google เห็นเป็นหน้าซ้ำ)
export const metadata: Metadata = {
  title: "SOAP Note ด้วย AI ที่รันในเครื่อง — คู่มือการใช้งาน",
  description:
    "แปลงบทสนทนาระหว่างแพทย์กับผู้ป่วยให้เป็นร่างเวชระเบียนภาษาไทย โดยประมวลผลทั้งหมดในเครื่องของผู้ใช้ ข้อมูลผู้ป่วยไม่ออกสู่อินเทอร์เน็ต",
  alternates: { canonical: "https://www.sahawanclinic.clinic/ai/soap" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from "next";

// หน้านี้เป็น client component จึงประกาศ metadata ไว้ที่ layout ของ segment
// canonical ของหน้าตัวเอง (ถ้าไม่มี จะสืบทอดจาก segment แม่ ทำให้ Google เห็นเป็นหน้าซ้ำ)
export const metadata: Metadata = {
  title: "ติดตามการเปลี่ยนแปลงของสมองข้ามปีในผู้ป่วย MS (MRI)",
  description:
    "วัดปริมาณการฝ่อของสมองและรอยโรคเทียบข้ามปีในผู้ป่วยปลอกประสาทเสื่อมแข็ง (MS) ด้วยเครื่องมือที่ผ่านการตรวจสอบ แพทย์เป็นผู้อ่านผลทุกครั้ง — เคสตัวอย่างที่ปกปิดตัวตน",
  alternates: { canonical: "https://www.sahawanclinic.clinic/ai/mri" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from "next";

const title = "นโยบายความเป็นส่วนตัว — แอป Sahawan Clinic";
const description =
  "นโยบายความเป็นส่วนตัวของแอป Sahawan Clinic — ข้อมูลสุขภาพทั้งหมดเก็บในเครื่องผู้ใช้เท่านั้น " +
  "ไม่มีเซิร์ฟเวอร์ ไม่เก็บข้อมูลส่วนบุคคล ไม่มีการติดตามหรือโฆษณา";

export const metadata: Metadata = {
  title: "นโยบายความเป็นส่วนตัว — Sahawan Clinic",
  description,
  alternates: { canonical: "https://www.sahawanclinic.clinic/privacy" },
  openGraph: {
    type: "website",
    locale: "th_TH",
    url: "https://www.sahawanclinic.clinic/privacy",
    siteName: "สหวรรณคลินิก",
    title,
    description,
  },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-12 text-slate-800">
      <h1 className="text-2xl font-bold text-slate-900">
        นโยบายความเป็นส่วนตัว — แอป Sahawan Clinic
      </h1>
      <p className="mt-1 text-sm text-slate-500">อัปเดตล่าสุด: กรกฎาคม 2026</p>

      <section className="mt-8 space-y-4 leading-relaxed">
        <p>
          แอป Sahawan Clinic เป็นแอปบันทึกสุขภาพส่วนบุคคลของสหวรรณคลินิก
          สำหรับบันทึกค่าความดันโลหิต น้ำตาลปลายนิ้ว น้ำหนัก ส่วนสูง
          และผลตรวจทางห้องปฏิบัติการ
        </p>
        <ol className="list-decimal space-y-3 pl-5">
          <li>
            <strong>ข้อมูลทั้งหมดเก็บอยู่ในเครื่องของคุณเท่านั้น</strong> —
            แอปไม่มีเซิร์ฟเวอร์ ไม่มีระบบสมาชิก
            และไม่ส่งข้อมูลใด ๆ ออกจากอุปกรณ์ของคุณ
          </li>
          <li>
            <strong>เราไม่เก็บรวบรวมข้อมูลส่วนบุคคล</strong> — แอปไม่ขอชื่อ
            เลขบัตรประชาชน เลขผู้ป่วย อีเมล หรือเบอร์โทรศัพท์
          </li>
          <li>
            <strong>ไม่มีการติดตามหรือโฆษณา</strong> — แอปไม่ใช้คุกกี้
            ตัวติดตาม (tracker) หรือชุดพัฒนาโฆษณาของบุคคลที่สาม
          </li>
          <li>
            <strong>การลบข้อมูล</strong> —
            การลบแอปออกจากเครื่องจะลบข้อมูลทั้งหมดอย่างถาวร
          </li>
          <li>
            <strong>คำเตือนทางการแพทย์</strong> —
            แอปนี้ช่วยบันทึกค่าเพื่อประกอบการดูแลเท่านั้น
            ไม่ใช้แทนคำวินิจฉัยหรือคำแนะนำของแพทย์
            หากมีอาการผิดปกติกรุณาพบแพทย์
          </li>
        </ol>
        <p className="text-slate-600">
          ติดต่อ: สหวรรณคลินิก (ช่องทางติดต่อตามหน้าเว็บ sahawanclinic.clinic)
        </p>
      </section>

      <hr className="my-8 border-slate-200" />

      <section className="space-y-3 leading-relaxed">
        <h2 className="text-lg font-semibold text-slate-900">English (summary)</h2>
        <p>
          Sahawan Clinic is a personal health-logging app for patients of
          Sahawan Clinic, Thailand.
        </p>
        <ul className="list-disc space-y-2 pl-5 text-slate-700">
          <li>
            <strong>All data stays on your device.</strong> The app has no
            server, no account system, and transmits nothing off the device.
          </li>
          <li>
            <strong>We collect no personal information</strong> — no name, ID,
            email, or phone number is requested.
          </li>
          <li>
            <strong>No tracking, no ads, no third-party SDKs.</strong>
          </li>
          <li>
            <strong>Deleting the app permanently deletes all data.</strong>
          </li>
          <li>
            <strong>Medical disclaimer:</strong> the app records values for
            self-care support only and is not a substitute for professional
            medical diagnosis or advice.
          </li>
        </ul>
        <p className="text-slate-600">
          Contact: Sahawan Clinic — see sahawanclinic.clinic
        </p>
      </section>
    </main>
  );
}

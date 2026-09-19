import type { Metadata } from "next";

const title = "ข้อกำหนดการใช้งาน — Sahawan Neuro Content (TikTok)";
const description =
  "ข้อกำหนดการใช้งานเครื่องมือเผยแพร่วิดีโอให้ความรู้ผู้ป่วยของสหวรรณคลินิกไปยัง TikTok " +
  "เครื่องมือใช้งานโดยเจ้าของบัญชีเพียงผู้เดียว ไม่เปิดให้บุคคลภายนอกใช้";

export const metadata: Metadata = {
  title: "ข้อกำหนดการใช้งาน — Sahawan Neuro Content",
  description,
  alternates: { canonical: "https://www.sahawanclinic.clinic/tiktok/terms" },
  openGraph: {
    type: "website",
    locale: "th_TH",
    url: "https://www.sahawanclinic.clinic/tiktok/terms",
    siteName: "สหวรรณคลินิก",
    title,
    description,
  },
  robots: { index: true, follow: true },
};

export default function TikTokTermsPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-12 text-slate-800">
      <h1 className="text-2xl font-bold text-slate-900">
        ข้อกำหนดการใช้งาน — Sahawan Neuro Content
      </h1>
      <p className="mt-1 text-sm text-slate-500">อัปเดตล่าสุด: กันยายน 2026</p>

      <section className="mt-8 space-y-4 leading-relaxed">
        <p>
          <strong>Sahawan Neuro Content</strong> เป็นเครื่องมือภายในของสหวรรณคลินิก
          ใช้เผยแพร่วิดีโอให้ความรู้ด้านสุขภาพระบบประสาทไปยังบัญชี TikTok
          ของคลินิกเอง ดูแลโดย นพ. สหรัฐ อังศุมาศ ประสาทแพทย์
        </p>
        <ol className="list-decimal space-y-3 pl-5">
          <li>
            <strong>ผู้ใช้คือเจ้าของบัญชีเท่านั้น</strong> —
            เครื่องมือนี้ไม่เปิดให้บุคคลภายนอกสมัครหรือเข้าใช้งาน
            ไม่มีระบบสมาชิก และไม่ให้บริการแก่บัญชี TikTok ของผู้อื่น
          </li>
          <li>
            <strong>เนื้อหาที่เผยแพร่</strong> —
            เป็นวิดีโอให้ความรู้ผู้ป่วยที่ผลิตโดยคลินิกเอง
            ไม่มีข้อมูลผู้ป่วย ไม่มีภาพหรือเสียงของผู้ป่วย
            และไม่มีการรับประกันผลการรักษา
          </li>
          <li>
            <strong>การกำกับเนื้อหาที่สร้างด้วย AI</strong> —
            วิดีโอที่ใช้เสียงบรรยายหรือภาพประกอบที่สร้างด้วยปัญญาประดิษฐ์
            จะถูกติดป้ายกำกับ AI ตามข้อกำหนดของ TikTok ทุกครั้ง
          </li>
          <li>
            <strong>การปฏิบัติตามกฎของแพลตฟอร์ม</strong> —
            การใช้งานอยู่ภายใต้ TikTok Terms of Service, Community Guidelines
            และ Developer Terms หากขัดกัน ให้ยึดข้อกำหนดของ TikTok เป็นหลัก
          </li>
          <li>
            <strong>ข้อจำกัดความรับผิด</strong> —
            เนื้อหาเป็นข้อมูลเพื่อการศึกษาเท่านั้น
            ไม่ใช้แทนการวินิจฉัยหรือคำแนะนำของแพทย์ผู้ดูแล
            หากมีอาการผิดปกติกรุณาพบแพทย์
          </li>
          <li>
            <strong>การยุติการใช้งาน</strong> —
            เจ้าของบัญชีสามารถเพิกถอนสิทธิ์การเข้าถึงได้ตลอดเวลา
            ผ่านการตั้งค่าความปลอดภัยของบัญชี TikTok
          </li>
        </ol>
        <p className="text-slate-600">
          ติดต่อ: สหวรรณคลินิก — ช่องทางติดต่อตามหน้าเว็บ sahawanclinic.clinic
        </p>
      </section>

      <hr className="my-8 border-slate-200" />

      <section className="space-y-3 leading-relaxed">
        <h2 className="text-lg font-semibold text-slate-900">English</h2>
        <p>
          <strong>Sahawan Neuro Content</strong> is an internal publishing tool
          operated by Sahawan Clinic (Nonthaburi, Thailand) and used solely by
          the clinic&apos;s own account owner, Dr. Saharat Aungsumart,
          neurologist, to publish the clinic&apos;s patient-education videos to
          its own TikTok account.
        </p>
        <ul className="list-disc space-y-2 pl-5 text-slate-700">
          <li>
            <strong>Single-operator tool.</strong> There is no sign-up, no user
            accounts, and no service offered to third-party TikTok accounts.
          </li>
          <li>
            <strong>Content.</strong> Clinic-produced health education only. No
            patient data, no patient images or voices, and no treatment-outcome
            guarantees.
          </li>
          <li>
            <strong>AI labeling.</strong> Videos using AI-generated narration or
            visuals are always submitted with TikTok&apos;s AI-generated content
            label.
          </li>
          <li>
            <strong>Platform rules.</strong> Use is subject to TikTok&apos;s
            Terms of Service, Community Guidelines, and Developer Terms, which
            prevail in case of conflict.
          </li>
          <li>
            <strong>Disclaimer.</strong> Content is educational only and is not
            a substitute for professional medical diagnosis or advice.
          </li>
          <li>
            <strong>Termination.</strong> The account owner may revoke access at
            any time from TikTok account security settings.
          </li>
        </ul>
        <p className="text-slate-600">
          Contact: Sahawan Clinic — see sahawanclinic.clinic
        </p>
      </section>
    </main>
  );
}

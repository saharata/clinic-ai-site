import type { Metadata } from "next";

const title = "นโยบายความเป็นส่วนตัว — Sahawan Neuro Content (TikTok)";
const description =
  "นโยบายความเป็นส่วนตัวของเครื่องมือเผยแพร่วิดีโอไปยัง TikTok ของสหวรรณคลินิก — " +
  "โทเคนเก็บในเครื่องเท่านั้น ไม่มีเซิร์ฟเวอร์ ไม่เก็บข้อมูลผู้ชม ไม่มีข้อมูลผู้ป่วย";

export const metadata: Metadata = {
  title: "นโยบายความเป็นส่วนตัว — Sahawan Neuro Content",
  description,
  alternates: { canonical: "https://www.sahawanclinic.clinic/tiktok/privacy" },
  openGraph: {
    type: "website",
    locale: "th_TH",
    url: "https://www.sahawanclinic.clinic/tiktok/privacy",
    siteName: "สหวรรณคลินิก",
    title,
    description,
  },
  robots: { index: true, follow: true },
};

export default function TikTokPrivacyPage() {
  return (
    <main id="main-content" tabIndex={-1} className="mx-auto max-w-2xl px-6 py-12 text-slate-800">
      <h1 className="text-2xl font-bold text-slate-900">
        นโยบายความเป็นส่วนตัว — Sahawan Neuro Content
      </h1>
      <p className="mt-1 text-sm text-slate-500">อัปเดตล่าสุด: กันยายน 2026</p>

      <section className="mt-8 space-y-4 leading-relaxed">
        <p>
          เอกสารนี้อธิบายการจัดการข้อมูลของเครื่องมือ{" "}
          <strong>Sahawan Neuro Content</strong> ซึ่งใช้เผยแพร่วิดีโอให้ความรู้
          ไปยังบัญชี TikTok ของสหวรรณคลินิกเอง
          (คนละส่วนกับ{" "}
          <a
            className="underline underline-offset-2 hover:text-slate-950 focus-visible:outline-2 focus-visible:outline-offset-2"
            href="/privacy"
          >
            นโยบายของแอปบันทึกสุขภาพ
          </a>
          )
        </p>
        <ol className="list-decimal space-y-3 pl-5">
          <li>
            <strong>ข้อมูลที่เข้าถึง</strong> — เครื่องมือขอสิทธิ์จาก TikTok
            เพียงสามอย่าง คือ ข้อมูลโปรไฟล์พื้นฐานของบัญชีตัวเอง
            (ชื่อที่แสดง รูปโปรไฟล์) สิทธิ์อัปโหลดวิดีโอ และสิทธิ์เผยแพร่วิดีโอ
          </li>
          <li>
            <strong>ไม่มีเซิร์ฟเวอร์</strong> — เครื่องมือทำงานบนคอมพิวเตอร์
            ของคลินิกเท่านั้น โทเคนการเข้าถึงถูกเก็บเป็นไฟล์ในเครื่อง
            ไม่ถูกส่งต่อให้บริการของบุคคลที่สาม และไม่ถูกเก็บบนคลาวด์
          </li>
          <li>
            <strong>ไม่เก็บข้อมูลผู้ชม</strong> — เครื่องมือไม่อ่านและไม่จัดเก็บ
            ข้อมูลส่วนบุคคลของผู้ชม ผู้ติดตาม หรือผู้แสดงความคิดเห็นบน TikTok
          </li>
          <li>
            <strong>ไม่มีข้อมูลผู้ป่วย</strong> — วิดีโอที่เผยแพร่เป็นเนื้อหา
            ให้ความรู้ทั่วไป ไม่มีเวชระเบียน ไม่มีภาพหรือเสียงของผู้ป่วย
            และไม่มีข้อมูลที่ระบุตัวบุคคลได้
          </li>
          <li>
            <strong>ข้อมูลที่ส่งไป TikTok</strong> — มีเพียงไฟล์วิดีโอ
            ข้อความแคปชัน การตั้งค่าความเป็นส่วนตัวของโพสต์
            และป้ายกำกับว่าเนื้อหาสร้างด้วย AI หรือไม่
          </li>
          <li>
            <strong>การเก็บรักษาและการลบ</strong> —
            โทเคนถูกเก็บไว้เท่าที่จำเป็นต่อการเผยแพร่
            และจะใช้ไม่ได้ทันทีเมื่อเจ้าของบัญชีเพิกถอนสิทธิ์ในการตั้งค่า TikTok
            การลบไฟล์โทเคนออกจากเครื่องจะตัดการเข้าถึงทั้งหมดอย่างถาวร
          </li>
          <li>
            <strong>ไม่มีการขายหรือแบ่งปันข้อมูล</strong> —
            ไม่มีการโอนข้อมูลให้ผู้โฆษณา นายหน้าข้อมูล หรือบุคคลที่สามใด ๆ
          </li>
        </ol>
        <p className="text-slate-600">
          ติดต่อเรื่องความเป็นส่วนตัว: สหวรรณคลินิก —
          ช่องทางติดต่อตามหน้าเว็บ sahawanclinic.clinic
        </p>
      </section>

      <hr className="my-8 border-slate-200" />

      <section className="space-y-3 leading-relaxed" lang="en">
        <h2 className="text-lg font-semibold text-slate-900">English</h2>
        <p>
          This policy covers <strong>Sahawan Neuro Content</strong>, the
          local-only tool Sahawan Clinic uses to publish its own
          patient-education videos to its own TikTok account.
        </p>
        <ul className="list-disc space-y-2 pl-5 text-slate-700">
          <li>
            <strong>Scopes requested.</strong> Basic profile info of the
            clinic&apos;s own account, video upload, and video publish — nothing
            else.
          </li>
          <li>
            <strong>No server.</strong> The tool runs on the clinic&apos;s own
            computer. Access tokens are stored in a local file, never sent to
            any third-party service and never stored in the cloud.
          </li>
          <li>
            <strong>No viewer data.</strong> The tool does not read or store
            personal data about viewers, followers, or commenters.
          </li>
          <li>
            <strong>No patient data.</strong> Published videos contain no
            medical records, no patient images or voices, and no identifiable
            personal information.
          </li>
          <li>
            <strong>Data sent to TikTok.</strong> Only the video file, caption
            text, post privacy setting, and the AI-generated content label.
          </li>
          <li>
            <strong>Retention and deletion.</strong> Tokens are kept only as
            long as needed to publish, stop working as soon as the account owner
            revokes access in TikTok settings, and deleting the local token file
            permanently ends all access.
          </li>
          <li>
            <strong>No sale or sharing.</strong> No data is transferred to
            advertisers, data brokers, or any third party.
          </li>
        </ul>
        <p className="text-slate-600">
          Privacy contact: Sahawan Clinic — see sahawanclinic.clinic
        </p>
      </section>
    </main>
  );
}

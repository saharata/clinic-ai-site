import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TikTok authorization callback",
  robots: { index: false, follow: false },
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function first(value: string | string[] | undefined): string {
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
}

export default async function TikTokCallbackPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const code = first(params.code);
  const state = first(params.state);
  const error = first(params.error);
  const errorDescription = first(params.error_description);

  return (
    <main id="main-content" tabIndex={-1} className="mx-auto max-w-2xl px-6 py-12 text-slate-800">
      <h1 className="text-2xl font-bold text-slate-900">
        การเชื่อมต่อบัญชี TikTok
      </h1>

      {error ? (
        <section className="mt-8 space-y-4 leading-relaxed">
          <p className="font-semibold text-red-700">
            การอนุญาตไม่สำเร็จ ({error})
          </p>
          {errorDescription ? (
            <p className="text-slate-700">{errorDescription}</p>
          ) : null}
          <p className="text-slate-700">
            กรุณาเริ่มขั้นตอนเชื่อมต่อใหม่อีกครั้งจากเครื่องของคลินิก
          </p>
        </section>
      ) : code ? (
        <section className="mt-8 space-y-4 leading-relaxed">
          <p className="font-semibold text-emerald-700">
            ได้รับรหัสอนุญาตเรียบร้อยแล้ว
          </p>
          <p>
            คัดลอกรหัสด้านล่างไปวางในเครื่องมือที่รันอยู่บนคอมพิวเตอร์ของคลินิก
            เพื่อแลกเป็นโทเคน รหัสนี้ใช้ได้เพียงครั้งเดียวและหมดอายุเร็ว
          </p>
          <div>
            <h2 className="text-sm font-semibold text-slate-900">
              Authorization code
            </h2>
            <pre className="mt-1 overflow-x-auto rounded-md bg-slate-100 p-3 text-sm break-all whitespace-pre-wrap">
              <code>{code}</code>
            </pre>
          </div>
          {state ? (
            <div>
              <h2 className="text-sm font-semibold text-slate-900">State</h2>
              <pre className="mt-1 overflow-x-auto rounded-md bg-slate-100 p-3 text-sm break-all whitespace-pre-wrap">
                <code>{state}</code>
              </pre>
            </div>
          ) : null}
          <p className="text-slate-600">
            อย่าส่งรหัสนี้ให้ผู้อื่น และอย่าโพสต์ในที่สาธารณะ
          </p>
        </section>
      ) : (
        <section className="mt-8 space-y-4 leading-relaxed">
          <p className="text-slate-700">
            หน้านี้ใช้รับผลการอนุญาตจาก TikTok
            สำหรับเครื่องมือเผยแพร่วิดีโอของสหวรรณคลินิกเท่านั้น
            ไม่มีรหัสอนุญาตในคำขอนี้
          </p>
        </section>
      )}

      <hr className="my-8 border-slate-200" />

      <section className="space-y-2 leading-relaxed text-slate-600">
        <h2 className="text-lg font-semibold text-slate-900">English</h2>
        <p>
          This page only receives the TikTok OAuth result for Sahawan
          Clinic&apos;s own publishing tool. The authorization code is displayed
          for the operator to copy into the tool running on the clinic&apos;s
          computer. Nothing is stored or forwarded by this page.
        </p>
      </section>
    </main>
  );
}

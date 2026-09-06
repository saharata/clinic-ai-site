import type { Metadata } from "next";
import Link from "next/link";

const title = "วิธีการและผลการประเมิน — SpikeSense Task A (ตรวจจับชักจากคลื่นไฟฟ้าสมอง)";
const description =
  "เอกสารวิธีการและผลการประเมินของโมเดลตรวจจับอาการชักจาก EEG ที่ปรับด้วยข้อมูลผู้ป่วยไทย " +
  "รายงานผลแบบ held-out ตามผู้ป่วย พร้อมข้อจำกัดที่ทราบ — เครื่องมือวิจัยระยะเบต้า";

export const metadata: Metadata = {
  title: "วิธีการและผลการประเมิน — SpikeSense Task A",
  description,
  alternates: { canonical: "https://www.sahawanclinic.clinic/ai/eeg/methods" },
  openGraph: {
    type: "article",
    locale: "th_TH",
    url: "https://www.sahawanclinic.clinic/ai/eeg/methods",
    siteName: "สหวรรณคลินิก",
    title,
    description,
  },
  robots: { index: true, follow: true },
};

/* ── ตัวช่วยจัดหน้า ─────────────────────────────────────────── */

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-10 mb-3 border-b border-slate-200 pb-1 text-xl font-semibold text-slate-900">
      {children}
    </h2>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="my-3 leading-relaxed">{children}</p>;
}

function UL({ children }: { children: React.ReactNode }) {
  return <ul className="my-3 list-disc space-y-1.5 pl-6 leading-relaxed">{children}</ul>;
}

function Num({ children }: { children: React.ReactNode }) {
  return <span className="font-mono text-[0.95em] tabular-nums">{children}</span>;
}

/** ตารางผลหลัก ใช้ซ้ำทั้งสองภาษา เลขจึงไม่มีทางหลุดจากกัน */
function ResultsTable({ lang }: { lang: "th" | "en" }) {
  const th = lang === "th";
  const rows = [
    {
      k: th ? "โมเดลเดิม (ที่ให้บริการอยู่ก่อนหน้า)" : "Previous model, as it ran",
      sens: "77.6%",
      fa: "20.1",
      tusz: "0.769",
    },
    {
      k: th ? "โมเดลเดิม + การรวมกลุ่มสัญญาณ" : "Previous model + clustering",
      sens: "76.3%",
      fa: "6.2",
      tusz: "0.769",
    },
    {
      k: th ? "โมเดลใหม่ + การรวมกลุ่มสัญญาณ" : "New model + clustering",
      sens: "85.5%",
      fa: "7.1",
      tusz: "0.730",
      hi: true,
    },
  ];
  return (
    <div className="my-5 overflow-x-auto">
      <table className="w-full min-w-[34rem] border-collapse text-sm">
        <thead>
          <tr className="border-b-2 border-slate-300 text-left">
            <th className="py-2 pr-3 font-semibold"></th>
            <th className="py-2 pr-3 font-semibold">
              {th ? "จับเหตุการณ์ชักได้" : "Event sensitivity"}
            </th>
            <th className="py-2 pr-3 font-semibold">
              {th ? "เตือนผิด / ชม." : "False alarms / h"}
            </th>
            <th className="py-2 font-semibold">{th ? "TUSZ (AUC)" : "TUSZ (AUC)"}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr
              key={r.k}
              className={`border-b border-slate-200 ${r.hi ? "bg-emerald-50 font-medium" : ""}`}
            >
              <td className="py-2 pr-3">{r.k}</td>
              <td className="py-2 pr-3">
                <Num>{r.sens}</Num>
              </td>
              <td className="py-2 pr-3">
                <Num>{r.fa}</Num>
              </td>
              <td className="py-2">
                <Num>{r.tusz}</Num>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-2 text-xs text-slate-500">
        {th
          ? "วัดบนผู้ป่วยไทย 50 ราย ที่โมเดลไม่เคยเห็นระหว่างการฝึก · 79 การบันทึก · เวลานอกช่วงชัก 15.0 ชั่วโมง · เหตุการณ์ชัก 76 ครั้ง"
          : "Measured on 50 Thai patients held out from training · 79 recordings · 15.0 h of non-seizure time · 76 annotated seizures."}
      </p>
    </div>
  );
}

/* ── หน้า ─────────────────────────────────────────────────── */

export default function EegMethodsPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12 text-slate-800">
      <p className="text-sm text-slate-500">
        <Link href="/ai/eeg" className="underline underline-offset-2 hover:text-slate-700">
          ← กลับไปหน้าเครื่องมือ EEG
        </Link>
      </p>

      <h1 className="mt-4 text-2xl font-bold text-slate-900">
        วิธีการและผลการประเมิน — SpikeSense Task A
      </h1>
      <p className="mt-1 text-sm text-slate-600">
        การตรวจจับอาการชักจากคลื่นไฟฟ้าสมอง · ปรับด้วยข้อมูลผู้ป่วยไทย
      </p>

      <div className="mt-5 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm leading-relaxed text-amber-900">
        <strong>เครื่องมือวิจัยระยะเบต้า</strong> — ไม่ใช่เครื่องมือวินิจฉัย
        ผลทุกชิ้นต้องผ่านการอ่านและตัดสินโดยแพทย์ ตัวเลขในหน้านี้เป็นผลการวัดในชุดข้อมูลที่ระบุไว้
        ไม่ใช่การรับประกันผลลัพธ์ในผู้ป่วยรายใด
      </div>

      {/* ───────────────── ภาษาไทย ───────────────── */}

      <H2>สิ่งที่ทำ</H2>
      <P>
        โมเดลตรวจจับอาการชักที่ใช้อยู่เดิมฝึกด้วยชุดข้อมูลต่างประเทศทั้งหมด
        งานนี้นำข้อมูลคลื่นไฟฟ้าสมองของผู้ป่วยไทยมาปรับโมเดลเพิ่ม
        และเปลี่ยนวิธีรายงานผลจากการนับทีละหน้าต่างเวลา มาเป็นการรวมเป็น &ldquo;เหตุการณ์&rdquo;
        การเปลี่ยนสองอย่างนี้ทำให้จับเหตุการณ์ชักได้มากขึ้นและเตือนผิดน้อยลงพร้อมกัน
      </P>

      <H2>ข้อมูล</H2>
      <UL>
        <li>
          การบันทึก EEG <Num>152</Num> ไฟล์ จากผู้ป่วย <Num>98</Num> ราย
          สถาบันประสาทวิทยา ผ่านการรับรองจากคณะกรรมการจริยธรรมการวิจัยแล้ว
        </li>
        <li>
          ถอดข้อมูลระบุตัวตนออกจากส่วนหัวไฟล์ทุกไฟล์ก่อนนำไปใช้ ตรวจยืนยันครบ{" "}
          <Num>152/152</Num> ไฟล์ว่าไม่มีข้อมูลระบุตัวตนหลงเหลือ และสัญญาณคลื่นสมองไม่ถูกแก้ไขแม้แต่บิตเดียว
        </li>
        <li>
          แปลงหมายเหตุของผู้ตรวจเป็นช่วงเวลาที่ชักจริง ใช้เฉพาะช่วงที่มีทั้งจุดเริ่มและจุดจบชัดเจน{" "}
          <Num>80</Num> ช่วง ความยาวกลาง <Num>78</Num> วินาที
        </li>
        <li>
          แบ่งสัญญาณเป็นหน้าต่างละ <Num>4</Num> วินาที ที่ <Num>256</Num> เฮิรตซ์ แบบ bipolar{" "}
          <Num>23</Num> คู่ขั้ว ได้ <Num>16,327</Num> หน้าต่าง
          ตัวอย่างที่ไม่ชักถูกเลือกให้ห่างจากขอบช่วงชักอย่างน้อย <Num>30</Num> วินาที
          เพื่อไม่ให้ช่วงคาบเกี่ยวที่ตีความยากถูกนับเป็นตัวอย่างปกติ
        </li>
      </UL>

      <H2>โมเดลและการฝึก</H2>
      <P>
        โมเดลตั้งต้นคือ ShallowConvNet (<Num>197,000</Num> พารามิเตอร์)
        ที่ฝึกด้วยชุดข้อมูลชัก TUSZ และคลื่นสมองปกติจาก TUAB
      </P>
      <P>
        การฝึกด้วยข้อมูลไทยอย่างเดียวทำให้โมเดลลืมสิ่งที่เคยทำได้กับข้อมูลต่างประเทศ
        จึงใช้วิธีผสมข้อมูลเดิมกลับเข้าไประหว่างฝึก (rehearsal) โดยสุ่มหน้าต่างจาก TUSZ{" "}
        <Num>20,000</Num> หน้าต่าง <strong>เฉพาะจากผู้ป่วยกลุ่มฝึก</strong> ไม่แตะกลุ่มทดสอบ
        เพื่อให้การวัดการถดถอยยังเชื่อถือได้
      </P>
      <P>
        ฝึก <Num>25</Num> รอบ ด้วย AdamW อัตราการเรียนรู้ <Num>1e-4</Num> ลดแบบ cosine
        ขนาดชุดละ <Num>128</Num> และสุ่มตัวอย่างแบบถ่วงน้ำหนักให้สองคลาสสมดุล
      </P>

      <H2>วิธีประเมิน</H2>
      <P>
        จุดสำคัญคือ <strong>แบ่งข้อมูลตามผู้ป่วย ไม่ใช่ตามหน้าต่างเวลา</strong>{" "}
        หน้าต่างจากผู้ป่วยคนเดียวกันคล้ายกันมาก ถ้าปนกันระหว่างกลุ่มฝึกและกลุ่มวัด
        ตัวเลขจะสวยเกินจริงโดยที่โมเดลแค่จำผู้ป่วยได้
      </P>
      <UL>
        <li>
          ทำ 5-fold cross-validation ตามผู้ป่วย เฉพาะผู้ป่วย <Num>50</Num> ราย
          ที่มีทั้งช่วงชักและช่วงไม่ชัก (อีก <Num>48</Num> รายอยู่ในกลุ่มฝึกเสมอ วัดไม่ได้)
        </li>
        <li>
          จากนั้นนำโมเดลของแต่ละ fold ไปวัดกับ{" "}
          <strong>การบันทึกทั้งไฟล์ของผู้ป่วยที่ fold นั้นกันไว้</strong>{" "}
          แบบต่อเนื่องไม่สุ่มทิ้ง เพื่อให้สัดส่วนเวลาที่ชักเป็นไปตามธรรมชาติ
          (<Num>10.9%</Num> ของเวลา เทียบกับ <Num>39.8%</Num> ในชุดฝึก)
        </li>
        <li>
          รายงานเป็น <strong>ระดับเหตุการณ์</strong> ไม่ใช่ระดับหน้าต่าง — นับว่าจับได้
          เมื่อมีหน้าต่างใดหน้าต่างหนึ่งในช่วงชักถูกตั้งธง และนับการเตือนผิดเป็น
          จำนวนครั้งต่อชั่วโมงของเวลานอกช่วงชัก ซึ่งเป็นหน่วยที่ตรงกับภาระการอ่านจริง
        </li>
      </UL>

      <H2>การรวมกลุ่มสัญญาณ</H2>
      <P>
        เดิมทุกหน้าต่างที่ถูกตั้งธงจะถูกรายงานเป็นการตรวจพบหนึ่งครั้ง
        อาการชักหนึ่งครั้งยาว <Num>60</Num> วินาทีจึงกลายเป็นการแจ้งเตือนราว <Num>15</Num> ครั้ง
        และสัญญาณรบกวนที่โดดเดี่ยวก็หน้าตาเหมือนของจริง
      </P>
      <P>
        ตอนนี้หน้าต่างที่ติดกันถูกรวมเป็นเหตุการณ์เดียว ยอมให้ขาดช่วงสั้นได้
        และต้องยาวอย่างน้อย <Num>2</Num> หน้าต่าง (<Num>8</Num> วินาที) จึงจะรายงาน
      </P>

      <H2>ผล</H2>
      <ResultsTable lang="th" />
      <P>
        ด้านข้อมูลไทย พื้นที่ใต้กราฟ ROC จาก cross-validation เพิ่มจาก <Num>0.7700</Num> เป็น{" "}
        <Num>0.8943</Num> และดีขึ้นครบทั้ง <Num>5</Num> จาก <Num>5</Num> fold
      </P>

      <H2>ข้อจำกัดที่ทราบ</H2>
      <UL>
        <li>
          <strong>ความสามารถกับข้อมูลต่างประเทศลดลงจริง</strong> — คะแนนบนชุด TUSZ
          ลดจาก <Num>0.7687</Num> เหลือ <Num>0.7302</Num> ยอมรับไว้เพราะกลุ่มเป้าหมายคือผู้ป่วยไทย
          และบันทึกไว้ตรงนี้แทนที่จะปล่อยให้ไปพบภายหลัง
        </li>
        <li>
          <strong>ชักที่สั้นมากจะไม่ถูกจับ</strong> — เงื่อนไขต้องยาวอย่างน้อย{" "}
          <Num>8</Num> วินาที ทำให้ชักที่สั้นกว่านั้นตรวจไม่พบโดยโครงสร้าง
          คิดเป็น <Num>1.2%</Num> ของช่วงชักในชุดข้อมูลนี้ นี่เป็นการตัดสินใจเชิงคลินิก ไม่ใช่แค่การปรับค่า
        </li>
        <li>
          ช่วงชักในชุดข้อมูลนี้ค่อนข้างยาว (ความยาวกลาง <Num>78</Num> วินาที)
          เหตุการณ์สั้นหรือชักที่ไม่แสดงอาการจึงมีสัดส่วนน้อย ผลอาจไม่แทนภาพในบริบทอื่น
        </li>
        <li>
          ตัวเลขความไวเป็นค่าประมาณจาก cross-validation ส่วนโมเดลที่ให้บริการจริงฝึกด้วยผู้ป่วยครบ{" "}
          <Num>98</Num> ราย ตามหลักควรไม่แย่กว่านี้ แต่ไม่ใช่ตัวเลขที่วัดจากโมเดลตัวนั้นโดยตรง
        </li>
        <li>
          ข้อมูลมาจากสถาบันเดียว ผู้ป่วย <Num>98</Num> ราย
          และการประเมินนี้ไม่ได้รวมกลุ่มผู้ป่วยไทยที่คลื่นสมองปกติทั้งหมด
          จึงยังไม่ได้ยืนยันความจำเพาะในกลุ่มปกติ
        </li>
      </UL>

      <H2>สถานะ</H2>
      <P>
        ให้บริการอยู่ในระบบ SpikeSense ระยะเบต้า แพทย์เป็นผู้อ่านและตัดสินทุกกรณี
        ระบบทำหน้าที่ชี้ช่วงเวลาที่ควรดูก่อนเท่านั้น ไฟล์ที่อัปโหลดถูกลบทันทีหลังประมวลผล ไม่มีการเก็บไว้
      </P>

      {/* ───────────────── English ───────────────── */}

      <hr className="my-12 border-slate-300" />

      <h2 className="text-2xl font-bold text-slate-900">
        Methods and Evaluation — SpikeSense Task A
      </h2>
      <p className="mt-1 text-sm text-slate-600">
        Seizure detection from EEG, adapted to Thai patient data
      </p>

      <div className="mt-5 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm leading-relaxed text-amber-900">
        <strong>Beta research tool — not a diagnostic device.</strong> Every output is read
        and adjudicated by a physician. The figures below are measurements on the datasets
        described here, not a guarantee of performance for any individual patient.
      </div>

      <H2>What was done</H2>
      <P>
        The seizure detector previously in service was trained entirely on non-Thai data.
        This work fine-tuned it on Thai EEG recordings and changed how detections are
        reported — from counting individual time windows to grouping them into events.
        Together the two changes raise event sensitivity and cut false alarms at the same
        time.
      </P>

      <H2>Data</H2>
      <UL>
        <li>
          <Num>152</Num> EEG recordings from <Num>98</Num> patients at the Prasat
          Neurological Institute, under approved research ethics review.
        </li>
        <li>
          Identifying fields were stripped from every file header before use. All{" "}
          <Num>152/152</Num> files were verified to retain no identifiers, with the
          recorded signal unchanged bit for bit.
        </li>
        <li>
          Reader annotations were converted into true seizure intervals. Only the{" "}
          <Num>80</Num> intervals with both an explicit onset and an explicit end were
          used; median duration <Num>78</Num> s.
        </li>
        <li>
          Signals were segmented into <Num>4</Num> s windows at <Num>256</Num> Hz over a{" "}
          <Num>23</Num>-pair bipolar montage, giving <Num>16,327</Num> windows. Negative
          samples were drawn at least <Num>30</Num> s from any seizure boundary, so
          ambiguous peri-ictal signal is not treated as normal.
        </li>
      </UL>

      <H2>Model and training</H2>
      <P>
        The starting point is ShallowConvNet (<Num>197,000</Num> parameters) trained on the
        TUSZ seizure corpus plus normal recordings from TUAB.
      </P>
      <P>
        Fine-tuning on Thai data alone caused the model to forget what it could previously
        do on non-Thai data. Training therefore mixed the original data back in
        (rehearsal): <Num>20,000</Num> TUSZ windows drawn{" "}
        <strong>only from TUSZ training patients</strong>, never from its test patients, so
        that the regression measurement stays trustworthy.
      </P>
      <P>
        Training ran for <Num>25</Num> epochs with AdamW, learning rate <Num>1e-4</Num> on a
        cosine schedule, batch size <Num>128</Num>, and class-balanced sampling.
      </P>

      <H2>Evaluation</H2>
      <P>
        The central methodological point is that data was{" "}
        <strong>split by patient, not by window</strong>. Windows from one patient resemble
        each other closely; mixing them across the training and evaluation sets inflates
        every metric while the model merely recognises the patient.
      </P>
      <UL>
        <li>
          Patient-level 5-fold cross-validation over the <Num>50</Num> patients who have
          both seizure and non-seizure segments. The remaining <Num>48</Num> appear in
          every training split and cannot be scored.
        </li>
        <li>
          Each fold&rsquo;s model was then run over the{" "}
          <strong>complete recordings of the patients that fold held out</strong>,
          continuously and without discarding any segment, so that seizure prevalence stays
          natural: <Num>10.9%</Num> of recorded time, against <Num>39.8%</Num> in the
          training set.
        </li>
        <li>
          Results are reported at the <strong>event level</strong> rather than the window
          level. A seizure counts as detected if any window overlapping it is flagged, and
          false alarms are counted per hour of non-seizure time — the unit that reflects
          actual reading burden.
        </li>
      </UL>

      <H2>Event clustering</H2>
      <P>
        Previously each flagged window was reported as its own detection, so a single{" "}
        <Num>60</Num> s seizure appeared as roughly <Num>15</Num> alerts and an isolated
        noise window looked indistinguishable from a genuine event.
      </P>
      <P>
        Consecutive flagged windows are now merged into one event, short dropouts inside an
        event are bridged, and a run must span at least <Num>2</Num> windows (
        <Num>8</Num> s) to be reported at all.
      </P>

      <H2>Results</H2>
      <ResultsTable lang="en" />
      <P>
        On Thai data, cross-validated ROC AUC rose from <Num>0.7700</Num> to{" "}
        <Num>0.8943</Num>, improving in <Num>5</Num> of <Num>5</Num> folds.
      </P>

      <H2>Known limitations</H2>
      <UL>
        <li>
          <strong>Performance on non-Thai data genuinely regressed.</strong> TUSZ AUC fell
          from <Num>0.7687</Num> to <Num>0.7302</Num>. This was accepted because the target
          population is Thai, and is recorded here rather than left to be discovered later.
        </li>
        <li>
          <strong>Very brief seizures are not detected.</strong> Requiring at least{" "}
          <Num>8</Num> s of sustained activity makes shorter seizures structurally
          undetectable — <Num>1.2%</Num> of seizures in this dataset. This is a clinical
          decision, not merely a tuning parameter.
        </li>
        <li>
          Seizures in this dataset are relatively long (median <Num>78</Num> s), so brief
          and subclinical events are under-represented and these results may not transfer to
          settings where they dominate.
        </li>
        <li>
          The reported sensitivity is a cross-validated estimate; the deployed checkpoint is
          trained on all <Num>98</Num> patients. It should be no worse, but that figure was
          not measured on the deployed model directly.
        </li>
        <li>
          Data comes from a single centre and <Num>98</Num> patients, and this evaluation
          does not include a dedicated cohort of normal Thai EEG, so specificity in normal
          recordings is not established here.
        </li>
      </UL>

      <H2>Status</H2>
      <P>
        In service within SpikeSense as a beta tool. A physician reads and adjudicates every
        case; the system only points to segments worth looking at first. Uploaded files are
        deleted immediately after processing and are never retained.
      </P>

      <p className="mt-12 border-t border-slate-200 pt-5 text-sm text-slate-500">
        นพ. สหรัฐ อังศุมาศ · ประสาทแพทย์ — สหวรรณคลินิก
      </p>
    </main>
  );
}

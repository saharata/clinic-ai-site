"use client";

import { useRef, useState } from "react";

const FULL_APP_URL = "https://eeg-seizure-reader.onrender.com";

type Win = {
  start_sec: number;
  end_sec: number;
  predicted_class: number;
  class_name: string;
  confidence: number;
  probabilities?: Record<string, number>;
  /** passed the threshold on its own, before short runs were dropped */
  above_threshold?: boolean;
};
type TaskResult = {
  task_name: string;
  model_used: string;
  class_names?: string[];
  timeline: Win[];
  summary: Record<string, { count: number; percentage: number }>;
  ictal_summary?: { side: string; confidence: number; n_ictal_windows: number };
};
type AnalyzeResult = {
  filename: string;
  duration_sec: number;
  n_channels: number;
  processing_time_sec: number;
  tasks: Record<string, TaskResult>;
};

const BAR_COLORS = ["#1d4ed8", "#dc2626", "#0f766e", "#f59e0b", "#7c3aed"];

export default function EegDemoPage() {
  const [file, setFile] = useState<File | null>(null);
  const [task, setTask] = useState("C");
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<AnalyzeResult | null>(null);
  const [over, setOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const warmed = useRef(false);

  function warmup() {
    if (warmed.current) return;
    warmed.current = true;
    fetch(`${FULL_APP_URL}/api/health`).catch(() => {});
  }

  // Poll health until the (possibly sleeping) Render server is awake, so the analyze
  // POST never hits a cold-start response without CORS headers ("Failed to fetch").
  async function ensureAwake(maxMs = 150000): Promise<boolean> {
    const deadline = Date.now() + maxMs;
    while (Date.now() < deadline) {
      try {
        const c = new AbortController();
        const t = setTimeout(() => c.abort(), 12000);
        const r = await fetch(`${FULL_APP_URL}/api/health`, { signal: c.signal });
        clearTimeout(t);
        if (r.ok) return true;
      } catch {
        /* server still waking — retry */
      }
      await new Promise((res) => setTimeout(res, 3000));
    }
    return false;
  }

  function pickFile(f: File | null) {
    if (!f) return;
    if (!/\.edf$/i.test(f.name)) {
      setError("รองรับเฉพาะไฟล์ .edf เท่านั้น");
      return;
    }
    setError(null);
    setResult(null);
    setStatus(null);
    setFile(f);
    warmup();
  }

  async function analyze(theFile: File, tasks: string) {
    setBusy(true);
    setError(null);
    setResult(null);
    setStatus(
      "กำลังส่งไฟล์ไปยังโมเดล… เซิร์ฟเวอร์วิจัยอาจกำลังตื่นจาก sleep (ครั้งแรกอาจถึง ~60 วินาที) โปรดรอสักครู่"
    );
    try {
      await ensureAwake();
      const fd = new FormData();
      fd.append("file", theFile);
      const r = await fetch(`${FULL_APP_URL}/api/analyze?tasks=${encodeURIComponent(tasks)}`, {
        method: "POST",
        body: fd,
      });
      const text = await r.text();
      let data: unknown;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("ตอบกลับไม่ใช่ JSON (HTTP " + r.status + ")");
      }
      if (!r.ok) {
        const d = data as { detail?: unknown };
        throw new Error(
          typeof d.detail === "string" ? d.detail : "เกิดข้อผิดพลาด (HTTP " + r.status + ")"
        );
      }
      setResult(data as AnalyzeResult);
      setStatus(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "เกิดข้อผิดพลาด");
      setStatus(null);
    } finally {
      setBusy(false);
    }
  }

  async function loadSample(url: string) {
    warmup();
    setError(null);
    setResult(null);
    setStatus("กำลังโหลดไฟล์ตัวอย่าง…");
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("โหลดไฟล์ตัวอย่างไม่สำเร็จ");
      const blob = await res.blob();
      const f = new File([blob], url.split("/").pop() || "sample.edf", {
        type: "application/octet-stream",
      });
      setFile(f);
      setTask("A,C");
      await analyze(f, "A,C");
    } catch (e) {
      setStatus(null);
      setError(e instanceof Error ? e.message : "โหลดตัวอย่างไม่สำเร็จ");
    }
  }

  return (
    <main>
      <section className="hero small">
        <div className="container">
          <a href="/ai" className="eeg-back">← กลับไปหน้าเครื่องมือ AI</a>
          <p className="eyebrow">AI EEG · SpikeSense</p>
          <h1 className="hero-title">ช่วยอ่าน EEG หาคลื่นชักและ IED</h1>
          <p className="hero-text narrow">
            เครื่องมือวิจัยที่ใช้ deep learning ช่วยคัดกรองสัญญาณลมชัก (seizure) และคลื่น
            epileptiform (IED / sharp wave) จากไฟล์ EEG มาตรฐาน เพื่อช่วยลดเวลาการอ่านคลื่นเบื้องต้นของแพทย์
          </p>
          <div style={{ marginTop: 16 }}>
            <span className="eeg-badge">● โมเดลพร้อมใช้งาน · เครื่องมือเพื่อการวิจัย ไม่ใช่เครื่องมือวินิจฉัย</span>
          </div>
          <p className="hero-text narrow" style={{ marginTop: 12, fontSize: "0.95rem" }}>
            <a href="/ai/eeg/methods" style={{ textDecoration: "underline" }}>
              วิธีการและผลการประเมิน (ไทย / English)
            </a>{" "}
            — ข้อมูลที่ใช้ วิธีวัด ตัวเลขที่ได้ และข้อจำกัดที่ทราบ
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>สามงานวิเคราะห์ในโมเดลเดียว</h2>
            <p>วิเคราะห์ทีละหน้าต่าง พร้อมค่าความมั่นใจ (confidence)</p>
            <p style={{ color: "#b45309", fontSize: ".9em" }}>⚠️ ทั้งสามงานเป็นรุ่นวิจัย (beta) อยู่ระหว่างพัฒนาและตรวจสอบความแม่นยำ — ผลใช้เพื่อการวิจัย/คัดกรองเบื้องต้นเท่านั้น ไม่ใช่การวินิจฉัยทางคลินิก</p>
          </div>
          <div className="eeg-tasks">
            <div className="card eeg-task">
              <span className="tag">Task A</span>
              <span className="tag" style={{ background: "rgba(245,158,11,.16)", color: "#b45309", marginLeft: 6 }}>beta</span>
              <h3>ตรวจจับคลื่นชัก</h3>
              <p>แยกช่วงปกติ (interictal) ออกจากช่วงที่มีสัญญาณ seizure</p>
              <div className="mdl">model · ShallowConvNet (ปรับด้วยข้อมูลผู้ป่วยไทย)</div>
            </div>
            <div className="card eeg-task">
              <span className="tag">Task B</span>
              <span className="tag" style={{ background: "rgba(245,158,11,.16)", color: "#b45309", marginLeft: 6 }}>beta</span>
              <h3>ระบุข้างจุดเริ่ม</h3>
              <p>ประเมินว่าคลื่นชักเริ่มจากซีกซ้าย ซีกขวา หรือทั่วสมอง (generalized)</p>
              <div className="mdl">model · ShallowConvNet</div>
            </div>
            <div className="card eeg-task">
              <span className="tag">Task C</span>
              <span className="tag" style={{ background: "rgba(245,158,11,.16)", color: "#b45309", marginLeft: 6 }}>beta</span>
              <h3>ตรวจจับ IED / sharp wave</h3>
              <p>หาคลื่น epileptiform ระหว่างชัก เบาะแสสำคัญของโรคลมชัก</p>
              <div className="mdl">model · ShallowConvNet</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <div className="section-head">
            <h2>ทดลองใช้งานจริง</h2>
            <p>อัปโหลดไฟล์ EDF หรือลองด้วยตัวอย่าง เชื่อมต่อกับโมเดลจริงบนเซิร์ฟเวอร์วิจัย</p>
          </div>

          <div className="eeg-demo">
            <div className="eeg-phi">
              <span>⚠️</span>
              <div>
                <b>ห้ามอัปโหลดไฟล์ที่มีข้อมูลผู้ป่วยจริง</b> — ไฟล์จะถูกส่งไปประมวลผลบนเซิร์ฟเวอร์วิจัยภายนอก
                กรุณาใช้เฉพาะข้อมูลที่ลบข้อมูลระบุตัวตน (de-identified) หรือไฟล์ตัวอย่างเท่านั้น
              </div>
            </div>

            <div
              className={"eeg-drop" + (over ? " over" : "")}
              onClick={() => inputRef.current?.click()}
              onDragOver={(e) => {
                e.preventDefault();
                setOver(true);
              }}
              onDragLeave={() => setOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setOver(false);
                if (e.dataTransfer.files[0]) pickFile(e.dataTransfer.files[0]);
              }}
            >
              <input
                ref={inputRef}
                type="file"
                accept=".edf"
                style={{ display: "none" }}
                onChange={(e) => pickFile(e.target.files?.[0] || null)}
              />
              <div className="ico">🧠</div>
              <div className="big">
                {file
                  ? `ไฟล์ที่เลือก: ${file.name} · ${(file.size / 1048576).toFixed(1)} MB`
                  : "ลากไฟล์ .edf มาวาง หรือคลิกเพื่อเลือก"}
              </div>
              <div className="small">รองรับไฟล์ EDF มาตรฐาน</div>
            </div>

            <div className="eeg-samples">
              <span>ไม่มีไฟล์? ลองด้วยตัวอย่างจริง:</span>
              <button
                type="button"
                className="eeg-btn-sample"
                disabled={busy}
                onClick={() => loadSample("/eeg-samples/sample_eeg_seizure.edf")}
              >
                ▶ ตัวอย่างคลื่นชัก (40 วินาที)
              </button>
              <span style={{ fontSize: ".82rem" }}>
                EEG ผู้ป่วยจริง ลบข้อมูลระบุตัวตนแล้ว มาจาก{" "}
                <a
                  href="https://physionet.org/content/chbmit/1.0.0/"
                  target="_blank"
                  rel="noreferrer"
                  style={{ textDecoration: "underline" }}
                >
                  CHB-MIT Scalp EEG Database
                </a>{" "}
                (PhysioNet, ODC-BY) ซึ่งโมเดลไม่เคยเห็นระหว่างการฝึก · ช่วงชักยาว 40 วินาที
                อยู่ที่วินาทีที่ 20 ถึง 60 · สำหรับ Task C (IED) อัปโหลดไฟล์ของท่านเองได้
              </span>
            </div>

            <div className="eeg-controls">
              <label>
                งานวิเคราะห์:{" "}
                <select value={task} onChange={(e) => setTask(e.target.value)}>
                  <option value="C">Task C — IED / sharp wave</option>
                  <option value="A">Task A — คลื่นชัก (seizure)</option>
                  <option value="A,C">A + C</option>
                  <option value="A,B,C">ทั้งหมด (A + B + C)</option>
                </select>
              </label>
              <button
                type="button"
                className="btn btn-dark"
                disabled={!file || busy}
                onClick={() => file && analyze(file, task)}
              >
                {busy ? "กำลังวิเคราะห์…" : "วิเคราะห์"}
              </button>
            </div>

            {status && (
              <div className="eeg-status">
                {busy && <span className="eeg-spin" />}
                {status}
              </div>
            )}
            {error && (
              <div className="eeg-status eeg-err">เกิดข้อผิดพลาด: {error}</div>
            )}

            {result && (
              <div className="eeg-results">
                <div className="eeg-rmeta">
                  ไฟล์: {result.filename} · {result.duration_sec} วิ · {result.n_channels} ช่อง ·
                  ประมวลผล {result.processing_time_sec} วิ
                </div>
                {["A", "B", "C"].map((k) => {
                  const t = result.tasks[k];
                  if (!t) return null;
                  const summaryKeys = Object.keys(t.summary || {});
                  const isB = k === "B";
                  // Task A found no seizure = every window is Interictal (class 0)
                  const aTask = result.tasks["A"];
                  const aNegative = !!aTask && aTask.timeline.every((w) => w.predicted_class === 0);
                  const bMuted = isB && aNegative; // Task B is meaningless without a seizure
                  // Task B has NO "normal" class → its per-window predictions are not
                  // "abnormal findings", so never list them as flagged segments.
                  const flags = isB ? [] : t.timeline.filter((w) => w.predicted_class !== 0);
                  // Positive class of a binary task, for reading per-window probabilities
                  const posName =
                    !isB && t.class_names && t.class_names.length === 2 ? t.class_names[1] : null;
                  return (
                    <div className="eeg-tcard" key={k} style={bMuted ? { opacity: 0.55 } : undefined}>
                      <div className="eeg-th">
                        <h4>
                          Task {k} · {t.task_name}
                        </h4>
                        <span className="mdl">{t.model_used}</span>
                      </div>
                      {bMuted ? (
                        <div style={{ margin: "10px 0", color: "#6b7280" }}>
                          Task A ไม่พบ seizure ในไฟล์นี้ — <b>ไม่นำผลระบุข้างมาใช้</b>{" "}
                          (Task B ตีความได้เฉพาะเมื่อ Task A พบ seizure)
                        </div>
                      ) : isB ? (
                        t.ictal_summary ? (
                          <div style={{ margin: "10px 0" }}>
                            <div style={{ fontSize: "1.05rem", fontWeight: 700, color: "#b45309" }}>
                              🔎 ช่วง seizure น่าจะเริ่ม: {t.ictal_summary.side} ·{" "}
                              {Math.round(t.ictal_summary.confidence * 100)}%
                            </div>
                            <div style={{ fontSize: ".82rem", color: "#6b7280", marginTop: 4 }}>
                              จาก {t.ictal_summary.n_ictal_windows} ช่วงที่ Task A พบ seizure · เป็นตัวช่วยคร่าวๆ
                              (Task B เชื่อได้น้อยสุด ตีความโดยแพทย์)
                            </div>
                          </div>
                        ) : (
                          <div style={{ margin: "10px 0", color: "#6b7280" }}>
                            ระบุข้างได้เฉพาะเมื่อเลือกวิเคราะห์ Task A ร่วมด้วย
                          </div>
                        )
                      ) : (
                        <>
                          <div className="eeg-bar">
                            {summaryKeys.map((cls, i) => {
                              const pct = t.summary[cls].percentage || 0;
                              if (pct <= 0) return null;
                              return (
                                <span
                                  key={cls}
                                  style={{ width: pct + "%", background: BAR_COLORS[i % BAR_COLORS.length] }}
                                >
                                  {pct >= 12 ? `${cls} ${pct}%` : `${pct}%`}
                                </span>
                              );
                            })}
                          </div>
                          <div className="eeg-legend">
                            {summaryKeys.map((cls, i) => (
                              <span key={cls} style={{ marginRight: 14 }}>
                                <span style={{ color: BAR_COLORS[i % BAR_COLORS.length] }}>■</span> {cls} —{" "}
                                {t.summary[cls].count} หน้าต่าง
                              </span>
                            ))}
                          </div>
                          {t.timeline.length > 1 && posName && (
                            <div style={{ marginTop: 14 }}>
                              <b>ความน่าจะเป็นของแต่ละหน้าต่าง</b>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "flex-end",
                                  gap: 1,
                                  height: 60,
                                  marginTop: 6,
                                  padding: "4px 3px",
                                  background: "#f8fafc",
                                  border: "1px solid #e2e8f0",
                                  borderRadius: 4,
                                  overflowX: "auto",
                                }}
                              >
                                {t.timeline.map((w, i) => {
                                  const pr = w.probabilities?.[posName] ?? 0;
                                  const reported = w.predicted_class !== 0;
                                  const nearMiss = !reported && w.above_threshold;
                                  return (
                                    <span
                                      key={i}
                                      title={`${w.start_sec}–${w.end_sec} วิ · ${Math.round(pr * 100)}%`}
                                      style={{
                                        flex: "1 0 3px",
                                        minWidth: 3,
                                        height: `${Math.max(2, pr * 100)}%`,
                                        background: reported
                                          ? "#dc2626"
                                          : nearMiss
                                            ? "#f59e0b"
                                            : "#94a3b8",
                                      }}
                                    />
                                  );
                                })}
                              </div>
                              <div style={{ fontSize: ".8rem", color: "#6b7280", marginTop: 5 }}>
                                <span style={{ color: "#dc2626" }}>■</span> รายงานเป็นเหตุการณ์ ·{" "}
                                <span style={{ color: "#f59e0b" }}>■</span> ผ่านเกณฑ์แต่สั้นเกินไป จึงไม่รายงาน ·{" "}
                                <span style={{ color: "#94a3b8" }}>■</span> ต่ำกว่าเกณฑ์
                                <br />
                                แท่งสูง = โมเดลมั่นใจมาก · ช่วงเวลาไล่จากซ้ายไปขวา
                              </div>
                            </div>
                          )}
                          {flags.length > 0 ? (
                            <div style={{ marginTop: 12 }}>
                              <b style={{ color: "#92400e" }}>
                                ช่วงที่โมเดลชี้ว่าผิดปกติ ({flags.length}):
                              </b>
                              <br />
                              {flags.slice(0, 24).map((w, i) => (
                                <span className="eeg-flag" key={i}>
                                  {w.start_sec}–{w.end_sec} วิ · {w.class_name} ·{" "}
                                  {Math.round((w.confidence || 0) * 100)}%
                                </span>
                              ))}
                            </div>
                          ) : (
                            <div className="eeg-clean">
                              {t.timeline.some((w) => w.above_threshold)
                                ? "ไม่มีช่วงใดยาวพอจะรายงานเป็นเหตุการณ์ — มีหน้าต่างที่ผ่านเกณฑ์อยู่บ้าง (แท่งสีส้ม) แต่สั้นเกินไป โปรดดูกราฟประกอบ"
                                : "✓ ไม่พบหน้าต่างที่โมเดลจัดว่าผิดปกติในไฟล์นี้"}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  );
                })}
                <div style={{ marginTop: 14, fontSize: ".85rem", color: "#b45309" }}>
                  ⚠️ ผลนี้เป็นการสาธิตของโมเดลวิจัย ต้องตีความโดยแพทย์เสมอ
                </div>
              </div>
            )}
          </div>

          <div style={{ marginTop: 20, textAlign: "center" }}>
            <a
              href={FULL_APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
            >
              เปิดแอปวิเคราะห์เต็มรูปแบบ ↗
            </a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="eeg-disc">
            <h3>ข้อจำกัดและคำเตือนสำคัญ</h3>
            <ul>
              <li>
                SpikeSense เป็น <b>เครื่องมือเพื่อการวิจัยและการศึกษา</b>{" "}
                ไม่ใช่เครื่องมือแพทย์ที่ได้รับการรับรอง และไม่ใช้เพื่อการวินิจฉัยหรือรักษาผู้ป่วย
              </li>
              <li>ผลลัพธ์ทั้งหมดต้องได้รับการตรวจสอบและตีความโดยแพทย์ผู้เชี่ยวชาญเสมอ</li>
              <li>โมเดลยังอยู่ระหว่างการพัฒนา ประสิทธิภาพอาจแตกต่างตามคุณภาพและลักษณะของสัญญาณ</li>
              <li>โปรดไม่อัปโหลดข้อมูลที่ระบุตัวตนผู้ป่วยได้ ผู้ใช้รับผิดชอบต่อความเป็นส่วนตัวของข้อมูล</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}

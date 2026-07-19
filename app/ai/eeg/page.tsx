"use client";

import { useRef, useState } from "react";

const FULL_APP_URL = "https://eeg-seizure-reader.onrender.com";

type Win = {
  start_sec: number;
  end_sec: number;
  predicted_class: number;
  class_name: string;
  confidence: number;
};
type TaskResult = {
  task_name: string;
  model_used: string;
  timeline: Win[];
  summary: Record<string, { count: number; percentage: number }>;
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
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>สามงานวิเคราะห์ในโมเดลเดียว</h2>
            <p>วิเคราะห์ทีละหน้าต่าง 4 วินาที พร้อมค่าความมั่นใจ (confidence)</p>
          </div>
          <div className="eeg-tasks">
            <div className="card eeg-task">
              <span className="tag">Task A</span>
              <h3>ตรวจจับคลื่นชัก</h3>
              <p>แยกช่วงปกติ (interictal) ออกจากช่วงที่มีสัญญาณ seizure</p>
              <div className="mdl">model · CNN-BiLSTM</div>
            </div>
            <div className="card eeg-task">
              <span className="tag">Task B</span>
              <h3>ระบุตำแหน่งจุดเริ่ม</h3>
              <p>ประเมินโซนที่คลื่นชักน่าจะเริ่ม (5 ภูมิภาค)</p>
              <div className="mdl">model · EEG-Conformer</div>
            </div>
            <div className="card eeg-task">
              <span className="tag">Task C</span>
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
                onClick={() => loadSample("/eeg-samples/sample_eeg_ied.edf")}
              >
                ▶ ตัวอย่างมี IED
              </button>
              <button
                type="button"
                className="eeg-btn-sample"
                disabled={busy}
                onClick={() => loadSample("/eeg-samples/sample_eeg_focal.edf")}
              >
                ▶ ตัวอย่างคลื่นชัก
              </button>
              <span style={{ fontSize: ".82rem" }}>EEG จริง · ลบข้อมูลระบุตัวตนแล้ว</span>
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
                  const flags = t.timeline.filter((w) => w.predicted_class !== 0);
                  const summaryKeys = Object.keys(t.summary || {});
                  return (
                    <div className="eeg-tcard" key={k}>
                      <div className="eeg-th">
                        <h4>
                          Task {k} · {t.task_name}
                        </h4>
                        <span className="mdl">{t.model_used}</span>
                      </div>
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
                        <div className="eeg-clean">✓ ไม่พบหน้าต่างที่โมเดลจัดว่าผิดปกติในไฟล์นี้</div>
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

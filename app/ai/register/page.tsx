"use client";

import { FormEvent, useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { thaiAuthError } from "../authErrors";

const FIELD_LABELS: Record<string, string> = {
  fullName: "ชื่อ-นามสกุล",
  email: "อีเมล",
  password: "รหัสผ่าน",
};

export default function RegisterPage() {
  const supabase = useMemo(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    console.log("SUPABASE URL:", url);
    console.log("SUPABASE ANON KEY EXISTS:", !!anonKey);

    if (!url || !anonKey) return null;
    return createClient(url, anonKey);
  }, []);

  const [fullName, setFullName] = useState("");
  const [hospital, setHospital] = useState("");
  const [specialty, setSpecialty] = useState("Neurology");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [invalid, setInvalid] = useState<string[]>([]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setInvalid([]);

    if (!supabase) {
      setErrorMessage("ระบบลงทะเบียนยังไม่พร้อมใช้งานชั่วคราว กรุณาติดต่อคลินิกผ่าน LINE");
      return;
    }

    const missing = [
      ...(!fullName ? ["fullName"] : []),
      ...(!email ? ["email"] : []),
      ...(!password ? ["password"] : []),
    ];
    if (missing.length) {
      setInvalid(missing);
      setErrorMessage(
        `ยังไม่ได้กรอก ${missing.map((f) => FIELD_LABELS[f]).join(", ")} กรุณากรอกช่องที่มีเครื่องหมาย * ให้ครบแล้วกด "ลงทะเบียน" อีกครั้ง`
      );
      return;
    }

    try {
      setLoading(true);

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            hospital,
            specialty,
          },
          emailRedirectTo:
            typeof window !== "undefined"
              ? `${window.location.origin}/ai/register/success`
              : undefined,
        },
      });

      if (error) {
        setErrorMessage(thaiAuthError(error.message));
        return;
      }

      if (data.user) {
        setSuccessMessage(
          "สมัครสำเร็จแล้ว กรุณาตรวจสอบอีเมลเพื่อยืนยันบัญชี ก่อนเริ่มใช้งานระบบ"
        );
        setFullName("");
        setHospital("");
        setSpecialty("Neurology");
        setEmail("");
        setPassword("");
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("เกิดข้อผิดพลาดระหว่างลงทะเบียน กรุณาตรวจสอบอินเทอร์เน็ตแล้วลองอีกครั้ง");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main id="main-content" tabIndex={-1} className="section">
      <div className="container" style={{ maxWidth: 760 }}>
        <div className="section-head">
          <p className="eyebrow">Register</p>
          <h1>ลงทะเบียนใช้งาน AI Tools</h1>
          <p>
            สำหรับประสาทแพทย์ที่ต้องการใช้งาน Neuro Note, NeuroCoach และ AI EEG
            สามารถลงทะเบียนเพื่อเริ่มต้นทดลองใช้งานได้ทันที
          </p>
        </div>

        <div className="cta-box" style={{ padding: 24 }}>
          <form onSubmit={handleSubmit} style={{ display: "grid", gap: 16 }} noValidate>
            <p style={{ margin: 0, color: "#475569" }}>ช่องที่มีเครื่องหมาย * จำเป็นต้องกรอก</p>
            <div style={{ display: "grid", gap: 8 }}>
              <label htmlFor="fullName">
                ชื่อ-นามสกุล <span aria-hidden="true">*</span>
              </label>
              <input
                id="fullName"
                aria-required="true"
                aria-invalid={invalid.includes("fullName")}
                aria-describedby={
                  [invalid.includes("fullName") ? "form-error" : ""].filter(Boolean).join(" ") || undefined
                }
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="เช่น นพ. สหรัฐ อังศุมาศ"
                className="input"
              />
            </div>

            <div style={{ display: "grid", gap: 8 }}>
              <label htmlFor="hospital">โรงพยาบาล / สถานพยาบาล</label>
              <input
                id="hospital"
                type="text"
                value={hospital}
                onChange={(e) => setHospital(e.target.value)}
                placeholder="เช่น สหวรรณคลินิก"
                className="input"
              />
            </div>

            <div style={{ display: "grid", gap: 8 }}>
              <label htmlFor="specialty">สาขา</label>
              <input
                id="specialty"
                type="text"
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                placeholder="เช่น Neurology"
                className="input"
              />
            </div>

            <div style={{ display: "grid", gap: 8 }}>
              <label htmlFor="email">
                อีเมล <span aria-hidden="true">*</span>
              </label>
              <input
                id="email"
                aria-required="true"
                aria-invalid={invalid.includes("email")}
                aria-describedby={
                  [invalid.includes("email") ? "form-error" : ""].filter(Boolean).join(" ") || undefined
                }
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="input"
                autoComplete="email"
              />
            </div>

            <div style={{ display: "grid", gap: 8 }}>
              <label htmlFor="password">
                รหัสผ่าน <span aria-hidden="true">*</span>
              </label>
              <input
                id="password"
                aria-required="true"
                aria-invalid={invalid.includes("password")}
                aria-describedby={
                  [invalid.includes("password") ? "form-error" : "", "pw-hint"].filter(Boolean).join(" ") || undefined
                }
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="อย่างน้อย 6 ตัวอักษร"
                className="input"
                autoComplete="new-password"
              />
              <p id="pw-hint" style={{ margin: 0, color: "#475569", fontSize: "0.9375rem" }}>
                อย่างน้อย 6 ตัวอักษร
              </p>
            </div>

            {errorMessage ? (
              <div
                id="form-error"
                role="alert"
                style={{
                  background: "#fee2e2",
                  color: "#991b1b",
                  padding: 12,
                  borderRadius: 12,
                  fontSize: "1rem",
                }}
              >
                {errorMessage}
              </div>
            ) : null}

            {successMessage ? (
              <div
                role="status"
                style={{
                  background: "#dcfce7",
                  color: "#166534",
                  padding: 12,
                  borderRadius: 12,
                  fontSize: "1rem",
                }}
              >
                {successMessage}
              </div>
            ) : null}

            <button
              type="submit"
              className="btn btn-line big"
              disabled={loading}
              style={{ justifyContent: "center", opacity: loading ? 0.7 : 1 }}
            >
              {loading ? "กำลังลงทะเบียน..." : "ลงทะเบียน"}
            </button>
          </form>

          <div
            style={{
              marginTop: 20,
              paddingTop: 20,
              borderTop: "1px solid #e5e7eb",
            }}
          >
            <h2 style={{ marginBottom: 8 }}>หรือติดต่อผ่าน LINE</h2>
            <p style={{ marginBottom: 12 }}>
              หากต้องการสอบถามรายละเอียดเพิ่มเติม สามารถติดต่อผ่าน LINE Official
              ได้เช่นกัน
            </p>
            <a
              href="https://lin.ee/7Y8onWN"
              target="_blank"
              rel="noreferrer"
              className="btn btn-line big"
            >
              ติดต่อผ่าน LINE
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
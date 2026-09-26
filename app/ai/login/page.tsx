"use client";

import { FormEvent, useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { thaiAuthError } from "../authErrors";
import { useRouter } from "next/navigation";

const FIELD_LABELS: Record<string, string> = {
  email: "อีเมล",
  password: "รหัสผ่าน",
};

export default function LoginPage() {
  const router = useRouter();

  const supabase = useMemo(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url || !anonKey) return null;
    return createClient(url, anonKey);
  }, []);

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
      setErrorMessage("ระบบเข้าสู่ระบบยังไม่พร้อมใช้งานชั่วคราว กรุณาติดต่อคลินิกผ่าน LINE");
      return;
    }

    const missing = [
      ...(!email ? ["email"] : []),
      ...(!password ? ["password"] : []),
    ];
    if (missing.length) {
      setInvalid(missing);
      setErrorMessage(
        `ยังไม่ได้กรอก${missing.map((f) => FIELD_LABELS[f]).join("และ")} กรุณากรอกให้ครบแล้วกด "เข้าสู่ระบบ" อีกครั้ง`
      );
      return;
    }

    try {
      setLoading(true);

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setErrorMessage(thaiAuthError(error.message));
        return;
      }

      setSuccessMessage("เข้าสู่ระบบสำเร็จ กำลังพาไปหน้าหลัก...");
      setTimeout(() => {
        router.push("/ai");
      }, 800);
    } catch (err) {
      console.error(err);
      setErrorMessage("เกิดข้อผิดพลาดระหว่างเข้าสู่ระบบ กรุณาตรวจสอบอินเทอร์เน็ตแล้วลองอีกครั้ง");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main id="main-content" tabIndex={-1} className="section">
      <div className="container" style={{ maxWidth: 720 }}>
        <div className="section-head">
          <p className="eyebrow">Login</p>
          <h1>เข้าสู่ระบบ AI Tools</h1>
          <p>
            สำหรับผู้ใช้งานที่ลงทะเบียนแล้ว สามารถเข้าสู่ระบบเพื่อใช้งาน Neuro
            Note และเครื่องมืออื่น ๆ ได้ที่นี่
          </p>
        </div>

        <div className="cta-box" style={{ padding: 24 }}>
          <form onSubmit={handleSubmit} style={{ display: "grid", gap: 16 }} noValidate>
            <p style={{ margin: 0, color: "#475569" }}>ช่องที่มีเครื่องหมาย * จำเป็นต้องกรอก</p>
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
                  [invalid.includes("password") ? "form-error" : ""].filter(Boolean).join(" ") || undefined
                }
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="กรอกรหัสผ่าน"
                className="input"
                autoComplete="current-password"
              />
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
              {loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
            </button>
          </form>

          <div
            style={{
              marginTop: 20,
              paddingTop: 20,
              borderTop: "1px solid #e5e7eb",
            }}
          >
            <p style={{ marginBottom: 12 }}>
              ยังไม่มีบัญชี? <a href="/ai/register">ลงทะเบียนใช้งาน</a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
"use client";

import { FormEvent, useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";

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

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!supabase) {
      setErrorMessage("ยังไม่พบการตั้งค่า Supabase environment variables");
      return;
    }

    if (!fullName || !email || !password) {
      setErrorMessage("กรุณากรอกชื่อ อีเมล และรหัสผ่าน");
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
        setErrorMessage(error.message);
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
      setErrorMessage("เกิดข้อผิดพลาดระหว่างลงทะเบียน");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="section">
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
          <form onSubmit={handleSubmit} style={{ display: "grid", gap: 16 }}>
            <div style={{ display: "grid", gap: 8 }}>
              <label htmlFor="fullName">ชื่อ-นามสกุล</label>
              <input
                id="fullName"
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
              <label htmlFor="email">อีเมล</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="input"
                autoComplete="email"
              />
            </div>

            <div style={{ display: "grid", gap: 8 }}>
              <label htmlFor="password">รหัสผ่าน</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="อย่างน้อย 6 ตัวอักษร"
                className="input"
                autoComplete="new-password"
              />
            </div>

            {errorMessage ? (
              <div
                style={{
                  background: "#fee2e2",
                  color: "#991b1b",
                  padding: 12,
                  borderRadius: 12,
                  fontSize: 14,
                }}
              >
                {errorMessage}
              </div>
            ) : null}

            {successMessage ? (
              <div
                style={{
                  background: "#dcfce7",
                  color: "#166534",
                  padding: 12,
                  borderRadius: 12,
                  fontSize: 14,
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
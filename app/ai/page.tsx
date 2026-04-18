"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient, User } from "@supabase/supabase-js";

const registerUrl = "/ai/register";
const loginUrl = "/ai/login";

type Tool = {
  title: string;
  description: string;
  status: "live" | "developing";
  url?: string;
  guideUrl?: string;
};

const tools: Tool[] = [
  {
    title: "Neuro Note",
    description:
      "โปรแกรมช่วยจดบันทึกทางคลินิกสำหรับแพทย์ โดยอาศัยเพียงการพูดคุยระหว่างแพทย์กับผู้ป่วย หรือการพูดออกเสียงสรุปข้อมูลหลังตรวจ ก็สามารถช่วยเรียบเรียงข้อมูลสำคัญและสร้างเป็น OPD card format ที่ดูเป็นระเบียบ สวยงาม และพร้อมนำไปใช้ต่อใน workflow การทำงานได้รวดเร็วขึ้น",
    status: "live",
    url: "https://neuronote.sahawanclinic.clinic",
  },
  {
    title: "NeuroCoach",
    description:
      "เครื่องมือช่วยจัดโครงสร้าง Hx / Exam / DDx พร้อม Coach วิเคราะห์ red flags, missing key items และ suggested questions เพื่อเสริม clinical reasoning ให้แม่นยำขึ้น",
    status: "live",
    url: "https://neurocoach-product.onrender.com/step2",
  },
  {
    title: "AI EEG",
    description:
      "เครื่องมือช่วยอ่าน EEG อัตโนมัติ เพื่อสนับสนุนการทำงานของแพทย์และช่วยลดเวลาในการคัดกรองเคส",
    status: "live",
    url: "https://eeg-seizure-reader.onrender.com",
    guideUrl: "/EEG_Seizure_Guide.docx",
  },
  {
    title: "Neuro Residence (MCQ / MEQ)",
    description:
      "ระบบฝึกทำข้อสอบสำหรับแพทย์ประจำบ้าน ช่วยทบทวนความรู้ ฝึก clinical reasoning และเตรียมตัวสอบบอร์ดอย่างเป็นระบบ",
    status: "live",
    url: "https://neuro-mcq-meq.onrender.com/",
  },
  {
    title: "MS Lesion Tracking",
    description:
      "ช่วยติดตามการเปลี่ยนแปลงของ lesion จาก MRI ในผู้ป่วย multiple sclerosis เพื่อให้การประเมินโรคและการติดตามผลทำได้รวดเร็วและเป็นระบบมากขึ้น",
    status: "developing",
  },
  {
    title: "Stroke Assistant",
    description:
      "เครื่องมือช่วยประเมินผู้ป่วย stroke แบบรวดเร็ว ช่วยเรียบเรียง timeline ของอาการ และสนับสนุนการตัดสินใจในภาวะฉุกเฉิน",
    status: "developing",
  },
  {
    title: "Headache Triage",
    description:
      "ช่วยคัดกรองผู้ป่วยปวดศีรษะ แยก red flag และจัดลำดับความสำคัญของการตรวจเพิ่มเติม",
    status: "developing",
  },
  {
    title: "Dizziness Pathway",
    description:
      "ช่วยจัดระบบการประเมินผู้ป่วยเวียนศีรษะ แยกสาเหตุระหว่าง peripheral และ central และช่วยวางแนวทางการตรวจต่อ",
    status: "developing",
  },
];

export default function AiToolsPage() {
  const supabase = useMemo(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url || !anonKey) return null;
    return createClient(url, anonKey);
  }, []);

  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    if (!supabase) {
      setLoadingUser(false);
      return;
    }

    let mounted = true;

    supabase.auth.getUser().then(({ data }) => {
      if (!mounted) return;
      setUser(data.user ?? null);
      setLoadingUser(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;
      setUser(session?.user ?? null);
      setLoadingUser(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [supabase]);

  const isLoggedIn = !!user;
  const displayName =
    user?.user_metadata?.full_name || user?.email || "ผู้ใช้งาน";

  async function handleLogout() {
    if (!supabase) return;
    await supabase.auth.signOut();
    window.location.href = "/ai";
  }

  return (
    <main>
      <section className="hero small">
        <div className="container">
          <p className="eyebrow">AI Tools for Neurologists</p>

          <h1 className="hero-title">
            {loadingUser
              ? "Neurology AI Ecosystem"
              : isLoggedIn
              ? `ยินดีต้อนรับ ${displayName}`
              : "Neurology AI Ecosystem"}
          </h1>

          <p className="hero-text narrow">
            {loadingUser
              ? "ระบบเครื่องมือ AI สำหรับประสาทแพทย์ ครอบคลุมตั้งแต่งานเขียนบันทึก การช่วยคิดวินิจฉัย การอ่านผลเฉพาะทาง และการเรียนรู้สำหรับแพทย์ประจำบ้าน"
              : isLoggedIn
              ? "คุณเข้าสู่ระบบแล้ว สามารถเลือกใช้งานเครื่องมือที่พร้อมใช้งานได้ทันที"
              : "ระบบเครื่องมือ AI สำหรับประสาทแพทย์ ครอบคลุมตั้งแต่งานเขียนบันทึก การช่วยคิดวินิจฉัย การอ่านผลเฉพาะทาง และการเรียนรู้สำหรับแพทย์ประจำบ้าน"}
          </p>

          <div
            className="hero-actions"
            style={{ display: "flex", gap: 12, flexWrap: "wrap" }}
          >
            {!loadingUser && !isLoggedIn && (
              <>
                <a href={registerUrl} className="btn btn-dark big">
                  ลงทะเบียนใช้งาน
                </a>
                <a
                  href={loginUrl}
                  className="btn big"
                  style={{
                    background: "#ffffff",
                    color: "#0f172a",
                    border: "1px solid #d1d5db",
                  }}
                >
                  เข้าสู่ระบบ
                </a>
              </>
            )}

            {!loadingUser && isLoggedIn && (
              <>
                <a
                  href="https://neuronote.sahawanclinic.clinic"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-dark big"
                >
                  เข้า Neuro Note
                </a>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="btn big"
                  style={{
                    background: "#ffffff",
                    color: "#0f172a",
                    border: "1px solid #d1d5db",
                    cursor: "pointer",
                  }}
                >
                  ออกจากระบบ
                </button>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {!loadingUser && !isLoggedIn && (
            <div
              className="cta-box"
              style={{
                marginBottom: 24,
                border: "1px solid #fde68a",
                background: "#fffbeb",
              }}
            >
              <div>
                <h2 style={{ color: "#92400e" }}>กรุณาเข้าสู่ระบบก่อนใช้งาน</h2>
                <p style={{ color: "#78350f" }}>
                  เครื่องมือที่พร้อมใช้งานจะเปิดให้เข้าใช้หลังจากลงทะเบียนหรือเข้าสู่ระบบเรียบร้อยแล้ว
                </p>
              </div>
            </div>
          )}

          <div className="cards two">
            {tools.map((tool) => (
              <ToolCard
                key={tool.title}
                tool={tool}
                isLoggedIn={isLoggedIn}
                loadingUser={loadingUser}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function ToolCard({
  tool,
  isLoggedIn,
  loadingUser,
}: {
  tool: Tool;
  isLoggedIn: boolean;
  loadingUser: boolean;
}) {
  const badgeText = tool.status === "live" ? "Live" : "อยู่ในขั้นการพัฒนา";
  const badgeColor = tool.status === "live" ? "#15803d" : "#2563eb";

  if (loadingUser) {
    return (
      <div className="card">
        <h3>{tool.title}</h3>
        <p
          style={{
            marginTop: 8,
            fontSize: "0.9rem",
            color: badgeColor,
            fontWeight: 600,
          }}
        >
          {tool.status === "live" ? `● ${badgeText}` : badgeText}
        </p>
        <p style={{ marginTop: 12 }}>{tool.description}</p>
      </div>
    );
  }

  if (tool.status !== "live" || !tool.url) {
    return (
      <div className="card">
        <h3>{tool.title}</h3>
        <p
          style={{
            marginTop: 8,
            fontSize: "0.9rem",
            color: badgeColor,
            fontWeight: 600,
          }}
        >
          {badgeText}
        </p>
        <p style={{ marginTop: 12 }}>{tool.description}</p>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="card">
        <h3>{tool.title}</h3>
        <p
          style={{
            marginTop: 8,
            fontSize: "0.9rem",
            color: badgeColor,
            fontWeight: 600,
          }}
        >
          ● {badgeText}
        </p>
        <p style={{ marginTop: 12 }}>{tool.description}</p>

        <div
          style={{
            marginTop: 16,
            padding: 12,
            borderRadius: 12,
            background: "#fef2f2",
            color: "#991b1b",
            fontSize: "0.95rem",
            fontWeight: 600,
          }}
        >
          กรุณาเข้าสู่ระบบก่อนใช้งาน
        </div>

        <div
          style={{
            marginTop: 16,
            display: "flex",
            gap: 10,
            flexWrap: "wrap",
          }}
        >
          <a href={loginUrl} className="btn btn-dark">
            ไปหน้า Login
          </a>

          {tool.guideUrl && (
            <a
              href={tool.guideUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
              style={{
                background: "#ffffff",
                color: "#0f172a",
                border: "1px solid #d1d5db",
              }}
            >
              📄 คู่มือ
            </a>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <h3>{tool.title}</h3>
      <p
        style={{
          marginTop: 8,
          fontSize: "0.9rem",
          color: badgeColor,
          fontWeight: 600,
        }}
      >
        ● {badgeText}
      </p>
      <p style={{ marginTop: 12 }}>{tool.description}</p>

      <div
        style={{
          marginTop: 16,
          display: "flex",
          gap: 10,
          flexWrap: "wrap",
        }}
      >
        <a
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-dark"
        >
          เข้าใช้งานได้
        </a>

        {tool.guideUrl && (
          <a
            href={tool.guideUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
            style={{
              background: "#ffffff",
              color: "#0f172a",
              border: "1px solid #d1d5db",
            }}
          >
            📄 คู่มือ
          </a>
        )}
      </div>
    </div>
  );
}
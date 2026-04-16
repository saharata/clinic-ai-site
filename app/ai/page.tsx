"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient, User } from "@supabase/supabase-js";

const registerUrl = "/ai/register";
const loginUrl = "/ai/login";

const tools = [
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
      "เครื่องมือช่วยคิดวินิจฉัยโรคยาก ช่วยจัดระบบการคิดแยกโรค การประเมินสาเหตุ และแนวทางพิจารณาต่อ",
    status: "developing",
  },
  {
    title: "AI EEG",
    description:
      "เครื่องมือช่วยอ่าน EEG อัตโนมัติ เพื่อสนับสนุนการทำงานของแพทย์และช่วยลดเวลาในการคัดกรองเคส",
    status: "developing",
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
] as const;

type Tool = (typeof tools)[number];

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
              ? "ระบบเครื่องมือ AI สำหรับประสาทแพทย์ ครอบคลุมตั้งแต่งานเขียนบันทึก การช่วยคิดวินิจฉัย การอ่านผลเฉพาะทาง และการเรียนรู้สำหรับแพทย์ประจำบ้าน โดยออกแบบมาเพื่อลดภาระงานซ้ำซ้อน เพิ่มความเร็วในการทำงาน และทำให้การดูแลผู้ป่วยมีระบบมากขึ้น"
              : isLoggedIn
              ? "คุณเข้าสู่ระบบแล้ว สามารถเลือกใช้งานเครื่องมือที่พร้อมใช้งานได้ทันที และติดตามเครื่องมืออื่น ๆ ที่กำลังอยู่ระหว่างพัฒนา"
              : "ระบบเครื่องมือ AI สำหรับประสาทแพทย์ ครอบคลุมตั้งแต่งานเขียนบันทึก การช่วยคิดวินิจฉัย การอ่านผลเฉพาะทาง และการเรียนรู้สำหรับแพทย์ประจำบ้าน โดยออกแบบมาเพื่อลดภาระงานซ้ำซ้อน เพิ่มความเร็วในการทำงาน และทำให้การดูแลผู้ป่วยมีระบบมากขึ้น"}
          </p>

          <div
            className="hero-actions"
            style={{ display: "flex", gap: 12, flexWrap: "wrap" }}
          >
            {!loadingUser && !isLoggedIn ? (
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
            ) : null}

            {!loadingUser && isLoggedIn ? (
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
            ) : null}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {!loadingUser && !isLoggedIn ? (
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
              <div
                className="cta-actions"
                style={{ display: "flex", gap: 12, flexWrap: "wrap" }}
              >
                <a href={registerUrl} className="btn btn-dark big">
                  Register
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
                  Login
                </a>
              </div>
            </div>
          ) : null}

          <div className="cards two">
            {tools.map((tool, i) => (
              <ToolCard
                key={i}
                tool={tool}
                isLoggedIn={isLoggedIn}
                loadingUser={loadingUser}
              />
            ))}
          </div>

          <div className="cta-box top-gap">
            <div>
              <h2>{isLoggedIn ? "พร้อมเริ่มใช้งาน" : "เริ่มต้นใช้งาน"}</h2>
              <p>
                {isLoggedIn
                  ? "ขณะนี้คุณเข้าสู่ระบบแล้ว สามารถเริ่มใช้งานเครื่องมือที่พร้อมใช้งานได้ทันที และติดตามการอัปเดตเครื่องมืออื่น ๆ ต่อไป"
                  : "ขณะนี้ระบบอยู่ในช่วงพัฒนา หากสนใจใช้งานสามารถลงทะเบียนเพื่อรับสิทธิ์ทดลองใช้ และติดตามการเปิดใช้งานของแต่ละเครื่องมือได้"}
              </p>
            </div>

            <div
              className="cta-actions"
              style={{ display: "flex", gap: 12, flexWrap: "wrap" }}
            >
              {!loadingUser && !isLoggedIn ? (
                <>
                  <a href={registerUrl} className="btn btn-dark big">
                    Register
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
                    Login
                  </a>
                </>
              ) : null}

              {!loadingUser && isLoggedIn ? (
                <>
                  <a
                    href="https://neuronote.sahawanclinic.clinic"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-dark big"
                  >
                    เปิด Neuro Note
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
                    Logout
                  </button>
                </>
              ) : null}
            </div>
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

  if (tool.status === "live" && tool.url) {
    if (loadingUser) {
      return (
        <div className="card">
          <h3>{tool.title}</h3>
          <p
            style={{
              marginTop: "8px",
              fontSize: "0.9rem",
              color: badgeColor,
              fontWeight: 600,
            }}
          >
            ● {badgeText}
          </p>
          <p style={{ marginTop: "12px" }}>{tool.description}</p>
        </div>
      );
    }

    if (!isLoggedIn) {
      return (
        <div className="card">
          <h3>{tool.title}</h3>
          <p
            style={{
              marginTop: "8px",
              fontSize: "0.9rem",
              color: badgeColor,
              fontWeight: 600,
            }}
          >
            ● {badgeText}
          </p>
          <p style={{ marginTop: "12px" }}>{tool.description}</p>

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

          <div style={{ marginTop: 16 }}>
            <a href={loginUrl} className="btn btn-dark">
              ไปหน้า Login
            </a>
          </div>
        </div>
      );
    }

    return (
      <a
        href={tool.url}
        target="_blank"
        rel="noopener noreferrer"
        className="card"
        style={{
          display: "block",
          textDecoration: "none",
          color: "inherit",
        }}
      >
        <h3>{tool.title}</h3>
        <p
          style={{
            marginTop: "8px",
            fontSize: "0.9rem",
            color: badgeColor,
            fontWeight: 600,
          }}
        >
          ● {badgeText}
        </p>
        <p style={{ marginTop: "12px" }}>{tool.description}</p>

        <div
          style={{
            marginTop: 16,
            display: "inline-block",
            padding: "10px 14px",
            borderRadius: 999,
            background: "#dcfce7",
            color: "#166534",
            fontWeight: 700,
            fontSize: "0.95rem",
          }}
        >
          เข้าใช้งานได้
        </div>
      </a>
    );
  }

  return (
    <div className="card">
      <h3>{tool.title}</h3>
      <p
        style={{
          marginTop: "8px",
          fontSize: "0.9rem",
          color: badgeColor,
          fontWeight: 600,
        }}
      >
        {tool.status === "live" ? "● " : ""}
        {badgeText}
      </p>
      <p style={{ marginTop: "12px" }}>{tool.description}</p>
    </div>
  );
}
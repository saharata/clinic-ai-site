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
    status: "developing",
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
  return (
    <main>
      <section className="hero small">
        <div className="container">
          <p className="eyebrow">AI Tools for Neurologists</p>
          <h1 className="hero-title">Neurology AI Ecosystem</h1>
          <p className="hero-text narrow">
            ระบบเครื่องมือ AI สำหรับประสาทแพทย์ ครอบคลุมตั้งแต่งานเขียนบันทึก
            การช่วยคิดวินิจฉัย การอ่านผลเฉพาะทาง และการเรียนรู้สำหรับแพทย์ประจำบ้าน
            โดยออกแบบมาเพื่อลดภาระงานซ้ำซ้อน เพิ่มความเร็วในการทำงาน
            และทำให้การดูแลผู้ป่วยมีระบบมากขึ้น
          </p>

          <div
            className="hero-actions"
            style={{ display: "flex", gap: 12, flexWrap: "wrap" }}
          >
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
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="cards two">
            {tools.map((tool, i) => {
              const badgeText =
                tool.status === "live" ? "Live" : "อยู่ในขั้นการพัฒนา";
              const badgeColor =
                tool.status === "live" ? "#15803d" : "#2563eb";

              const cardContent = (
                <>
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
                </>
              );

              if (tool.status === "live" && tool.url) {
                return (
                  <a
                    key={i}
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
                    {cardContent}
                  </a>
                );
              }

              return (
                <div key={i} className="card">
                  {cardContent}
                </div>
              );
            })}
          </div>

          <div className="cta-box top-gap">
            <div>
              <h2>เริ่มต้นใช้งาน</h2>
              <p>
                ขณะนี้ระบบอยู่ในช่วงพัฒนา หากสนใจใช้งานสามารถลงทะเบียนเพื่อรับสิทธิ์ทดลองใช้
                และติดตามการเปิดใช้งานของแต่ละเครื่องมือได้
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
        </div>
      </section>
    </main>
  );
}
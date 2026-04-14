const registerUrl = "/ai/register";

const tools = [
  {
    title: "Neuro Note",
    description:
      "ช่วยจัดทำ clinic note และสรุปข้อมูลจากการคุยกับผู้ป่วย เพื่อให้สามารถคัดลอกและวางต่อใน workflow การทำงานได้รวดเร็วขึ้น",
  },
  {
    title: "NeuroCoach",
    description:
      "เครื่องมือช่วยคิดวินิจฉัยโรคยาก ช่วยจัดระบบการคิดแยกโรค การประเมินสาเหตุ และแนวทางพิจารณาต่อ",
  },
  {
    title: "AI EEG",
    description:
      "เครื่องมือช่วยอ่าน EEG อัตโนมัติ เพื่อสนับสนุนการทำงานของแพทย์และช่วยลดเวลาในการคัดกรองเคส",
  },
  {
    title: "Neuro Residence (MCQ / MEQ)",
    description:
      "ระบบฝึกทำข้อสอบสำหรับแพทย์ประจำบ้าน ช่วยทบทวนความรู้ ฝึก clinical reasoning และเตรียมตัวสอบบอร์ดอย่างเป็นระบบ",
  },
  {
    title: "MS Lesion Tracking",
    description:
      "ช่วยติดตามการเปลี่ยนแปลงของ lesion จาก MRI ในผู้ป่วย multiple sclerosis เพื่อให้การประเมินโรคและการติดตามผลทำได้รวดเร็วและเป็นระบบมากขึ้น",
  },
  {
    title: "Stroke Assistant",
    description:
      "เครื่องมือช่วยประเมินผู้ป่วย stroke แบบรวดเร็ว ช่วยเรียบเรียง timeline ของอาการ และสนับสนุนการตัดสินใจในภาวะฉุกเฉิน",
  },
  {
    title: "Headache Triage",
    description:
      "ช่วยคัดกรองผู้ป่วยปวดศีรษะ แยก red flag และจัดลำดับความสำคัญของการตรวจเพิ่มเติม",
  },
  {
    title: "Dizziness Pathway",
    description:
      "ช่วยจัดระบบการประเมินผู้ป่วยเวียนศีรษะ แยกสาเหตุระหว่าง peripheral และ central และช่วยวางแนวทางการตรวจต่อ",
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
          </p>
          <div className="hero-actions">
            <a href={registerUrl} className="btn btn-dark big">
              ลงทะเบียนใช้งาน
            </a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="cards two">
            {tools.map((tool, i) => (
              <div key={i} className="card">
                <h3>{tool.title}</h3>

                {/* badge */}
                <p style={{ marginTop: "8px", fontSize: "0.9rem", color: "#2563eb", fontWeight: 600 }}>
                  อยู่ในขั้นการพัฒนา
                </p>

                <p style={{ marginTop: "12px" }}>{tool.description}</p>
              </div>
            ))}
          </div>

          <div className="cta-box top-gap">
            <div>
              <h2>เริ่มต้นใช้งาน</h2>
              <p>
                ขณะนี้ระบบอยู่ในช่วงพัฒนา หากสนใจใช้งานสามารถลงทะเบียนเพื่อรับสิทธิ์ทดลองใช้
                และติดตามการเปิดใช้งานของแต่ละเครื่องมือได้
              </p>
            </div>
            <div className="cta-actions">
              <a href={registerUrl} className="btn btn-dark big">
                Register
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

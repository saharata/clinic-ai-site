const registerUrl = "/ai/register";

export default function AiToolsPage() {
  return (
    <main>
      <section className="hero small">
        <div className="container">
          <p className="eyebrow">AI Tools for Neurologists</p>
          <h1 className="hero-title">เครื่องมือ AI สำหรับประสาทแพทย์</h1>
          <p className="hero-text narrow">
            สำหรับประสาทแพทย์ เรามีเครื่องมือที่สามารถลงทะเบียนและใช้งานได้เพื่อช่วยประหยัดเวลา
            ทั้งในงานตรวจผู้ป่วย งานเขียนบันทึก และการช่วยอ่านผลเฉพาะทาง
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
            <div className="card">
              <h3>Neuro Note</h3>
              <p>
                ช่วยจัดทำ clinic note และสรุปข้อมูลจากการคุยกับผู้ป่วย
                เพื่อให้สามารถคัดลอกและวางต่อใน workflow การทำงานได้รวดเร็วขึ้น
              </p>
            </div>

            <div className="card">
              <h3>NeuroCoach</h3>
              <p>
                เครื่องมือช่วยคิดวินิจฉัยโรคยาก ช่วยจัดระบบการคิดแยกโรค
                การประเมินสาเหตุ และแนวทางพิจารณาต่อ
              </p>
            </div>

            <div className="card">
              <h3>AI EEG</h3>
              <p>
                เครื่องมือช่วยอ่าน EEG อัตโนมัติ เพื่อสนับสนุนการทำงานของแพทย์และช่วยลดเวลาในการคัดกรองเคส
              </p>
            </div>

            <div className="card">
              <h3>ออกแบบเพื่อประหยัดเวลา</h3>
              <p>
                ทุกเครื่องมือออกแบบมาเพื่อช่วยลดภาระงานซ้ำซ้อน เพิ่มความเร็วในการทำงาน
                และทำให้การดูแลผู้ป่วยมีระบบมากขึ้น
              </p>
            </div>
          </div>

          <div className="cta-box top-gap">
            <div>
              <h2>เริ่มต้นใช้งาน</h2>
              <p>
                หากต้องการใช้งานเครื่องมือ AI สำหรับประสาทแพทย์ สามารถลงทะเบียนเพื่อเริ่มใช้งานได้จากลิงก์ด้านล่าง
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
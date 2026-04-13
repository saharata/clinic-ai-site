export default function RegisterPage() {
  return (
    <main className="section">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">Register</p>
          <h1>ลงทะเบียนใช้งาน AI Tools</h1>
          <p>
            สำหรับประสาทแพทย์ที่ต้องการใช้งาน Neuro Note, NeuroCoach และ AI EEG
            กรุณาติดต่อเพื่อลงทะเบียนเริ่มต้นใช้งาน
          </p>
        </div>

        <div className="cta-box">
          <div>
            <h2>เริ่มต้นผ่าน LINE</h2>
            <p>
              สามารถติดต่อผ่าน LINE Official เพื่อขอสิทธิ์ทดลองใช้งานหรือสอบถามรายละเอียดเพิ่มเติม
            </p>
          </div>
          <div className="cta-actions">
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
export default function RegisterSuccessPage() {
  return (
    <main className="section">
      <div className="container" style={{ maxWidth: 720 }}>
        <div className="cta-box" style={{ padding: 32, textAlign: "center" }}>
          <p className="eyebrow">Registration</p>

          <h1 style={{ marginBottom: 16 }}>
            ลงทะเบียนเรียบร้อยแล้ว 🎉
          </h1>

          <p style={{ marginBottom: 16 }}>
            กรุณาตรวจสอบอีเมลของคุณ แล้วกดลิงก์ยืนยันบัญชี
          </p>

          <p style={{ marginBottom: 24, color: "#6b7280" }}>
            หากไม่พบอีเมล กรุณาตรวจสอบใน Spam หรือ Junk Mail
          </p>

          <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
            <a href="/ai" className="btn btn-line big">
              กลับไปหน้า AI Tools
            </a>

            <a href="/ai/register" className="btn btn-outline">
              สมัครใหม่
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
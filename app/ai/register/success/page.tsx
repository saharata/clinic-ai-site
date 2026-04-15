export default function RegisterSuccessPage() {
  return (
    <main className="section">
      <div className="container" style={{ maxWidth: 720 }}>
        <div className="cta-box" style={{ padding: 32, textAlign: "center" }}>
          <p className="eyebrow">Registration</p>

          <h1 style={{ marginBottom: 16 }}>ลงทะเบียนเรียบร้อยแล้ว 🎉</h1>

          <p style={{ marginBottom: 16 }}>
            กรุณาตรวจสอบอีเมลของคุณ แล้วกดลิงก์ยืนยันบัญชี
          </p>

          <p style={{ marginBottom: 24, color: "#6b7280" }}>
            หากไม่พบอีเมล กรุณาตรวจสอบใน Spam หรือ Junk Mail
          </p>

          <div
            style={{
              display: "flex",
              gap: 12,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <a href="/ai" className="btn btn-line big">
              กลับไปหน้า AI Tools
            </a>

            <a
              href="/ai/login"
              className="btn big"
              style={{
                background: "#ffffff",
                color: "#0f172a",
                border: "1px solid #d1d5db",
              }}
            >
              ไปหน้า Login
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
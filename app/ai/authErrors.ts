// a11y (error identification/suggestion, WCAG 3.3.1/3.3.3):
// ข้อความ error จาก Supabase เป็นภาษาอังกฤษและไม่บอกวิธีแก้ → แปลเป็นไทยพร้อมบอกว่าต้องทำอะไรต่อ
export function thaiAuthError(message: string): string {
  const m = message.toLowerCase();
  if (m.includes("invalid login credentials")) {
    return "อีเมลหรือรหัสผ่านไม่ถูกต้อง กรุณาตรวจสอบตัวสะกดและปุ่ม Caps Lock แล้วลองอีกครั้ง";
  }
  if (m.includes("email not confirmed")) {
    return "บัญชีนี้ยังไม่ได้ยืนยันอีเมล กรุณาเปิดอีเมลที่ระบบส่งไป (ดูในโฟลเดอร์ Spam ด้วย) แล้วกดลิงก์ยืนยันก่อนเข้าสู่ระบบ";
  }
  if (m.includes("already registered") || m.includes("already been registered")) {
    return "อีเมลนี้ลงทะเบียนไว้แล้ว กรุณาไปที่หน้าเข้าสู่ระบบ หรือใช้อีเมลอื่น";
  }
  if (m.includes("password") && (m.includes("at least") || m.includes("characters"))) {
    return "รหัสผ่านสั้นเกินไป กรุณาตั้งรหัสผ่านอย่างน้อย 6 ตัวอักษร";
  }
  if (m.includes("valid email") || m.includes("invalid email") || m.includes("email address")) {
    return "รูปแบบอีเมลไม่ถูกต้อง กรุณากรอกให้อยู่ในรูปแบบ name@example.com";
  }
  if (m.includes("rate limit") || m.includes("too many")) {
    return "ลองหลายครั้งเกินไป กรุณารอประมาณ 1 นาทีแล้วลองใหม่";
  }
  if (m.includes("failed to fetch") || m.includes("network")) {
    return "เชื่อมต่อระบบไม่สำเร็จ กรุณาตรวจสอบอินเทอร์เน็ตแล้วลองอีกครั้ง";
  }
  return `เกิดข้อผิดพลาด (${message}) กรุณาลองอีกครั้ง หากยังไม่ได้ ติดต่อคลินิกผ่าน LINE`;
}

---
name: สหวรรณคลินิก
description: เว็บคลินิกเวชกรรมเด็กและระบบประสาท — โทนสงบ วิชาการ น่าเชื่อถือ
colors:
  primary-teal: "#0f766e"
  primary-blue: "#1d4ed8"
  accent-blue: "#2563eb"
  ink: "#0f172a"
  body-slate: "#334155"
  muted-slate: "#475569"
  soft-slate: "#64748b"
  faint-slate: "#94a3b8"
  border: "#e2e8f0"
  page-bg: "#f8fafc"
  surface: "#ffffff"
  hero-tint: "#eff6ff"
  section-alt: "#eef2ff"
  line-green: "#22c55e"
  vaccine-amber: "#f59e0b"
  vaccine-orange: "#f97316"
  danger: "#ef4444"
  danger-deep: "#b91c1c"
typography:
  display:
    fontFamily: "Arial, Helvetica, sans-serif"
    fontSize: "clamp(32px, 5vw, 52px)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "normal"
  headline:
    fontFamily: "Arial, Helvetica, sans-serif"
    fontSize: "32px"
    fontWeight: 700
    lineHeight: 1.2
  title:
    fontFamily: "Arial, Helvetica, sans-serif"
    fontSize: "22px"
    fontWeight: 700
    lineHeight: 1.3
  body:
    fontFamily: "Arial, Helvetica, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "Arial, Helvetica, sans-serif"
    fontSize: "14px"
    fontWeight: 700
    letterSpacing: "0.02em"
rounded:
  sm: "8px"
  md: "16px"
  lg: "18px"
  xl: "24px"
  xxl: "28px"
  badge: "12px"
  pill: "999px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "28px"
  section: "64px"
components:
  button-call:
    backgroundColor: "{colors.primary-teal}"
    textColor: "{colors.surface}"
    rounded: "{rounded.pill}"
    padding: "0 16px"
    height: "44px"
  button-line:
    backgroundColor: "{colors.line-green}"
    textColor: "{colors.surface}"
    rounded: "{rounded.pill}"
    padding: "0 16px"
    height: "44px"
  button-dark:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.surface}"
    rounded: "{rounded.pill}"
    padding: "0 16px"
    height: "44px"
  button-outline:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0 16px"
    height: "44px"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.muted-slate}"
    rounded: "{rounded.xl}"
    padding: "24px"
---

# Design System: สหวรรณคลินิก

## Overview

**Creative North Star: "The Calm Specialist" (ผู้เชี่ยวชาญที่สงบและมั่นใจ)**

หน้าตาของเว็บต้องให้ความรู้สึกเหมือนนั่งอยู่ตรงหน้าแพทย์เฉพาะทางที่ใจเย็น อธิบายชัด และไม่เร่งขายอะไร ความน่าเชื่อถือมาจากความสงบและความเป็นระเบียบ ไม่ใช่สีจัดจ้านหรือลูกเล่น พื้นหลังโทนเทา-ฟ้าอ่อน (`page-bg`, `hero-tint`) เว้นช่องว่างเยอะ การ์ดสีขาวลอยบนเงานุ่มบางๆ ทำให้เนื้อหาการแพทย์อ่านสบายตาและดูสะอาดเหมือนห้องตรวจที่จัดเรียบร้อย

สีเข้มถูกใช้อย่างประหยัดเพื่อชี้จุดสำคัญ: teal-น้ำเงินคือสีของ "ความเชี่ยวชาญ" (แถบแบรนด์ ตำแหน่งแพทย์ ปุ่มโทร) ส่วนสีอุ่น (ส้ม/เหลือง) จำกัดอยู่เฉพาะหน้าวัคซีน และสีแดงสงวนไว้สำหรับสัญญาณอันตราย (red flag) เท่านั้น ไม่มีการใช้ gradient ม่วง การ์ดซ้อนการ์ด หรือลูกเล่นที่ทำให้ดู "AI ทำ"

**Key Characteristics:**
- สงบ วิชาการ อ่านง่าย — whitespace เยอะ ตัวอักษรใหญ่พอสำหรับผู้สูงอายุ
- การ์ดขาวบนเงานุ่มบาง เป็นหน่วยเนื้อหาหลักทั้งเว็บ
- โทน teal→blue คือเอกลักษณ์ ใช้อย่างจำกัดเพื่อคงพลัง
- มือถือมาก่อน มีทางลัดติดต่ออยู่ปลายนิ้วเสมอ

## Colors

พาเลตหลักเป็นเทา-ฟ้าเย็น (slate) เป็นฉากหลังที่เป็นกลาง ตัดด้วย teal-น้ำเงินเป็นสีเอกลักษณ์ และสำรองสีอุ่น/แดงไว้สำหรับบริบทเฉพาะ

### Primary
- **Specialist Teal** (`primary-teal` #0f766e): สีเอกลักษณ์หลัก — ตำแหน่ง "ประสาทแพทย์", eyebrow, ปุ่มโทร, เครื่องหมาย + ใน FAQ, badge สถานะ
- **Deep Trust Blue** (`primary-blue` #1d4ed8): คู่ของ teal ใน gradient แบรนด์ (แถบโลโก้ 42×42), แท็ก AI task
- **Link Blue** (`accent-blue` #2563eb): ลิงก์ ปุ่ม Facebook ปุ่มย้อนกลับ

### Neutral
- **Ink** (`ink` #0f172a): หัวข้อหลัก ข้อความเข้ม พื้นหลัง footer ปุ่มดำ
- **Body Slate / Muted Slate** (`body-slate` #334155 / `muted-slate` #475569): เนื้อความ ย่อหน้า
- **Soft / Faint Slate** (`soft-slate` #64748b / `faint-slate` #94a3b8): คำอธิบายรอง meta ข้อความ mono
- **Border** (`border` #e2e8f0): เส้นขอบการ์ดและตาราง เส้นคั่นทุกจุด
- **Page BG / Surface** (`page-bg` #f8fafc / `surface` #ffffff): พื้นหน้าเว็บ / พื้นการ์ด
- **Hero Tint / Section Alt** (`hero-tint` #eff6ff / `section-alt` #eef2ff): แถบพื้นหลังอ่อนสลับส่วน

### Tertiary (บริบทเฉพาะ — ห้ามใช้นอกบริบท)
- **LINE Green** (`line-green` #22c55e): ปุ่ม LINE เท่านั้น (สีแบรนด์ LINE)
- **Vaccine Amber / Orange** (`vaccine-amber` #f59e0b / `vaccine-orange` #f97316): เฉพาะหน้า `/vaccine` (hero, หัวตาราง, ราคา)
- **Danger / Danger Deep** (`danger` #ef4444 / `danger-deep` #b91c1c): เฉพาะกล่องเตือน red flag ของอาการอันตราย

**The One Voice Rule.** teal-น้ำเงินคือเสียงเดียวของแบรนด์ ใช้บนพื้นที่ไม่เกิน ~10% ของแต่ละหน้าจอ ความจำกัดคือสิ่งที่ทำให้มันมีพลัง

**The Red-Means-Danger Rule.** สีแดงใช้ได้เฉพาะสัญญาณอันตรายทางคลินิก (อาการที่ต้องไปห้องฉุกเฉิน) ห้ามใช้แดงเป็นสีตกแต่งหรือปุ่ม CTA เด็ดขาด

## Typography

**Display / Body Font:** Arial, Helvetica, sans-serif (system stack เดียวทั้งเว็บ)

**Character:** เรียบ อ่านง่าย เป็นกลาง ไม่มีบุคลิกแฟชั่น — เหมาะกับเนื้อหาการแพทย์ที่ต้องการความชัดเจนมากกว่าสไตล์ ลำดับชั้นสร้างด้วยขนาดและน้ำหนัก ไม่ใช่ด้วยการเปลี่ยนฟอนต์

### Hierarchy
- **Display** (700, clamp 32–52px, lh 1.1): หัวเรื่อง hero หน้าเดียวต่อหน้า
- **Headline** (700, 32px): หัวข้อ section
- **Title** (700, 22px): หัวการ์ด หัวข้ออาการ
- **Body** (400, 18px, lh 1.7): เนื้อความหลัก max-width ~760px เพื่อคงความยาวบรรทัดที่อ่านสบาย
- **Label** (700, 14px, letter-spacing 0.02em): eyebrow, ป้ายกำกับ, badge — มักเป็นสี teal

**The Legible-First Rule.** เนื้อความหลักไม่เล็กกว่า 16px และคง line-height ≥1.7 เพราะผู้อ่านจำนวนมากเป็นผู้สูงอายุที่มีอาการทางระบบประสาท

## Layout

คอนเทนเนอร์กว้าง `min(1120px, 100% − 32px)` กึ่งกลางหน้า · section เว้นบน-ล่าง 64px, hero 72px · grid เนื้อหาเป็นการ์ดในกริด 2–3 คอลัมน์ (`cards.two` / `cards.three`) · hero เป็นกริด 1.2fr / 0.8fr (เนื้อหา / การ์ดรูปแพทย์)

**Responsive:** ที่ ≤900px กริดทั้งหมดยุบเป็นคอลัมน์เดียว · ที่ ≤720px ซ่อนลิงก์ข้อความในเมนู เหลือปุ่มโทร/LINE และแสดง **แถบปุ่มลอยล่างจอ** (โทร/LINE/เวลาทำการ, min-height 48px) พร้อมเว้น padding-bottom 76px กันปุ่มบังเนื้อหา

**The Card-Is-The-Unit Rule.** ทุกบล็อกเนื้อหา (บริการ อาการ FAQ คลิป ราคาวัคซีน) อยู่ในการ์ดขาวขอบ `border` เสมอ ความสม่ำเสมอนี้คือโครงของทั้งเว็บ

## Elevation & Depth

ระบบ **แบนแบบมีชั้นนุ่ม (flat-with-soft-lift)** ไม่มีเงาหนักหรือ 3D ความลึกมาจากการ์ดขาวลอยบนพื้นเทาอ่อนด้วยเงากระจายบางมากเพียงระดับเดียว

### Shadow Vocabulary
- **Signature Card Shadow** (`box-shadow: 0 10px 30px rgba(15, 23, 42, 0.05)`): การ์ด กล่อง CTA ตาราง แกลเลอรี — เงาเดียวที่ใช้ทั่วเว็บ
- **Navbar/Mobile-bar Blur** (`backdrop-filter: blur(10px)` บนพื้นขาว 95–97%): แถบนำทางบนและแถบปุ่มลอยล่าง

**The One-Shadow Rule.** ใช้เงา signature ค่าเดียวทั้งเว็บ ห้ามเพิ่มระดับเงาหลายชั้น ความสม่ำเสมอทำให้ดูสงบและมืออาชีพ

## Shapes

มุมโค้งเป็นภาษาหลักของฟอร์ม: การ์ดโค้ง `xl` 24px (place-card `xxl` 28px), การ์ดเล็ก/FAQ `lg` 18px, กล่องเล็ก/รูป `md` 16px, badge 12px · **ปุ่มเป็นแคปซูลเต็ม (`pill` 999px)** · เส้นขอบบาง 1px สี `border` รอบทุกพื้นผิว · จุดกลม (dot) และ spinner เป็นวงกลมเต็ม

## Components

### Buttons
- **Shape:** แคปซูล (`pill` 999px), min-height 44px (ขนาดใหญ่ big 50px), font-weight 700
- **Call (primary CTA):** พื้น `primary-teal` ตัวอักษรขาว — ปุ่มโทร ปุ่มหลักของคลินิก
- **LINE:** พื้น `line-green` ตัวอักษรขาว
- **Dark / Outline:** ดำ `ink` ตัวขาว / ขาวขอบ `border` ตัว `ink`
- **Hover:** ยกขึ้น `translateY(-1px)` transition 0.2s ease (ไม่เปลี่ยนสีรุนแรง)

### Cards / Containers
- **Corner:** `xl` 24px (บางจุด `xxl` 28px)
- **Background:** `surface` ขาว · **Border:** 1px `border`
- **Shadow:** Signature Card Shadow (ดู Elevation)
- **Padding:** 24px (hero-card/cta 28px)

### Navigation
- แถบ sticky บนสุด พื้นขาวโปร่ง 95% + blur · โลโก้เป็น badge 42px gradient teal→blue · ลิงก์ + ปุ่ม CTA ด้านขวา · บนมือถือยุบเหลือปุ่มโทร/LINE

### FAQ (signature)
- `<details>/<summary>` การ์ดขาวขอบมน 18px · เครื่องหมาย `+` สี teal เปลี่ยนเป็น `–` เมื่อเปิด · ไม่มี marker เริ่มต้นของเบราว์เซอร์

### Red-Flag Callout (signature)
- กล่องพื้น `#fef2f2` เส้นซ้าย 4px สี `danger` ตัวอักษร `danger-deep` — ใช้เตือนอาการที่ต้องไปห้องฉุกเฉินเท่านั้น

## Do's and Don'ts

### Do:
- **Do** ใช้ gradient แบรนด์ `linear-gradient(135deg, #1d4ed8, #0f766e)` เฉพาะ badge โลโก้และจุดเอกลักษณ์เท่านั้น
- **Do** ห่อเนื้อหาทุกบล็อกในการ์ดขาวขอบ `border` + Signature Card Shadow ค่าเดียว
- **Do** ใช้ปุ่มแคปซูล teal (`button-call`) เป็น CTA หลักของคลินิกเสมอ
- **Do** นำด้วยหลักฐานความน่าเชื่อถือ (คุณวุฒิ Ph.D., ORCID, ผลงานตีพิมพ์) ก่อนคำเชิญชวน
- **Do** เว้น whitespace ให้เยอะและคงตัวอักษรใหญ่พอสำหรับผู้สูงอายุ

### Don't:
- **Don't** ใส่ข้อความหรือตัวเลข **รับประกันผลการรักษา** ทุกชนิด (ข้อบังคับแพทยสภา)
- **Don't** สร้างภาพ/เสียง AI avatar หรือ voice clone แทนแพทย์ — แพทย์ต้องออกหน้าและเสียงจริง
- **Don't** ใช้คำว่า **"นักลงทุน" / "หมอลงทุน"** ในทุกส่วนของเว็บ
- **Don't** ใช้ gradient ม่วง การ์ดซ้อนการ์ด หรือลายเซ็น "AI ทำ" ที่ทำให้ดูไม่น่าเชื่อถือ
- **Don't** ใช้สีแดงหรือสีอุ่น (ส้ม/เหลือง) นอกบริบทที่กำหนด (แดง = red flag, อุ่น = หน้าวัคซีน)
- **Don't** เพิ่มระดับเงาหลายชั้นหรือเงาหนัก — คงระบบแบนนุ่มชั้นเดียว

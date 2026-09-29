// รายการ "เตรียมตัวก่อนมาพบแพทย์" สำหรับคนไข้คลินิกประสาท — ใช้ทั้งหน้าแรกและหน้าอาการ
// รายการทั้งหมดมาจาก นพ. สหรัฐ แก้ไขที่นี่ที่เดียว

const items = [
  {
    title: "วิดีโอตอนมีอาการ",
    detail: "เช่น ตอนชัก มือสั่น หรือมีการเคลื่อนไหวผิดปกติ",
  },
  {
    title: "บันทึกอาการ",
    detail: "เช่น บันทึกอาการปวดหัว หรือบันทึกการชัก",
  },
  {
    title: "รายการยาที่กินอยู่",
    detail: "ยาทุกตัวที่กินอยู่ในปัจจุบัน",
  },
  {
    title: "ผลตรวจเก่า (ถ้ามี)",
    detail: "เช่น ผล MRI, CT หรือ EEG",
  },
];

export default function PrepareChecklist({ headingLevel = 2 }: { headingLevel?: 2 | 3 }) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <div className="prepare-box">
      <p className="eyebrow">คลินิกระบบประสาท</p>
      <Heading className="prepare-title">เตรียมตัวก่อนมาพบแพทย์</Heading>
      <p className="prepare-lead">ถ้ามีสิ่งเหล่านี้ นำมาด้วยจะช่วยให้แพทย์เห็นภาพอาการได้ครบขึ้นตอนตรวจ</p>
      <ul className="prepare-list">
        {items.map((it) => (
          <li key={it.title}>
            <span className="prepare-check" aria-hidden="true">
              ✓
            </span>
            <span>
              <strong>{it.title}</strong>
              <span className="prepare-detail">{it.detail}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

"use client";

const YEARS = ["2021", "2022", "2024", "2025", "2026"];
const C = {
  teal: "#0B7A8C", amber: "#C77B25", mint: "#02A98C", good: "#0A8F6E",
  ink: "#0E2A33", muted: "#5A757C", line: "#DCE9E9", panel: "#FFFFFF", ground: "#F7FAFA",
};

type Fmt = { axis: (v: number) => string; pt: (v: number) => string };

function LineChart({ data, color, minY, maxY, fmt }: {
  data: number[]; color: string; minY: number; maxY: number; fmt: Fmt;
}) {
  const W = 440, H = 190, pt = 26, pr = 14, pb = 26, pl = 44;
  const rng = maxY - minY || 1;
  const X = (i: number) => pl + (W - pl - pr) * (i / (data.length - 1));
  const Y = (v: number) => pt + (H - pt - pb) * (1 - (v - minY) / rng);
  const grid = [0, 1, 2, 3].map((g) => {
    const yy = pt + (H - pt - pb) * g / 3;
    const val = maxY - rng * g / 3;
    return (
      <g key={g}>
        <line x1={pl} y1={yy} x2={W - pr} y2={yy} stroke={C.line} strokeWidth={1} />
        <text x={pl - 8} y={yy + 4} textAnchor="end" fontSize={10} fill={C.muted}>{fmt.axis(val)}</text>
      </g>
    );
  });
  const pts = data.map((v, i) => [X(i), Y(v)] as [number, number]);
  const path = pts.map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" ");
  const last = data.length - 1;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" style={{ display: "block", width: "100%", height: "auto" }}>
      {grid}
      <path d={`${path} L${X(last)} ${H - pb} L${pl} ${H - pb} Z`} fill={color} opacity={0.08} />
      <path d={path} fill="none" stroke={color} strokeWidth={2.4} strokeLinejoin="round" strokeLinecap="round" />
      {pts.map((p, i) => (
        <g key={i}>
          <circle cx={p[0]} cy={p[1]} r={i === last ? 4.5 : 3} fill={color} />
          <text x={p[0]} y={p[1] - 9} textAnchor="middle" fontSize={10.5} fontWeight={700} fill={color}>{fmt.pt(data[i])}</text>
        </g>
      ))}
      {YEARS.map((y, i) => (
        <text key={y} x={X(i)} y={H - 8} textAnchor="middle" fontSize={10} fill={C.muted}>{y}</text>
      ))}
    </svg>
  );
}

function BarChart({ data, color, fmt }: { data: number[]; color: string; fmt: Fmt }) {
  const W = 440, H = 190, pt = 26, pr = 14, pb = 26, pl = 44;
  const mx = Math.max(...data) * 1.08, mn = 0, rng = mx - mn || 1;
  const peak = Math.max(...data);
  const bw = (W - pl - pr) / data.length * 0.56;
  const X = (i: number) => pl + (W - pl - pr) * ((i + 0.5) / data.length);
  const Y = (v: number) => pt + (H - pt - pb) * (1 - (v - mn) / rng);
  const grid = [0, 1, 2, 3].map((g) => {
    const yy = pt + (H - pt - pb) * g / 3;
    const val = mx - rng * g / 3;
    return (
      <g key={g}>
        <line x1={pl} y1={yy} x2={W - pr} y2={yy} stroke={C.line} strokeWidth={1} />
        <text x={pl - 8} y={yy + 4} textAnchor="end" fontSize={10} fill={C.muted}>{fmt.axis(val)}</text>
      </g>
    );
  });
  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" style={{ display: "block", width: "100%", height: "auto" }}>
      {grid}
      {data.map((v, i) => {
        const x = X(i) - bw / 2, y = Y(v), h = (H - pb) - y;
        const isPeak = v === peak;
        return (
          <g key={i}>
            <rect x={x} y={y} width={bw} height={h} rx={3} fill={isPeak ? C.amber : color} />
            <text x={X(i)} y={y - 7} textAnchor="middle" fontSize={10.5} fontWeight={700} fill={isPeak ? C.amber : color}>{fmt.pt(v)}</text>
          </g>
        );
      })}
      {YEARS.map((y, i) => (
        <text key={y} x={X(i)} y={H - 8} textAnchor="middle" fontSize={10} fill={C.muted}>{y}</text>
      ))}
    </svg>
  );
}

const READ = [
  ["สมองฝ่อแบบก้าวหน้า", C.amber, "อัตราฝ่อคงที่ ~1.19%/ปี (R²0.98) สม่ำเสมอเป็นเส้นตรง บ่งชี้ neurodegeneration ที่เดินหน้าต่อเนื่องไม่ขึ้นกับการอักเสบ"],
  ["การอักเสบสงบลง", C.good, "จำนวนรอยโรคพีคปี 2024 (71) แล้วลดเหลือ 48 ในปี 2026 เข้าได้กับการตอบสนองต่อการปรับการรักษาหลังปี 2024"],
  ["รูปแบบคลาสสิกของ MS", C.teal, "สองแกนแยกกัน: การอักเสบ (รอยโรค) คุมได้ แต่การเสื่อมของเนื้อสมอง (atrophy) ยังเดินต่อ จุดที่การรักษาปัจจุบันยังท้าทาย"],
  ["คุณค่าที่รายงานทั่วไปไม่ให้", C.teal, "ตัวเลขติดตามข้ามปีที่เทียบได้จริง ช่วยตัดสินใจเรื่องการปรับยา สิ่งที่การอ่านทีละครั้งด้วยตาจับไม่ได้"],
];
const BADGES = [
  ["🔒", "ประมวลผลในเครื่อง ข้อมูลคนไข้ไม่ออกจากคลินิก"],
  ["🧠", "เครื่องมือ validated: FastSurfer + LST-AI"],
  ["👨‍⚕️", "แพทย์อ่านผลทุกครั้ง (ผู้ช่วย ไม่ใช่ผู้แทน)"],
  ["🎭", "เคสตัวอย่างปกปิดตัวตนเพื่อสาธิต"],
];

export default function MriShowcasePage() {
  return (
    <main className="mri-wrap">
      <a href="/ai" className="mri-back">← กลับหน้าเครื่องมือ AI</a>
      <div className="mri-eyebrow">MRI LESION TRACKING · เคสตัวอย่าง (de-identified)</div>
      <h1 className="mri-h1">ติดตามการเปลี่ยนแปลงของสมองข้ามปี<br />ในผู้ป่วยปลอกประสาทเสื่อมแข็ง (MS)</h1>
      <p className="mri-lede">
        รายงานรังสีทั่วไปบอก &ldquo;มี/ไม่มี lesion&rdquo; ทีละครั้ง เครื่องมือนี้วัด<strong>ปริมาณ</strong>การฝ่อของสมองและรอยโรคเทียบข้ามปี
        ให้เห็นทิศทางของโรคที่ตาเปล่าจับไม่ได้ ประมวลผลด้วยเครื่องมือที่ผ่านการตรวจสอบ และแพทย์เป็นผู้อ่านผลทุกครั้ง
      </p>

      <div className="mri-stats">
        <div className="mri-stat"><div className="n" style={{ color: C.amber }}>−5.77%</div><div className="k">สมองฝ่อสะสม 5 ปี (PBVC) · ~−1.19%/ปี · R²0.98</div></div>
        <div className="mri-stat"><div className="n" style={{ color: C.good }}>71 → 48</div><div className="k">จำนวนรอยโรค พีคปี 2024 แล้วลดลง (การอักเสบสงบหลังปรับการรักษา)</div></div>
        <div className="mri-stat"><div className="n" style={{ color: C.ink }}>5 ปี</div><div className="k">2021–2026 · 5 จุดเวลา · T1 + FLAIR</div></div>
      </div>

      <div className="mri-sech">แนวโน้มเชิงปริมาณ · 2021–2026</div>
      <div className="mri-grid">
        <div className="mri-card"><h3>สมองฝ่อสะสม (PBVC)</h3><div className="sub">% ปริมาตรสมองเทียบ baseline ยิ่งต่ำ = ฝ่อมาก</div>
          <LineChart data={[0, -1.3, -4.35, -5.05, -5.77]} color={C.amber} minY={-6.5} maxY={0.5} fmt={{ axis: (v) => v.toFixed(0) + "%", pt: (v) => v.toFixed(1) }} />
          <div className="cap">เส้นลาดคงที่ = neurodegeneration เดินหน้าต่อเนื่อง</div></div>
        <div className="mri-card"><h3>จำนวนรอยโรค (Lesion count)</h3><div className="sub">นับจาก FLAIR ด้วย LST-AI</div>
          <BarChart data={[52, 57, 71, 61, 48]} color={C.teal} fmt={{ axis: (v) => v.toFixed(0), pt: (v) => v.toFixed(0) }} />
          <div className="cap">พีค 2024 แล้วลด = การอักเสบสงบลง (ตอบสนองการรักษา)</div></div>
        <div className="mri-card"><h3>ปริมาตรสมอง (mL)</h3><div className="sub">FastSurfer segmentation</div>
          <LineChart data={[1037, 1024, 992, 986, 978]} color={C.teal} minY={968} maxY={1044} fmt={{ axis: (v) => v.toFixed(0), pt: (v) => v.toFixed(0) }} />
          <div className="cap">1037 → 978 mL ใน 5 ปี</div></div>
        <div className="mri-card"><h3>ปริมาตรรอยโรค (mL)</h3><div className="sub">Total lesion volume</div>
          <LineChart data={[34.2, 25.5, 29.0, 26.2, 26.4]} color={C.mint} minY={22} maxY={36} fmt={{ axis: (v) => v.toFixed(0), pt: (v) => v.toFixed(1) }} />
          <div className="cap">ลดลงหลัง 2024 สอดคล้องกับจำนวนที่ลด</div></div>
      </div>

      <div className="mri-sech">การอ่านผลทางคลินิก</div>
      <div className="mri-read">
        {READ.map(([t, c, d]) => (
          <div className="mri-item" key={t}>
            <div className="t"><span className="dot" style={{ background: c }} />{t}</div>
            <div className="d">{d}</div>
          </div>
        ))}
      </div>

      <div className="mri-sech">วิธีการและความปลอดภัย</div>
      <div className="mri-badges">
        {BADGES.map(([e, t]) => (<span className="mri-badge" key={t}>{e} <span>{t}</span></span>))}
      </div>
      <div className="mri-note">
        หมายเหตุ: หน้านี้เป็นการ<strong>สาธิตความสามารถ</strong>จากเคสตัวอย่างที่ปกปิดข้อมูลส่วนบุคคลแล้ว ไม่ใช่ช่องอัปโหลดสาธารณะ
        การประมวลผลจริงทำในเครื่องภายในคลินิกเท่านั้น (ข้อมูลภาพไม่ถูกส่งขึ้นอินเทอร์เน็ต) ผลทั้งหมดต้องได้รับการตรวจและตีความโดยแพทย์
      </div>

      <div className="mri-foot">
        <span>สหวรรณคลินิก · เวชกรรมเด็กและระบบประสาท</span>
        <span>นพ. สหรัฐ อังศุมาศ · ประสาทแพทย์</span>
      </div>

      <style jsx>{`
        .mri-wrap { max-width: 1080px; margin: 0 auto; padding: clamp(20px,4vw,44px); color: ${C.ink};
          font-family: -apple-system,"Segoe UI","Sarabun","Noto Sans Thai",system-ui,sans-serif; line-height: 1.6; }
        .mri-back { display: inline-block; font-size: 13px; color: ${C.teal}; text-decoration: none; font-weight: 600; margin-bottom: 18px; }
        .mri-back:hover { text-decoration: underline; }
        .mri-eyebrow { font-size: 12px; letter-spacing: .16em; color: ${C.teal}; font-weight: 700; }
        .mri-h1 { font-size: clamp(26px,4vw,40px); line-height: 1.15; margin: .35em 0 .25em; font-weight: 700; text-wrap: balance;
          font-family: Georgia,"Times New Roman",serif; }
        .mri-lede { font-size: clamp(15px,1.8vw,18px); color: ${C.muted}; max-width: 62ch; margin: 0; }
        .mri-lede strong { color: ${C.ink}; }
        .mri-stats { display: flex; flex-wrap: wrap; gap: 14px; margin-top: 24px; }
        .mri-stat { background: ${C.panel}; border: 1px solid ${C.line}; border-radius: 14px; padding: 16px 20px; flex: 1 1 180px; }
        .mri-stat .n { font-size: 30px; font-weight: 800; font-variant-numeric: tabular-nums; line-height: 1; }
        .mri-stat .k { font-size: 12.5px; color: ${C.muted}; margin-top: 6px; }
        .mri-sech { font-size: 12px; letter-spacing: .14em; text-transform: uppercase; color: ${C.muted}; font-weight: 700;
          margin: clamp(34px,5vw,52px) 0 16px; }
        .mri-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 16px; }
        .mri-card { background: ${C.panel}; border: 1px solid ${C.line}; border-radius: 16px; padding: 18px 18px 12px; }
        .mri-card h3 { margin: 0; font-size: 15px; font-weight: 700; }
        .mri-card .sub { font-size: 12px; color: ${C.muted}; margin: 2px 0 8px; }
        .mri-card .cap { font-size: 11.5px; color: ${C.muted}; margin: 6px 2px 2px; }
        .mri-read { display: grid; grid-template-columns: repeat(2,1fr); gap: 14px; }
        .mri-item { background: ${C.panel}; border: 1px solid ${C.line}; border-radius: 14px; padding: 16px 18px; }
        .mri-item .t { font-weight: 700; font-size: 15px; margin-bottom: 4px; display: flex; align-items: center; gap: 8px; }
        .mri-item .dot { width: 9px; height: 9px; border-radius: 50%; flex: none; display: inline-block; }
        .mri-item .d { font-size: 13.5px; color: ${C.muted}; }
        .mri-badges { display: flex; flex-wrap: wrap; gap: 10px; }
        .mri-badge { display: inline-flex; align-items: center; gap: 7px; background: ${C.panel}; border: 1px solid ${C.line};
          border-radius: 999px; padding: 8px 14px; font-size: 12.5px; font-weight: 600; }
        .mri-note { margin-top: 18px; padding: 14px 18px; border: 1px dashed ${C.line}; border-radius: 12px; font-size: 12.5px; color: ${C.muted}; }
        .mri-note strong { color: ${C.ink}; }
        .mri-foot { margin-top: 36px; padding-top: 18px; border-top: 1px solid ${C.line}; font-size: 12.5px; color: ${C.muted};
          display: flex; justify-content: space-between; flex-wrap: wrap; gap: 8px; }
        @media (max-width: 680px) { .mri-grid, .mri-read { grid-template-columns: 1fr; } }
      `}</style>
    </main>
  );
}

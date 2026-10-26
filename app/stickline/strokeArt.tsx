// ภาพการ์ตูนเส้น BE FAST — ใช้ร่วมกันระหว่างหน้าแรก (ภาพนิ่ง) และ /stickline (กดเล่นได้)
// ข้อความทุกบรรทัดมาจากที่เว็บเผยแพร่แล้ว:
//   ปากเบี้ยว / แขนขาอ่อนแรงครึ่งซีก / พูดไม่ชัด / ไปห้องฉุกเฉินทันที  ← FAQ หน้าแรก
//   เดินเซมาก / เห็นภาพซ้อน                                        ← หน้าอาการเวียนศีรษะ
//   โทร 1669                                                        ← แพ็ก EP01 ของแพทย์
// ภาพนิ่ง = ท่าที่ "มีอาการ" อยู่แล้ว จึงสื่อความหมายครบโดยไม่ต้องขยับ (ท่าขยับอยู่ใน globals.css)

const ink = { stroke: "currentColor", strokeWidth: 3.5, strokeLinecap: "round" as const, fill: "none" };

function Body({ arms = true }: { arms?: boolean }) {
  return (
    <g {...ink}>
      <line x1="60" y1="50" x2="60" y2="98" />
      {arms && (
        <>
          <line x1="60" y1="62" x2="38" y2="84" />
          <line x1="60" y1="62" x2="82" y2="84" />
        </>
      )}
      <line x1="60" y1="98" x2="44" y2="130" />
      <line x1="60" y1="98" x2="76" y2="130" />
    </g>
  );
}

function Head({ mouth = "M52 38 Q60 44 68 38" }: { mouth?: string }) {
  return (
    <g {...ink}>
      <circle cx="60" cy="30" r="18" />
      <circle cx="53" cy="27" r="1.6" fill="currentColor" />
      <circle cx="67" cy="27" r="1.6" fill="currentColor" />
      <path d={mouth} />
    </g>
  );
}

export const signs = [
  {
    letter: "B",
    word: "Balance",
    title: "เดินเซมาก",
    art: (
      <>
        <g className="sl-sway">
          <Head />
          <Body />
        </g>
        {/* เส้นบอกการโยกตัว */}
        <g {...ink} strokeWidth={2.5}>
          <path d="M18 64 q-6 8 0 16" />
          <path d="M100 64 q6 8 0 16" />
        </g>
      </>
    ),
  },
  {
    letter: "E",
    word: "Eyes",
    title: "เห็นภาพซ้อน",
    art: (
      <>
        <g className="sl-ghost" opacity="0.35">
          <Head />
        </g>
        <Head />
        <Body />
      </>
    ),
  },
  {
    letter: "F",
    word: "Face",
    title: "ปากเบี้ยว",
    art: (
      <>
        <g {...ink}>
          <circle cx="60" cy="30" r="18" />
          <circle cx="53" cy="27" r="1.6" fill="currentColor" />
          <path className="sl-lid" d="M64 26 Q67 29 70 26" />
          <line x1="52" y1="39" x2="60" y2="39" />
          <line className="sl-droop" x1="60" y1="39" x2="68" y2="39" />
        </g>
        <Body />
      </>
    ),
  },
  {
    letter: "A",
    word: "Arm",
    title: "แขนขาอ่อนแรงครึ่งซีก",
    art: (
      <>
        <Head />
        <Body arms={false} />
        <g {...ink}>
          <line x1="60" y1="62" x2="30" y2="62" />
          <line className="sl-drift" x1="60" y1="62" x2="90" y2="62" />
        </g>
      </>
    ),
  },
  {
    letter: "S",
    word: "Speech",
    title: "พูดไม่ชัด",
    art: (
      <>
        <Head mouth="M53 39 Q57 36 60 39 Q64 42 67 39" />
        <Body />
        <g className="sl-talk">
          <path {...ink} strokeWidth={2.5} d="M80 6 h34 a6 6 0 0 1 6 6 v14 a6 6 0 0 1 -6 6 h-24 l-8 7 v-7 h-2 a6 6 0 0 1 -6 -6 v-14 a6 6 0 0 1 6 -6 z" />
          <text x="97" y="24" textAnchor="middle" fontSize="13" fill="currentColor">
            ก..ข?
          </text>
        </g>
      </>
    ),
  },
  {
    letter: "T",
    word: "Time",
    title: "ไปห้องฉุกเฉินทันที โทร 1669",
    art: (
      <g {...ink}>
        <circle cx="60" cy="62" r="42" />
        <line x1="60" y1="62" x2="60" y2="36" />
        <line className="sl-hand" x1="60" y1="62" x2="84" y2="62" />
        <circle cx="60" cy="62" r="2.5" fill="currentColor" />
        <text x="60" y="128" textAnchor="middle" fontSize="20" fontWeight="700" fill="currentColor" stroke="none">
          1669
        </text>
      </g>
    ),
  },
];

export function StrokeCards({ compact = false }: { compact?: boolean }) {
  return (
    <ol className={"sl-stroke" + (compact ? " compact" : "")}>
      {signs.map((s) => (
        <li key={s.letter} className={s.letter === "T" ? "sl-stroke-time" : undefined}>
          <svg viewBox="0 0 124 140" aria-hidden="true" focusable="false">
            {s.art}
          </svg>
          <p className="sl-stroke-letter">
            <span lang="en">{s.letter}</span>
            <small lang="en">{s.word}</small>
          </p>
          <p className="sl-stroke-title">{s.title}</p>
        </li>
      ))}
    </ol>
  );
}

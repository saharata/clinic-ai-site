"use client";

import { useState } from "react";
import Link from "next/link";
import LineLink from "../../LineLink";
import { answerLabel, questions, type Answer } from "./quizData";

// แบบฝึก "คนนี้เป็นลมหรือชัก" — ตอบทีละข้อ เห็นคำอธิบายทันที จบแล้วแชร์คะแนนลง LINE ได้
const quizUrl = "https://www.sahawanclinic.clinic/stickline/quiz";
const choices: Answer[] = ["faint", "seizure", "unsure"];

export default function Quiz() {
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<Answer | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [shared, setShared] = useState("");
  const q = questions[i];
  const total = questions.length;

  function pick(a: Answer) {
    if (picked) return;
    setPicked(a);
    if (a === q.answer) setScore((s) => s + 1);
  }
  function next() {
    if (i + 1 >= total) setDone(true);
    else {
      setI(i + 1);
      setPicked(null);
    }
  }
  function restart() {
    setI(0);
    setPicked(null);
    setScore(0);
    setDone(false);
    setShared("");
  }

  const shareText = `ฉันได้ ${score}/${total} ในแบบฝึก "คนนี้เป็นลมหรือชัก" จากประสาทแพทย์ สหวรรณคลินิก ลองทำดู`;
  const lineShare = `https://line.me/R/share?text=${encodeURIComponent(`${shareText}\n${quizUrl}`)}`;

  async function share() {
    try {
      if (navigator.share) {
        await navigator.share({ title: shareText, text: shareText, url: quizUrl });
        return;
      }
      await navigator.clipboard.writeText(`${shareText}\n${quizUrl}`);
      setShared("คัดลอกข้อความแล้ว วางส่งใน LINE ได้เลย");
    } catch {
      // ผู้ใช้ยกเลิก
    }
  }

  if (done) {
    const all = score === total;
    return (
      <div className="quiz-result" aria-live="polite">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`/stickline/icons/${all ? "pose_happy" : "pose_doctor"}.png`} alt="" width={96} height={96} />
        <p className="quiz-score">
          ได้ {score} จาก {total} ข้อ
        </p>
        <p>
          {all
            ? "ครบทุกข้อ จำไว้ด้วยว่าสิ่งแรกที่ทำได้คือจับเวลา"
            : "ข้อที่ผิดดูคำอธิบายอีกครั้งได้ในหน้า เป็นลม หรือ ชัก สิ่งแรกที่ทำได้เสมอคือจับเวลา"}
        </p>
        <p className="sl-note">ชักหรือหมดสตินานเกินห้านาที ไม่ฟื้น หรือเกิดซ้ำติดกัน โทร 1669 ทันที</p>
        <div className="sl-controls">
          <button type="button" className="btn btn-dark big" onClick={share}>
            แชร์คะแนน
          </button>
          <a href={lineShare} target="_blank" rel="noreferrer" className="btn btn-line big">
            แชร์ทาง LINE<span className="sr-only"> (เปิดในแท็บใหม่)</span>
          </a>
          <button type="button" className="btn btn-outline big" onClick={restart}>
            ทำอีกครั้ง
          </button>
        </div>
        <p role="status" className="card-status">
          {shared}
        </p>
        <div className="sl-controls">
          <Link href="/stickline#faint-seizure" className="btn btn-outline">
            อ่านเรื่อง เป็นลม หรือ ชัก
          </Link>
          <LineLink message="สวัสดี อยากปรึกษาเรื่องเป็นลม / ชัก" className="btn btn-outline">
            ปรึกษาประสาทแพทย์ผ่าน LINE
          </LineLink>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz">
      <p className="quiz-progress">
        ข้อ {i + 1} จาก {total}
      </p>
      <div className="quiz-scene">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`/stickline/icons/${q.icon}.png`} alt="" width={96} height={96} />
        <p>{q.scene}</p>
      </div>
      <p className="quiz-ask" id={`quiz-q${i}`}>
        คนนี้น่าจะเป็นอะไร
      </p>
      <div className="quiz-choices" role="group" aria-labelledby={`quiz-q${i}`}>
        {choices.map((c) => {
          const state = !picked ? "" : c === q.answer ? "correct" : c === picked ? "wrong" : "";
          return (
            <button
              key={c}
              type="button"
              className={"btn btn-outline big quiz-choice " + state}
              onClick={() => pick(c)}
              disabled={!!picked}
              aria-pressed={picked === c}
            >
              {answerLabel[c]}
              {state === "correct" && <span className="sr-only"> (คำตอบที่ถูก)</span>}
              {state === "wrong" && <span className="sr-only"> (ไม่ถูก)</span>}
            </button>
          );
        })}
      </div>
      <div aria-live="polite">
        {picked && (
          <div className={"quiz-why " + (picked === q.answer ? "ok" : "no")}>
            <p className="quiz-verdict">
              {picked === q.answer ? "ถูกต้อง" : `ไม่ใช่ คำตอบคือ ${answerLabel[q.answer]}`}
            </p>
            <p>{q.why}</p>
            <p className="quiz-source">ที่มา: {q.source} ใน EP01</p>
            <button type="button" className="btn btn-dark big" onClick={next}>
              {i + 1 >= total ? "ดูคะแนน" : "ข้อต่อไป"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { useSyncExternalStore } from "react";
import LiteYouTube from "../symptoms/LiteYouTube";

// คลิปยังเป็น private จนถึงวันเผยแพร่ → ก่อนวันนั้นโชว์ภาพปก + วันที่ แทนตัวเล่นที่เล่นไม่ได้
// เช็กเวลาในเบราว์เซอร์ (หน้า build แบบ static) พอถึงวันจะเปลี่ยนเป็นตัวเล่นเองโดยไม่ต้อง deploy ใหม่
const noop = () => () => {};

export default function EpisodeVideo({
  videoId,
  title,
  publishAt,
  poster,
  posterAlt,
  durationLabel,
}: {
  videoId: string;
  title: string;
  publishAt: string;
  poster: string;
  posterAlt: string;
  durationLabel: string;
}) {
  const live = useSyncExternalStore(
    noop,
    () => Date.now() >= new Date(publishAt).getTime(),
    () => false,
  );

  if (live) {
    return (
      <div className="symptom-video">
        <LiteYouTube videoId={videoId} title={title} />
      </div>
    );
  }

  const date = new Date(publishAt).toLocaleDateString("th-TH", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Bangkok",
  });
  return (
    <figure className="sl-poster">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={poster} alt={posterAlt} width={1280} height={720} />
      <figcaption>
        คลิปเผยแพร่ {date} · ยาว {durationLabel} · อ่านเนื้อหาทั้งหมดได้ด้านล่าง
      </figcaption>
    </figure>
  );
}

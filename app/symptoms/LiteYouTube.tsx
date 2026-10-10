"use client";

import { useState } from "react";
import { track } from "@vercel/analytics";

// แสดงภาพปกก่อน โหลดตัวเล่น YouTube จริงเมื่อกดเท่านั้น
// ตัวเล่นเต็มหนักหลายร้อย KB ต่อคลิป หน้า /symptoms มี ~10 คลิป บนเน็ตมือถือจึงช้ามาก
export default function LiteYouTube({ videoId, title }: { videoId: string; title: string }) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <iframe
        // ย้าย focus เข้าตัวเล่นทันที ผู้ใช้คีย์บอร์ด/screen reader จะไม่หลุดไปต้นหน้า
        ref={(el) => el?.focus()}
        src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    );
  }

  return (
    <button
      type="button"
      className="yt-lite"
      onClick={() => {
        setPlaying(true);
        // วัดว่าคลิปไหนมีคนกดดูจริง (Vercel Analytics → Events)
        track("video_play", { video: videoId, location: window.location.pathname });
      }}
    >
      {/* ภาพปกมาจาก CDN ของ YouTube ซึ่งย่อขนาดมาแล้ว ไม่ต้องผ่าน next/image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
        alt=""
        loading="lazy"
        decoding="async"
      />
      <span className="yt-lite-play" aria-hidden="true">
        ▶
      </span>
      <span className="sr-only">เล่นวิดีโอ: {title}</span>
    </button>
  );
}

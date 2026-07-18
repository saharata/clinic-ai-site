// Proxy: forward EDF upload to the Render research API (server-to-server, avoids CORS).
export const runtime = "nodejs";
export const maxDuration = 60;

const UPSTREAM = "https://eeg-seizure-reader.onrender.com";

export async function POST(req: Request) {
  const url = new URL(req.url);
  const tasks = url.searchParams.get("tasks") || "C";
  const contentType = req.headers.get("content-type") || "";

  let body: ArrayBuffer;
  try {
    body = await req.arrayBuffer();
  } catch {
    return Response.json({ detail: "อ่านไฟล์อัปโหลดไม่สำเร็จ" }, { status: 400 });
  }

  if (body.byteLength > 40 * 1024 * 1024) {
    return Response.json({ detail: "ไฟล์ใหญ่เกิน 40 MB สำหรับโหมดสาธิต" }, { status: 413 });
  }

  try {
    const upstream = await fetch(
      `${UPSTREAM}/api/analyze?tasks=${encodeURIComponent(tasks)}`,
      {
        method: "POST",
        headers: { "content-type": contentType },
        body,
        signal: AbortSignal.timeout(58000),
      }
    );
    const buf = await upstream.arrayBuffer();
    return new Response(buf, {
      status: upstream.status,
      headers: {
        "content-type": upstream.headers.get("content-type") || "application/json",
      },
    });
  } catch (e) {
    const msg =
      e instanceof Error && e.name === "TimeoutError"
        ? "เซิร์ฟเวอร์วิจัยตอบช้าเกินไป (อาจกำลังตื่นจาก sleep) ลองใหม่อีกครั้ง"
        : "เชื่อมต่อเซิร์ฟเวอร์วิจัยไม่สำเร็จ";
    return Response.json({ detail: msg }, { status: 504 });
  }
}

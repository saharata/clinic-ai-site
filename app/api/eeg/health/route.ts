// Warmup/health proxy — wakes the Render server before analysis.
export const runtime = "nodejs";
export const maxDuration = 60;

const UPSTREAM = "https://eeg-seizure-reader.onrender.com";

export async function GET() {
  try {
    const r = await fetch(`${UPSTREAM}/api/health`, {
      signal: AbortSignal.timeout(55000),
    });
    const text = await r.text();
    return new Response(text || '{"status":"ok"}', {
      status: r.status,
      headers: { "content-type": "application/json" },
    });
  } catch {
    return Response.json({ status: "waking" });
  }
}

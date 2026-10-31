"use client";

export default function PrintButton() {
  return (
    <button type="button" className="btn btn-dark" onClick={() => window.print()}>
      พิมพ์ใบงาน
    </button>
  );
}

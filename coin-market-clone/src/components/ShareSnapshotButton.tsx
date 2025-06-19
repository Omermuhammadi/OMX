"use client";

import { toPng } from "dom-to-image-more";

export default function ShareSnapshotButton() {
  const handle = async () => {
    const node = document.querySelector("main");
    if (!node) return;
    const dataUrl = await toPng(node as HTMLElement, { cacheBust: true, pixelRatio: 2 });
    const link = document.createElement("a");
    link.download = "dashboard.png";
    link.href = dataUrl;
    link.click();
  };
  return (
    <button
      onClick={handle}
      className="fixed bottom-6 left-6 z-40 rounded-full bg-accent px-4 py-2 text-white shadow-lg hover:opacity-90"
      style={{ backgroundColor: "var(--accent)" }}
    >
      Snapshot
    </button>
  );
}

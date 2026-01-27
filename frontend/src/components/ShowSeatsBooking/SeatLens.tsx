import { useRef, useState } from "react";

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export function ZoomableLayout({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [scale, setScale] = useState(1);

  const MIN_SCALE = 0.1;
  const MAX_SCALE = 2.5;
  const STEP = 0.05;
  const zoomOut = () => setScale((s) => clamp(s - STEP, MIN_SCALE, MAX_SCALE));

  const zoomIn = () => setScale((s) => clamp(s + STEP, MIN_SCALE, MAX_SCALE));
  const resetZoom = () => setScale(1);

  return (
    <div className="w-full">
      <div className="rounded-lg border border-gray-700 shadow-lg p-2">
        <div className="mb-2 flex items-center justify-between gap-2">
          <div className="flex-1 items-center">
            {" "}
            <p className="text-center font-bold text-xl">{title}</p>
          </div>

          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={zoomOut}
              className="rounded-md border border-gray-300 px-3 py-1 font-semibold text-sm"
              aria-label="Zoom out"
            >
              -
            </button>
            <button
              type="button"
              onClick={resetZoom}
              className="rounded-md border border-gray-300 px-3 py-1 font-semibold text-sm"
              aria-label="Reset zoom"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={zoomIn}
              className="rounded-md border border-gray-300 px-3 py-1 font-semibold text-sm"
              aria-label="Zoom in"
            >
              +
            </button>
            <span className="w-12 text-right text-gray-500 text-xs">
              {Math.round(scale * 100)}%
            </span>
          </div>
        </div>

        <div
          ref={containerRef}
          className="max-h-[80vh] overflow-x-auto overflow-y-auto"
          style={{
            overscrollBehavior: "contain",
          }}
        >
          <div
            className="mx-auto w-max"
            style={{
              transform: `scale(${scale})`,
              transformOrigin: "top center",
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

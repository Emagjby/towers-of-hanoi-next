"use client";

import { useMemo, useState, useEffect } from "react";
import { useHanoi } from "@/hooks/useHanoi";
import { Visualizer } from "@/components/hanoi/Visualizer";
import { Backdrop } from "@/components/hanoi/Backdrop";
import { Slider } from "@/components/ui/slider";
import { Controls } from "@/components/hanoi/Controls";
import { MobileControls } from "@/components/hanoi/MobileControls";

export default function Home() {
  const {
    state,
    setDiskCount,
    setFrom,
    setTo,
    setSpeedMs,
    setCurrent,
    actions,
  } = useHanoi();
  const {
    diskCount,
    from,
    to,
    snapshots,
    current,
    isPlaying,
    speedMs,
    total,
    currentSnapshot,
  } = state;
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsCompact(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxDisk = useMemo(() => {
    if (!currentSnapshot) return diskCount;
    const all = currentSnapshot.poles.flatMap((p) =>
      p.stack.map((d) => d.weight)
    );
    return Math.max(diskCount, ...(all.length ? all : [diskCount]));
  }, [currentSnapshot, diskCount]);

  return (
    <div className="min-h-dvh flex flex-col items-center justify-between p-0 sm:p-0">
      <Backdrop />
      {/* Header toolbar */}
      <div className="w-full max-w-3xl mx-auto pt-10 pb-8 px-4">
        {!isCompact ? (
          <Controls
            diskCount={diskCount}
            setDiskCount={setDiskCount}
            from={from}
            setFrom={setFrom}
            to={to}
            setTo={setTo}
            speedMs={speedMs}
            setSpeedMs={setSpeedMs}
          />
        ) : (
          <MobileControls
            diskCount={diskCount}
            setDiskCount={setDiskCount}
            from={from}
            setFrom={setFrom}
            to={to}
            setTo={setTo}
            speedMs={speedMs}
            setSpeedMs={setSpeedMs}
          />
        )}
      </div>

      {/* Visualizer glass panel */}
      <div className="w-full max-w-5xl mx-auto px-4">
        <div className="rounded-3xl border border-white/15 bg-white/5 backdrop-blur-xl px-2 sm:px-10 py-5 sm:py-8 mb-2 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
          <Visualizer snapshot={currentSnapshot} maxDisk={maxDisk} />
        </div>
        {/* Step slider */}
        <div className="pt-6 pb-0 px-1 sm:px-4 flex flex-col gap-3 items-center">
          <Slider
            value={[current]}
            min={0}
            max={Math.max(0, total - 1)}
            step={1}
            onValueChange={(v) => setCurrent(v[0] ?? 0)}
            aria-label="Step"
            className="w-full max-w-2xl"
          />
          <div className="flex items-center justify-between w-full max-w-2xl mx-auto text-sm opacity-85 mt-0">
            <span className="opacity-70">
              Step {total ? current + 1 : 0} / {total || 0}
            </span>
            <span className="opacity-50">
              {total ? `${Math.pow(2, diskCount) - 1} moves expected` : ""}
            </span>
          </div>
        </div>
        {/* Play controls - larger */}
        <div className="flex justify-center gap-5 max-sm:gap-2.5 mt-4 items-center">
          <button
            className="cursor-pointer rounded-full max-sm:p-2.5 p-5 border border-white/20 text-xl hover:bg-white/10 transition disabled:opacity-50"
            onClick={actions.prev}
            disabled={current === 0}
            aria-label="Prev"
          >
            <svg
              className="w-[34px] h-[34px] max-sm:w-[26px] max-sm:h-[26px]"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M15 6L9 12L15 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            className="cursor-pointer rounded-full max-sm:p-3 p-6 border border-white/20 text-xl hover:bg-white/10 transition disabled:opacity-50"
            onClick={actions.playPause}
            disabled={!snapshots.length}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <svg
                className="w-[42px] h-[42px] max-sm:w-[34px] max-sm:h-[34px]"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path d="M10 6H8v12h2V6Zm6 0h-2v12h2V6Z" fill="currentColor" />
              </svg>
            ) : (
              <svg
                className="w-[42px] h-[42px] max-sm:w-[34px] max-sm:h-[34px]"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path d="M8 5v14l11-7L8 5Z" fill="currentColor" />
              </svg>
            )}
          </button>
          <button
            className="cursor-pointer rounded-full max-sm:p-2.5 p-5 border border-white/20 text-xl hover:bg-white/10 transition disabled:opacity-50"
            onClick={actions.next}
            disabled={current >= total - 1}
            aria-label="Next"
          >
            <svg
              className="w-[34px] h-[34px] max-sm:w-[26px] max-sm:h-[26px]"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M9 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            className="cursor-pointer rounded-full max-sm:p-2.5 p-5 border border-white/20 ml-7 text-xl hover:bg-white/10 transition disabled:opacity-50"
            onClick={actions.reset}
            disabled={!snapshots.length}
            aria-label="Reset"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 640"
              className="w-[34px] h-[34px] max-sm:w-[26px] max-sm:h-[26px]"
              aria-hidden="true"
            >
              <path
                fill="currentColor"
                d="M88 256L232 256C241.7 256 250.5 250.2 254.2 241.2C257.9 232.2 255.9 221.9 249 215L202.3 168.3C277.6 109.7 386.6 115 455.8 184.2C530.8 259.2 530.8 380.7 455.8 455.7C380.8 530.7 259.3 530.7 184.3 455.7C174.1 445.5 165.3 434.4 157.9 422.7C148.4 407.8 128.6 403.4 113.7 412.9C98.8 422.4 94.4 442.2 103.9 457.1C113.7 472.7 125.4 487.5 139 501C239 601 401 601 501 501C601 401 601 239 501 139C406.8 44.7 257.3 39.3 156.7 122.8L105 71C98.1 64.2 87.8 62.1 78.8 65.8C69.8 69.5 64 78.3 64 88L64 232C64 245.3 74.7 256 88 256z"
              />
            </svg>
          </button>
        </div>
      </div>
      <footer className="w-full max-w-3xl mx-auto pt-8 pb-10 text-xs text-center opacity-50 select-none">
        &copy; {new Date().getFullYear()} — Towers of Hanoi Visualizer — Crafted
        by GenchoXD
      </footer>
    </div>
  );
}

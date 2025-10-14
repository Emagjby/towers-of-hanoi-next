"use client";

import React, { useMemo } from "react";
import type { Disk, Pole, Snapshot } from "@/lib/hanoiTypes";

export function Visualizer({
  snapshot,
  maxDisk,
}: {
  snapshot: Snapshot | null;
  maxDisk: number;
}) {
  const poles = useMemo(() => {
    return (
      snapshot?.poles ??
      [1, 2, 3].map((i) => ({
        index: i,
        name: String.fromCharCode(64 + i),
        stack: [] as Disk[],
      }))
    );
  }, [snapshot]);

  return (
    <div className="w-full aspect-[16/7] sm:aspect-[16/6] md:aspect-[16/5] grid grid-cols-3 gap-4 sm:gap-6 items-end">
      {poles.map((pole) => (
        <PoleColumn key={pole.index} pole={pole} maxDisk={maxDisk} />
      ))}
    </div>
  );
}

function PoleColumn({ pole, maxDisk }: { pole: Pole; maxDisk: number }) {
  const baseColor =
    ["#60a5fa", "#f59e0b", "#10b981"][pole.index - 1] ?? "#a78bfa";
  const gapPx = Math.max(2, 10 - Math.min(maxDisk, 10));
  return (
    <div className="relative h-full flex items-end justify-center">
      <div className="absolute bottom-[10.1%] left-1/2 -translate-x-1/2 h-[88%] w-1.5 rounded-t-full rounded-b-none bg-gradient-to-b from-white/10 to-white/25 opacity-60 mix-blend-soft-light z-0" />
      <div className="absolute bottom-[8%] left-0 right-0 h-1.5 rounded-full bg-gradient-to-r from-white/10 via-white/25 to-white/10 opacity-60 mix-blend-soft-light z-0" />
      <div
        className="w-full h-full flex flex-col-reverse items-center justify-start z-10 ml-[8px]"
        style={{ rowGap: `${gapPx}px`, paddingBottom: `${gapPx + 29}px` }}
      >
        {pole.stack.map((disk, idx) => (
          <DiskBar
            key={idx}
            weight={disk.weight}
            maxDisk={maxDisk}
            color={baseColor}
          />
        ))}
      </div>
      <div className="relative top-2 right-1/2 translate-x-1/2 text-xs opacity-70">
        {pole.name}
      </div>
    </div>
  );
}

function DiskBar({
  weight,
  maxDisk,
  color,
}: {
  weight: number;
  maxDisk: number;
  color: string;
}) {
  const widthPercent = 20 + (weight / maxDisk) * 70;
  const heightPx = Math.max(
    12,
    24 - Math.max(0, Math.min(maxDisk, 10) - 3) * 1.6
  );
  const style: React.CSSProperties = {
    width: `${widthPercent}%`,
    background: `${color}`,
    boxShadow: `0 6px 16px rgba(0,0,0,0.25)`,
    height: `${heightPx}px`,
  };
  return (
    <div
      className="rounded-full border border-white/20 transition-[width,transform] duration-300 ease-out flex items-center justify-center"
      style={style}
    >
      <p className="text-[12px] font-bold leading-none text-foreground/80 text-center w-full">
        {weight}
      </p>
    </div>
  );
}

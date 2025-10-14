"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Snapshot } from "@/lib/hanoiTypes";

export function useHanoi() {
  const [diskCount, setDiskCount] = useState<number>(3);
  const [from, setFrom] = useState<number>(1);
  const [to, setTo] = useState<number>(3);
  const [snapshots, setSnapshots] = useState<Snapshot[]>([]);
  const [current, setCurrent] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speedMs, setSpeedMs] = useState<number>(1000);

  const total = snapshots.length;

  const fetchSnapshots = useCallback(async () => {
    if (!diskCount || diskCount < 1 || diskCount > 10) return;
    const params = new URLSearchParams({
      diskCount: String(diskCount),
      from: String(from),
      to: String(to),
    });
    const res = await fetch(`/api/hanoi?${params.toString()}`);
    if (!res.ok) return;
    const data = (await res.json()) as { snapshots: Snapshot[] };
    setSnapshots(data.snapshots);
    setCurrent(0);
  }, [diskCount, from, to]);

  useEffect(() => {
    fetchSnapshots();
  }, [fetchSnapshots]);

  useEffect(() => {
    if (!isPlaying) return;
    if (current >= total - 1) {
      setIsPlaying(false);
      return;
    }
    const id = setTimeout(
      () => setCurrent((c) => Math.min(c + 1, total - 1)),
      speedMs
    );
    return () => clearTimeout(id);
  }, [isPlaying, current, total, speedMs]);

  const currentSnapshot = useMemo(
    () => snapshots[current] ?? null,
    [snapshots, current]
  );

  function prev() {
    setIsPlaying(false);
    setCurrent((c) => Math.max(0, c - 1));
  }
  function next() {
    setIsPlaying(false);
    setCurrent((c) => Math.min(total - 1, c + 1));
  }
  function playPause() {
    if (!snapshots.length) return;
    if (current >= total - 1) setCurrent(0);
    setIsPlaying((p) => !p);
  }
  function reset() {
    setIsPlaying(false);
    setCurrent(0);
  }

  return {
    state: {
      diskCount,
      from,
      to,
      snapshots,
      current,
      isPlaying,
      speedMs,
      total,
      currentSnapshot,
    },
    setDiskCount,
    setFrom,
    setTo,
    setSpeedMs,
    setCurrent,
    actions: { fetchSnapshots, prev, next, playPause, reset },
  } as const;
}

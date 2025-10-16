import { useState, useEffect } from "react";

import { Slider } from "../ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronRight, Settings } from "lucide-react";

export function MobileControls({
  diskCount,
  setDiskCount,
  from,
  setFrom,
  to,
  setTo,
  speedMs,
  setSpeedMs,
}: {
  diskCount: number;
  setDiskCount: (diskCount: number) => void;
  from: number;
  setFrom: (from: number) => void;
  to: number;
  setTo: (to: number) => void;
  speedMs: number;
  setSpeedMs: (speedMs: number) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full">
      {/* Header */}
      <div
        className="flex flex-row items-center justify-between glass-input py-4 px-6 rounded-2xl shadow-xl cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <ChevronRight
          className={`transition-transform duration-300 ${isOpen ? "rotate-90" : "rotate-0"}`}
        />
        <div className="flex flex-row items-center">
          <Settings className="text-gray-500" size={16} />
          <span className="text-gray-500 text-xs font-medium ml-2">
            Settings
          </span>
        </div>
        <div className="w-6 h-6"></div>
      </div>

      {/* Sliding panel */}
      <div
        className={`transition-all duration-300 ease-in-out transform origin-top ${
          isOpen
            ? "translate-y-0 opacity-100 max-h-[500px]"
            : "-translate-y-4 opacity-0 max-h-0"
        } overflow-hidden`}
      >
        <div
          className="flex flex-col gap-6 glass-input rounded-2xl shadow-inner mt-2 p-6 px-8"
          style={{ borderRadius: "28px" }}
        >
          {/* Disk slider */}
          <div className="flex flex-row items-center justify-between">
            <label className="text-xs font-medium opacity-70">Disks</label>
            <Slider
              value={[diskCount]}
              min={1}
              max={10}
              step={1}
              onValueChange={(v) => setDiskCount(v[0] ?? diskCount)}
              aria-label="Disks"
              className="w-full mx-4"
            />
            <span className="text-xs opacity-60">{diskCount}</span>
          </div>

          {/* From */}
          <div className="flex flex-row items-center justify-between w-full">
            <label className="text-xs font-medium opacity-70">From</label>
            <Select
              value={String(from)}
              onValueChange={(v) => setFrom(Number(v))}
            >
              <SelectTrigger className="w-full ml-4">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 (A)</SelectItem>
                <SelectItem value="2">2 (B)</SelectItem>
                <SelectItem value="3">3 (C)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* To */}
          <div className="flex flex-row items-center justify-between w-full">
            <label className="text-xs font-medium opacity-70 w-8">To</label>
            <Select value={String(to)} onValueChange={(v) => setTo(Number(v))}>
              <SelectTrigger className="w-full ml-4">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 (A)</SelectItem>
                <SelectItem value="2">2 (B)</SelectItem>
                <SelectItem value="3">3 (C)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Speed */}
          <div className="flex flex-row items-center justify-between">
            <label className="text-xs font-medium opacity-70">Speed</label>
            <Slider
              value={[1500 - (speedMs - 100)]}
              min={100}
              max={1500}
              step={50}
              onValueChange={(v) => setSpeedMs(1500 - (v[0] - 100))}
              aria-label="Speed"
              className="w-full mx-4"
            />
            <span className="text-xs opacity-60">
              {(1000 / speedMs).toFixed(1)}x
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

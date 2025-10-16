import { Slider } from "../ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function Controls({
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
  return (
    <div className="flex flex-wrap gap-8 items-center justify-center glass-input py-4 px-3 sm:px-6 rounded-2xl shadow-xl">
      <div>
        <label className="block mb-3 text-xs font-medium opacity-70">
          Disks
        </label>
        <div className="w-36">
          <Slider
            value={[diskCount]}
            min={1}
            max={10}
            step={1}
            onValueChange={(v) => setDiskCount(v[0] ?? diskCount)}
            aria-label="Disks"
          />
        </div>
        <div className="text-xs text-center mt-2 opacity-60">{diskCount}</div>
      </div>
      <div>
        <label className="block mb-1 text-xs font-medium opacity-70">
          From
        </label>
        <Select value={String(from)} onValueChange={(v) => setFrom(Number(v))}>
          <SelectTrigger className="w-24 cursor-pointer">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1" className="cursor-pointer">
              1 (A)
            </SelectItem>
            <SelectItem value="2" className="cursor-pointer">
              2 (B)
            </SelectItem>
            <SelectItem value="3" className="cursor-pointer">
              3 (C)
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <label className="block mb-1 text-xs font-medium opacity-70">To</label>
        <Select value={String(to)} onValueChange={(v) => setTo(Number(v))}>
          <SelectTrigger className="w-24 cursor-pointer">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1" className="cursor-pointer">
              1 (A)
            </SelectItem>
            <SelectItem value="2" className="cursor-pointer">
              2 (B)
            </SelectItem>
            <SelectItem value="3" className="cursor-pointer">
              3 (C)
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="mt-2 sm:mt-0">
        <label className="block mb-3 text-xs font-medium opacity-70">
          Speed
        </label>
        <div className="w-36">
          <Slider
            value={[1500 - (speedMs - 100)]} // invert the value
            min={100}
            max={1500}
            step={50}
            onValueChange={(v) => setSpeedMs(1500 - (v[0] - 100))}
            aria-label="Speed"
          />
        </div>
        <div className="text-xs text-center mt-2 opacity-60">
          {(1000 / speedMs).toFixed(1)}x
        </div>
      </div>
    </div>
  );
}

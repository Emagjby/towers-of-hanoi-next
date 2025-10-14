"use client";

export function Backdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_20%_-10%,rgba(99,102,241,0.25),transparent),radial-gradient(1000px_500px_at_100%_10%,rgba(16,185,129,0.2),transparent)]" />
      <div className="absolute inset-0 backdrop-blur-[2px]" />
    </div>
  );
}

export type Disk = { weight: number };
export type Pole = { index: number; name: string; stack: Disk[] };
export type Snapshot = { poles: Pole[] };

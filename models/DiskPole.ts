import { Disk } from "./Disk";

export class DiskPole {
  index: number;
  name: string;
  stack: Disk[];

  constructor(index: number, name: string) {
    if (index < 1) throw new Error("Index must be >= 1");
    if (!name) throw new Error("Name cannot be empty");

    this.index = index;
    this.name = name;
    this.stack = [];
  }

  push(disk: Disk) {
    this.stack.push(disk);
  }

  pop(): Disk {
    if (this.stack.length === 0) throw new Error("Pole is empty");
    return this.stack.pop()!;
  }

  topToBottom(): Disk[] {
    return [...this.stack].reverse();
  }
}

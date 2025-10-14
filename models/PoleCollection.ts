import { DiskPole } from "./DiskPole";
import { Disk } from "./Disk";

export class PoleCollection {
  poles: DiskPole[];

  constructor(first: DiskPole, second: DiskPole, third: DiskPole) {
    this.poles = [first, second, third];
  }

  moveDisk(from: number, to: number) {
    this.poles[to - 1].push(this.poles[from - 1].pop());
  }

  clone(): PoleCollection {
    const copyPoles = this.poles.map((p) => {
      const newPole = new DiskPole(p.index, p.name);
      newPole.stack = [...p.stack.map((d) => new Disk(d.weight))];
      return newPole;
    });
    return new PoleCollection(copyPoles[0], copyPoles[1], copyPoles[2]);
  }
}

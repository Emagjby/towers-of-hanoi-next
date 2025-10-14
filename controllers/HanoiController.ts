import { Disk } from "../models/Disk";
import { DiskPole } from "../models/DiskPole";
import { PoleCollection } from "../models/PoleCollection";
import { Overseer } from "../models/Overseer";

export class HanoiController {
  overseer: Overseer;
  currentState!: PoleCollection;

  constructor() {
    this.overseer = new Overseer();
  }

  initializeHanoi(diskCount: number, from: number, to: number): Overseer {
    this.currentState = new PoleCollection(
      new DiskPole(1, "A"),
      new DiskPole(2, "B"),
      new DiskPole(3, "C")
    );

    for (let i = diskCount; i >= 1; i--) {
      this.currentState.poles[from - 1].push(new Disk(i));
    }

    this.runSolution(diskCount, from, to);

    this.overseer.recordState(this.currentState);

    return this.overseer;
  }

  private performMove(from: number, to: number) {
    this.overseer.recordState(this.currentState);
    this.currentState.moveDisk(from, to);
  }

  private runSolution(n: number, from: number, to: number) {
    if (n === 1) {
      this.performMove(from, to);
      return;
    }

    const aux = 6 - (from + to);
    this.runSolution(n - 1, from, aux);
    this.performMove(from, to);
    this.runSolution(n - 1, aux, to);
  }
}

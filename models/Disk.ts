export class Disk {
  weight: number;

  constructor(weight: number) {
    if (weight < 1) throw new Error("Weight must be positive");
    this.weight = weight;
  }
}

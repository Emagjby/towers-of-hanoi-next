import { PoleCollection } from "./PoleCollection";

export class Overseer {
  snapshots: PoleCollection[] = [];

  recordState(state: PoleCollection) {
    this.snapshots.push(state.clone());
  }
}

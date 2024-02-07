import { EqualsTrait } from "../general/EqualsTrait";

export class FretAction implements EqualsTrait {
  static readonly MUTE: FretAction = new FretAction(true, false, null);
  static readonly OPEN: FretAction = new FretAction(false, true, null);

  public readonly fretHeld: number | null;
  public readonly isMute: boolean;
  public readonly isOpen: boolean;
  public readonly representation: string;

  constructor(isMute: boolean, isOpen: boolean, fretHeld: number | null = null) {
    this.isMute = isMute;
    this.isOpen = isOpen;
    this.fretHeld = fretHeld;

    if (isMute) {
      this.representation = "X";
    } else if (isOpen) {
      this.representation = "O";
    } else {
      this.representation = fretHeld?.toString() || "";
    }
  }

  static hold(fretNumber: number): FretAction {
    return new FretAction(false, false, fretNumber);
  }

  equals(obj: any): boolean {
    if (!(obj instanceof FretAction)) {
      return false;
    }

    const objFretAction: FretAction = obj;
    if (this.isMute) {
      return objFretAction.isMute;
    }

    if (this.isOpen) {
      return objFretAction.isOpen;
    }

    return this.fretHeld === objFretAction.fretHeld;
  }

  hashCode(): number {
    if (this.isMute) {
      return -2;
    } else if (this.isOpen) {
      return -1;
    } else {
      return this.fretHeld || 0;
    }
  }

  getFretHeld(): number | null {
    return this.fretHeld;
  }

  getFretSounding(): number | null {
    if (this.isMute) {
      return null;
    } else if (this.isOpen) {
      return 0;
    } else {
      return this.fretHeld;
    }
  }

  toString(): string {
    return this.representation;
  }
}
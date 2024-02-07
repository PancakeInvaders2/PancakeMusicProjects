import { EqualsTrait } from "../general/EqualsTrait";

export class Note implements EqualsTrait {

  static A: Note = new Note(0, "A", null);
  static A_SHARP: Note = new Note(1, "A#", "Bb");
  static B: Note = new Note(2, "B", null);
  static C: Note = new Note(3, "C", null);
  static C_SHARP: Note = new Note(4, "C#", "Db");
  static D: Note = new Note(5, "D", null);
  static D_SHARP: Note = new Note(6, "D#", "Eb");
  static E: Note = new Note(7, "E", null);
  static F: Note = new Note(8, "F", null);
  static F_SHARP: Note = new Note(9, "F#", "Gb");
  static G: Note = new Note(10, "G", null);
  static G_SHARP: Note = new Note(11, "G#", "Ab");

  public static values: Note[] = [
    Note.A, Note.A_SHARP, Note.B, Note.C, Note.C_SHARP, Note.D, Note.D_SHARP, Note.E, Note.F, Note.F_SHARP, Note.G, Note.G_SHARP
  ];

  static initializeMapOfSemitonesFromA(): Map<number, Note> {
    const mapOfSemitonesFromA: Map<number, Note> = new Map();
    Note.values.forEach(note => {
      mapOfSemitonesFromA.set(note.semitonesFromA, note);
    });
    return mapOfSemitonesFromA;
  }

  static mapOfSemitonesFromA: Map<number, Note> = Note.initializeMapOfSemitonesFromA();

  readonly semitonesFromA: number;
  readonly mainRepresentation: string;
  readonly secondaryRepresentation: string | null;

  private constructor(semitonesFromA: number, mainRepresentation: string, secondaryRepresentation: string | null) {
    this.semitonesFromA = semitonesFromA;
    this.mainRepresentation = mainRepresentation;
    this.secondaryRepresentation = secondaryRepresentation;
  }

  equals(other: any): boolean {
    if (!(other instanceof Note)) {
      return false;
    }
    return this.semitonesFromA == other.semitonesFromA;
  }

  /**
   * Example: input: 3 -> return: C
   *
   * @param semitonesFromA
   * @returns
   */
  static noteBySemitonesFromA(semitonesFromA: number): Note | null {
    if (semitonesFromA < 0 || semitonesFromA > 11) {
      return null;
    }
    return this.mapOfSemitonesFromA.get(semitonesFromA) || null;
  }

  toString(): string {
    return this.mainRepresentation;
  }

  fullRepresentation(): string {
    return this.secondaryRepresentation === null
      ? this.mainRepresentation
      : `${this.mainRepresentation}/${this.secondaryRepresentation}`;
  }

  up(semitones: number): Note {
    if (semitones === 0) {
      return this;
    }

    let newNoteSemitonesFromA = this.semitonesFromA + semitones;
    while (newNoteSemitonesFromA > 11) {
      newNoteSemitonesFromA -= 12;
    }

    return Note.noteBySemitonesFromA(newNoteSemitonesFromA) || this;
  }

  down(semitones: number): Note {
    if (semitones === 0) {
      return this;
    }

    let newNoteSemitonesFromA = this.semitonesFromA - semitones;
    while (newNoteSemitonesFromA < 0) {
      newNoteSemitonesFromA += 12;
    }

    return Note.noteBySemitonesFromA(newNoteSemitonesFromA) || this;
  }
}


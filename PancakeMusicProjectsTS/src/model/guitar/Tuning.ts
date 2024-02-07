import { Note } from "../musictheory/Note.js";
import { NoteAndOctave } from "../musictheory/NoteAndOctave.js";
import { EqualsTrait } from "../general/EqualsTrait.js";

export class Tuning implements EqualsTrait {

  public static STANDARD_7_STRING_GUITAR = new Tuning("STANDARD_7_STRING_GUITAR", [
    new NoteAndOctave(Note.B, 2),
    new NoteAndOctave(Note.E, 2),
    new NoteAndOctave(Note.A, 3),
    new NoteAndOctave(Note.D, 3),
    new NoteAndOctave(Note.G, 3),
    new NoteAndOctave(Note.B, 4),
    new NoteAndOctave(Note.E, 4)
  ]);

  public static DROP_A_7_STRING_GUITAR = new Tuning("DROP_A_7_STRING_GUITAR", [
    new NoteAndOctave(Note.A, 2),
    new NoteAndOctave(Note.E, 2),
    new NoteAndOctave(Note.A, 3),
    new NoteAndOctave(Note.D, 3),
    new NoteAndOctave(Note.G, 3),
    new NoteAndOctave(Note.B, 4),
    new NoteAndOctave(Note.E, 4)
  ]);

  public static STANDARD_6_STRING_GUITAR = new Tuning("STANDARD_6_STRING_GUITAR", [
    new NoteAndOctave(Note.E, 2),
    new NoteAndOctave(Note.A, 3),
    new NoteAndOctave(Note.D, 3),
    new NoteAndOctave(Note.G, 3),
    new NoteAndOctave(Note.B, 4),
    new NoteAndOctave(Note.E, 4)
  ]);

  public static DROP_D_6_STRING_GUITAR = new Tuning("DROP_D_6_STRING_GUITAR", [
    new NoteAndOctave(Note.D, 2),
    new NoteAndOctave(Note.A, 3),
    new NoteAndOctave(Note.D, 3),
    new NoteAndOctave(Note.G, 3),
    new NoteAndOctave(Note.B, 4),
    new NoteAndOctave(Note.E, 4)
  ]);

  public static DADGAD_6_STRING_GUITAR = new Tuning("DADGAD_6_STRING_GUITAR", [
    new NoteAndOctave(Note.D, 2),
    new NoteAndOctave(Note.A, 3),
    new NoteAndOctave(Note.D, 3),
    new NoteAndOctave(Note.G, 3),
    new NoteAndOctave(Note.A, 4),
    new NoteAndOctave(Note.D, 4)
  ]);

  public static STANDARD_4_STRING_BASS = new Tuning("STANDARD_4_STRING_BASS", [
    new NoteAndOctave(Note.E, 1),
    new NoteAndOctave(Note.A, 2),
    new NoteAndOctave(Note.D, 2),
    new NoteAndOctave(Note.G, 2)
  ]);

  public static STANDARD_5_STRING_BASS = new Tuning("STANDARD_5_STRING_BASS", [
    new NoteAndOctave(Note.B, 1),
    new NoteAndOctave(Note.E, 1),
    new NoteAndOctave(Note.A, 2),
    new NoteAndOctave(Note.D, 2),
    new NoteAndOctave(Note.G, 2)
  ]);

  public static STANDARD_6_STRING_BASS = new Tuning("STANDARD_6_STRING_BASS", [
    new NoteAndOctave(Note.B, 1),
    new NoteAndOctave(Note.E, 1),
    new NoteAndOctave(Note.A, 2),
    new NoteAndOctave(Note.D, 2),
    new NoteAndOctave(Note.G, 2),
    new NoteAndOctave(Note.C, 3),
  ]);

  public static STANDARD_4_COURSES_MANDOLIN = new Tuning("STANDARD_4_COURSES_MANDOLIN", [
    new NoteAndOctave(Note.G, 3),
    new NoteAndOctave(Note.D, 4),
    new NoteAndOctave(Note.A, 4),
    new NoteAndOctave(Note.E, 5)
  ]);

  public static STANDARD_4_STRING_UKULELE = new Tuning("STANDARD_4_STRING_UKULELE", [
    new NoteAndOctave(Note.G, 4),
    new NoteAndOctave(Note.C, 4),
    new NoteAndOctave(Note.E, 4),
    new NoteAndOctave(Note.A, 4)
  ]);

  private static addNameAndValue(map: Map<string, Tuning>, tuning: Tuning): void {
    map.set(tuning.name, tuning);
  }

  private static initAvailableTunings() : Map<string, Tuning> {
    const map: Map<string, Tuning> = new Map();

    Tuning.addNameAndValue(map, Tuning.STANDARD_6_STRING_GUITAR);
    Tuning.addNameAndValue(map, Tuning.STANDARD_7_STRING_GUITAR);
    Tuning.addNameAndValue(map, Tuning.DROP_D_6_STRING_GUITAR);
    Tuning.addNameAndValue(map, Tuning.DROP_A_7_STRING_GUITAR);
    Tuning.addNameAndValue(map, Tuning.DADGAD_6_STRING_GUITAR);
    Tuning.addNameAndValue(map, Tuning.STANDARD_4_STRING_BASS);
    Tuning.addNameAndValue(map, Tuning.STANDARD_5_STRING_BASS);
    Tuning.addNameAndValue(map, Tuning.STANDARD_6_STRING_BASS);
    Tuning.addNameAndValue(map, Tuning.STANDARD_4_COURSES_MANDOLIN);
    Tuning.addNameAndValue(map, Tuning.STANDARD_4_STRING_UKULELE);

    return map;
  }

  public static availableTunings : Map<string, Tuning> = Tuning.initAvailableTunings();


  public static getTuningByName(name: string): Tuning | null {
    for (const [tuningName, tuning] of Tuning.availableTunings) {
      if (tuningName === name) {
        return tuning;
      }
    }
    return null;
  }

  readonly stringNotes: Map<number, NoteAndOctave>;
  readonly name: string;

  constructor(name: string, stringTunings: NoteAndOctave[]) {
    this.name = name;
    let map: Map<number, NoteAndOctave> = new Map();
    let i = 0;
    for (const stringTuning of stringTunings) {
      map.set(i, stringTuning);
      i++;
    }

    this.stringNotes = map;
  }

  public getStringNotes(): Map<number, NoteAndOctave> {
    return this.stringNotes;
  }

  public getNumberOfStrings(): number {
    return this.stringNotes.size;
  }

  equals(other: any): boolean {

    if (!(other instanceof Tuning)) {
      return false;
    }

    if (this.stringNotes.size !== other.stringNotes.size) {
      return false;
    }

    for (const [guitarString, note] of this.stringNotes) {
      const otherNote = other.stringNotes.get(guitarString);

      if (!otherNote) {
        return false;
      }

      if (note !== otherNote && !note.equals(otherNote)) {
        return false;
      }
    }

    return true;
  }

  toString(): string {
    const stringArray: string[] = [];
    for (const [gs, stringNote] of this.stringNotes) {
      stringArray.push("" + gs + "=" + stringNote.toString());
    }
    return stringArray.join(' ');
  }
}
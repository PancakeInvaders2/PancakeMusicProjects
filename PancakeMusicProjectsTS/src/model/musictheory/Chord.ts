import { EqualsTrait } from "../general/EqualsTrait.js";
import { Note } from "./Note.js";

export class Chord implements EqualsTrait {
  private readonly notes: Set<Note> = new Set();
  private readonly computedChordTypes: string[] = [];

  constructor() {}

  getNotes(): Set<Note> {
    return this.notes;
  }

  plus(note: Note): Chord {
    const chord = new Chord();
    this.notes.forEach((existingNote) => chord.getNotes().add(existingNote));
    chord.getNotes().add(note);
    return chord;
  }

  noteRepresentation(): string {
    return [...this.notes].join(' ');
  }

  toString(): string {
    return `${this.getComputedChordTypes()} (${this.noteRepresentation()})`;
  }

  namedChords(): string[] {
    return this.getComputedChordTypes().map((chordType) => `${chordType} (${this.noteRepresentation()})`);
  }

  getComputedChordTypes(): string[] {
    return this.computedChordTypes;
  }

  isContainedIn(other: Chord): boolean {
    return [...this.notes].every((note) => other.getNotes().has(note));
  }

  equals(other: any): boolean {

    if(!(other instanceof Chord)){
      return false;
    }

    if (this.getNotes().size !== other.getNotes().size) {
      return false;
    }

    for (const note of this.getNotes()) {
      if (!other.notes.has(note)) {
        return false;
      }
    }

    return true;
  }
}
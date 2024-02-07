import { EqualsTrait } from "../general/EqualsTrait.js";
import { Note } from "../musictheory/Note.js";
import { WhistleFingering } from "./WhistleFingering.js";

export class NoteAndFingering implements EqualsTrait {
  private readonly note: Note;
  private readonly fingering: WhistleFingering;

  constructor(note: Note, fingering: WhistleFingering) {
    this.note = note;
    this.fingering = fingering;
  }
  equals(other: any): boolean {

    if(!(other instanceof NoteAndFingering)){
      return false;
    }

    return this.note.equals(other.note)
      && this.fingering.equals(other.fingering);

  }

  getNote(): Note {
    return this.note;
  }

  getFingering(): WhistleFingering {
    return this.fingering;
  }

}
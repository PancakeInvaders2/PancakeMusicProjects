import { EqualsTrait } from "../general/EqualsTrait.js";
import { Note } from "../musictheory/Note.js";
import { WhistleFingering } from "./WhistleFingering.js";
import { WhistleFingerings } from "./WhistleFingerings.js";

export class SevenHoleWhistle6Front1Flat6LowerBackThumb implements EqualsTrait{
    private baseNote: Note;
    private naturalNotes: Set<NoteAndFingering> | null = null;
    private crossFingeredNotes: Set<NoteAndFingering> | null = null;
    private allPossibleNotes: Set<NoteAndFingering> | null = null;
  
    constructor(baseNote: Note) {
      this.baseNote = baseNote;
    }
    equals(other: any): boolean {
      if(!(other instanceof SevenHoleWhistle6Front1Flat6LowerBackThumb)){
        return false;
      }
      return this.baseNote.equals(other.baseNote);
    }
  
    public getNaturalNotes(): Set<NoteAndFingering> {
      if (this.naturalNotes === null) {
        const notes = new Set<NoteAndFingering>();
        for (const naturalFingering of WhistleFingerings.naturalFingeringsWithLowerBackThumbHole) {
          notes.add(new NoteAndFingering(this.baseNote.up(naturalFingering.getSemitonesFromRoot()), naturalFingering));
        }
        this.naturalNotes = notes;
      }
      return this.naturalNotes;
    }
  
    public getCrossFingeredNotes(): Set<NoteAndFingering> {
      if (this.crossFingeredNotes === null) {
        const notes = new Set<NoteAndFingering>();
        for (const crossFingering of WhistleFingerings.crossFingeringsWithLowerBackFlat6ThumbHole) {
          notes.add(new NoteAndFingering(this.baseNote.up(crossFingering.getSemitonesFromRoot()), crossFingering));
        }
        this.crossFingeredNotes = notes;
      }
      return this.crossFingeredNotes;
    }
  
    public getAllPossibleNotesWithFingerings(): Set<NoteAndFingering> {
      if (this.allPossibleNotes === null) {
        this.allPossibleNotes = new Set([...this.getNaturalNotes(), ...this.getCrossFingeredNotes()]);
      }
      return this.allPossibleNotes;
    }
  
    public getAllPossibleNotes(): Set<Note> {
      return new Set([...this.getAllPossibleNotesWithFingerings()].map(noteAndFingering => noteAndFingering.getNote()));
    }
  
    public getNeededCrossFingerings(scaleNotes: Note[]): NoteAndFingering[] {
      return [...this.getCrossFingeredNotes()].filter(noteAndFingering => scaleNotes.includes(noteAndFingering.getNote()));
    }
  
    public getFingerings(scaleNotes: Note[]): NoteAndFingering[] {
      return [...this.getAllPossibleNotesWithFingerings()].filter(noteAndFingering => scaleNotes.includes(noteAndFingering.getNote()));
    }
  }
  
  class NoteAndFingering {
    private note: Note;
    private fingering: WhistleFingering;
  
    constructor(note: Note, fingering: WhistleFingering) {
      this.note = note;
      this.fingering = fingering;
    }
  
    public getNote(): Note {
      return this.note;
    }
  
    public getFingering(): WhistleFingering {
      return this.fingering;
    }
  }
import { EqualsTrait } from '../general/EqualsTrait.js';
import { Note } from './Note.js';

export class NoteAndOctave implements EqualsTrait {
    public readonly note: Note;
    public readonly octave: number;
  
    static A_440: NoteAndOctave = new NoteAndOctave(Note.A, 4);
  
    constructor(note: Note, octave: number) {
      this.note = note;
      this.octave = octave;
    }
  
    up(semitones: number): NoteAndOctave {
      let baseNoteOctave = this.octave;
      let baseNoteNote = this.note;
  
      let newNoteSemitonesFromA = baseNoteNote.semitonesFromA + semitones;
      let newNoteOctave = baseNoteOctave;
  
      while (newNoteSemitonesFromA > 11) {
        newNoteSemitonesFromA -= 12;
        newNoteOctave += 1;
      }
  
      let newNote = Note.noteBySemitonesFromA(newNoteSemitonesFromA);
  
      return new NoteAndOctave(newNote!, newNoteOctave); // Note that the return type can be null, so use `!` as an assertion.
    }
  
    down(semitones: number): NoteAndOctave {
      let baseNoteOctave = this.octave;
      let baseNoteNote = this.note;
  
      let newNoteSemitonesFromA = baseNoteNote.semitonesFromA - semitones;
      let newNoteOctave = baseNoteOctave;
  
      while (newNoteSemitonesFromA < 0) {
        newNoteSemitonesFromA += 12;
        newNoteOctave -= 1;
      }
  
      let newNote = Note.noteBySemitonesFromA(newNoteSemitonesFromA);
  
      return new NoteAndOctave(newNote!, newNoteOctave); // Note that the return type can be null, so use `!` as an assertion.
    }
  
    toString(): string {
      return `${this.note}${this.octave}`;
    }
  
    getSemitonesFromA0(): number {
      return this.note.semitonesFromA + this.octave * 12;
    }
  
    isHigherThan(other: NoteAndOctave): boolean {
      return this.getSemitonesFromA0() > other.getSemitonesFromA0();
    }
  
    isLowerThan(other: NoteAndOctave): boolean {
      return this.getSemitonesFromA0() < other.getSemitonesFromA0();
    }

    equals(other: any): boolean {
        if (!(other instanceof NoteAndOctave)) {
          return false;
        }
        
        return this.note.equals(other.note) 
          && this.octave === other.octave;
      }

  }
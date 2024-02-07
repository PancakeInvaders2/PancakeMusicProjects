import { EqualsTrait } from '../general/EqualsTrait.js';
import { Chord } from './Chord.js';
import { Note } from './Note.js';

export class ChordConstructor implements EqualsTrait{
    private readonly name: string;
    private readonly chordConstructingfunction: (note: Note) => Chord;
  
    constructor(name: string, chordConstructingfunction: (note: Note) => Chord) {
      this.name = name;
      this.chordConstructingfunction = chordConstructingfunction;
    }
  
    constructChord(note: Note): Chord {
      return this.chordConstructingfunction(note);
    }
  
    getName(): string {
      return this.name;
    }
  
    equals(other: any): boolean {
      if (!(other instanceof ChordConstructor)) {
        return false;
      }
  
      const thisChord = this.constructChord(Note.A);
      const otherChord = other.constructChord(Note.A);
  
      if (thisChord === null) {
        return otherChord === null;
      }
  
      return thisChord.equals(otherChord);
    }
  }
import { Chord } from "../model/musictheory/Chord.js";
import { Interval } from "../model/musictheory/Interval.js";
import { ChordConstructor } from "../model/musictheory/ChordConstructor.js";
import { Note } from "../model/musictheory/Note.js";

export class ChordService {

  static isChordAroundThisCenter(chordsToSearch: Set<ChordConstructor>, noteCenter: Note, chord: Chord): string | null {
    for (const chordConstructor of chordsToSearch) {
      const constructedChord = chordConstructor.constructChord(noteCenter);
      if (constructedChord.equals(chord)) {
        return `${noteCenter} ${chordConstructor.getName()}`;
      }
    }
    return null;
  }

  static customChord(note: Note, intervals: Interval[]): Chord {
    const chord = new Chord();

    for (const interval of intervals) {
      chord.getNotes().add(note.up(interval.semitones));
    }
    
    return chord;
  }

  powerChord(note: Note): Chord {
    const chord = new Chord();
    chord.getNotes().add(note);
    chord.getNotes().add(note.up(7));
    return chord;
  }

  minorTriad(note: Note): Chord {
    const chord = new Chord();
    chord.getNotes().add(note);
    chord.getNotes().add(note.up(3));
    chord.getNotes().add(note.up(7));
    return chord;
  }

  minorTriadMaj7(note: Note): Chord {
    const chord = new Chord();
    chord.getNotes().add(note);
    chord.getNotes().add(note.up(3));
    chord.getNotes().add(note.up(7));
    chord.getNotes().add(note.up(11));
    return chord;
  }

  // ... (other chord methods)

  sus2Triad(note: Note): Chord {
    const chord = new Chord();
    chord.getNotes().add(note);
    chord.getNotes().add(note.up(2));
    chord.getNotes().add(note.up(7));
    return chord;
  }

  sus4Triad(note: Note): Chord {
    const chord = new Chord();
    chord.getNotes().add(note);
    chord.getNotes().add(note.up(5));
    chord.getNotes().add(note.up(7));
    return chord;
  }

  augmentedTriad(note: Note): Chord {
    const chord = new Chord();
    chord.getNotes().add(note);
    chord.getNotes().add(note.up(4));
    chord.getNotes().add(note.up(8));
    return chord;
  }

  diminishedTriad(note: Note): Chord {
    const chord = new Chord();
    chord.getNotes().add(note);
    chord.getNotes().add(note.up(3));
    chord.getNotes().add(note.up(6));
    return chord;
  }
}
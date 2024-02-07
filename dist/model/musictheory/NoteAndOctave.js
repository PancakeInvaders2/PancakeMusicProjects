import { Note } from './Note.js';
export class NoteAndOctave {
    note;
    octave;
    static A_440 = new NoteAndOctave(Note.A, 4);
    constructor(note, octave) {
        this.note = note;
        this.octave = octave;
    }
    up(semitones) {
        let baseNoteOctave = this.octave;
        let baseNoteNote = this.note;
        let newNoteSemitonesFromA = baseNoteNote.semitonesFromA + semitones;
        let newNoteOctave = baseNoteOctave;
        while (newNoteSemitonesFromA > 11) {
            newNoteSemitonesFromA -= 12;
            newNoteOctave += 1;
        }
        let newNote = Note.noteBySemitonesFromA(newNoteSemitonesFromA);
        return new NoteAndOctave(newNote, newNoteOctave); // Note that the return type can be null, so use `!` as an assertion.
    }
    down(semitones) {
        let baseNoteOctave = this.octave;
        let baseNoteNote = this.note;
        let newNoteSemitonesFromA = baseNoteNote.semitonesFromA - semitones;
        let newNoteOctave = baseNoteOctave;
        while (newNoteSemitonesFromA < 0) {
            newNoteSemitonesFromA += 12;
            newNoteOctave -= 1;
        }
        let newNote = Note.noteBySemitonesFromA(newNoteSemitonesFromA);
        return new NoteAndOctave(newNote, newNoteOctave); // Note that the return type can be null, so use `!` as an assertion.
    }
    toString() {
        return `${this.note}${this.octave}`;
    }
    getSemitonesFromA0() {
        return this.note.semitonesFromA + this.octave * 12;
    }
    isHigherThan(other) {
        return this.getSemitonesFromA0() > other.getSemitonesFromA0();
    }
    isLowerThan(other) {
        return this.getSemitonesFromA0() < other.getSemitonesFromA0();
    }
    equals(other) {
        if (!(other instanceof NoteAndOctave)) {
            return false;
        }
        return this.note.equals(other.note)
            && this.octave === other.octave;
    }
}

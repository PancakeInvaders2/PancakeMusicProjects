import { Note } from './Note.js';
export class ChordConstructor {
    name;
    chordConstructingfunction;
    constructor(name, chordConstructingfunction) {
        this.name = name;
        this.chordConstructingfunction = chordConstructingfunction;
    }
    constructChord(note) {
        return this.chordConstructingfunction(note);
    }
    getName() {
        return this.name;
    }
    equals(other) {
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

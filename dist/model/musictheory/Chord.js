export class Chord {
    notes = new Set();
    computedChordTypes = [];
    constructor() { }
    getNotes() {
        return this.notes;
    }
    plus(note) {
        const chord = new Chord();
        this.notes.forEach((existingNote) => chord.getNotes().add(existingNote));
        chord.getNotes().add(note);
        return chord;
    }
    noteRepresentation() {
        return [...this.notes].join(' ');
    }
    toString() {
        return `${this.getComputedChordTypes()} (${this.noteRepresentation()})`;
    }
    namedChords() {
        return this.getComputedChordTypes().map((chordType) => `${chordType} (${this.noteRepresentation()})`);
    }
    getComputedChordTypes() {
        return this.computedChordTypes;
    }
    isContainedIn(other) {
        return [...this.notes].every((note) => other.getNotes().has(note));
    }
    equals(other) {
        if (!(other instanceof Chord)) {
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

export class NoteAndFingering {
    note;
    fingering;
    constructor(note, fingering) {
        this.note = note;
        this.fingering = fingering;
    }
    equals(other) {
        if (!(other instanceof NoteAndFingering)) {
            return false;
        }
        return this.note.equals(other.note)
            && this.fingering.equals(other.fingering);
    }
    getNote() {
        return this.note;
    }
    getFingering() {
        return this.fingering;
    }
}

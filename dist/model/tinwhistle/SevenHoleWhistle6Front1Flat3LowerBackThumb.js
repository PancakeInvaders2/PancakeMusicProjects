import { WhistleFingerings } from "./WhistleFingerings.js";
export class SevenHoleWhistle6Front1Flat3LowerBackThumb {
    baseNote;
    naturalNotes = null;
    crossFingeredNotes = null;
    allPossibleNotes = null;
    constructor(baseNote) {
        this.baseNote = baseNote;
    }
    equals(other) {
        if (!(other instanceof SevenHoleWhistle6Front1Flat3LowerBackThumb)) {
            return false;
        }
        return this.baseNote.equals(other.baseNote);
    }
    getNaturalNotes() {
        if (this.naturalNotes === null) {
            const notes = new Set();
            for (const naturalFingering of WhistleFingerings.naturalFingeringsWithLowerBackThumbHole) {
                notes.add(new NoteAndFingering(this.baseNote.up(naturalFingering.getSemitonesFromRoot()), naturalFingering));
            }
            this.naturalNotes = notes;
        }
        return this.naturalNotes;
    }
    getCrossFingeredNotes() {
        if (this.crossFingeredNotes === null) {
            const notes = new Set();
            for (const crossFingering of WhistleFingerings.crossFingeringsWithLowerBackFlat3ThumbHole) {
                notes.add(new NoteAndFingering(this.baseNote.up(crossFingering.getSemitonesFromRoot()), crossFingering));
            }
            this.crossFingeredNotes = notes;
        }
        return this.crossFingeredNotes;
    }
    getAllPossibleNotesWithFingerings() {
        if (this.allPossibleNotes === null) {
            this.allPossibleNotes = new Set([...this.getNaturalNotes(), ...this.getCrossFingeredNotes()]);
        }
        return this.allPossibleNotes;
    }
    getAllPossibleNotes() {
        return new Set([...this.getAllPossibleNotesWithFingerings()].map(noteAndFingering => noteAndFingering.getNote()));
    }
    getNeededCrossFingerings(scaleNotes) {
        return [...this.getCrossFingeredNotes()].filter(noteAndFingering => scaleNotes.includes(noteAndFingering.getNote()));
    }
    getFingerings(scaleNotes) {
        return [...this.getAllPossibleNotesWithFingerings()].filter(noteAndFingering => scaleNotes.includes(noteAndFingering.getNote()));
    }
}
class NoteAndFingering {
    note;
    fingering;
    constructor(note, fingering) {
        this.note = note;
        this.fingering = fingering;
    }
    getNote() {
        return this.note;
    }
    getFingering() {
        return this.fingering;
    }
}

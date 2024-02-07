import { NoteAndFingering } from "./NoteAndFingering.js";
import { WhistleFingerings } from "./WhistleFingerings.js";
export class SixHoleWhistle {
    baseNote;
    naturalNotes = null;
    crossFingeredNotes = null;
    allPossibleNotes = null;
    constructor(baseNote) {
        this.baseNote = baseNote;
    }
    equals(other) {
        if (!(other instanceof SixHoleWhistle)) {
            return false;
        }
        return this.baseNote.equals(other.baseNote);
    }
    getCrossFingeredNotes() {
        if (this.crossFingeredNotes === null) {
            const notes = new Set();
            for (const crossFingering of WhistleFingerings.sixHolesCrossFingerings) {
                notes.add(new NoteAndFingering(this.baseNote.up(crossFingering.getSemitonesFromRoot()), crossFingering));
            }
            this.crossFingeredNotes = notes;
        }
        return this.crossFingeredNotes;
    }
    getNaturalNotes() {
        if (this.naturalNotes === null) {
            const notes = new Set();
            for (const naturalFingering of WhistleFingerings.naturalSixHolesFingerings) {
                notes.add(new NoteAndFingering(this.baseNote.up(naturalFingering.getSemitonesFromRoot()), naturalFingering));
            }
            this.naturalNotes = notes;
        }
        return this.naturalNotes;
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

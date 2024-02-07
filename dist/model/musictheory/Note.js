export class Note {
    static A = new Note(0, "A", null);
    static A_SHARP = new Note(1, "A#", "Bb");
    static B = new Note(2, "B", null);
    static C = new Note(3, "C", null);
    static C_SHARP = new Note(4, "C#", "Db");
    static D = new Note(5, "D", null);
    static D_SHARP = new Note(6, "D#", "Eb");
    static E = new Note(7, "E", null);
    static F = new Note(8, "F", null);
    static F_SHARP = new Note(9, "F#", "Gb");
    static G = new Note(10, "G", null);
    static G_SHARP = new Note(11, "G#", "Ab");
    static values = [
        Note.A, Note.A_SHARP, Note.B, Note.C, Note.C_SHARP, Note.D, Note.D_SHARP, Note.E, Note.F, Note.F_SHARP, Note.G, Note.G_SHARP
    ];
    static initializeMapOfSemitonesFromA() {
        const mapOfSemitonesFromA = new Map();
        Note.values.forEach(note => {
            mapOfSemitonesFromA.set(note.semitonesFromA, note);
        });
        return mapOfSemitonesFromA;
    }
    static mapOfSemitonesFromA = Note.initializeMapOfSemitonesFromA();
    semitonesFromA;
    mainRepresentation;
    secondaryRepresentation;
    constructor(semitonesFromA, mainRepresentation, secondaryRepresentation) {
        this.semitonesFromA = semitonesFromA;
        this.mainRepresentation = mainRepresentation;
        this.secondaryRepresentation = secondaryRepresentation;
    }
    equals(other) {
        if (!(other instanceof Note)) {
            return false;
        }
        return this.semitonesFromA == other.semitonesFromA;
    }
    /**
     * Example: input: 3 -> return: C
     *
     * @param semitonesFromA
     * @returns
     */
    static noteBySemitonesFromA(semitonesFromA) {
        if (semitonesFromA < 0 || semitonesFromA > 11) {
            return null;
        }
        return this.mapOfSemitonesFromA.get(semitonesFromA) || null;
    }
    toString() {
        return this.mainRepresentation;
    }
    fullRepresentation() {
        return this.secondaryRepresentation === null
            ? this.mainRepresentation
            : `${this.mainRepresentation}/${this.secondaryRepresentation}`;
    }
    up(semitones) {
        if (semitones === 0) {
            return this;
        }
        let newNoteSemitonesFromA = this.semitonesFromA + semitones;
        while (newNoteSemitonesFromA > 11) {
            newNoteSemitonesFromA -= 12;
        }
        return Note.noteBySemitonesFromA(newNoteSemitonesFromA) || this;
    }
    down(semitones) {
        if (semitones === 0) {
            return this;
        }
        let newNoteSemitonesFromA = this.semitonesFromA - semitones;
        while (newNoteSemitonesFromA < 0) {
            newNoteSemitonesFromA += 12;
        }
        return Note.noteBySemitonesFromA(newNoteSemitonesFromA) || this;
    }
}

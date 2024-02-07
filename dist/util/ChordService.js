import { Chord } from "../model/musictheory/Chord.js";
export class ChordService {
    static isChordAroundThisCenter(chordsToSearch, noteCenter, chord) {
        for (const chordConstructor of chordsToSearch) {
            const constructedChord = chordConstructor.constructChord(noteCenter);
            if (constructedChord.equals(chord)) {
                return `${noteCenter} ${chordConstructor.getName()}`;
            }
        }
        return null;
    }
    static customChord(note, intervals) {
        const chord = new Chord();
        for (const interval of intervals) {
            chord.getNotes().add(note.up(interval.semitones));
        }
        return chord;
    }
    powerChord(note) {
        const chord = new Chord();
        chord.getNotes().add(note);
        chord.getNotes().add(note.up(7));
        return chord;
    }
    minorTriad(note) {
        const chord = new Chord();
        chord.getNotes().add(note);
        chord.getNotes().add(note.up(3));
        chord.getNotes().add(note.up(7));
        return chord;
    }
    minorTriadMaj7(note) {
        const chord = new Chord();
        chord.getNotes().add(note);
        chord.getNotes().add(note.up(3));
        chord.getNotes().add(note.up(7));
        chord.getNotes().add(note.up(11));
        return chord;
    }
    // ... (other chord methods)
    sus2Triad(note) {
        const chord = new Chord();
        chord.getNotes().add(note);
        chord.getNotes().add(note.up(2));
        chord.getNotes().add(note.up(7));
        return chord;
    }
    sus4Triad(note) {
        const chord = new Chord();
        chord.getNotes().add(note);
        chord.getNotes().add(note.up(5));
        chord.getNotes().add(note.up(7));
        return chord;
    }
    augmentedTriad(note) {
        const chord = new Chord();
        chord.getNotes().add(note);
        chord.getNotes().add(note.up(4));
        chord.getNotes().add(note.up(8));
        return chord;
    }
    diminishedTriad(note) {
        const chord = new Chord();
        chord.getNotes().add(note);
        chord.getNotes().add(note.up(3));
        chord.getNotes().add(note.up(6));
        return chord;
    }
}

import { Chord } from "../musictheory/Chord.js";
import { Interval } from "../musictheory/Interval.js";
import { KeyAndRoot } from "./KeyAndRoot.js";
class ChordVoicing {
    frettings = new Map();
    representedChord = null;
    lastTuningUsed = null;
    hasSeveralTimesTheSameNoteOnTheSameOctave = false;
    compatibleKeysAndRoots = [];
    lowestFretPlaying = Number.MAX_SAFE_INTEGER;
    constructor(orderedFrettings = []) {
        for (let i = 0; i < orderedFrettings.length; i++) {
            this.frettings.set(i, orderedFrettings[i]);
        }
    }
    numberOfNonMutedStrings() {
        let numberOfNonMutedStrings = 0;
        for (const [, fretting] of this.frettings) {
            if (!fretting.isMute) {
                numberOfNonMutedStrings++;
            }
        }
        return numberOfNonMutedStrings;
    }
    getFrettings() {
        return this.frettings;
    }
    equals(other) {
        if (!(other instanceof ChordVoicing)) {
            return false;
        }
        if (this.frettings.size !== other.frettings.size) {
            return false;
        }
        for (const [guitarString, fretAction] of this.frettings) {
            const otherFretAction = other.frettings.get(guitarString);
            if (fretAction !== otherFretAction && !fretAction.equals(otherFretAction)) {
                return false;
            }
        }
        return true;
    }
    hashCode() {
        let result = 0;
        let multiplier = 30;
        for (const [guitarStringNumber, fretAction] of this.frettings.entries()) {
            result += multiplier * guitarStringNumber * fretAction.hashCode();
            multiplier++;
        }
        return result;
    }
    /**
     * if any
     *
     * @param notesPlaying
     * @param stringNoteSounding
     * @returns
     */
    anymatch(notesPlaying, stringNoteSounding) {
        for (let notePlaying of notesPlaying) {
            if (notePlaying.equals(stringNoteSounding)) {
                return true;
            }
        }
        return false;
    }
    postProcessing(tuning, keys) {
        const representedChordBeingCreated = new Chord();
        const notesPlaying = new Set();
        let duplicateOctavatedNotesPlaying = false;
        for (const [guitarString, fretAction] of this.frettings.entries()) {
            const stringBaseNote = tuning.getStringNotes().get(guitarString);
            const fretSounding = fretAction.getFretSounding();
            if (fretSounding !== null && fretSounding !== undefined && stringBaseNote !== undefined) {
                let stringNoteSounding;
                if (fretSounding === 0) {
                    stringNoteSounding = stringBaseNote;
                }
                else {
                    stringNoteSounding = stringBaseNote.up(fretSounding);
                    if (fretSounding < this.lowestFretPlaying) {
                        this.lowestFretPlaying = fretSounding;
                    }
                }
                if (this.anymatch(notesPlaying, stringNoteSounding)) {
                    duplicateOctavatedNotesPlaying = true;
                }
                notesPlaying.add(stringNoteSounding);
                representedChordBeingCreated.getNotes().add(stringNoteSounding.note);
            }
        }
        this.hasSeveralTimesTheSameNoteOnTheSameOctave = duplicateOctavatedNotesPlaying;
        this.representedChord = representedChordBeingCreated;
        this.lastTuningUsed = tuning;
        this.computeCompatibleWithAnyOfTheseKeys(keys);
    }
    getRepresentedChord() {
        return this.representedChord;
    }
    toString() {
        const stringArray = [];
        for (const [, fretAction] of this.frettings.entries()) {
            stringArray.push(fretAction.toString());
        }
        return stringArray.join(' ');
    }
    notesOnStrings() {
        const stringArray = [];
        for (const [guitarString, fretAction] of this.frettings.entries()) {
            const fretSounding = fretAction.getFretSounding();
            if (fretSounding === null || fretSounding === undefined) {
                stringArray.push(fretAction.toString());
            }
            else {
                const tuningNote = this.lastTuningUsed.getStringNotes().get(guitarString);
                const noteSounding = tuningNote.up(fretSounding);
                stringArray.push(noteSounding.toString());
            }
        }
        return stringArray.join(' ');
    }
    getFirstOccurrence(orderedNotes, note) {
        for (let i = 0; i < orderedNotes.length; i++) {
            if (orderedNotes[i].note === note) {
                return i;
            }
        }
        return null;
    }
    fullRepresentations(tuning, hideChordVoicingsThatDoNotHaveAThirdOrAFifth, hideSusChordVoicings, hideChordVoicingsWithNo5th, hideChordVoicingsWithb5, hideChordVoicingsWithsharp5, hideChordVoicingsWithb7, hideChordVoicingsWithAdd7, hideChordVoicingsWithb9, hideChordVoicingsWithAdd9, hideChordVoicingsWithb11, hideChordVoicingsWithAdd11, hideChordVoicingsWithb13, hideChordVoicingsWithAdd13) {
        const result = [];
        const orderedNotes = this.orderNotes(tuning);
        const listOfEntries = Array.from(this.getIntervalsFromRoots(tuning).entries());
        listOfEntries.sort((entry1, entry2) => {
            const firstOccurrence1 = this.getFirstOccurrence(orderedNotes, entry1[0]);
            const firstOccurrence2 = this.getFirstOccurrence(orderedNotes, entry2[0]);
            if (firstOccurrence1 !== null && firstOccurrence2 !== null) {
                return firstOccurrence1 - firstOccurrence2;
            }
            return 0;
        });
        for (const [root, intervals] of listOfEntries) {
            if (intervals.length > 1
                && (!hideChordVoicingsThatDoNotHaveAThirdOrAFifth
                    || this.hasAThirdOrAFifth(intervals))) {
                const sj = new Array();
                for (const interval of intervals) {
                    sj.push(interval.getName(intervals));
                }
                const representation = `${root} ${sj.join(' ')}`;
                if ((!hideSusChordVoicings || !this.hasFragment(representation, "sus"))
                    && (!hideChordVoicingsWithNo5th || !this.hasFragment(representation, "no5th"))
                    && (!hideChordVoicingsWithb5 || !this.hasFragment(representation, "b5"))
                    && (!hideChordVoicingsWithsharp5 || !this.hasFragment(representation, "#5"))
                    && (!hideChordVoicingsWithb7 || !this.hasFragment(representation, "b7"))
                    && (!hideChordVoicingsWithAdd7 || !this.hasFragment(representation, "add7"))
                    && (!hideChordVoicingsWithb9 || !this.hasFragment(representation, "b9"))
                    && (!hideChordVoicingsWithAdd9 || !this.hasFragment(representation, "add9"))
                    && (!hideChordVoicingsWithb11 || !this.hasFragment(representation, "b11"))
                    && (!hideChordVoicingsWithAdd11 || !this.hasFragment(representation, "add11"))
                    && (!hideChordVoicingsWithb13 || !this.hasFragment(representation, "b13"))
                    && (!hideChordVoicingsWithAdd13 || !this.hasFragment(representation, "add13"))) {
                    result.push(representation);
                }
            }
        }
        return result;
    }
    hasFragment(representation, fragment) {
        return representation.includes(fragment);
    }
    hasAThirdOrAFifth(intervals) {
        return intervals.includes(Interval.MIN3)
            || intervals.includes(Interval.MAJ3)
            || intervals.includes(Interval.PERF_FIFTH);
    }
    doAnyOfTheRepresentationsHaveAThirdOrAFifth(tuning) {
        const orderedNotes = this.orderNotes(tuning);
        const listOfEntries = Array.from(this.getIntervalsFromRoots(tuning).entries());
        listOfEntries.sort((entry1, entry2) => {
            const firstOccurrence1 = this.getFirstOccurrence(orderedNotes, entry1[0]);
            const firstOccurrence2 = this.getFirstOccurrence(orderedNotes, entry2[0]);
            if (firstOccurrence1 !== null && firstOccurrence2 !== null) {
                return firstOccurrence1 - firstOccurrence2;
            }
            return 0;
        });
        for (const [, intervals] of listOfEntries) {
            if (this.hasAThirdOrAFifth(intervals)) {
                return true;
            }
        }
        return false;
    }
    orderNotes(tuning) {
        const orderedNotes = [];
        for (const [guitarString, fretting] of this.frettings.entries()) {
            const fretSounding = fretting.getFretSounding();
            if (fretSounding !== null && fretSounding !== undefined) {
                const tuningBaseNote = tuning.getStringNotes().get(guitarString);
                orderedNotes.push(tuningBaseNote.up(fretSounding));
            }
        }
        orderedNotes.sort((note1, note2) => note1.getSemitonesFromA0() - note2.getSemitonesFromA0());
        return orderedNotes;
    }
    noteRepresentation(tuning) {
        const stringArray = [];
        for (const [guitarString, fretting] of this.frettings.entries()) {
            const fretSounding = fretting.getFretSounding();
            if (fretSounding !== null && fretSounding !== undefined) {
                const tuningBaseNote = tuning.getStringNotes().get(guitarString);
                stringArray.push(`${tuningBaseNote.up(fretSounding)}`);
            }
        }
        return stringArray.join(' ');
    }
    smallestDistanceBetweenVoices() {
        let smallestDistanceBetweenVoices = Number.MAX_SAFE_INTEGER;
        const semitonesFromA0List = [];
        for (const [guitarString, fretting] of this.frettings.entries()) {
            const fretSounding = fretting.getFretSounding();
            if (fretSounding !== null && fretSounding !== undefined) {
                ;
                const tuningBaseNote = this.lastTuningUsed.getStringNotes().get(guitarString);
                const voice = tuningBaseNote.up(fretSounding);
                semitonesFromA0List.push(voice.getSemitonesFromA0());
            }
        }
        for (const semitonesFromA0 of semitonesFromA0List) {
            for (const semitonesFromA0Other of semitonesFromA0List) {
                if (semitonesFromA0 !== semitonesFromA0Other) {
                    const smDif = Math.abs(semitonesFromA0 - semitonesFromA0Other);
                    if (smDif < smallestDistanceBetweenVoices) {
                        smallestDistanceBetweenVoices = smDif;
                    }
                }
            }
        }
        return smallestDistanceBetweenVoices;
    }
    getIntervalsFromRoots(tuning) {
        const intervalsList = new Map();
        const notes = [];
        for (const [guitarString, fretting] of this.frettings.entries()) {
            const fretSounding = fretting.getFretSounding();
            if (fretSounding !== null && fretSounding !== undefined) {
                const tuningBaseNote = tuning.getStringNotes().get(guitarString);
                const octavatedNote = tuningBaseNote.up(fretSounding);
                if (!notes.includes(octavatedNote.note)) {
                    notes.push(octavatedNote.note);
                }
            }
        }
        const previousNotes = [];
        for (const rootNote of notes) {
            const intervals = [];
            for (const currentNote of notes) {
                if (!previousNotes.includes(currentNote)) {
                    intervals.push(this.intervalFromRoot(rootNote, currentNote));
                }
            }
            for (const prevNote of previousNotes) {
                intervals.push(this.intervalFromRoot(rootNote, prevNote));
            }
            intervals.sort((interval1, interval2) => {
                return interval1.getOrderingPriority(intervals) - interval2.getOrderingPriority(intervals);
            });
            previousNotes.push(rootNote);
            intervalsList.set(rootNote, intervals);
        }
        return intervalsList;
    }
    intervalFromRoot(rootNote, currentNote) {
        const rootSemis = rootNote.semitonesFromA;
        let currentSemis = currentNote.semitonesFromA;
        if (currentSemis < rootSemis) {
            currentSemis += 12; // octave up
        }
        const distance = currentSemis - rootSemis;
        let interv = Interval.getIntervalBySemitones(distance);
        return interv;
    }
    getLowestFretPlaying() {
        return this.lowestFretPlaying;
    }
    computeCompatibleWithAnyOfTheseKeys(keyToMapOfRootsToNotesOfKey) {
        const voicingChord = this.getRepresentedChord();
        for (const [key, mapOfRootsToNotesOfKey] of keyToMapOfRootsToNotesOfKey.entries()) {
            for (const [root, notesOfKey] of mapOfRootsToNotesOfKey.entries()) {
                let voicingMatches = true;
                for (const voicingNote of voicingChord.getNotes()) {
                    voicingMatches &&= notesOfKey.includes(voicingNote);
                }
                if (voicingMatches) {
                    this.compatibleKeysAndRoots.push(new KeyAndRoot(key, root));
                }
            }
        }
    }
    isCompatibleWithAnyOfTheseKeys(keyToMapOfRootsToNotesOfKey) {
        for (const compatibleKeyAndRoot of this.compatibleKeysAndRoots) {
            const key = compatibleKeyAndRoot.key;
            if (keyToMapOfRootsToNotesOfKey.has(key)) {
                return true;
            }
        }
        return false;
    }
    getCompatibleKeysAndRoots() {
        return this.compatibleKeysAndRoots;
    }
    getHasSeveralTimesTheSameNoteOnTheSameOctave() {
        return this.hasSeveralTimesTheSameNoteOnTheSameOctave;
    }
    getHighestNote(tuning) {
        let highestNote = null;
        for (const [guitarString, fretting] of this.frettings.entries()) {
            const fretSounding = fretting.getFretSounding();
            if (fretSounding !== null && fretSounding !== undefined) {
                const tuningBaseNote = tuning.getStringNotes().get(guitarString);
                const note = tuningBaseNote.up(fretSounding);
                if (highestNote === null || note.isHigherThan(highestNote)) {
                    highestNote = note;
                }
            }
        }
        return highestNote;
    }
    getLowestNote(tuning) {
        let lowestNote = null;
        for (const [guitarString, fretting] of this.frettings.entries()) {
            const fretSounding = fretting.getFretSounding();
            if (fretSounding !== null && fretSounding !== undefined) {
                const tuningBaseNote = tuning.getStringNotes().get(guitarString);
                const note = tuningBaseNote.up(fretSounding);
                if (lowestNote === null || note.isLowerThan(lowestNote)) {
                    lowestNote = note;
                }
            }
        }
        return lowestNote;
    }
}
export { ChordVoicing };

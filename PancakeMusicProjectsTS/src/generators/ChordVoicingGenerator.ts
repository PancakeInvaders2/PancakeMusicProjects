import { ChordVoicing } from "../model/guitar/ChordVoicing.js";
import { FretAction } from "../model/guitar/FretAction.js";
import { Tuning } from "../model/guitar/Tuning.js";
import { Key } from "../model/musictheory/Key.js";
import { Note } from "../model/musictheory/Note.js";
import { NoteAndOctave } from "../model/musictheory/NoteAndOctave.js";
import { PrintStream } from "../util/PrintStream.js";

console.log("loading ChordVoicingGenerator")

export class StartAndEnd {
    constructor(public start: number, public end: number) { }
}

export class ChordVoicingGenerator {

    public static generateAndDownloadChordVoicings(
        tuning: Tuning,
        fretSpan: number,
        firstFretToScan: number,
        lastFretToScan: number,
        minimumSemitonesBetweenNotesOfTheVoicing: number,
        searchedKeys: Key[],
        allowedKeyRoots: Note[],
        minNumberOfDifferentNotes: number,
        maxNumberOfDifferentNotes: number,
        mustContainAtLeastThisManyOpenStrings: number,
        mustContainAtMostThisManyOpenStrings: number,
        minimumNumberOfMutedLowestStrings: number,
        minimumNumberOfMutedHighestStrings: number,
        forbidTheSameNoteOnTheSameOctaveOnDifferentStrings: boolean,
        lowestNoteAllowed: NoteAndOctave,
        highestNoteAllowed: NoteAndOctave,
        hideChordVoicingsThatDoNotHaveAThirdOrAFifth: boolean,
        hideChordVoicingsWithb5: boolean,
        hideChordVoicingsWithsharp5: boolean,
        hideChordVoicingsWithb7: boolean,
        hideChordVoicingsWithAdd7: boolean,
        hideChordVoicingsWithb9: boolean,
        hideChordVoicingsWithAdd9: boolean,
        hideChordVoicingsWithb11: boolean,
        hideChordVoicingsWithAdd11: boolean,
        hideChordVoicingsWithb13: boolean,
        hideChordVoicingsWithAdd13: boolean
    ): void {

        // TODO hook the hide chord xxx to the generator
        // make the hide chords look okay
        // make the github pages

        console.log('ChordVoicingGeneratorConfig.tuning:', tuning);
        console.log('ChordVoicingGeneratorConfig.fretSpan:', fretSpan);
        console.log('ChordVoicingGeneratorConfig.firstFretToScan:', firstFretToScan);
        console.log('ChordVoicingGeneratorConfig.lastFretToScan:', lastFretToScan);
        console.log('ChordVoicingGeneratorConfig.minimumSemitonesBetweenNotesOfTheVoicing:', minimumSemitonesBetweenNotesOfTheVoicing);
        console.log('ChordVoicingGeneratorConfig.searchedKeys:', searchedKeys);
        console.log('ChordVoicingGeneratorConfig.allowedKeyRoots:', allowedKeyRoots);
        console.log('ChordVoicingGeneratorConfig.minNumberOfDifferentNotes:', minNumberOfDifferentNotes);
        console.log('ChordVoicingGeneratorConfig.maxNumberOfDifferentNotes:', maxNumberOfDifferentNotes);
        console.log('ChordVoicingGeneratorConfig.mustContainAtLeastThisManyOpenStrings:', mustContainAtLeastThisManyOpenStrings);
        console.log('ChordVoicingGeneratorConfig.mustContainAtMostThisManyOpenStrings:', mustContainAtMostThisManyOpenStrings);
        console.log('ChordVoicingGeneratorConfig.minimumNumberOfMutedLowestStrings:', minimumNumberOfMutedLowestStrings);
        console.log('ChordVoicingGeneratorConfig.minimumNumberOfMutedHighestStrings:', minimumNumberOfMutedHighestStrings);
        console.log('ChordVoicingGeneratorConfig.forbidTheSameNoteOnTheSameOctaveOnDifferentStrings:', forbidTheSameNoteOnTheSameOctaveOnDifferentStrings);
        console.log('ChordVoicingGeneratorConfig.lowestNoteAllowed:', lowestNoteAllowed);
        console.log('ChordVoicingGeneratorConfig.highestNoteAllowed:', highestNoteAllowed);
        console.log('ChordVoicingGeneratorConfig.hideChordVoicingsThatDoNotHaveAThirdOrAFifth:', hideChordVoicingsThatDoNotHaveAThirdOrAFifth);

        console.log('ChordVoicingGeneratorConfig.hideChordVoicingsWithb5:', hideChordVoicingsWithb5);
        console.log('ChordVoicingGeneratorConfig.hideChordVoicingsWithsharp5:', hideChordVoicingsWithsharp5);
        console.log('ChordVoicingGeneratorConfig.hideChordVoicingsWithb7:', hideChordVoicingsWithb7);
        console.log('ChordVoicingGeneratorConfig.hideChordVoicingsWithAdd7:', hideChordVoicingsWithAdd7);
        console.log('ChordVoicingGeneratorConfig.hideChordVoicingsWithb9:', hideChordVoicingsWithb9);
        console.log('ChordVoicingGeneratorConfig.hideChordVoicingsWithAdd9:', hideChordVoicingsWithAdd9);
        console.log('ChordVoicingGeneratorConfig.hideChordVoicingsWithb11:', hideChordVoicingsWithb11);
        console.log('ChordVoicingGeneratorConfig.hideChordVoicingsWithAdd11:', hideChordVoicingsWithAdd11);
        console.log('ChordVoicingGeneratorConfig.hideChordVoicingsWithb13:', hideChordVoicingsWithb13);
        console.log('ChordVoicingGeneratorConfig.hideChordVoicingsWithAdd13:', hideChordVoicingsWithAdd13);

        hideChordVoicingsWithb5
        hideChordVoicingsWithsharp5
        hideChordVoicingsWithb7
        hideChordVoicingsWithAdd7
        hideChordVoicingsWithb9
        hideChordVoicingsWithAdd9
        hideChordVoicingsWithb11
        hideChordVoicingsWithAdd11
        hideChordVoicingsWithb13
        hideChordVoicingsWithAdd13

        console.log('___________________');

        if (firstFretToScan < 1) {
            firstFretToScan = 1;
        }
        if (lastFretToScan < 1) {
            lastFretToScan = 1;
        }

        //default values for testing purposes
        //tuning = Tuning.DROP_D_6_STRING_GUITAR;
        //fretSpan = 3;
        //firstFretToScan = 5;
        //lastFretToScan = 11;
        //minimumSemitonesBetweenNotesOfTheVoicing = 2;
        //searchedKeys= [Key.AEOLIAN, Key.HARMONIC_MINOR];
        //allowedKeyRoots = [Note.E];
        //minNumberOfDifferentNotes = 3;
        //maxNumberOfDifferentNotes = 4;
        //mustContainAtLeastThisManyOpenStrings = 0;
        //mustContainAtMostThisManyOpenStrings = 2;
        //minimumNumberOfMutedLowestStrings = 0;
        //minimumNumberOfMutedHighestStrings = 0;
        //forbidTheSameNoteOnTheSameOctaveOnDifferentStrings = true;
        //lowestNoteAllowed = new NoteAndOctave(Note.E, 3);
        //highestNoteAllowed = new NoteAndOctave(Note.E, 6);
        //hideChordVoicingsThatDoNotHaveAThirdOrAFifth = true;
        //hideChordVoicingsWithb5 = true;
        //hideChordVoicingsWithsharp5 = true;
        //hideChordVoicingsWithb7 = true;
        //hideChordVoicingsWithAdd7 = true;
        //hideChordVoicingsWithb9 = true;
        //hideChordVoicingsWithAdd9 = true;
        //hideChordVoicingsWithb11 = true;
        //hideChordVoicingsWithAdd11 = true;
        //hideChordVoicingsWithb13 = true;
        //hideChordVoicingsWithAdd13 = true;

        const keyToMapOfRootsToNotesOfKey: Map<Key, Map<Note, Note[]>> = ChordVoicingGenerator.computeMapOfKeyToMapOfRootsToNotesOfKey(
            searchedKeys,
            allowedKeyRoots
        );

        const filters: ((voicing: ChordVoicing) => boolean)[] = [
            (voicing) => voicing.smallestDistanceBetweenVoices() >= minimumSemitonesBetweenNotesOfTheVoicing,
            (voicing) => voicing.isCompatibleWithAnyOfTheseKeys(keyToMapOfRootsToNotesOfKey),
            (voicing) => voicing.getRepresentedChord()!.getNotes().size <= maxNumberOfDifferentNotes,
            (voicing) => voicing.getRepresentedChord()!.getNotes().size >= minNumberOfDifferentNotes,
            (voicing) =>
                !forbidTheSameNoteOnTheSameOctaveOnDifferentStrings ||
                !voicing.getHasSeveralTimesTheSameNoteOnTheSameOctave(),
            (voicing) => {
                let numberOfOpenStrings = 0;
                for (const entry of voicing.getFrettings().entries()) {
                    if (entry[1].isOpen) {
                        numberOfOpenStrings++;
                    }
                }
                return numberOfOpenStrings >= mustContainAtLeastThisManyOpenStrings;
            },
            (voicing) => {
                let numberOfOpenStrings = 0;
                for (const entry of voicing.getFrettings().entries()) {
                    if (entry[1].isOpen) {
                        numberOfOpenStrings++;
                    }
                }
                return numberOfOpenStrings <= mustContainAtMostThisManyOpenStrings;
            },
            (voicing) => {
                let passed = true;
                for (let stringNumber = 0; stringNumber < minimumNumberOfMutedLowestStrings; stringNumber++) {
                    passed = passed && FretAction.MUTE.equals(voicing.getFrettings().get(stringNumber));
                }
                return passed;
            },
            (voicing) => {
                let passed = true;
                for (
                    let stringNumber = tuning.getNumberOfStrings() - 1;
                    stringNumber + minimumNumberOfMutedHighestStrings >= tuning.getNumberOfStrings();
                    stringNumber--
                ) {
                    passed = passed && FretAction.MUTE.equals(voicing.getFrettings().get(stringNumber));
                }
                return passed;
            },
            (voicing) => {
                return highestNoteAllowed === null || voicing.getHighestNote(tuning)!.isLowerThan(highestNoteAllowed);
            },
            (voicing) => {
                return lowestNoteAllowed === null || voicing.getLowestNote(tuning)!.isHigherThan(lowestNoteAllowed);
            },
            (voicing) => {
                return !hideChordVoicingsThatDoNotHaveAThirdOrAFifth || voicing.doAnyOfTheRepresentationsHaveAThirdOrAFifth(tuning);
            },
        ];

        const filePath = './Voicings.txt';
        console.log(`Printing to ${filePath}`);
        const targetFile: PrintStream = new PrintStream(filePath);

        try {
            ChordVoicingGenerator.generateAllVoicings(
                tuning,
                fretSpan,
                firstFretToScan,
                lastFretToScan,
                filters,
                targetFile,
                keyToMapOfRootsToNotesOfKey,
                hideChordVoicingsThatDoNotHaveAThirdOrAFifth,
                hideChordVoicingsWithb5,
                hideChordVoicingsWithsharp5,
                hideChordVoicingsWithb7,
                hideChordVoicingsWithAdd7,
                hideChordVoicingsWithb9,
                hideChordVoicingsWithAdd9,
                hideChordVoicingsWithb11,
                hideChordVoicingsWithAdd11,
                hideChordVoicingsWithb13,
                hideChordVoicingsWithAdd13
            );
        } finally {
            targetFile.closeAndDownload();
        }

        console.log('Stream closed');
    }

    private static computeMapOfKeyToMapOfRootsToNotesOfKey(
        searchedKeys: Key[],
        allowedRoots: Note[]
    ): Map<Key, Map<Note, Note[]>> {
        const keyToMapOfRootsToNotesOfKey = new Map<Key, Map<Note, Note[]>>();

        console.log('in computeMapOfKeyToMapOfRootsToNotesOfKey');

        for (const searchedKey of searchedKeys) {
            const rootsToNotesOfKey = new Map<Note, Note[]>();

            for (const root of Object.values(Note)) {
                if (
                    allowedRoots === null ||
                    allowedRoots.length === 0 ||
                    allowedRoots.includes(root)
                ) {
                    const notesInKeyStartingOnRoot: Note[] = [];
                    const semitonesFromRootList = searchedKey.getSemitonesFromRootList();

                    for (const semitonesFromRoot of semitonesFromRootList) {
                        notesInKeyStartingOnRoot.push(root.up(semitonesFromRoot));
                    }

                    rootsToNotesOfKey.set(root, notesInKeyStartingOnRoot);
                }
            }

            keyToMapOfRootsToNotesOfKey.set(searchedKey, rootsToNotesOfKey);
        }

        return keyToMapOfRootsToNotesOfKey;
    }

    private static generateAllVoicings(
        tuning: Tuning,
        fretSpan: number,
        firstFretToScan: number,
        lastFretToScan: number,
        filters: ((voicing: ChordVoicing) => boolean)[],
        output: PrintStream,
        keyToMapOfRootsToNotesOfKey: Map<Key, Map<Note, Note[]>>,
        hideChordVoicingsThatDoNotHaveAThirdOrAFifth: boolean,
        hideChordVoicingsWithb5: boolean,
        hideChordVoicingsWithsharp5: boolean,
        hideChordVoicingsWithb7: boolean,
        hideChordVoicingsWithAdd7: boolean,
        hideChordVoicingsWithb9: boolean,
        hideChordVoicingsWithAdd9: boolean,
        hideChordVoicingsWithb11: boolean,
        hideChordVoicingsWithAdd11: boolean,
        hideChordVoicingsWithb13: boolean,
        hideChordVoicingsWithAdd13: boolean
    ): void {
        console.log(`Generating voicings for the tuning ${tuning}`);

        const startEnds: StartAndEnd[] = [];

        let fretStart = firstFretToScan;
        let fretEnd: number;
        while ((fretEnd = fretStart + fretSpan - 1) <= lastFretToScan) {
            startEnds.push(new StartAndEnd(fretStart, fretEnd));
            fretStart++;
        }

        startEnds.forEach((startEnd) => {
            const voicings = this.generateVoicings(
                tuning,
                startEnd.start,
                startEnd.end,
                filters,
                keyToMapOfRootsToNotesOfKey
            );

            console.log(
                `Voicings between frets ${startEnd.start} and ${startEnd.end} generated successfully`
            );

            voicings.forEach((voicing) => {

                const fullRepresentations: string[] = voicing
                    .fullRepresentations(tuning,
                        hideChordVoicingsThatDoNotHaveAThirdOrAFifth,
                        hideChordVoicingsWithb5,
                        hideChordVoicingsWithsharp5,
                        hideChordVoicingsWithb7,
                        hideChordVoicingsWithAdd7,
                        hideChordVoicingsWithb9,
                        hideChordVoicingsWithAdd9,
                        hideChordVoicingsWithb11,
                        hideChordVoicingsWithAdd11,
                        hideChordVoicingsWithb13,
                        hideChordVoicingsWithAdd13);

                if (fullRepresentations.length != 0) {
                    output.println(`____________ ${voicing.noteRepresentation(tuning)}  `);

                    fullRepresentations.forEach((fullRepresentation) => {
                        output.println(
                            `_________ ${fullRepresentation}:  `
                        );
                    });

                    output.println(`${voicing.toString()}  `);
                    output.println(`${voicing.notesOnStrings()}  `);

                    const sj: string[] = [];
                    voicing.getCompatibleKeysAndRoots().forEach((compatibleKeyAndRoot) => {
                        sj.push(`${compatibleKeyAndRoot.root} ${compatibleKeyAndRoot.key}`);
                    });

                    output.println(`Diatonic to ${sj.join(', ')}  `);
                    output.println("__________________________  ");
                }
            });
        });

        output.println("All voicings generated successfully");
    }

    static generateVoicings(
        tuning: Tuning,
        lowestFretToScan: number,
        highestFretToScan: number,
        filters: ((voicing: ChordVoicing) => boolean)[],
        keyToMapOfRootsToNotesOfKey: Map<Key, Map<Note, Note[]>>
    ): Set<ChordVoicing> {

        console.log("in generateVoicings")

        const stringNumberToFretNumberToNote: Map<number, Map<number, NoteAndOctave>> = new Map();
        for (const [stringNumber, stringTuningNote] of tuning.getStringNotes()) {
            if (!stringNumberToFretNumberToNote.has(stringNumber)) {
                stringNumberToFretNumberToNote.set(stringNumber, new Map());
            }
            const fretNumberToNote = stringNumberToFretNumberToNote.get(stringNumber);

            if (fretNumberToNote) {
                for (let currentFret = lowestFretToScan; currentFret < highestFretToScan; currentFret++) {
                    const currentNote = stringTuningNote.up(currentFret);
                    fretNumberToNote.set(currentFret, currentNote);
                }
            }
        }

        const possibleFretActions: FretAction[] = [
            FretAction.MUTE,
            FretAction.OPEN,
            ...Array.from({ length: highestFretToScan - lowestFretToScan + 1 }, (_, i) => FretAction.hold(lowestFretToScan + i)),
        ];

        return this.generateVoicingsFromFretActions(possibleFretActions, tuning, filters, keyToMapOfRootsToNotesOfKey);
    }

    static generateVoicingsFromFretActions(
        possibleFretActions: FretAction[],
        tuning: Tuning,
        filters: ((voicing: ChordVoicing) => boolean)[],
        keyToMapOfRootsToNotesOfKey: Map<Key, Map<Note, Note[]>>
    ): Set<ChordVoicing> {

        console.log('in generateVoicingsFromFretActions');

        return this.iterateFrets(
            possibleFretActions,
            tuning,
            0,
            [],
            filters,
            keyToMapOfRootsToNotesOfKey
        );
    }

    static iterateFrets(
        possibleFretActions: FretAction[],
        tuning: Tuning,
        currentString: number,
        previousIterations: FretAction[],
        filters: ((voicing: ChordVoicing) => boolean)[],
        keyToMapOfRootsToNotesOfKey: Map<Key, Map<Note, Note[]>>
    ): Set<ChordVoicing> {

        const voicingsConstructed = new Set<ChordVoicing>();

        const stringsToIterate = tuning.getNumberOfStrings();

        for (const fretAction of possibleFretActions) {
            const thisIteration = previousIterations.concat(fretAction);

            if (currentString < stringsToIterate - 1) {

                let newVoicingsConstructed = this.iterateFrets(
                    possibleFretActions,
                    tuning,
                    currentString + 1,
                    thisIteration,
                    filters,
                    keyToMapOfRootsToNotesOfKey
                )

                for (let newVoicingConstructed of newVoicingsConstructed) {
                    voicingsConstructed.add(newVoicingConstructed);
                }

            } else {
                const chordVoicing = new ChordVoicing(thisIteration);

                if (chordVoicing.numberOfNonMutedStrings() > 1) {
                    chordVoicing.postProcessing(tuning, keyToMapOfRootsToNotesOfKey);
                    let passedAllFilters = true;

                    for (const filter of filters) {
                        if (!filter(chordVoicing)) {
                            passedAllFilters = false;
                            break;
                        }
                    }

                    if (passedAllFilters) {
                        voicingsConstructed.add(chordVoicing);
                    }
                }
            }
        }

        return voicingsConstructed;
    }

}
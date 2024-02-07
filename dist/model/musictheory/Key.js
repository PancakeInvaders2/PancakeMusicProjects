import { CircularLinkedList } from './CircularLinkedList.js';
import { Interval } from './Interval.js';
export class Key {
    intervals;
    semitonesFromRootList;
    name;
    modes;
    static MAJOR = Key.constructKey([
        Interval.MAJ2,
        Interval.MAJ2,
        Interval.MIN2,
        Interval.MAJ2,
        Interval.MAJ2,
        Interval.MAJ2,
        Interval.MIN2
    ]).setName("Major");
    static majorModes = Key.MAJOR.getModes();
    static IONIAN = Key.majorModes[0].setName("Major");
    static DORIAN = Key.majorModes[1].setName("Dorian");
    static PHRYGIAN = Key.majorModes[2].setName("Phrygian");
    static LYDIAN = Key.majorModes[3].setName("Lydian");
    static MIXOLYDIAN = Key.majorModes[4].setName("Mixolydian");
    static AEOLIAN = Key.majorModes[5].setName("Minor (natural)");
    static LOCRIAN = Key.majorModes[6].setName("Locrian");
    static MINOR = Key.AEOLIAN;
    static MINOR_NATURAL = Key.AEOLIAN;
    static HARMONIC_MINOR = Key.constructKey([
        Interval.MAJ2,
        Interval.MIN2,
        Interval.MAJ2,
        Interval.MAJ2,
        Interval.MIN2,
        Interval.MIN3,
        Interval.MIN2
    ]).setName("Harmonic minor");
    static harmonicMinorModes = Key.HARMONIC_MINOR.getModes();
    static LOCRIAN_NAT6 = Key.harmonicMinorModes[1].setName("Locrian nat6");
    static AUGMENTED_MAJOR = Key.harmonicMinorModes[2].setName("Augmented major");
    static ROMANIAN_MINOR = Key.harmonicMinorModes[3].setName("Romanian minor (Dorian #4)");
    static PHRYGIAN_DOMINANT = Key.harmonicMinorModes[4].setName("Phrygian dominant");
    static LYDIAN_SHARP2 = Key.harmonicMinorModes[5].setName("Lydian #2");
    static ULTRALOCRIAN = Key.harmonicMinorModes[6].setName("UltraLocrian");
    static MELODIC_MINOR = Key.constructKey([
        Interval.MAJ2,
        Interval.MIN2,
        Interval.MAJ2,
        Interval.MAJ2,
        Interval.MAJ2,
        Interval.MAJ2,
        Interval.MIN2
    ]).setName("Melodic minor");
    static melodicMinorModes = Key.MELODIC_MINOR.getModes();
    static DORIAN_B2 = Key.melodicMinorModes[1].setName("Dorian b2");
    static LYDIAN_AUGMENTED = Key.melodicMinorModes[2].setName("Lydian augmented");
    static LYDIAN_DOMINANT = Key.melodicMinorModes[3].setName("Lydian dominant");
    static MIXOLYDIAN_B6 = Key.melodicMinorModes[4].setName("Mixolydian b6");
    static LOCRIAN_NAT2 = Key.melodicMinorModes[5].setName("Locrian nat2/Aeolian b5");
    static ALTERED_SCALE = Key.melodicMinorModes[6].setName("Altered scale (SuperLocrian)");
    static HARMONIC_AND_NATURAL_MINOR = Key.constructKey([
        Interval.MAJ2,
        Interval.MIN2,
        Interval.MAJ2,
        Interval.MAJ2,
        Interval.MIN2,
        Interval.MAJ2,
        Interval.MIN2,
        Interval.MIN2
    ]).setName("Natural+Harmonic minor");
    static GENERAL_MINOR = Key.constructKey([
        Interval.MAJ2,
        Interval.MIN2,
        Interval.MAJ2,
        Interval.MAJ2,
        Interval.MIN2,
        Interval.MIN2,
        Interval.MIN2,
        Interval.MIN2,
        Interval.MIN2
    ]).setName("General minor (natural+harmonic+melodic)");
    static DOUBLE_HARMONIC_MAJOR = Key.constructKey([
        Interval.MIN2,
        Interval.MIN3,
        Interval.MIN2,
        Interval.MAJ2,
        Interval.MIN2,
        Interval.MIN3,
        Interval.MIN2
    ]).setName("Double harmonic major");
    static doubleHarmonicMajorModes = Key.DOUBLE_HARMONIC_MAJOR.getModes();
    static LYDIAN_SHARP2_SHARP6 = Key.doubleHarmonicMajorModes[1].setName("Lydian #2 #6");
    static ULTRAPHRYGIAN = Key.doubleHarmonicMajorModes[2].setName("Ultraphrygian");
    static HUNGARIAN_MINOR = Key.doubleHarmonicMajorModes[3].setName("Hungarian minor");
    static ORIENTAL_SCALE = Key.doubleHarmonicMajorModes[4].setName("Oriental scale");
    static IONIAN_SHARP2_SHARP5 = Key.doubleHarmonicMajorModes[5].setName("Ionian #2 #5");
    static LOCRIAN_BB3_BB7 = Key.doubleHarmonicMajorModes[6].setName("Locrian bb3 bb7");
    static addNameAndValue(map, key) {
        map.set(key.name, key);
    }
    static initAvailableKeysByName() {
        let availableKeysByName = new Map();
        Key.addNameAndValue(availableKeysByName, Key.IONIAN);
        Key.addNameAndValue(availableKeysByName, Key.DORIAN);
        Key.addNameAndValue(availableKeysByName, Key.PHRYGIAN);
        Key.addNameAndValue(availableKeysByName, Key.LYDIAN);
        Key.addNameAndValue(availableKeysByName, Key.MIXOLYDIAN);
        Key.addNameAndValue(availableKeysByName, Key.AEOLIAN);
        Key.addNameAndValue(availableKeysByName, Key.LOCRIAN);
        Key.addNameAndValue(availableKeysByName, Key.HARMONIC_AND_NATURAL_MINOR);
        Key.addNameAndValue(availableKeysByName, Key.GENERAL_MINOR);
        Key.addNameAndValue(availableKeysByName, Key.HARMONIC_MINOR);
        Key.addNameAndValue(availableKeysByName, Key.LOCRIAN_NAT6);
        Key.addNameAndValue(availableKeysByName, Key.AUGMENTED_MAJOR);
        Key.addNameAndValue(availableKeysByName, Key.ROMANIAN_MINOR);
        Key.addNameAndValue(availableKeysByName, Key.PHRYGIAN_DOMINANT);
        Key.addNameAndValue(availableKeysByName, Key.LYDIAN_SHARP2);
        Key.addNameAndValue(availableKeysByName, Key.ULTRALOCRIAN);
        Key.addNameAndValue(availableKeysByName, Key.MELODIC_MINOR);
        Key.addNameAndValue(availableKeysByName, Key.DORIAN_B2);
        Key.addNameAndValue(availableKeysByName, Key.LYDIAN_AUGMENTED);
        Key.addNameAndValue(availableKeysByName, Key.LYDIAN_DOMINANT);
        Key.addNameAndValue(availableKeysByName, Key.MIXOLYDIAN_B6);
        Key.addNameAndValue(availableKeysByName, Key.LOCRIAN_NAT2);
        Key.addNameAndValue(availableKeysByName, Key.ALTERED_SCALE);
        Key.addNameAndValue(availableKeysByName, Key.DOUBLE_HARMONIC_MAJOR);
        Key.addNameAndValue(availableKeysByName, Key.LYDIAN_SHARP2_SHARP6);
        Key.addNameAndValue(availableKeysByName, Key.ULTRAPHRYGIAN);
        Key.addNameAndValue(availableKeysByName, Key.HUNGARIAN_MINOR);
        Key.addNameAndValue(availableKeysByName, Key.ORIENTAL_SCALE);
        Key.addNameAndValue(availableKeysByName, Key.IONIAN_SHARP2_SHARP5);
        Key.addNameAndValue(availableKeysByName, Key.LOCRIAN_BB3_BB7);
        return availableKeysByName;
    }
    static availableKeysByName = Key.initAvailableKeysByName();
    static getKeyByName(name) {
        for (const [keyname, key] of Key.availableKeysByName) {
            if (keyname === name) {
                return key;
            }
        }
        return null;
    }
    constructor(intervals, semitonesFromRootList, name, modes) {
        this.intervals = intervals;
        this.semitonesFromRootList = semitonesFromRootList;
        this.name = name;
        this.modes = modes;
    }
    static constructKey(source) {
        if (!source) {
            return new Key(new CircularLinkedList(), [], null, null);
        }
        let key = new Key(new CircularLinkedList(), [], null, null);
        if (source instanceof CircularLinkedList) {
            let currentNode = source.head;
            let semitonesFromRoot = 0;
            do {
                if (currentNode !== null) { // TODO not sure about this, check that no infinite loop occurs
                    key.intervals.addNode(currentNode.value);
                    semitonesFromRoot += currentNode.value.semitones;
                    key.semitonesFromRootList.push(semitonesFromRoot);
                    currentNode = currentNode.nextNode;
                }
            } while (currentNode !== source.head);
        }
        else if (source instanceof Key) {
            return Key.constructKey(source.intervals);
        }
        else {
            let semitonesFromRoot = 0;
            for (const semitoneInterval of source) {
                key.intervals.addNode(semitoneInterval);
                semitonesFromRoot += semitoneInterval.semitones;
                key.semitonesFromRootList.push(semitonesFromRoot);
            }
        }
        return key;
    }
    isValid() {
        return this.totalNumberOfIntervals() === 12;
    }
    getIntervals() {
        return this.intervals;
    }
    getModes() {
        if (this.modes === null) {
            const tModes = [];
            for (const intervalMode of this.intervals.modes()) {
                const intervalModeValues = [];
                for (const intervalNode of intervalMode) {
                    intervalModeValues.push(intervalNode.value);
                }
                tModes.push(Key.constructKey(intervalModeValues));
            }
            this.modes = tModes;
        }
        return this.modes;
    }
    totalNumberOfIntervals() {
        let totalNumberOfIntervals = 0;
        let currentNode = this.intervals.head;
        if (currentNode !== null) {
            do {
                totalNumberOfIntervals += currentNode.value.semitones;
                currentNode = currentNode.nextNode;
            } while (currentNode !== this.intervals.head);
        }
        return totalNumberOfIntervals;
    }
    equals(other) {
        if (!(other instanceof Key)) {
            return false;
        }
        if (this.intervals.equalsStrict(other.intervals)) {
            return true;
        }
        return false;
    }
    add(i) {
        this.intervals.addNode(i);
        const size = this.semitonesFromRootList.length;
        let semitonesFromRoot;
        if (size === 0) {
            semitonesFromRoot = 0;
        }
        else {
            semitonesFromRoot = this.semitonesFromRootList[size - 1];
        }
        semitonesFromRoot += i.semitones;
        this.semitonesFromRootList.push(semitonesFromRoot);
    }
    toString() {
        if (this.name !== null) {
            return this.name;
        }
        const sj = new Array();
        this.intervals.forEach((interval) => {
            sj.push(interval.keyRepresentation);
        });
        return `[${sj.join(',')}]`;
    }
    size() {
        return this.intervals.size();
    }
    getSemitonesFromRootList() {
        return this.semitonesFromRootList;
    }
    setName(name) {
        this.name = name;
        return this;
    }
    getName() {
        return this.name;
    }
}

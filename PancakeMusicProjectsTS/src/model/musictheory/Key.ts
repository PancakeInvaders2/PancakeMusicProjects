import { EqualsTrait } from '../general/EqualsTrait.js';
import { CircularLinkedList } from './CircularLinkedList.js';
import { CircularLinkedListNode } from './CircularLinkedListNode.js';
import { Interval } from './Interval.js';


export class Key implements EqualsTrait {
  private intervals: CircularLinkedList<Interval>;
  private semitonesFromRootList: number[];
  private name: string | null;
  private modes: Key[] | null;

  static readonly MAJOR: Key = Key.constructKey([
    Interval.MAJ2,
    Interval.MAJ2,
    Interval.MIN2,
    Interval.MAJ2,
    Interval.MAJ2,
    Interval.MAJ2,
    Interval.MIN2
  ]).setName("Major");



  static readonly majorModes: Key[] = Key.MAJOR.getModes();
  static readonly IONIAN = Key.majorModes[0]!.setName("Major");
  static readonly DORIAN = Key.majorModes[1]!.setName("Dorian");
  static readonly PHRYGIAN = Key.majorModes[2]!.setName("Phrygian");
  static readonly LYDIAN = Key.majorModes[3]!.setName("Lydian");
  static readonly MIXOLYDIAN = Key.majorModes[4]!.setName("Mixolydian");
  static readonly AEOLIAN = Key.majorModes[5]!.setName("Minor (natural)");
  static readonly LOCRIAN = Key.majorModes[6]!.setName("Locrian");

  static readonly MINOR: Key = Key.AEOLIAN;
  static readonly MINOR_NATURAL = Key.AEOLIAN;

  static readonly HARMONIC_MINOR: Key = Key.constructKey([
    Interval.MAJ2,
    Interval.MIN2,
    Interval.MAJ2,
    Interval.MAJ2,
    Interval.MIN2,
    Interval.MIN3,
    Interval.MIN2
  ]).setName("Harmonic minor");

  static readonly harmonicMinorModes: Key[] = Key.HARMONIC_MINOR.getModes();
  static readonly LOCRIAN_NAT6: Key = Key.harmonicMinorModes[1]!.setName("Locrian nat6");
  static readonly AUGMENTED_MAJOR: Key = Key.harmonicMinorModes[2]!.setName("Augmented major");
  static readonly ROMANIAN_MINOR: Key = Key.harmonicMinorModes[3]!.setName("Romanian minor (Dorian #4)");
  static readonly PHRYGIAN_DOMINANT: Key = Key.harmonicMinorModes[4]!.setName("Phrygian dominant");
  static readonly LYDIAN_SHARP2: Key = Key.harmonicMinorModes[5]!.setName("Lydian #2");
  static readonly ULTRALOCRIAN: Key = Key.harmonicMinorModes[6]!.setName("UltraLocrian");

  static readonly MELODIC_MINOR: Key = Key.constructKey([
    Interval.MAJ2,
    Interval.MIN2,
    Interval.MAJ2,
    Interval.MAJ2,
    Interval.MAJ2,
    Interval.MAJ2,
    Interval.MIN2
  ]).setName("Melodic minor");

  static readonly melodicMinorModes: Key[] = Key.MELODIC_MINOR.getModes();
  static readonly DORIAN_B2 = Key.melodicMinorModes[1]!.setName("Dorian b2")
  static readonly LYDIAN_AUGMENTED = Key.melodicMinorModes[2]!.setName("Lydian augmented")
  static readonly LYDIAN_DOMINANT = Key.melodicMinorModes[3]!.setName("Lydian dominant")
  static readonly MIXOLYDIAN_B6 = Key.melodicMinorModes[4]!.setName("Mixolydian b6")
  static readonly LOCRIAN_NAT2 = Key.melodicMinorModes[5]!.setName("Locrian nat2/Aeolian b5")
  static readonly ALTERED_SCALE = Key.melodicMinorModes[6]!.setName("Altered scale (SuperLocrian)")

  static readonly HARMONIC_AND_NATURAL_MINOR: Key = Key.constructKey([
    Interval.MAJ2,
    Interval.MIN2,
    Interval.MAJ2,
    Interval.MAJ2,
    Interval.MIN2,
    Interval.MAJ2,
    Interval.MIN2,
    Interval.MIN2
  ]).setName("Natural+Harmonic minor");

  static readonly GENERAL_MINOR: Key = Key.constructKey([
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

  static readonly DOUBLE_HARMONIC_MAJOR: Key = Key.constructKey([
    Interval.MIN2,
    Interval.MIN3,
    Interval.MIN2,
    Interval.MAJ2,
    Interval.MIN2,
    Interval.MIN3,
    Interval.MIN2
  ]).setName("Double harmonic major");

  static readonly doubleHarmonicMajorModes = Key.DOUBLE_HARMONIC_MAJOR.getModes();
  static readonly LYDIAN_SHARP2_SHARP6 = Key.doubleHarmonicMajorModes[1]!.setName("Lydian #2 #6")
  static readonly ULTRAPHRYGIAN = Key.doubleHarmonicMajorModes[2]!.setName("Ultraphrygian")
  static readonly HUNGARIAN_MINOR = Key.doubleHarmonicMajorModes[3]!.setName("Hungarian minor")
  static readonly ORIENTAL_SCALE = Key.doubleHarmonicMajorModes[4]!.setName("Oriental scale")
  static readonly IONIAN_SHARP2_SHARP5 = Key.doubleHarmonicMajorModes[5]!.setName("Ionian #2 #5")
  static readonly LOCRIAN_BB3_BB7 = Key.doubleHarmonicMajorModes[6]!.setName("Locrian bb3 bb7")

  private static addNameAndValue(map: Map<string, Key>, key: Key): void {
    map.set(key.name!, key);
  }

  private static initAvailableKeysByName(): Map<string, Key> {
    let availableKeysByName: Map<string, Key> = new Map();
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

  public static readonly availableKeysByName: Map<string, Key> = Key.initAvailableKeysByName();

  public static getKeyByName(name: string): Key | null {
    for (const [keyname, key] of Key.availableKeysByName) {
      if (keyname === name) {
        return key;
      }
    }
    return null;
  }

  constructor(
    intervals: CircularLinkedList<Interval>,
    semitonesFromRootList: number[],
    name: string | null,
    modes: Key[] | null
  ) {
    this.intervals = intervals;
    this.semitonesFromRootList = semitonesFromRootList;
    this.name = name;
    this.modes = modes;
  }

  static constructKey(source: CircularLinkedList<Interval>): Key;
  static constructKey(source: Key): Key;
  static constructKey(source: Interval[]): Key;
  static constructKey(): Key;
  static constructKey(source?: CircularLinkedList<Interval> | Key | Interval[]): Key {
    if (!source) {
      return new Key(new CircularLinkedList(), [], null, null);
    }

    let key = new Key(new CircularLinkedList(), [], null, null);

    if (source instanceof CircularLinkedList) {
      let currentNode: CircularLinkedListNode<Interval> | null = source.head;
      let semitonesFromRoot = 0;

      do {
        if (currentNode !== null) { // TODO not sure about this, check that no infinite loop occurs
          key.intervals.addNode(currentNode.value);
          semitonesFromRoot += currentNode.value.semitones;
          key.semitonesFromRootList.push(semitonesFromRoot);
          currentNode = currentNode.nextNode;
        }
      } while (currentNode !== source.head);

    } else if (source instanceof Key) {
      return Key.constructKey(source.intervals);
    } else {
      let semitonesFromRoot = 0;

      for (const semitoneInterval of source) {
        key.intervals.addNode(semitoneInterval);
        semitonesFromRoot += semitoneInterval.semitones;
        key.semitonesFromRootList.push(semitonesFromRoot);
      }
    }

    return key;
  }

  isValid(): boolean {
    return this.totalNumberOfIntervals() === 12;
  }

  getIntervals(): CircularLinkedList<Interval> {
    return this.intervals;
  }

  getModes(): Key[] {
    if (this.modes === null) {
      const tModes: Key[] = [];
      for (const intervalMode of this.intervals.modes()) {
        const intervalModeValues: Interval[] = [];
        for (const intervalNode of intervalMode) {
          intervalModeValues.push(intervalNode.value);
        }
        tModes.push(Key.constructKey(intervalModeValues));
      }
      this.modes = tModes;
    }

    return this.modes;
  }

  totalNumberOfIntervals(): number {
    let totalNumberOfIntervals = 0;

    let currentNode = this.intervals.head;

    if (currentNode !== null) {
      do {
        totalNumberOfIntervals += currentNode.value.semitones;

        currentNode = currentNode.nextNode!;
      } while (currentNode !== this.intervals.head);
    }

    return totalNumberOfIntervals;
  }

  equals(other: any): boolean {

    if (!(other instanceof Key)) {
      return false;
    }

    if (this.intervals.equalsStrict(other.intervals)) {
      return true;
    }

    return false;
  }

  add(i: Interval): void {
    this.intervals.addNode(i);

    const size = this.semitonesFromRootList.length;
    let semitonesFromRoot: number;
    if (size === 0) {
      semitonesFromRoot = 0;
    } else {
      semitonesFromRoot = this.semitonesFromRootList[size - 1]!;
    }
    semitonesFromRoot += i.semitones;

    this.semitonesFromRootList.push(semitonesFromRoot);
  }

  toString(): string {
    if (this.name !== null) {
      return this.name;
    }

    const sj = new Array<string>();
    this.intervals.forEach((interval) => {
      sj.push(interval.keyRepresentation);
    });

    return `[${sj.join(',')}]`;
  }

  size(): number {
    return this.intervals.size();
  }

  getSemitonesFromRootList(): number[] {
    return this.semitonesFromRootList;
  }

  setName(name: string): Key {
    this.name = name;
    return this;
  }

  getName(): string | null {
    return this.name;
  }
}


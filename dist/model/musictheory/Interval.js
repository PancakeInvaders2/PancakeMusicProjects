export class Interval {
    static SUS_2_PRIORITY = 4;
    static SUS_4_PRIORITY = 5;
    semitones;
    name;
    isThird;
    isFifth;
    orderingPriority;
    keyRepresentation;
    constructor(semitones, name, isThird, isFifth, orderingPriority, keyRepresentation) {
        this.semitones = semitones;
        this.name = name;
        this.isThird = isThird;
        this.isFifth = isFifth;
        this.orderingPriority = orderingPriority;
        this.keyRepresentation = keyRepresentation;
    }
    equals(other) {
        if (!(other instanceof Interval)) {
            return false;
        }
        return this.semitones == other.semitones;
    }
    static ROOT = new Interval(0, "", false, false, 0, "0");
    static MIN3 = new Interval(3, "minor", true, false, 1, "3");
    static MAJ3 = new Interval(4, "major", true, false, 2, "4");
    static PERF_FIFTH = new Interval(7, "5", false, true, 3, "7");
    static FLAT_5 = new Interval(6, "b5", false, false, 6, "6");
    static MIN7TH = new Interval(10, "b7", false, false, 7, "t");
    static MAJ7TH = new Interval(11, "add7", false, false, 8, "e");
    static MIN2 = new Interval(1, "b9", false, false, 9, "H");
    static MAJ2 = new Interval(2, "add9", false, false, 10, "W");
    static PERF_FOURTH = new Interval(5, "add11", false, false, 11, "5");
    static MIN6TH = new Interval(8, "b13", false, false, 12, "8");
    static MAJ6TH = new Interval(9, "add13", false, false, 13, "9");
    static semitonesToInterval = new Map([
        [Interval.ROOT.semitones, Interval.ROOT],
        [Interval.MIN3.semitones, Interval.MIN3],
        [Interval.MAJ3.semitones, Interval.MAJ3],
        [Interval.PERF_FIFTH.semitones, Interval.PERF_FIFTH],
        [Interval.FLAT_5.semitones, Interval.FLAT_5],
        [Interval.MIN7TH.semitones, Interval.MIN7TH],
        [Interval.MAJ7TH.semitones, Interval.MAJ7TH],
        [Interval.MIN2.semitones, Interval.MIN2],
        [Interval.MAJ2.semitones, Interval.MAJ2],
        [Interval.PERF_FOURTH.semitones, Interval.PERF_FOURTH],
        [Interval.MIN6TH.semitones, Interval.MIN6TH],
        [Interval.MAJ6TH.semitones, Interval.MAJ6TH]
    ]);
    static values() {
        let vals = [];
        for (const [, interval] of Interval.semitonesToInterval) {
            vals.push(interval);
        }
        return vals;
    }
    static getIntervalBySemitones(semitones) {
        return Interval.semitonesToInterval.get(semitones);
    }
    getName(intervals) {
        if (intervals !== null) {
            if (this === Interval.MIN3 &&
                intervals.includes(Interval.FLAT_5) &&
                !intervals.includes(Interval.PERF_FIFTH) &&
                !intervals.includes(Interval.MAJ3)) {
                return "diminished";
            }
            if (this === Interval.MAJ3 &&
                intervals.includes(Interval.MIN6TH) &&
                !intervals.includes(Interval.PERF_FIFTH) &&
                !intervals.includes(Interval.MIN3)) {
                return "augmented";
            }
            else if (this.isThird && !intervals.includes(Interval.PERF_FIFTH)) {
                return this.name + "(no5th)";
            }
            else if (this.isFifth &&
                (intervals.includes(Interval.MIN3) || intervals.includes(Interval.MAJ3)) &&
                !(intervals.includes(Interval.FLAT_5) && intervals.includes(Interval.MIN3))) {
                return "";
            }
            else if (this.isFifth &&
                (intervals.includes(Interval.MAJ2) || intervals.includes(Interval.PERF_FOURTH))) {
                return "sus";
            }
            else if (this === Interval.MIN6TH &&
                intervals.includes(Interval.MAJ3) &&
                !intervals.includes(Interval.PERF_FIFTH) &&
                !intervals.includes(Interval.MIN3)) {
                return "";
            }
            else if (this === Interval.MAJ2 &&
                intervals.includes(Interval.PERF_FIFTH) &&
                !(intervals.includes(Interval.MIN3) || intervals.includes(Interval.MAJ3))) {
                return "2";
            }
            else if (this === Interval.PERF_FOURTH &&
                intervals.includes(Interval.PERF_FIFTH) &&
                intervals.includes(Interval.MAJ2) &&
                !(intervals.includes(Interval.MIN3) || intervals.includes(Interval.MAJ3))) {
                return "and 4";
            }
            else if (this === Interval.PERF_FOURTH &&
                intervals.includes(Interval.PERF_FIFTH) &&
                !(intervals.includes(Interval.MIN3) || intervals.includes(Interval.MAJ3))) {
                return "4";
            }
            else if (this === Interval.FLAT_5 &&
                intervals.includes(Interval.MIN3) &&
                !intervals.includes(Interval.PERF_FIFTH) &&
                !intervals.includes(Interval.MAJ3)) {
                return "";
            }
        }
        return this.name;
    }
    getSemitones() {
        return this.semitones;
    }
    getOrderingPriority(intervals) {
        if (this === Interval.MAJ2 &&
            intervals.includes(Interval.PERF_FIFTH) &&
            !(intervals.includes(Interval.MIN3) || intervals.includes(Interval.MAJ3))) {
            return Interval.SUS_2_PRIORITY;
        }
        else if (this === Interval.PERF_FOURTH &&
            intervals.includes(Interval.PERF_FIFTH) &&
            !(intervals.includes(Interval.MIN3) || intervals.includes(Interval.MAJ3))) {
            return Interval.SUS_4_PRIORITY;
        }
        return this.orderingPriority;
    }
    getKeyRepresentation() {
        return this.keyRepresentation;
    }
}
;

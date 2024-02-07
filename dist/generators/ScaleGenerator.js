import { Interval } from "../model/musictheory/Interval.js";
import { Key } from "../model/musictheory/Key.js";
export class ScaleGenerator {
    /**
     * Generates lists of theoretically valid scales
     */
    static main() {
        try {
            const numberOfNotesInTheScales = 7;
            const scales = this.generateAllScalesOfSize(numberOfNotesInTheScales);
            this.printScales(scales);
        }
        catch (e) {
            console.error(e);
        }
    }
    static generateAllScalesOfSize(numberOfNotesInTheScales) {
        const completeScales = [];
        let scalesInCreation = [Key.constructKey()];
        const intervals = Interval.values().filter((value) => value.semitones !== 0);
        for (let i = 0; i < numberOfNotesInTheScales; i++) {
            const scalesInCreationFromPreviousLoop = scalesInCreation;
            scalesInCreation = [];
            for (const scaleFromPreviousLoop of scalesInCreationFromPreviousLoop) {
                for (const interval of intervals) {
                    const newScale = Key.constructKey(scaleFromPreviousLoop);
                    newScale.add(interval);
                    const newScaleSize = newScale.getIntervals().size();
                    if (newScaleSize === numberOfNotesInTheScales) {
                        if (newScale.isValid()) {
                            const alreadyFound = completeScales.some((completeScale) => completeScale.equals(newScale));
                            if (!alreadyFound) {
                                completeScales.push(newScale);
                            }
                        }
                    }
                    else {
                        if (newScale.totalNumberOfIntervals() <= 12) {
                            scalesInCreation.push(newScale);
                        }
                    }
                }
            }
        }
        return completeScales;
    }
    static printScales(completeScales) {
        let i = 1;
        for (const scale of completeScales) {
            console.log(`${i} ----------------`);
            this.printScale(scale);
            i++;
        }
    }
    static printMajorModes() {
        console.log('IONIAN:');
        console.log(Key.IONIAN);
        console.log('DORIAN:');
        console.log(Key.DORIAN);
        console.log('PHRYGIAN:');
        console.log(Key.PHRYGIAN);
        console.log('LYDIAN:');
        console.log(Key.LYDIAN);
        console.log('MIXOLYDIAN:');
        console.log(Key.MIXOLYDIAN);
        console.log('AEOLIAN:');
        console.log(Key.AEOLIAN);
        console.log('LOCRIAN:');
        console.log(Key.LOCRIAN);
    }
    static printScale(scale) {
        for (const scaleMode of scale.getModes()) {
            console.log(`\t${scaleMode.toString()}`);
        }
    }
}

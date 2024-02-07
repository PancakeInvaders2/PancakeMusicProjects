import { Key } from "../model/musictheory/Key.js";
import { Note } from "../model/musictheory/Note.js";
import { SevenHoleWhistle6Front1Flat6LowerBackThumb } from "../model/tinwhistle/SevenHoleWhistle6Front1Flat6LowerBackThumb.js";

export class TinWhistleKeyGenerator {
    public static main(): void {
      const keysToSearch: Key[] = [];
      
  
      const whistles: SevenHoleWhistle6Front1Flat6LowerBackThumb[] = [];
  
      for (const [, whistleNote] of Note.mapOfSemitonesFromA) {
        const whistle = new SevenHoleWhistle6Front1Flat6LowerBackThumb(whistleNote);
        whistles.push(whistle);
  
        for (const [, keyRoot] of Note.mapOfSemitonesFromA) {
          for (const keyToSearch of keysToSearch) {
            const keyNotes = this.keyNotes(keyRoot, keyToSearch.getSemitonesFromRootList());
  
            const allWhistleNotes = new Set(whistle.getAllPossibleNotes());
            if (keyNotes.every(n => allWhistleNotes.has(n))) {
              let sb = `whistles in ${whistleNote.fullRepresentation()} can play ${keyRoot.fullRepresentation()} ${keyToSearch.getName()}`;
  
              const neededCrossFingerings = whistle.getNeededCrossFingerings(keyNotes);
              if (neededCrossFingerings.length > 0) {
                sb += ' using the cross ';
                sb += neededCrossFingerings.length === 1 ? 'fingering ' : 'fingerings ';
  
                let isFirst = true;
                for (const neededCrossFingering of neededCrossFingerings) {
                  if (!isFirst) {
                    sb += ', ';
                  }
                  sb += `${neededCrossFingering.getFingering().getHolesCovered()}(${neededCrossFingering.getNote().fullRepresentation()})`;
                  isFirst = false;
                }
              }
              sb += '  ';
              console.log(sb);
            }
          }
        }
      }
    }
  
    private static keyNotes(keyRoot: Note, semitonesFromRootList: number[]): Note[] {
      return semitonesFromRootList.map(semitoneFromRoot => keyRoot.up(semitoneFromRoot));
    }
  }
import { EqualsTrait } from "../general/EqualsTrait";

export class WhistleFingering implements EqualsTrait{
    private readonly holesCovered: string;
    private readonly semitonesFromRoot: number;
  
    constructor(holesCovered: string, semitonesFromRoot: number) {
      this.holesCovered = holesCovered;
      this.semitonesFromRoot = semitonesFromRoot;
    }

    equals(other: any): boolean {
      if(!(other instanceof WhistleFingering)){
        return false;
      }

      return this.holesCovered === other.holesCovered
        && this.semitonesFromRoot === other.semitonesFromRoot;
    }
  
    getHolesCovered(): string {
      return this.holesCovered;
    }
  
    getSemitonesFromRoot(): number {
      return this.semitonesFromRoot;
    }
  }
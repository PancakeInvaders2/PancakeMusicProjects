export class WhistleFingering {
    holesCovered;
    semitonesFromRoot;
    constructor(holesCovered, semitonesFromRoot) {
        this.holesCovered = holesCovered;
        this.semitonesFromRoot = semitonesFromRoot;
    }
    equals(other) {
        if (!(other instanceof WhistleFingering)) {
            return false;
        }
        return this.holesCovered === other.holesCovered
            && this.semitonesFromRoot === other.semitonesFromRoot;
    }
    getHolesCovered() {
        return this.holesCovered;
    }
    getSemitonesFromRoot() {
        return this.semitonesFromRoot;
    }
}

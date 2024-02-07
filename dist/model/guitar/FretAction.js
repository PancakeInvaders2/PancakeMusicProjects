export class FretAction {
    static MUTE = new FretAction(true, false, null);
    static OPEN = new FretAction(false, true, null);
    fretHeld;
    isMute;
    isOpen;
    representation;
    constructor(isMute, isOpen, fretHeld = null) {
        this.isMute = isMute;
        this.isOpen = isOpen;
        this.fretHeld = fretHeld;
        if (isMute) {
            this.representation = "X";
        }
        else if (isOpen) {
            this.representation = "O";
        }
        else {
            this.representation = fretHeld?.toString() || "";
        }
    }
    static hold(fretNumber) {
        return new FretAction(false, false, fretNumber);
    }
    equals(obj) {
        if (!(obj instanceof FretAction)) {
            return false;
        }
        const objFretAction = obj;
        if (this.isMute) {
            return objFretAction.isMute;
        }
        if (this.isOpen) {
            return objFretAction.isOpen;
        }
        return this.fretHeld === objFretAction.fretHeld;
    }
    hashCode() {
        if (this.isMute) {
            return -2;
        }
        else if (this.isOpen) {
            return -1;
        }
        else {
            return this.fretHeld || 0;
        }
    }
    getFretHeld() {
        return this.fretHeld;
    }
    getFretSounding() {
        if (this.isMute) {
            return null;
        }
        else if (this.isOpen) {
            return 0;
        }
        else {
            return this.fretHeld;
        }
    }
    toString() {
        return this.representation;
    }
}

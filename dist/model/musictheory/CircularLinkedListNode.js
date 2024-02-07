export class CircularLinkedListNode {
    value;
    nextNode;
    constructor(value) {
        this.value = value;
        this.nextNode = null;
    }
    toString() {
        return `Node(${this.value})`;
    }
    equals(obj) {
        if (!(obj instanceof CircularLinkedListNode)) {
            return false;
        }
        if (this.value === null && obj.value === null) {
            return true;
        }
        else if (this.value === null) {
            return false;
        }
        return this.value.equals(obj.value);
    }
}

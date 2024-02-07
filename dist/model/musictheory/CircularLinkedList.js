import { CircularLinkedListNode } from "./CircularLinkedListNode.js";
export class CircularLinkedList {
    head = null;
    tail = null;
    addNode(value) {
        const newNode = new CircularLinkedListNode(value);
        if (this.head === null) {
            this.head = newNode;
        }
        else {
            if (this.tail) {
                this.tail.nextNode = newNode;
            }
        }
        this.tail = newNode;
        if (this.tail) {
            this.tail.nextNode = this.head;
        }
    }
    size() {
        let ret = 0;
        let currentNode = this.head;
        if (this.head !== null) {
            do {
                ret += 1;
                currentNode = currentNode?.nextNode || null;
            } while (currentNode !== this.head);
        }
        return ret;
    }
    containsNode(searchValue) {
        let currentNode = this.head;
        if (this.head === null) {
            return false;
        }
        else {
            do {
                if (currentNode?.value === searchValue) {
                    return true;
                }
                currentNode = currentNode?.nextNode || null;
            } while (currentNode !== this.head);
            return false;
        }
    }
    deleteNode(valueToDelete) {
        if (this.head !== null) {
            let currentNode = this.head;
            if (currentNode?.value === valueToDelete) {
                this.head = this.head.nextNode || null;
                if (this.tail) {
                    this.tail.nextNode = this.head;
                }
            }
            else {
                do {
                    const nextNode = currentNode?.nextNode || null;
                    if (nextNode?.value === valueToDelete
                        && currentNode !== null) {
                        currentNode.nextNode = nextNode.nextNode || null;
                        break;
                    }
                    currentNode = currentNode?.nextNode || null;
                } while (currentNode !== this.head);
            }
        }
    }
    toString() {
        let currentNode = this.head;
        let first = true;
        const sb = [];
        sb.push("[");
        if (this.head !== null) {
            do {
                if (first) {
                    first = false;
                }
                else {
                    sb.push(",");
                }
                sb.push("" + currentNode?.value || "");
                currentNode = currentNode?.nextNode || null;
            } while (currentNode !== this.head);
        }
        sb.push("]");
        return sb.join("");
    }
    forEach(c) {
        this.forEachNode(c, this.head);
    }
    forEachNode(c, startingAt) {
        let currentNode = startingAt;
        if (startingAt !== null) {
            do {
                c(currentNode?.value || undefined);
                currentNode = currentNode?.nextNode || null;
            } while (currentNode !== startingAt);
        }
    }
    modes() {
        const modes = [];
        for (const node of this.nodes()) {
            const mode = this.nodes(node);
            modes.push(mode);
        }
        return modes;
    }
    nodes(startingAt) {
        const ret = [];
        const currentNode = startingAt || this.head;
        if (currentNode !== null) {
            let tempNode = currentNode;
            do {
                if (tempNode !== null) {
                    ret.push(tempNode);
                }
                tempNode = tempNode?.nextNode || null;
            } while (tempNode !== currentNode);
        }
        return ret;
    }
    equalsStrict(obj) {
        if (!(obj instanceof CircularLinkedList)) {
            return false;
        }
        const otherNodes = obj.nodes();
        if (this.nodes().every((node, index) => node.equals(otherNodes[index]))) {
            return true;
        }
        return false;
    }
    equals(obj) {
        if (!(obj instanceof CircularLinkedList)) {
            return false;
        }
        const otherNodes = obj.nodes();
        for (const mode of this.modes()) {
            if (mode.every((node, index) => node.equals(otherNodes[index]))) {
                return true;
            }
        }
        return false;
    }
}

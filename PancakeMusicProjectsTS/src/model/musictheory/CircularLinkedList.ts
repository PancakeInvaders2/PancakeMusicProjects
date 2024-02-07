import { EqualsTrait } from "../general/EqualsTrait.js";
import { CircularLinkedListNode } from "./CircularLinkedListNode.js";

export class CircularLinkedList<T extends EqualsTrait> implements EqualsTrait{
    head: CircularLinkedListNode<T> | null = null;
    private tail: CircularLinkedListNode<T> | null = null;
  
    addNode(value: T): void {
      const newNode = new CircularLinkedListNode<T>(value);
  
      if (this.head === null) {
        this.head = newNode;
      } else {
        if (this.tail) {
          this.tail.nextNode = newNode;
        }
      }
  
      this.tail = newNode;
      if (this.tail) {
        this.tail.nextNode = this.head;
      }
    }
  
    size(): number {
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
  
    containsNode(searchValue: T): boolean {
      let currentNode = this.head;
  
      if (this.head === null) {
        return false;
      } else {
        do {
          if (currentNode?.value === searchValue) {
            return true;
          }
          currentNode = currentNode?.nextNode || null;
        } while (currentNode !== this.head);
        return false;
      }
    }
  
    deleteNode(valueToDelete: T): void {
  
      if (this.head !== null) {
        let currentNode : CircularLinkedListNode<T> | null = this.head;

        if (currentNode?.value === valueToDelete) {
          this.head = this.head.nextNode || null;
          if (this.tail) {
            this.tail.nextNode = this.head;
          }
        } else {
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
  
    toString(): string {
      let currentNode = this.head;
      let first = true;
      const sb: string[] = [];
  
      sb.push("[");
      if (this.head !== null) {
        do {
          if (first) {
            first = false;
          } else {
            sb.push(",");
          }
          sb.push("" + currentNode?.value || "");
  
          currentNode = currentNode?.nextNode || null;
        } while (currentNode !== this.head);
      }
      sb.push("]");
  
      return sb.join("");
    }
  
    forEach(c: (value: T) => void): void {
      this.forEachNode(c, this.head);
    }
  
    forEachNode(c: (value: T) => void, startingAt: CircularLinkedListNode<T> | null): void {
      let currentNode = startingAt;
  
      if (startingAt !== null) {
        do {
          c(currentNode?.value || undefined as any);
  
          currentNode = currentNode?.nextNode || null;
        } while (currentNode !== startingAt);
      }
    }
  
    modes(): CircularLinkedListNode<T>[][] {
      const modes: CircularLinkedListNode<T>[][] = [];
  
      for (const node of this.nodes()) {
        const mode = this.nodes(node);
        modes.push(mode);
      }
  
      return modes;
    }
  
    nodes(startingAt?: CircularLinkedListNode<T>): CircularLinkedListNode<T>[] {
      const ret: CircularLinkedListNode<T>[] = [];
      const currentNode = startingAt || this.head;
  
      if (currentNode !== null) {
        let tempNode: CircularLinkedListNode<T> | null = currentNode;
        do {
            if(tempNode !== null){
                ret.push(tempNode);
            }
          tempNode = tempNode?.nextNode || null;
        } while (tempNode !== currentNode);
      }
  
      return ret;
    }

      
    equalsStrict(obj: any): boolean {
      if (!(obj instanceof CircularLinkedList)) {
        return false;
      }
  
      const otherNodes = obj.nodes();
  
      if (this.nodes().every((node, index) => node.equals(otherNodes[index]))) {
        return true;
      }
  
      return false;
    }
  
    equals(obj: any): boolean {
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
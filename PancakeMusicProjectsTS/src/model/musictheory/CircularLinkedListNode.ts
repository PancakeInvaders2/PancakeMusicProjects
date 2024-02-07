import { EqualsTrait } from "../general/EqualsTrait";

export class CircularLinkedListNode<T extends EqualsTrait> implements EqualsTrait{
    value: T;
    nextNode: CircularLinkedListNode<T> | null;
  
    constructor(value: T) {
      this.value = value;
      this.nextNode = null;
    }
  
    toString(): string {
      return `Node(${this.value})`;
    }
  
    equals(obj: any): boolean {
      if (!(obj instanceof CircularLinkedListNode)) {
        return false;
      }
    
      if (this.value === null && obj.value === null) {
        return true;
      } else if (this.value === null) {
        return false;
      }
  
      return this.value.equals(obj.value);
    }
  }
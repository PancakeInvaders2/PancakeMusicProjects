import { Key } from "../musictheory/Key.js";
import { Note } from "../musictheory/Note.js";
import { EqualsTrait } from "../general/EqualsTrait.js";

export class KeyAndRoot implements EqualsTrait{
  public readonly key: Key;
  public readonly root: Note;

  constructor(key: Key, root: Note) {
    this.key = key;
    this.root = root;
  }

  equals(obj: any): boolean {
    if (!(obj instanceof KeyAndRoot)) {
      return false;
    }

    return this.key.equals(obj.key)
      && this.root.equals(obj.root);

  }
  
}
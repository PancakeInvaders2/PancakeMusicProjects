export class KeyAndRoot {
    key;
    root;
    constructor(key, root) {
        this.key = key;
        this.root = root;
    }
    equals(obj) {
        if (!(obj instanceof KeyAndRoot)) {
            return false;
        }
        return this.key.equals(obj.key)
            && this.root.equals(obj.root);
    }
}

export class EqualsUtils {
    static arrayContainsAnEqual(array, obj) {
        for (let arrayItem of array) {
            if (arrayItem.equals(obj)) {
                return true;
            }
        }
        return false;
    }
}

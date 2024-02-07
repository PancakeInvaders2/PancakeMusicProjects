import { EqualsTrait } from "../model/general/EqualsTrait";

export class EqualsUtils {

    static arrayContainsAnEqual( array : EqualsTrait[], obj : EqualsTrait ) : boolean {
        for( let arrayItem of array ){
            if(arrayItem.equals(obj)){
                return true;
            }
        }
        return false;
    }
}
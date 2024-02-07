import { WhistleFingering } from './WhistleFingering.js'; // Import the WhistleFingering class
export class WhistleFingerings {
    // Define the fingerings
    static naturalSixHolesFingerings = new Set([
        new WhistleFingering("XXX_XXX", 0),
        new WhistleFingering("XXX_XXO", 2),
        new WhistleFingering("XXX_XOO", 4),
        new WhistleFingering("XXX_OOO", 5),
        new WhistleFingering("XXO_OOO", 7),
        new WhistleFingering("XOO_OOO", 9),
        new WhistleFingering("OOO_OOO", 11), // C#
    ]);
    static sixHolesCrossFingerings = new Set([
        // new WhistleFingering("XXO_XXO", 6), // G# // Disabled because out of tune on most whistles
        new WhistleFingering("XOX_XXX", 8),
        new WhistleFingering("OXX_OOO", 10), // C
    ]);
    static allSixHolesFingerings = new Set([
        ...WhistleFingerings.naturalSixHolesFingerings,
        ...WhistleFingerings.sixHolesCrossFingerings,
    ]);
    static naturalFingeringsWithLowerBackThumbHole = new Set([
        new WhistleFingering("XXX_XXX+X", 0),
        new WhistleFingering("XXX_XXO+X", 2),
        new WhistleFingering("XXX_XOO+X", 4),
        new WhistleFingering("XXX_OOO+X", 5),
        new WhistleFingering("XXO_OOO+X", 7),
        new WhistleFingering("XOO_OOO+X", 9),
        new WhistleFingering("OOO_OOO+X", 11), // G# / C#
    ]);
    static crossFingeringsWithLowerBackFlat3ThumbHole = new Set([
        new WhistleFingering("XXX_XXO+O", 3),
        new WhistleFingering("XOX_XXX+X", 8),
        new WhistleFingering("OXX_OOO+X", 10), // G
    ]);
    static allFingeringsWithLowerBackFlat3ThumbHole = new Set([
        ...WhistleFingerings.naturalFingeringsWithLowerBackThumbHole,
        ...WhistleFingerings.crossFingeringsWithLowerBackFlat3ThumbHole,
    ]);
    static crossFingeringsWithLowerBackFlat6ThumbHole = new Set([
        // new WhistleFingering("XXX_XXO+O", 3), // C // bottom thumb hole
        new WhistleFingering("XXX_OOO+O", 6),
        new WhistleFingering("XOX_XXX+X", 8),
        new WhistleFingering("OXX_OOO+X", 10), // C
    ]);
    static allFingeringsWithLowerBackFlat6ThumbHole = new Set([
        ...WhistleFingerings.naturalFingeringsWithLowerBackThumbHole,
        ...WhistleFingerings.crossFingeringsWithLowerBackFlat6ThumbHole,
    ]);
}

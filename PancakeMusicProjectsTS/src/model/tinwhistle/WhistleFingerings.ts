import { WhistleFingering } from './WhistleFingering.js'; // Import the WhistleFingering class

export class WhistleFingerings {
  // Define the fingerings
  public static readonly naturalSixHolesFingerings: Set<WhistleFingering> = new Set([
    new WhistleFingering("XXX_XXX", 0), // D
    new WhistleFingering("XXX_XXO", 2), // E
    new WhistleFingering("XXX_XOO", 4), // F#
    new WhistleFingering("XXX_OOO", 5), // G
    new WhistleFingering("XXO_OOO", 7), // A
    new WhistleFingering("XOO_OOO", 9), // B
    new WhistleFingering("OOO_OOO", 11), // C#
  ]);

  public static readonly sixHolesCrossFingerings: Set<WhistleFingering> = new Set([
    // new WhistleFingering("XXO_XXO", 6), // G# // Disabled because out of tune on most whistles
    new WhistleFingering("XOX_XXX", 8), // A#
    new WhistleFingering("OXX_OOO", 10), // C
  ]);

  public static readonly allSixHolesFingerings: Set<WhistleFingering> = new Set([
    ...WhistleFingerings.naturalSixHolesFingerings,
    ...WhistleFingerings.sixHolesCrossFingerings,
  ]);

  public static readonly naturalFingeringsWithLowerBackThumbHole: Set<WhistleFingering> = new Set([
    new WhistleFingering("XXX_XXX+X", 0), // A / D
    new WhistleFingering("XXX_XXO+X", 2), // B / E
    new WhistleFingering("XXX_XOO+X", 4), // C# / F#
    new WhistleFingering("XXX_OOO+X", 5), // D / G
    new WhistleFingering("XXO_OOO+X", 7), // E / A
    new WhistleFingering("XOO_OOO+X", 9), // F# / B
    new WhistleFingering("OOO_OOO+X", 11), // G# / C#
  ]);

  public static readonly crossFingeringsWithLowerBackFlat3ThumbHole: Set<WhistleFingering> = new Set([
    new WhistleFingering("XXX_XXO+O", 3), // C // bottom thumb hole
    new WhistleFingering("XOX_XXX+X", 8), // F
    new WhistleFingering("OXX_OOO+X", 10), // G
  ]);

  public static readonly allFingeringsWithLowerBackFlat3ThumbHole: Set<WhistleFingering> = new Set([
    ...WhistleFingerings.naturalFingeringsWithLowerBackThumbHole,
    ...WhistleFingerings.crossFingeringsWithLowerBackFlat3ThumbHole,
  ]);

  public static readonly crossFingeringsWithLowerBackFlat6ThumbHole: Set<WhistleFingering> = new Set([
    // new WhistleFingering("XXX_XXO+O", 3), // C // bottom thumb hole
    new WhistleFingering("XXX_OOO+O", 6), // G# // bottom thumb hole
    new WhistleFingering("XOX_XXX+X", 8), // A#
    new WhistleFingering("OXX_OOO+X", 10), // C
  ]);

  public static readonly allFingeringsWithLowerBackFlat6ThumbHole: Set<WhistleFingering> = new Set([
    ...WhistleFingerings.naturalFingeringsWithLowerBackThumbHole,
    ...WhistleFingerings.crossFingeringsWithLowerBackFlat6ThumbHole,
  ]);
}
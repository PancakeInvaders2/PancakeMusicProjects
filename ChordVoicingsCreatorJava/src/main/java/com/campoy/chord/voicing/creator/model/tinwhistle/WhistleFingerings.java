package com.campoy.chord.voicing.creator.model.tinwhistle;

import java.util.Arrays;
import java.util.List;
import java.util.Set;

import com.campoy.chord.voicing.creator.model.musictheory.Interval;
import com.campoy.chord.voicing.creator.model.musictheory.Key;
import com.google.common.collect.Sets;

import lombok.Data;

public class WhistleFingerings {

    /**
     * X : hole covered
     * O : hole open
     * 
     * Notes on D whistle for reference
     * 
     */
    
    // regular fingerings 
    
    // XXX XXX : D (first octave)
    // XXX XXO : E (first and second octave)
    // XXX XOO : F# (first and second octave)
    // XXX OOO : G (first and second octave)
    // XXO OOO : A (first and second octave)
    // XOO OOO : B (first and second octave)
    // OOO OOO : C# (first and second octave)
    // OXX XXX : D (second octave)

    // cross fingerings
    
    // XXO XXO : G# (first and second octave)
    // XOX XXX : A# (first octave)
    // XOX OOO : A# (second octave)
    // OXX OOO : C (first and second octave)
    
    public static final Set<WhistleFingering> naturalSixHolesFingerings = Sets.newHashSet(
        new WhistleFingering("XXX_XXX", 0), // D
        new WhistleFingering("XXX_XXO", 2), // E
        new WhistleFingering("XXX_XOO", 4), // F#
        new WhistleFingering("XXX_OOO", 5), // G
        new WhistleFingering("XXO_OOO", 7), // A
        new WhistleFingering("XOO_OOO", 9), // B
        new WhistleFingering("OOO_OOO", 11) // C#
    );
    
    public static final Set<WhistleFingering> sixHolesCrossFingerings = Sets.newHashSet(
        //new WhistleFingering("XXO_XXO", 6), // G# // disabled because out of tune on most whistles
        new WhistleFingering("XOX_XXX", 8), // A#
        new WhistleFingering("OXX_OOO", 10) // C
    );                                                                            
    
    public static final Set<WhistleFingering> allSixHolesFingerings = Sets.union(naturalSixHolesFingerings, sixHolesCrossFingerings);               

    
    /*
     * Fingerings from 
     * "TRYING THE CARBONY MEZZO A WHISTLE WITH THUMBHOLES - OVERVIEW"
     */
    public static final Set<WhistleFingering> naturalFingeringsWithLowerBackThumbHole = Sets.newHashSet(
        new WhistleFingering("XXX_XXX+X", 0), // A / D
        new WhistleFingering("XXX_XXO+X", 2), // B / E
        new WhistleFingering("XXX_XOO+X", 4), // C# / F#
        new WhistleFingering("XXX_OOO+X", 5), // D / G
        new WhistleFingering("XXO_OOO+X", 7), // E / A
        new WhistleFingering("XOO_OOO+X", 9), // F# / B
        new WhistleFingering("OOO_OOO+X", 11) // G# / C#
    );
      
    public static final Set<WhistleFingering> crossFingeringsWithLowerBackFlat3ThumbHole = Sets.newHashSet(
        new WhistleFingering("XXX_XXO+O", 3), // C // bottom thumb hole
        new WhistleFingering("XOX_XXX+X", 8), // F
        new WhistleFingering("OXX_OOO+X", 10) // G 
    );
    
    public static final Set<WhistleFingering> allFingeringsWithLowerBackFlat3ThumbHole = Sets.union(naturalFingeringsWithLowerBackThumbHole, crossFingeringsWithLowerBackFlat3ThumbHole);               
    
    public static final Set<WhistleFingering> crossFingeringsWithLowerBackFlat6ThumbHole = Sets.newHashSet(
        //new WhistleFingering("XXX_XXO+O", 3), // C // bottom thumb hole
        new WhistleFingering("XXX_OOO+O", 6), // G# // bottom thumb hole
        new WhistleFingering("XOX_XXX+X", 8), // A#
        new WhistleFingering("OXX_OOO+X", 10) // C
    );
    
    public static final Set<WhistleFingering> allFingeringsWithLowerBackFlat6ThumbHole = Sets.union(naturalFingeringsWithLowerBackThumbHole, crossFingeringsWithLowerBackFlat6ThumbHole);               

    
    // new WhistleFingering("XXX_XXX+X", 0) // D
    // new WhistleFingering("XXX_XXO+X", 2), // E
    
    // new WhistleFingering("XXX_XXO+O", 3), // C // bottom thumb hole
    
    // new WhistleFingering("XXX_XOO+X", 4), // F#
    // new WhistleFingering("XXX_OOO+X", 5), // G
    // new WhistleFingering("XXX_OOO+O", 6), // G# // bottom thumb hole
    // new WhistleFingering("XXO_OOO+X", 7), // A    
    // new WhistleFingering("XOX_XXX+X", 8), // A# // CROSS
    // new WhistleFingering("XOO_OOO+X", 9), //  B
    // new WhistleFingering("OXX_OOO+X", 10) // C // CROSS     
    // new WhistleFingering("OOO_OOO+X", 11) // C#
    
}

package com.campoy.chord.voicing.creator.model.tinwhistle;

import java.util.Arrays;
import java.util.List;
import java.util.Set;

import com.campoy.chord.voicing.creator.model.musictheory.Interval;
import com.campoy.chord.voicing.creator.model.musictheory.Scale;
import com.google.common.collect.Sets;

import lombok.Data;

public class SixHoleWhistleFingerings {

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
    
    public static final Set<WhistleFingering> naturalFingerings = Sets.newHashSet(
        new WhistleFingering("XXX_XXX", 0), // D
        new WhistleFingering("XXX_XXO", 2), // E
        new WhistleFingering("XXX_XOO", 4), // F#
        new WhistleFingering("XXX_OOO", 5), // G
        new WhistleFingering("XXO_OOO", 7), // A
        new WhistleFingering("XOO_OOO", 9), // B
        new WhistleFingering("OOO_OOO", 11) // C#
    );
    
    public static final Set<WhistleFingering> crossFingerings = Sets.newHashSet(
        new WhistleFingering("XXO_XXO", 6), // G#
        new WhistleFingering("XOX_XXX", 8), // A#
        new WhistleFingering("OXX_OOO", 10) // C
    );
    
    public static final Set<WhistleFingering> allFingerings = Sets.union(naturalFingerings, crossFingerings);               

}

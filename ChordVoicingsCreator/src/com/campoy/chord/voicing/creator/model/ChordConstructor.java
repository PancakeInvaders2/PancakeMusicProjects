package com.campoy.chord.voicing.creator.model;

import java.util.function.Function;

public class ChordConstructor {
    private final String name;
    private final Function<Note, Chord> chordConstructingfunction;
    
    public ChordConstructor(String name, Function<Note, Chord> chordConstructingfunction) {
        this.name = name;
        this.chordConstructingfunction = chordConstructingfunction;
    }
    
    public Chord constructChord(Note note) {
        return chordConstructingfunction.apply(note);
    }
    
    public String getName() {
        return name;
    }
    
    
    
}

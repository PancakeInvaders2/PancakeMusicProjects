package com.campoy.chord.voicing.creator.model.musictheory;

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
    
    @Override
    public boolean equals(Object other) {
        
        if( !( other instanceof ChordConstructor) ) {
            return false;
        }
        
        ChordConstructor otherChordConstructor = (ChordConstructor)other;
        
        Chord thisChord = this.constructChord(Note.A);
        Chord otherChord = otherChordConstructor.constructChord(Note.A);
        
        if(thisChord == null) {
        	return otherChord == null;
        }
        
        return (thisChord.equals(otherChord));
        
    }
    
    
    
}

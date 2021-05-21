package com.campoy.chord.voicing.creator.model;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.StringJoiner;
import java.util.Map.Entry;

import com.campoy.chord.voicing.creator.util.ChordService;

public class Chord {

    private static final String UNKNOWN_CHORD_TYPE = "Unknown chord type";
    private Set<Note> notes = new HashSet<>();
    private List<String> computedChordTypes = new ArrayList<>();
    
    public Chord() {}
    
    public Set<Note> getNotes() {
        return notes;
    }

    public Chord plus(Note note) {
        
        Chord chord = new Chord();
        chord.getNotes().addAll(this.notes);
        chord.getNotes().add(note);
        
        return chord;
    }
    
    public String noteRepresentation() {
        StringJoiner sj = new StringJoiner(" "); 
        for(Note note : notes) {
            sj.add(note.toString());
        }
        return sj.toString();
    }
    
    @Override
    public String toString() {
        return "" + getComputedChordTypes() + " (" + noteRepresentation() + ")";
    }
    
    public List<String> namedChords() {
    	List<String> result = new ArrayList<>();
    	for( String chordType : getComputedChordTypes()) {
    		
    		result.add( "" + chordType + " (" + noteRepresentation() + ")" );

    	}
        return result;
    }
    
    public List<String> getComputedChordTypes() {
        return computedChordTypes;
    }
    
    boolean isContainedIn(Chord other){
        boolean result = true;
        for( Note note : this.getNotes() ) {
            if( ! other.getNotes().contains(note) ) {
                result = false;
            }
        }
        return result;
    }
    
    @Override
    public boolean equals(Object other) {
        
        if( !( other instanceof Chord) ) {
            return false;
        }
        
        Chord otherChord = (Chord)other;
        
        if(this.getNotes().size() != otherChord.getNotes().size()) {
            return false;
        }
                
        for(Note note : this.getNotes()) {
            if( ! otherChord.notes.contains(note) ) {
                return false;
            }
        }
        
        return true;
    }

}

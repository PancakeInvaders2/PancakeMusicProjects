package com.campoy.chord.voicing.creator.model;

import java.util.HashSet;
import java.util.Set;
import java.util.StringJoiner;
import java.util.Map.Entry;

import com.campoy.chord.voicing.creator.util.ChordUtils;

public class Chord {

    private static final String UNKNOWN_CHORD_TYPE = "Unknown chord type";
    private Set<Note> notes = new HashSet<>();
    private String computedChordType = UNKNOWN_CHORD_TYPE;
    private boolean chordTypeFound = false;
    
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
        return getComputedChordType() + " (" + noteRepresentation() + ")";
    }
    
    public void postProcessing(){
        
        String chordType = UNKNOWN_CHORD_TYPE;
        chordTypeFound  = false;
        
        // we test each chord type with each note of the chord as the center
        for(Note noteCenter : getNotes()) {
            String result = ChordUtils.isChordAroundThisCenter(noteCenter, this);
            if (result != null) {
                chordType = result;
                chordTypeFound = true;
                break;
            }
        }
        
        this.chordTypeFound = chordTypeFound;
        this.computedChordType = chordType;
    }
    
    public String getComputedChordType() {
        return computedChordType;
    }
    
    public boolean isChordTypeFound() {
        return chordTypeFound;
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

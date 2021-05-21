package com.campoy.chord.voicing.creator.util;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.StringJoiner;
import java.util.function.Predicate;

import com.campoy.chord.voicing.creator.model.Chord;
import com.campoy.chord.voicing.creator.model.ChordConstructor;
import com.campoy.chord.voicing.creator.model.Interval;
import com.campoy.chord.voicing.creator.model.Note;

public class ChordService {
    
    
    
    


	public static String isChordAroundThisCenter(
			Set<ChordConstructor> chordsToSearch, 
			Note noteCenter, 
			Chord chord) {

        for(ChordConstructor chordConstructor : chordsToSearch) {
            
            Chord constructedChord = chordConstructor.constructChord(noteCenter);
            if(constructedChord.equals(chord)) {
                return "" + noteCenter + " " + chordConstructor.getName();
            }
        }
        
        return null;
    }
	
    public static Chord customChord(Note note, List<Interval> intervals){
        Chord chord = new Chord();
        
        List<Note> notesToAdd = new ArrayList<>();
        
        for(Interval interval : intervals) {
        	notesToAdd.add(note.up(interval.getSemitones()));
        }
        
        chord.getNotes().addAll(notesToAdd);
        
        return chord;
    }

    public Chord powerChord(Note note){
        Chord chord = new Chord();
        chord.getNotes().add(note);
        chord.getNotes().add(note.up(7));
        return chord;
    }
    
    public Chord minorTriad(Note note){
        Chord chord = new Chord();
        chord.getNotes().add(note);
        chord.getNotes().add(note.up(3));
        chord.getNotes().add(note.up(7));
        return chord;
    }
    
    public Chord minorTriadMaj7(Note note){
        Chord chord = new Chord();
        chord.getNotes().add(note);
        chord.getNotes().add(note.up(3));
        chord.getNotes().add(note.up(7));
        chord.getNotes().add(note.up(11));
        return chord;
    }
    
    public Chord minorTriadMin7(Note note){
        Chord chord = new Chord();
        chord.getNotes().add(note);
        chord.getNotes().add(note.up(3));
        chord.getNotes().add(note.up(7));
        chord.getNotes().add(note.up(10));
        return chord;
    }
    
    public Chord minorNo5thMaj7(Note note){
        Chord chord = new Chord();
        chord.getNotes().add(note);
        chord.getNotes().add(note.up(3));
        chord.getNotes().add(note.up(11));
        return chord;
    }
    
    public Chord minorNo5thMin7(Note note){
        Chord chord = new Chord();
        chord.getNotes().add(note);
        chord.getNotes().add(note.up(3));
        chord.getNotes().add(note.up(10));
        return chord;
    }
    
    public Chord majorTriad(Note note){
        Chord chord = new Chord();
        chord.getNotes().add(note);
        chord.getNotes().add(note.up(4));
        chord.getNotes().add(note.up(7));
        return chord;
    }
    
    public Chord majorTriadMin7(Note note){
        Chord chord = new Chord();
        chord.getNotes().add(note);
        chord.getNotes().add(note.up(4));
        chord.getNotes().add(note.up(7));
        chord.getNotes().add(note.up(10));
        return chord;
    }
    
    public Chord majorTriadMaj7(Note note){
        Chord chord = new Chord();
        chord.getNotes().add(note);
        chord.getNotes().add(note.up(4));
        chord.getNotes().add(note.up(7));
        chord.getNotes().add(note.up(11));
        return chord;
    }
    
    public Chord majorNo5thMin7(Note note){
        Chord chord = new Chord();
        chord.getNotes().add(note);
        chord.getNotes().add(note.up(4));
        chord.getNotes().add(note.up(10));
        return chord;
    }
    
    public Chord majorNo5thMaj7(Note note){
        Chord chord = new Chord();
        chord.getNotes().add(note);
        chord.getNotes().add(note.up(4));
        chord.getNotes().add(note.up(11));
        return chord;
    }
    
    public Chord sus2Triad(Note note){
        Chord chord = new Chord();
        chord.getNotes().add(note);
        chord.getNotes().add(note.up(2));
        chord.getNotes().add(note.up(7));
        return chord;
    }
    
    public Chord sus4Triad(Note note){
        Chord chord = new Chord();
        chord.getNotes().add(note);
        chord.getNotes().add(note.up(5));
        chord.getNotes().add(note.up(7));
        return chord;
    }
    
    public Chord augmentedTriad(Note note){
        Chord chord = new Chord();
        chord.getNotes().add(note);
        chord.getNotes().add(note.up(4));
        chord.getNotes().add(note.up(8));
        return chord;
    }
    
    public Chord diminishedTriad(Note note){
        Chord chord = new Chord();
        chord.getNotes().add(note);
        chord.getNotes().add(note.up(3));
        chord.getNotes().add(note.up(6));
        return chord;
    }
    
}

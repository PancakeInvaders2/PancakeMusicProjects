package com.campoy.chord.voicing.creator.util;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import com.campoy.chord.voicing.creator.model.Chord;
import com.campoy.chord.voicing.creator.model.ChordConstructor;
import com.campoy.chord.voicing.creator.model.Note;

public class ChordUtils {
    
    public static final List<ChordConstructor> CHORD_CONSTRUCTORS;
    
    static {
        List<ChordConstructor> chordConstructingFunctions = new ArrayList<>();
        chordConstructingFunctions.add(new ChordConstructor("powerChord", 
                (note) -> ChordUtils.powerChord(note)));
        chordConstructingFunctions.add(new ChordConstructor("minorTriad", 
                (note) -> ChordUtils.minorTriad(note)));
        chordConstructingFunctions.add(new ChordConstructor("majorTriad", 
                (note) -> ChordUtils.majorTriad(note)));
        chordConstructingFunctions.add(new ChordConstructor("sus2Triad", 
                (note) -> ChordUtils.sus2Triad(note)));
        chordConstructingFunctions.add(new ChordConstructor("sus4Triad", 
                (note) -> ChordUtils.sus4Triad(note)));
        chordConstructingFunctions.add(new ChordConstructor("augmentedTriad", 
                (note) -> ChordUtils.augmentedTriad(note)));
        chordConstructingFunctions.add(new ChordConstructor("diminishedTriad", 
                (note) -> ChordUtils.diminishedTriad(note)));
        chordConstructingFunctions.add(new ChordConstructor("minorTriadMin7", 
                (note) -> ChordUtils.minorTriadMin7(note)));
        chordConstructingFunctions.add(new ChordConstructor("majorTriadMaj7", 
                (note) -> ChordUtils.majorTriadMaj7(note)));
        chordConstructingFunctions.add(new ChordConstructor("minorTriadMin7", 
                (note) -> ChordUtils.minorTriadMin7(note)));
        chordConstructingFunctions.add(new ChordConstructor("majorTriadMaj7", 
                (note) -> ChordUtils.majorTriadMaj7(note)));
        
        CHORD_CONSTRUCTORS = Collections.unmodifiableList(chordConstructingFunctions);
    }
    
    public static List<ChordConstructor> getChordConstructors() {
        return CHORD_CONSTRUCTORS;
    }
    
    public static String isChordAroundThisCenter(Note noteCenter, Chord chord) {

        for(ChordConstructor chordConstructor : ChordUtils.CHORD_CONSTRUCTORS) {
            
            Chord constructedChord = chordConstructor.constructChord(noteCenter);
            if(constructedChord.equals(chord)) {
                return "" + noteCenter + " " + chordConstructor.getName();
            }
        }
        
        return null;
    }

    public static Chord powerChord(Note note){
        Chord chord = new Chord();
        chord.getNotes().add(note);
        chord.getNotes().add(note.up(7));
        return chord;
    }
    
    public static Chord minorTriad(Note note){
        Chord chord = new Chord();
        chord.getNotes().add(note);
        chord.getNotes().add(note.up(3));
        chord.getNotes().add(note.up(7));
        return chord;
    }
    
    public static Chord minorTriadMaj7(Note note){
        Chord chord = new Chord();
        chord.getNotes().add(note);
        chord.getNotes().add(note.up(3));
        chord.getNotes().add(note.up(7));
        chord.getNotes().add(note.up(11));
        return chord;
    }
    
    public static Chord minorTriadMin7(Note note){
        Chord chord = new Chord();
        chord.getNotes().add(note);
        chord.getNotes().add(note.up(3));
        chord.getNotes().add(note.up(7));
        chord.getNotes().add(note.up(10));
        return chord;
    }
    
    public static Chord majorTriad(Note note){
        Chord chord = new Chord();
        chord.getNotes().add(note);
        chord.getNotes().add(note.up(4));
        chord.getNotes().add(note.up(7));
        return chord;
    }
    
    public static Chord majorTriadMin7(Note note){
        Chord chord = new Chord();
        chord.getNotes().add(note);
        chord.getNotes().add(note.up(4));
        chord.getNotes().add(note.up(7));
        chord.getNotes().add(note.up(10));
        return chord;
    }
    
    public static Chord majorTriadMaj7(Note note){
        Chord chord = new Chord();
        chord.getNotes().add(note);
        chord.getNotes().add(note.up(4));
        chord.getNotes().add(note.up(7));
        chord.getNotes().add(note.up(11));

        return chord;
    }
    
    public static Chord sus2Triad(Note note){
        Chord chord = new Chord();
        chord.getNotes().add(note);
        chord.getNotes().add(note.up(2));
        chord.getNotes().add(note.up(7));
        return chord;
    }
    
    public static Chord sus4Triad(Note note){
        Chord chord = new Chord();
        chord.getNotes().add(note);
        chord.getNotes().add(note.up(5));
        chord.getNotes().add(note.up(7));
        return chord;
    }
    
    public static Chord augmentedTriad(Note note){
        Chord chord = new Chord();
        chord.getNotes().add(note);
        chord.getNotes().add(note.up(4));
        chord.getNotes().add(note.up(8));
        return chord;
    }
    
    public static Chord diminishedTriad(Note note){
        Chord chord = new Chord();
        chord.getNotes().add(note);
        chord.getNotes().add(note.up(3));
        chord.getNotes().add(note.up(6));
        return chord;
    }
    
}

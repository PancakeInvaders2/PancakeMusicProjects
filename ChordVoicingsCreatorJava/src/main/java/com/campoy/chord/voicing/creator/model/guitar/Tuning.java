package com.campoy.chord.voicing.creator.model.guitar;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;

import com.campoy.chord.voicing.creator.model.musictheory.Note;
import com.campoy.chord.voicing.creator.model.musictheory.NoteAndOctave;

import java.util.StringJoiner;

public class Tuning {

    public static final Tuning STANDARD_7_STRING_GUITAR = new Tuning();
    public static final Tuning DROP_A_7_STRING_GUITAR = new Tuning();
    public static final Tuning STANDARD_6_STRING_GUITAR = new Tuning();
    public static final Tuning DROP_D_6_STRING_GUITAR = new Tuning();

    public static final Tuning STANDARD_6_STRING_BASS = new Tuning();
    public static final Tuning STANDARD_5_STRING_BASS = new Tuning();
    public static final Tuning STANDARD_4_STRING_BASS = new Tuning();
    
    public static final Tuning[] presetTunings = {
            STANDARD_6_STRING_GUITAR,
            DROP_D_6_STRING_GUITAR,
            STANDARD_7_STRING_GUITAR,
            DROP_A_7_STRING_GUITAR,
            STANDARD_4_STRING_BASS,
            STANDARD_5_STRING_BASS,
            STANDARD_6_STRING_BASS };
    
    static {

        STANDARD_7_STRING_GUITAR.stringNotes.put(new GuitarString(0),
                new NoteAndOctave(Note.B, 2));
        STANDARD_7_STRING_GUITAR.stringNotes.put(new GuitarString(1),
                new NoteAndOctave(Note.E, 2));
        STANDARD_7_STRING_GUITAR.stringNotes.put(new GuitarString(2),
                new NoteAndOctave(Note.A, 3));
        STANDARD_7_STRING_GUITAR.stringNotes.put(new GuitarString(3),
                new NoteAndOctave(Note.D, 3));
        STANDARD_7_STRING_GUITAR.stringNotes.put(new GuitarString(4),
                new NoteAndOctave(Note.G, 3));
        STANDARD_7_STRING_GUITAR.stringNotes.put(new GuitarString(5),
                new NoteAndOctave(Note.B, 4));
        STANDARD_7_STRING_GUITAR.stringNotes.put(new GuitarString(6),
                new NoteAndOctave(Note.E, 4));
        
        DROP_A_7_STRING_GUITAR.stringNotes.put(new GuitarString(0),
                new NoteAndOctave(Note.A, 2));
        DROP_A_7_STRING_GUITAR.stringNotes.put(new GuitarString(1),
                new NoteAndOctave(Note.E, 2));
        DROP_A_7_STRING_GUITAR.stringNotes.put(new GuitarString(2),
                new NoteAndOctave(Note.A, 3));
        DROP_A_7_STRING_GUITAR.stringNotes.put(new GuitarString(3),
                new NoteAndOctave(Note.D, 3));
        DROP_A_7_STRING_GUITAR.stringNotes.put(new GuitarString(4),
                new NoteAndOctave(Note.G, 3));
        DROP_A_7_STRING_GUITAR.stringNotes.put(new GuitarString(5),
                new NoteAndOctave(Note.B, 4));
        DROP_A_7_STRING_GUITAR.stringNotes.put(new GuitarString(6),
                new NoteAndOctave(Note.E, 4));
        
        STANDARD_6_STRING_GUITAR.stringNotes.put(new GuitarString(0),
                new NoteAndOctave(Note.E, 2));
        STANDARD_6_STRING_GUITAR.stringNotes.put(new GuitarString(1),
                new NoteAndOctave(Note.A, 3));
        STANDARD_6_STRING_GUITAR.stringNotes.put(new GuitarString(2),
                new NoteAndOctave(Note.D, 3));
        STANDARD_6_STRING_GUITAR.stringNotes.put(new GuitarString(3),
                new NoteAndOctave(Note.G, 3));
        STANDARD_6_STRING_GUITAR.stringNotes.put(new GuitarString(4),
                new NoteAndOctave(Note.B, 4));
        STANDARD_6_STRING_GUITAR.stringNotes.put(new GuitarString(5),
                new NoteAndOctave(Note.E, 4));
        
        DROP_D_6_STRING_GUITAR.stringNotes.put(new GuitarString(0),
                new NoteAndOctave(Note.D, 2));
        DROP_D_6_STRING_GUITAR.stringNotes.put(new GuitarString(1),
                new NoteAndOctave(Note.A, 3));
        DROP_D_6_STRING_GUITAR.stringNotes.put(new GuitarString(2),
                new NoteAndOctave(Note.D, 3));
        DROP_D_6_STRING_GUITAR.stringNotes.put(new GuitarString(3),
                new NoteAndOctave(Note.G, 3));
        DROP_D_6_STRING_GUITAR.stringNotes.put(new GuitarString(4),
                new NoteAndOctave(Note.B, 4));
        DROP_D_6_STRING_GUITAR.stringNotes.put(new GuitarString(5),
                new NoteAndOctave(Note.E, 4));
        
        STANDARD_4_STRING_BASS.stringNotes.put(new GuitarString(0),
                new NoteAndOctave(Note.E, 1));
        STANDARD_4_STRING_BASS.stringNotes.put(new GuitarString(1),
                new NoteAndOctave(Note.A, 2));
        STANDARD_4_STRING_BASS.stringNotes.put(new GuitarString(2),
                new NoteAndOctave(Note.D, 2));
        STANDARD_4_STRING_BASS.stringNotes.put(new GuitarString(3),
                new NoteAndOctave(Note.G, 2));
        
        STANDARD_5_STRING_BASS.stringNotes.put(new GuitarString(0),
                new NoteAndOctave(Note.B, 1));
        STANDARD_5_STRING_BASS.stringNotes.put(new GuitarString(1),
                new NoteAndOctave(Note.E, 1));
        STANDARD_5_STRING_BASS.stringNotes.put(new GuitarString(2),
                new NoteAndOctave(Note.A, 2));
        STANDARD_5_STRING_BASS.stringNotes.put(new GuitarString(3),
                new NoteAndOctave(Note.D, 2));
        STANDARD_5_STRING_BASS.stringNotes.put(new GuitarString(4),
                new NoteAndOctave(Note.G, 2));
        
        STANDARD_6_STRING_BASS.stringNotes.put(new GuitarString(0),
                new NoteAndOctave(Note.B, 1));
        STANDARD_6_STRING_BASS.stringNotes.put(new GuitarString(1),
                new NoteAndOctave(Note.E, 1));
        STANDARD_6_STRING_BASS.stringNotes.put(new GuitarString(2),
                new NoteAndOctave(Note.A, 2));
        STANDARD_6_STRING_BASS.stringNotes.put(new GuitarString(3),
                new NoteAndOctave(Note.D, 2));
        STANDARD_6_STRING_BASS.stringNotes.put(new GuitarString(4),
                new NoteAndOctave(Note.G, 2));
        STANDARD_6_STRING_BASS.stringNotes.put(new GuitarString(5),
                new NoteAndOctave(Note.C, 3));

    }
    
    private final Map<GuitarString, NoteAndOctave> stringNotes = new HashMap<>();
    
    private Tuning() {
    }
    
    public Tuning(Map<GuitarString, NoteAndOctave> stringNotes) {
        this.stringNotes.putAll(stringNotes);
    }
    
    public Map<GuitarString, NoteAndOctave> getStringNotes() {
        return Collections.unmodifiableMap(stringNotes);        
    }
    
    public int getNumberOfStrings(){
        return stringNotes.size();
    }
    
    @Override
    public boolean equals(Object obj) {
        
        if( !( obj instanceof Tuning) ) {
            return false;
        }
        
        Tuning objTuning = (Tuning)obj;
        
        if(this.stringNotes.size() != objTuning.stringNotes.size()) {
            return false;
        }
                
        for(Entry<GuitarString, NoteAndOctave> entry : this.stringNotes.entrySet()) {
            
            GuitarString guitarString = entry.getKey();
            NoteAndOctave stringNote = entry.getValue();
            NoteAndOctave otherStringNote = objTuning.stringNotes.get(guitarString);
            
            if(stringNote != otherStringNote 
                    && !stringNote.equals(otherStringNote)) {
                return false;
            }
        }
        
        return true;
    }
    
    @Override
    public String toString() {
        
        StringJoiner sj = new StringJoiner(" "); 
        for(int i = 0; i < stringNotes.size(); i++) {
            NoteAndOctave stringNote = stringNotes.get(new GuitarString(i));
            sj.add(stringNote.toString());
        }
        return sj.toString();
    }
}

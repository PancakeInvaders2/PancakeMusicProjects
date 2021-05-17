package com.campoy.chord.voicing.creator.model;

import java.util.HashMap;
import java.util.Map;

public enum Note {

    A(0, "A"),
    A_SHARP(1, "A#"),
    B(2, "B"),
    C(3, "C"),
    C_SHARP(4, "C#"),
    D(5, "D"),
    D_SHARP(6, "D#"),
    E(7, "E"),
    F(8, "F"),
    F_SHARP(9, "F#"),
    G(10, "G"),
    G_SHARP(11, "G#");
    
    static Map<Integer, Note> mapOfSemitonesFromA = new HashMap<>();
    
    static {
        for(Note note : Note.values()) {
            mapOfSemitonesFromA.put(note.getSemitonesFromA(), note);
        }
    }
    
    int semitonesFromA;
    
    String representation;
        
    private Note(int semitonesFromA, String representation) {
        this.semitonesFromA = semitonesFromA;
        this.representation = representation;
    }
    
    public int getSemitonesFromA() {
        return semitonesFromA;
    }
    
    /**
     * example : input : 3 -> return : C
     * 
     * 
     * @param semitonesFromA
     * @return
     */
    public static Note noteBySemitonesFromA(int semitonesFromA){
        if(semitonesFromA < 0 || semitonesFromA > 11 ) {
            return null;
        }
        return mapOfSemitonesFromA.get(semitonesFromA);
    }
    
    @Override
    public String toString() {
        return this.representation;
    }
    

    public Note up(int semitones) {
        int newNoteSemitonesFromA  = this.getSemitonesFromA() + semitones;
        while(newNoteSemitonesFromA > 11 ) {
            newNoteSemitonesFromA -= 12;
        }
        return Note.noteBySemitonesFromA(newNoteSemitonesFromA);
    }    
    
    public Note down(int semitones) {
        int newNoteSemitonesFromA  = this.getSemitonesFromA() - semitones;
        while(newNoteSemitonesFromA < 0 ) {
            newNoteSemitonesFromA += 12;
        }
        return Note.noteBySemitonesFromA(newNoteSemitonesFromA);
    }
}

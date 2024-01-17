package com.campoy.chord.voicing.creator.model.musictheory;

import java.util.HashMap;
import java.util.Map;

public enum Note {

    A(0, "A", null),
    A_SHARP(1, "A#", "Gb"),
    B(2, "B", null),
    C(3, "C", null),
    C_SHARP(4, "C#", "Db"),
    D(5, "D", null),
    D_SHARP(6, "D#", "Eb"),
    E(7, "E", null),
    F(8, "F", null),
    F_SHARP(9, "F#", "Gb"),
    G(10, "G", null),
    G_SHARP(11, "G#", "Ab");
    
    static Map<Integer, Note> mapOfSemitonesFromA = new HashMap<>();
    
    static {
        for(Note note : Note.values()) {
            mapOfSemitonesFromA.put(note.getSemitonesFromA(), note);
        }
    }
    
    private int semitonesFromA;
    private String mainRepresentation;
    private String secondaryRepresentation;
    
    private Note(int semitonesFromA, String mainRepresentation, String secondaryRepresentation) {
        this.semitonesFromA = semitonesFromA;
        this.mainRepresentation = mainRepresentation;
        this.secondaryRepresentation = secondaryRepresentation;
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
        return this.mainRepresentation;
    }
    
    public String fullRepresentation() {
        if(secondaryRepresentation == null) {
            return mainRepresentation;
        }
        else {
            return mainRepresentation + "/" + secondaryRepresentation;
        }
    }
    

    public Note up(int semitones) {
    	
    	if(semitones == 0) {
    		return this;
    	}
    	
        int newNoteSemitonesFromA  = this.getSemitonesFromA() + semitones;
        while(newNoteSemitonesFromA > 11 ) {
            newNoteSemitonesFromA -= 12;
        }
        return Note.noteBySemitonesFromA(newNoteSemitonesFromA);
    }    
    
    public Note down(int semitones) {
    	if(semitones == 0) {
    		return this;
    	}
    	
        int newNoteSemitonesFromA  = this.getSemitonesFromA() - semitones;
        while(newNoteSemitonesFromA < 0 ) {
            newNoteSemitonesFromA += 12;
        }
        return Note.noteBySemitonesFromA(newNoteSemitonesFromA);
    }
}

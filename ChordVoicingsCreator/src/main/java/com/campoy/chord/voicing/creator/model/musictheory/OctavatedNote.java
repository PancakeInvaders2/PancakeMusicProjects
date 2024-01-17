package com.campoy.chord.voicing.creator.model.musictheory;

import lombok.Data;

@Data
public class OctavatedNote {

    private final Note note;
    
    private final int octave;
    
    public static OctavatedNote A_440 = new OctavatedNote(Note.A, 4);
    
//    @Override
//    public boolean equals(Object obj) {
//        
//        if( !( obj instanceof OctavatedNote) ) {
//            return false;
//        }
//        
//        OctavatedNote objOctavatedNote = (OctavatedNote)obj;
//        boolean equalNote = this.getNote() == objOctavatedNote.getNote();
//        boolean equalOctave = this.getOctave() == objOctavatedNote.getOctave();
//        
//        if(equalNote && equalOctave) {
//            return true;
//        }
//        else {
//            return false;
//        }
//    }
    

    public OctavatedNote up(int semitones) {
        
        int baseNoteOctave = this.getOctave();
        Note baseNoteNote = this.getNote();
        
        int newNoteSemitonesFromA  = baseNoteNote.getSemitonesFromA() + semitones;
        int newNoteOctave = baseNoteOctave;
        
        while(newNoteSemitonesFromA > 11 ) {
            newNoteSemitonesFromA -= 12;
            newNoteOctave += 1;
        }
        
        Note newNote = Note.noteBySemitonesFromA(newNoteSemitonesFromA);
        
        return new OctavatedNote(newNote, newNoteOctave);
        
    }
    
    public OctavatedNote down(int semitones) {
        
        int baseNoteOctave = this.getOctave();
        Note baseNoteNote = this.getNote();
        
        int newNoteSemitonesFromA  = baseNoteNote.getSemitonesFromA() - semitones;
        int newNoteOctave = baseNoteOctave;
        
        while(newNoteSemitonesFromA < 0 ) {
            newNoteSemitonesFromA += 12;
            newNoteOctave -= 1;
        }
        
        Note newNote = Note.noteBySemitonesFromA(newNoteSemitonesFromA);
        
        return new OctavatedNote(newNote, newNoteOctave);
        
    }
    
    @Override
    public String toString() {
        return "" + note + octave;
    }
    
    public int getSemitonesFromA0() {
        return note.getSemitonesFromA() + octave * 12;
    }    
    
    public boolean isHigherThan(OctavatedNote other) {
        return getSemitonesFromA0() > other.getSemitonesFromA0();        
    }
    
    public boolean isLowerThan(OctavatedNote other) {
        return getSemitonesFromA0() < other.getSemitonesFromA0();        
    }
    
}

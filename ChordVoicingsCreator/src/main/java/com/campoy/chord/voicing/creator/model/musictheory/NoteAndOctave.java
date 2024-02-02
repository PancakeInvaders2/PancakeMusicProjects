package com.campoy.chord.voicing.creator.model.musictheory;

import lombok.Data;

@Data
public class NoteAndOctave {

    private final Note note;
    
    private final int octave;
    
    public static NoteAndOctave A_440 = new NoteAndOctave(Note.A, 4);
    
//    @Override
//    public boolean equals(Object obj) {
//        
//        if( !( obj instanceof NoteAndOctave) ) {
//            return false;
//        }
//        
//        NoteAndOctave objOctavatedNote = (NoteAndOctave)obj;
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
    

    public NoteAndOctave up(int semitones) {
        
        int baseNoteOctave = this.getOctave();
        Note baseNoteNote = this.getNote();
        
        int newNoteSemitonesFromA  = baseNoteNote.getSemitonesFromA() + semitones;
        int newNoteOctave = baseNoteOctave;
        
        while(newNoteSemitonesFromA > 11 ) {
            newNoteSemitonesFromA -= 12;
            newNoteOctave += 1;
        }
        
        Note newNote = Note.noteBySemitonesFromA(newNoteSemitonesFromA);
        
        return new NoteAndOctave(newNote, newNoteOctave);
        
    }
    
    public NoteAndOctave down(int semitones) {
        
        int baseNoteOctave = this.getOctave();
        Note baseNoteNote = this.getNote();
        
        int newNoteSemitonesFromA  = baseNoteNote.getSemitonesFromA() - semitones;
        int newNoteOctave = baseNoteOctave;
        
        while(newNoteSemitonesFromA < 0 ) {
            newNoteSemitonesFromA += 12;
            newNoteOctave -= 1;
        }
        
        Note newNote = Note.noteBySemitonesFromA(newNoteSemitonesFromA);
        
        return new NoteAndOctave(newNote, newNoteOctave);
        
    }
    
    @Override
    public String toString() {
        return "" + note + octave;
    }
    
    public int getSemitonesFromA0() {
        return note.getSemitonesFromA() + octave * 12;
    }    
    
    public boolean isHigherThan(NoteAndOctave other) {
        return getSemitonesFromA0() > other.getSemitonesFromA0();        
    }
    
    public boolean isLowerThan(NoteAndOctave other) {
        return getSemitonesFromA0() < other.getSemitonesFromA0();        
    }
    
}

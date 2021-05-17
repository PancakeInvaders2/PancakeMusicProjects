package com.campoy.chord.voicing.creator.model;

public class OctavatedNote {

    private Note note;
    
    private int octave;
    
    public static OctavatedNote A_440 = new OctavatedNote(Note.A, 4);
    
    public OctavatedNote(Note note, int octave) {
        this.note = note;
        this.octave = octave;
    }
    
    public Note getNote() {
        return note;
    }
    
    public int getOctave() {
        return octave;
    }
    
    @Override
    public boolean equals(Object obj) {
        
        if( !( obj instanceof OctavatedNote) ) {
            return false;
        }
        
        OctavatedNote objOctavatedNote = (OctavatedNote)obj;
        boolean equalNote = this.getNote() == objOctavatedNote.getNote();
        boolean equalOctave = this.getOctave() == objOctavatedNote.getOctave();
        
        if(equalNote && equalOctave) {
            return true;
        }
        else {
            return false;
        }
    }
    

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
    
}

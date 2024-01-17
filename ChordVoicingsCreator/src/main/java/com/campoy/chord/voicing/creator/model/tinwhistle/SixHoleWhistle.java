package com.campoy.chord.voicing.creator.model.tinwhistle;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import com.campoy.chord.voicing.creator.model.musictheory.Interval;
import com.campoy.chord.voicing.creator.model.musictheory.Note;
import com.campoy.chord.voicing.creator.model.musictheory.Scale;
import com.google.common.collect.Sets;

import lombok.Data;

@Data
public class SixHoleWhistle {

    private final Note baseNote;
    
    private Set<NoteAndFingering> naturalNotes = null;
    private Set<NoteAndFingering> crossFingeredNotes = null;
    private Set<NoteAndFingering> allPossibleNotes = null;
    
    public Set<NoteAndFingering> getCrossFingeredNotes(){
        if(crossFingeredNotes == null) {
            Set<NoteAndFingering> notes = new HashSet<>();
            for( WhistleFingering crossFingering : SixHoleWhistleFingerings.crossFingerings ) {
                notes.add( new NoteAndFingering(baseNote.up(crossFingering.getSemitonesFromRoot()), 
                                                crossFingering));
            }
            crossFingeredNotes = notes;
        }
        return crossFingeredNotes;
    }
    
    public Set<NoteAndFingering> getNaturalNotes(){
        if(naturalNotes == null) {
            Set<NoteAndFingering> notes = new HashSet<>();
            for( WhistleFingering crossFingering : SixHoleWhistleFingerings.naturalFingerings ) {
                notes.add( new NoteAndFingering(baseNote.up(crossFingering.getSemitonesFromRoot()), 
                                                crossFingering));
            }
            naturalNotes = notes;
        }
        return naturalNotes;
    }
    
    public Set<NoteAndFingering> getAllPossibleNotesWithFingerings(){
        if(allPossibleNotes == null) {
            allPossibleNotes = Sets.union(getNaturalNotes(), getCrossFingeredNotes());
        }
        return allPossibleNotes;
    }
    
    public Set<Note> getAllPossibleNotes(){
        return getAllPossibleNotesWithFingerings()
               .stream()
               .map(noteAndFingering -> noteAndFingering.getNote())
               .collect(Collectors.toSet());
    }

    
//    public boolean requiresCrossFingering(Note note) {
//        return getCrossFingeredNotes().contains(note);
//    }
//    
//    public boolean requiresCrossFingering(List<Note> scaleNotes) {
//        for( Note scaleNote : scaleNotes ) {
//            if( requiresCrossFingering(scaleNote) ) {
//                return true;
//            }
//        }
//        return false;
//    }
    
    public List<NoteAndFingering> getNeededCrossFingerings(List<Note> scaleNotes){
        return getCrossFingeredNotes()
                .stream()
                .filter(noteAndFingering -> scaleNotes.contains(noteAndFingering.getNote()))
                .collect(Collectors.toList());
    }
    

}

package com.campoy.chord.voicing.creator.generators;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import com.campoy.chord.voicing.creator.model.musictheory.Note;
import com.campoy.chord.voicing.creator.model.musictheory.Key;
import com.campoy.chord.voicing.creator.model.tinwhistle.NoteAndFingering;
import com.campoy.chord.voicing.creator.model.tinwhistle.SevenHoleWhistle6Front1Flat6LowerBackThumb;
import com.campoy.chord.voicing.creator.model.tinwhistle.SixHoleWhistle;
import com.campoy.chord.voicing.creator.model.tinwhistle.WhistleFingering;

public class TinWhistleKeyGenerator {

    /**
     * 
     * Generates data on which tin whistles can play in which keys without needing half holes
     *
     */
    
    public static void main(String[] args) {
     
        List<Key> scalesToSearch = new ArrayList<>();
        
        List<Key> majorModes = Key.MAJOR.modes();
        List<Key> harmonicMinorModes = Key.HARMONIC_MINOR.modes();
        List<Key> melodicMinorModes = Key.MELODIC_MINOR.modes();
        List<Key> doubleHarmonicMajorModes = Key.DOUBLE_HARMONIC_MAJOR.modes();
        
        scalesToSearch.add(majorModes.get(0).setName("Major"));
        scalesToSearch.add(majorModes.get(1).setName("Dorian"));
        scalesToSearch.add(majorModes.get(2).setName("Phrygian"));
        scalesToSearch.add(majorModes.get(3).setName("Lydian"));
        scalesToSearch.add(majorModes.get(4).setName("Mixolydian"));
        scalesToSearch.add(majorModes.get(5).setName("Minor (natural)"));
        scalesToSearch.add(majorModes.get(6).setName("Locrian"));
        
        scalesToSearch.add(harmonicMinorModes.get(0).setName("Harmonic minor"));
        scalesToSearch.add(harmonicMinorModes.get(1).setName("Locrian nat6"));
        scalesToSearch.add(harmonicMinorModes.get(2).setName("Augmented major"));
        scalesToSearch.add(harmonicMinorModes.get(3).setName("Romanian minor (Dorian #4)"));
        scalesToSearch.add(harmonicMinorModes.get(4).setName("Phrygian dominant"));
        scalesToSearch.add(harmonicMinorModes.get(5).setName("Lydian #2"));
        scalesToSearch.add(harmonicMinorModes.get(6).setName("UltraLocrian"));

        scalesToSearch.add(melodicMinorModes.get(0).setName("Melodic minor"));
        scalesToSearch.add(melodicMinorModes.get(1).setName("Dorian b2"));
        scalesToSearch.add(melodicMinorModes.get(2).setName("Lydian augmented"));
        scalesToSearch.add(melodicMinorModes.get(3).setName("Lydian dominant"));
        scalesToSearch.add(melodicMinorModes.get(4).setName("Mixolydian b6"));
        scalesToSearch.add(melodicMinorModes.get(5).setName("Locrian nat2/Aeolian b5"));
        scalesToSearch.add(melodicMinorModes.get(6).setName("Altered scale (SuperLocrian)"));
        
        scalesToSearch.add(Key.HARMONIC_AND_NATURAL_MINOR.setName("Natural+Harmonic minor"));
        
        scalesToSearch.add(Key.GENERAL_MINOR.setName("General minor (natural+harmonic+melodic)"));
        
        scalesToSearch.add(doubleHarmonicMajorModes.get(0).setName("Double harmonic major"));
        scalesToSearch.add(doubleHarmonicMajorModes.get(1).setName("Lydian #2 #6"));
        scalesToSearch.add(doubleHarmonicMajorModes.get(2).setName("Ultraphrygian"));
        scalesToSearch.add(doubleHarmonicMajorModes.get(3).setName("Hungarian minor"));
        scalesToSearch.add(doubleHarmonicMajorModes.get(4).setName("Oriental scale"));
        scalesToSearch.add(doubleHarmonicMajorModes.get(5).setName("Ionian #2 #5"));
        scalesToSearch.add(doubleHarmonicMajorModes.get(6).setName("Locrian bb3 bb7"));
        
        List<SevenHoleWhistle6Front1Flat6LowerBackThumb> whistles = new ArrayList<>();
        
        for( Note note : Note.values()) {
            SevenHoleWhistle6Front1Flat6LowerBackThumb whistle = new SevenHoleWhistle6Front1Flat6LowerBackThumb(note);
            whistles.add(whistle);
            for( Note scaleRoot : Note.values()) {
                for ( Key scaleToSearch : scalesToSearch ) {
                    List<Note> scaleNotes = scaleNotes(scaleRoot, 
                                                       scaleToSearch.getSemitonesFromRootList());

                    Set<Note> allWhistleNotes = whistle.getAllPossibleNotes();
                    if(scaleNotes
                              .stream()
                              .allMatch(n -> allWhistleNotes.contains(n))) {
                    
                        StringBuilder sb = new StringBuilder();
                        sb.append("whistles in ");
                        sb.append(note.fullRepresentation());
                        sb.append(" can play ");
                        sb.append(scaleRoot.fullRepresentation());
                        sb.append(" ");
                        sb.append(scaleToSearch.getName());
                        
                        List<NoteAndFingering> neededCrossFingerings = whistle.getNeededCrossFingerings(scaleNotes);
                        if(!neededCrossFingerings.isEmpty()) {
                            sb.append(" using the cross ");
                            
                            if(neededCrossFingerings.size() == 1) {
                                sb.append("fingering ");
                            } else {
                                sb.append("fingerings ");
                            }
                            
                            boolean isFirst = true;
                            for(NoteAndFingering neededCrossFingering : neededCrossFingerings) {
                                if(!isFirst) {
                                    sb.append(", ");
                                }
                                sb.append(neededCrossFingering.getFingering().getHolesCovered());
                                sb.append("(");
                                sb.append(neededCrossFingering.getNote().fullRepresentation());
                                sb.append(")");
                                isFirst = false;
                            }
                            
                        }
                        sb.append("  ");
                        System.out.println(sb.toString());

                    }                    
                }
            }
        }
    }   
    
    private static List<Note> scaleNotes(Note scaleRoot, List<Integer> semitonesFromRootList ){
        List<Note> scaleNotes = new ArrayList<>();
//        scaleNotes.add(scaleRoot);
        for( Integer semitoneFromRoot : semitonesFromRootList ) {
            scaleNotes.add(scaleRoot.up(semitoneFromRoot));
        }
        return scaleNotes;
    }
    
}

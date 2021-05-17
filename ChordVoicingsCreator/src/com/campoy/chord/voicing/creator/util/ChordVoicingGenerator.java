package com.campoy.chord.voicing.creator.util;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;
import java.util.function.Predicate;

import com.campoy.chord.voicing.creator.model.ChordVoicing;
import com.campoy.chord.voicing.creator.model.FretAction;
import com.campoy.chord.voicing.creator.model.GuitarString;
import com.campoy.chord.voicing.creator.model.OctavatedNote;
import com.campoy.chord.voicing.creator.model.Tuning;

public class ChordVoicingGenerator {

    public static void main(String[] args) {
        
        ChordVoicingGenerator chordVoicingGenerator = new ChordVoicingGenerator();
        Tuning tuning = Tuning.STANDARD_6_STRING_GUITAR;
        int fretSpan = 4; // number of frets that one can span with their fingers
        int numberOfFrets = 24; // total number of frets
        // minimum number of semitones between notes of the voicing, used to
        // filter out voicings where the 7th and the root are right next to each other
        int minimumSemitonesBetweenNotesOfTheVoicing  = 2; 
        
        Set<ChordVoicing> allVoicings = chordVoicingGenerator.generateAllVoicings(tuning, fretSpan,
                numberOfFrets);
        
        for(ChordVoicing voicing : allVoicings) {
            voicing.postProcessing(tuning);
        }
        
        List<Predicate<ChordVoicing>> filters = new ArrayList<>();
        filters.add((voicing) -> voicing.getRepresentedChord().isChordTypeFound());
        filters.add((voicing -> {
            
            return voicing.smallestDistanceBetweenVoices() > minimumSemitonesBetweenNotesOfTheVoicing;
            
        }));
        
        for(ChordVoicing voicing : allVoicings) {
            
            boolean passedAllFilters = true;
            for(Predicate<ChordVoicing> filter : filters) {
                if(!filter.test(voicing)){
                    passedAllFilters = false;
                    break;
                }
            }
            
            if(passedAllFilters) {
                
                System.out.println(
                        "_________ " 
                        + voicing.fullRepresentation(tuning)
                        + ":");
                System.out.println(voicing.toString());
                System.out.println("smallest distance: " + voicing.smallestDistanceBetweenVoices() + " ");
                System.out.println("__________________________");
                
            }
        }
        
    }

    private Set<ChordVoicing> generateAllVoicings(
            Tuning tuning,
            int fretSpan,
            int numberOfFrets) {
        
        System.out.println("Generating voicings for the tuning " + tuning );

        
        Set<ChordVoicing> allVoicings = new HashSet<>();
        
        int fretStart = 1;
        int fretEnd;
        while( (fretEnd = fretStart + fretSpan - 1) <= numberOfFrets ) {
            
            Set<ChordVoicing> voicings = generateVoicings(
                    tuning , fretStart, fretEnd); 
            
            allVoicings.addAll(voicings);
            
            System.out.println("Voicings between frets " + fretStart + " and  " + fretEnd + " generated succesfully" );
            
            fretStart++;
        }
        
        System.out.println("All voicings generated succesfully" );
        
        return allVoicings;
    }
    
    Set<ChordVoicing> generateVoicings(
            Tuning tuning, 
            Integer lowestFretToScan, 
            Integer highestFretToScan){
                
        if(lowestFretToScan == null
                || lowestFretToScan == 0) {
            lowestFretToScan = 1; // open is not a something that can be fretted
        }
        if(highestFretToScan == null) {
            highestFretToScan = 5;
        }
        
        Map<Integer, Map<Integer, OctavatedNote>> stringNumberToFretNumberToNote
            = new HashMap<>();
        
        for( Entry<GuitarString, OctavatedNote> stringTuning 
                : tuning.getStringNotes().entrySet())
        {
            OctavatedNote stringTuningNote = stringTuning.getValue();
            int stringNumber = stringTuning.getKey().getPosition();
            if(stringNumberToFretNumberToNote.get(stringNumber) == null) {
                stringNumberToFretNumberToNote.put(stringNumber, new HashMap<>());
            }
            Map<Integer, OctavatedNote> fretNumberToNote = stringNumberToFretNumberToNote.get(stringNumber);
            for( int currentFret  = lowestFretToScan; currentFret < highestFretToScan ; currentFret++ ) {
                OctavatedNote currentNote = stringTuningNote.up(currentFret);
                fretNumberToNote.put(currentFret, currentNote);
            }
        }
        
        List<FretAction> possibleFretActions = new ArrayList<>();
        possibleFretActions.add(FretAction.MUTE);
        possibleFretActions.add(FretAction.OPEN);
        for( int currentFret  = lowestFretToScan; currentFret <= highestFretToScan ; currentFret++ ) {
            possibleFretActions.add(FretAction.hold(currentFret));
        }
        
        return generateVoicingsFromFretActions(possibleFretActions, tuning);
        
    }
    
    Set<ChordVoicing> generateVoicingsFromFretActions(
            List<FretAction> possibleFretActions,
            Tuning tuning) {
        
        return iterateFrets(possibleFretActions, tuning, 0, new ArrayList<>());
    }
    
    Set<ChordVoicing> iterateFrets(
            List<FretAction> possibleFretActions,
            Tuning tuning,
            int currentString, 
            List<FretAction> previousIterations) {
        
        Set<ChordVoicing> voicingsConstructed = new HashSet<>();
        
        int stringsToIterate = tuning.getNumberOfStrings();
        
        for(FretAction fretAction : possibleFretActions) {
            
            List<FretAction> thisIteration = new ArrayList<>();
            thisIteration.addAll(previousIterations);
            thisIteration.add(fretAction);
                        
            if(currentString < stringsToIterate - 1) {
                
                voicingsConstructed.addAll(
                        iterateFrets(
                                possibleFretActions,
                                tuning,
                                currentString + 1,
                                thisIteration));
            }
            else {
                voicingsConstructed.add(new ChordVoicing(thisIteration));
            }
            
        }
        
        return voicingsConstructed;
    }
    
}

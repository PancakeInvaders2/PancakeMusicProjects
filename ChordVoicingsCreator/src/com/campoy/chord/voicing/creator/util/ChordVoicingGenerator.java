package com.campoy.chord.voicing.creator.util;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;
import java.util.SortedSet;
import java.util.TreeSet;
import java.util.function.Predicate;

import com.campoy.chord.voicing.creator.model.ChordConstructor;
import com.campoy.chord.voicing.creator.model.ChordVoicing;
import com.campoy.chord.voicing.creator.model.FretAction;
import com.campoy.chord.voicing.creator.model.GuitarString;
import com.campoy.chord.voicing.creator.model.Interval;
import com.campoy.chord.voicing.creator.model.Note;
import com.campoy.chord.voicing.creator.model.OctavatedNote;
import com.campoy.chord.voicing.creator.model.Tuning;

import javafx.util.Pair;

public class ChordVoicingGenerator {

    public static void main(String[] args) {
    	        
        ChordVoicingGenerator chordVoicingGenerator = new ChordVoicingGenerator();
        Tuning tuning = Tuning.STANDARD_7_STRING_GUITAR;
        int fretSpan = 4; // number of frets that one can span with their fingers
        int firstFretToScan = 1;
        int lastFretToScan = 24; // total number of frets
        // minimum number of semitones between notes of the voicing, used by example to
        // filter out voicings where the 7th and the root are right next to each other
        int minimumSemitonesBetweenNotesOfTheVoicing  = 2; 
        
            
        List<Predicate<ChordVoicing>> filters = new ArrayList<>();
        filters.add((voicing -> {
            return voicing.smallestDistanceBetweenVoices() >= minimumSemitonesBetweenNotesOfTheVoicing;
        }));

        
        Collection<ChordVoicing> allVoicings = chordVoicingGenerator.generateAllVoicings(
        		tuning, 
        		fretSpan,
        		firstFretToScan,
        		lastFretToScan, filters);
        
        
        for(ChordVoicing voicing : allVoicings) {
                
            	for( String fullRepresentation : voicing.fullRepresentations(tuning)) {
                    System.out.println(
                            "_________ " 
                            + fullRepresentation
                            + ":");
            	}
                System.out.println(voicing.toString());
                System.out.println("smallest distance: " + voicing.smallestDistanceBetweenVoices() + " ");
                System.out.println("__________________________");
                
        }
        
        System.out.println("DONE");
        
    }

    private List<ChordVoicing> generateAllVoicings(
            Tuning tuning,
            int fretSpan,
            int firstFretToScan,
            int lastFretToScan,
            List<Predicate<ChordVoicing>> filters) {
        
        System.out.println("Generating voicings for the tuning " + tuning );

        
        Set<ChordVoicing> allVoicings = new HashSet<>();
        
        List<Pair<Integer, Integer>> startEnds = new ArrayList<>();
        
        int fretStart = firstFretToScan;
        int fretEnd;
        while( (fretEnd = fretStart + fretSpan - 1) <= lastFretToScan ) {
        	
        	startEnds.add(new Pair<Integer, Integer>(fretStart, fretEnd));
            fretStart++;
        }
        
        startEnds.stream().forEach((startEnd) -> {
        	
            Set<ChordVoicing> voicings = generateVoicings(
                    tuning , startEnd.getKey(), startEnd.getValue(), filters); 
            
            allVoicings.addAll(voicings);
            System.out.println("Voicings between frets " + startEnd.getKey() + " and  " + startEnd.getValue() + " generated succesfully" );
        });
        
        System.out.println("All voicings generated succesfully" );
        
        List<ChordVoicing> voicingsList = new ArrayList<>(allVoicings);
    	Collections.sort(voicingsList, (voicing1, voicing2) -> {
    		return voicing1.getLowestFretPlaying() - voicing2.getLowestFretPlaying();
    	});
        return voicingsList;
    }
    
    Set<ChordVoicing> generateVoicings(
            Tuning tuning, 
            Integer lowestFretToScan, 
            Integer highestFretToScan,
            List<Predicate<ChordVoicing>> filters){
                
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
        
        return generateVoicingsFromFretActions(possibleFretActions, tuning, filters);
        
    }
    
    Set<ChordVoicing> generateVoicingsFromFretActions(
            List<FretAction> possibleFretActions,
            Tuning tuning,
            List<Predicate<ChordVoicing>> filters) {
        
        return iterateFrets(possibleFretActions, tuning, 0, new ArrayList<>(), filters);
    }
    
    Set<ChordVoicing> iterateFrets(
            List<FretAction> possibleFretActions,
            Tuning tuning,
            int currentString, 
            List<FretAction> previousIterations,
            List<Predicate<ChordVoicing>> filters) {
        
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
                                thisIteration,
                                filters));
            }
            else {
            	            	
            	ChordVoicing chordVoicing = new ChordVoicing(thisIteration);
            	
            	if(chordVoicing.numberOfNonMutedStrings()  > 1 ) {
	            	chordVoicing.postProcessing(tuning);
					boolean passedAllFilters = true;
					for(Predicate<ChordVoicing> filter : filters) {
					    if(!filter.test(chordVoicing)){
					        passedAllFilters = false;
					        break;
					    }
					}
					if(passedAllFilters) {
		                voicingsConstructed.add(chordVoicing);
					}  
            	}
            }
            
        }
        
        return voicingsConstructed;
    }
    
}

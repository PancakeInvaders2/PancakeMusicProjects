package com.campoy.chord.voicing.creator.util;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.io.PrintStream;
import java.net.URL;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Optional;
import java.util.Set;
import java.util.SortedSet;
import java.util.StringJoiner;
import java.util.TreeSet;
import java.util.function.Predicate;

import com.campoy.chord.voicing.creator.model.ChordConstructor;
import com.campoy.chord.voicing.creator.model.ChordVoicing;
import com.campoy.chord.voicing.creator.model.FretAction;
import com.campoy.chord.voicing.creator.model.GuitarString;
import com.campoy.chord.voicing.creator.model.Interval;
import com.campoy.chord.voicing.creator.model.Note;
import com.campoy.chord.voicing.creator.model.OctavatedNote;
import com.campoy.chord.voicing.creator.model.Scale;
import com.campoy.chord.voicing.creator.model.Tuning;

import javafx.util.Pair;

public class ChordVoicingGenerator {

    public static void main(String[] args) throws FileNotFoundException {
    	        
        ChordVoicingGenerator chordVoicingGenerator = new ChordVoicingGenerator();
        Tuning tuning = Tuning.DROP_A_7_STRING_GUITAR;
        int fretSpan = 3; // number of frets that one can comfortably span with their fingers
        int firstFretToScan = 5;
        int lastFretToScan = 15; // total number of frets
        // minimum number of semitones between notes of the voicing, used by example to
        // filter out voicings where the maj7th/min2nd and the root are right next to each other
        int minimumSemitonesBetweenNotesOfTheVoicing  = 2; 
        List<Scale> searchedScales = Arrays.asList(
                Scale.AEOLIAN,
                Scale.PHRYGIAN_DOMINANT
                );
        List<Note> allowedScaleRoots = Arrays.asList(
                Note.E);
        int minNumberOfDifferentNotes = 2;
        int maxNumberOfDifferentNotes = 4;
        int mustContainAtLeastThisManyOpenStrings = 2;
        int minimumNumberOfMutedLowestStrings = 0;
        int minimumNumberOfMutedHighestStrings = 0;
        boolean forbidTheSameNoteOnTheSameOctave = true; 
        
        Map<Scale, Map<Note, List<Note>>> scaleToMapOfRootsToNotesOfScale = 
                computeMapOfScaleToMapOfRootsToNotesOfScale(searchedScales, allowedScaleRoots);
                    
        List<Predicate<ChordVoicing>> filters = new ArrayList<>();
        filters.add(voicing -> {
            return voicing.smallestDistanceBetweenVoices() >= minimumSemitonesBetweenNotesOfTheVoicing;
        });
        filters.add(voicing -> {
            return voicing.isCompatibleWithAnyOfTheseScales(scaleToMapOfRootsToNotesOfScale);
        });
        filters.add(voicing -> {
            return voicing.getRepresentedChord().getNotes().size() <= maxNumberOfDifferentNotes;
        });
        filters.add(voicing -> {
            return voicing.getRepresentedChord().getNotes().size() >= minNumberOfDifferentNotes;
        });
        filters.add(voicing -> {
        	
        	return forbidTheSameNoteOnTheSameOctave 
        			&& !voicing.getHasSeveralTimesTheSameNoteOnTheSameOctave();

        });
        filters.add(voicing -> {
        	int numberOfOpenStrings = 0;
        	for(Entry<GuitarString, FretAction> entry : voicing.getFrettings().entrySet()) {
        		if(entry.getValue().isOpen()) {
                	numberOfOpenStrings++;
                }
        	}
            return (numberOfOpenStrings >= mustContainAtLeastThisManyOpenStrings);
        });
        filters.add(voicing -> {
            
            boolean passed = true;
            for( int stringNumber = 0; 
                    stringNumber < minimumNumberOfMutedLowestStrings ;
                    stringNumber++) {
                
                passed &= FretAction.MUTE.equals(voicing.getFrettings().get(new GuitarString(stringNumber)));
            }
            return passed;
            
        });
        filters.add(voicing -> {
            
            boolean passed = true;
            for( int stringNumber = tuning.getNumberOfStrings() - 1; 
                    stringNumber + minimumNumberOfMutedHighestStrings >= tuning.getNumberOfStrings() ;
                    stringNumber--) {
                
                passed &= FretAction.MUTE.equals(voicing.getFrettings().get(new GuitarString(stringNumber)));
            }
            return passed;
            
        });
       
//        Path filePath = Paths.get("C:/Users/Mickael/eclipse-workspace/PancakeMusicProjects/Voices.txt");
        Path filePath = Paths.get("./Voices.txt");
        System.out.println("Printing to " + filePath.toAbsolutePath());
        File targetFile = filePath.toFile();
        FileOutputStream o = new FileOutputStream(targetFile);
        BufferedOutputStream bos = new BufferedOutputStream(o);
        PrintStream out = new PrintStream(bos);
        
        try {
            
        
            chordVoicingGenerator.generateAllVoicings(
        		tuning, 
        		fretSpan,
        		firstFretToScan,
        		lastFretToScan, 
        		filters,
        		out,
        		scaleToMapOfRootsToNotesOfScale);
        }
        finally {
            
            out.close();
        }
        
        System.out.println("stream closed");
                
    }

    private static Map<Scale, Map<Note, List<Note>>> computeMapOfScaleToMapOfRootsToNotesOfScale(
            List<Scale> searchedScales, List<Note> allowedRoots) {
        Map<Scale, Map<Note, List<Note>>> scaleToMapOfRootsToNotesOfScale = new HashMap<>();
        
        for(Scale searchedScale : searchedScales ) {
            Map<Note, List<Note>> rootsToNotesOfScale = new HashMap<>();
            for(Note root : Note.values()) {
                
                if( allowedRoots == null 
                        || allowedRoots.isEmpty()
                        || allowedRoots.contains(root)) {
                
                    List<Note> notesInScaleStartingOnRoot = new ArrayList<Note>();
                    List<Integer> semitonesFromRootList = searchedScale.getSemitonesFromRootList();
                    for (Integer semitonesFromRoot : semitonesFromRootList) {
                        notesInScaleStartingOnRoot.add(root.up(semitonesFromRoot));
                    }
                    rootsToNotesOfScale.put(root, notesInScaleStartingOnRoot);
                }
            }
            scaleToMapOfRootsToNotesOfScale.put(searchedScale, rootsToNotesOfScale);
        }
        return scaleToMapOfRootsToNotesOfScale;
    }

    private void generateAllVoicings(
            Tuning tuning,
            int fretSpan,
            int firstFretToScan,
            int lastFretToScan,
            List<Predicate<ChordVoicing>> filters,
            PrintStream output, Map<Scale, Map<Note, List<Note>>> scaleToMapOfRootsToNotesOfScale) {
        
        System.out.println("Generating voicings for the tuning " + tuning );
        
        List<Pair<Integer, Integer>> startEnds = new ArrayList<>();
        
        int fretStart = firstFretToScan;
        int fretEnd;
        while( (fretEnd = fretStart + fretSpan - 1) <= lastFretToScan ) {
        	
        	startEnds.add(new Pair<Integer, Integer>(fretStart, fretEnd));
            fretStart++;
        }
        
        startEnds.stream().forEach((startEnd) -> {
        	
            Set<ChordVoicing> voicings = generateVoicings(
                    tuning , startEnd.getKey(), startEnd.getValue(), filters, scaleToMapOfRootsToNotesOfScale); 
            
            System.out.println(
                    "Voicings between frets " 
                    + startEnd.getKey() 
                    + " and " + startEnd.getValue() 
                    + " generated succesfully");
            
            for(ChordVoicing voicing : voicings) {
                
                output.println("____________ " + voicing.noteRepresentation(tuning));
                
            	for( String fullRepresentation : voicing.fullRepresentations(tuning)) {
            	    output.println(
                            "_________ " 
                            + fullRepresentation
                            + ":");
            	}
            	output.println(voicing.toString());
            	output.println(voicing.notesOnStrings());
            	StringJoiner sj = new StringJoiner(", ");
            	for(Pair<Scale, Note> compatibleScaleAndRoot : voicing.getCompatibleScalesAndRoots()) {
            	    sj.add(compatibleScaleAndRoot.getValue() 
            	            + " " 
            	            + compatibleScaleAndRoot.getKey());
            	}
                output.println("Diatonic to " + sj.toString());

            	output.println("__________________________");
            }
                    
        });
        
        output.println("All voicings generated succesfully" );
        
    }
    
    Set<ChordVoicing> generateVoicings(
            Tuning tuning, 
            Integer lowestFretToScan, 
            Integer highestFretToScan,
            List<Predicate<ChordVoicing>> filters,
            Map<Scale, Map<Note, List<Note>>> scaleToMapOfRootsToNotesOfScale){
                
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
        
        return generateVoicingsFromFretActions(possibleFretActions, tuning, filters, scaleToMapOfRootsToNotesOfScale);
        
    }
    
    Set<ChordVoicing> generateVoicingsFromFretActions(
            List<FretAction> possibleFretActions,
            Tuning tuning,
            List<Predicate<ChordVoicing>> filters,
            Map<Scale, Map<Note, List<Note>>> scaleToMapOfRootsToNotesOfScale) {
        
        return iterateFrets(possibleFretActions, tuning, 0, new ArrayList<>(), filters, scaleToMapOfRootsToNotesOfScale);
    }
    
    Set<ChordVoicing> iterateFrets(
            List<FretAction> possibleFretActions,
            Tuning tuning,
            int currentString, 
            List<FretAction> previousIterations,
            List<Predicate<ChordVoicing>> filters,
            Map<Scale, Map<Note, List<Note>>> scaleToMapOfRootsToNotesOfScale) {
        
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
                                filters,
                                scaleToMapOfRootsToNotesOfScale));
            }
            else {
            	            	
            	ChordVoicing chordVoicing = new ChordVoicing(thisIteration);
            	
            	if(chordVoicing.numberOfNonMutedStrings()  > 1 ) {
	            	chordVoicing.postProcessing(tuning, scaleToMapOfRootsToNotesOfScale);
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

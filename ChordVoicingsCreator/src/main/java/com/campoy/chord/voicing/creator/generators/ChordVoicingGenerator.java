package com.campoy.chord.voicing.creator.generators;

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

import com.campoy.chord.voicing.creator.model.guitar.ChordVoicing;
import com.campoy.chord.voicing.creator.model.guitar.FretAction;
import com.campoy.chord.voicing.creator.model.guitar.GuitarString;
import com.campoy.chord.voicing.creator.model.guitar.KeyAndRoot;
import com.campoy.chord.voicing.creator.model.guitar.Tuning;
import com.campoy.chord.voicing.creator.model.musictheory.ChordConstructor;
import com.campoy.chord.voicing.creator.model.musictheory.Interval;
import com.campoy.chord.voicing.creator.model.musictheory.Note;
import com.campoy.chord.voicing.creator.model.musictheory.NoteAndOctave;
import com.campoy.chord.voicing.creator.model.musictheory.Key;

import lombok.Data;

public class ChordVoicingGenerator {

    /**
     * Generates chord voicings for stringed instruments such as guitar, bass, mandolin, etc, 
     * and filter the chord voicings to find the useful ones 
     * 
     */
    
    
    public static void main(String[] args) throws FileNotFoundException {
    	        
        ChordVoicingGenerator chordVoicingGenerator = new ChordVoicingGenerator();  
        
        Tuning tuning = Tuning.DROP_D_6_STRING_GUITAR;  
        
        int fretSpan = 3; // maximum fret span that the voicings are allowed to have / number of frets that one can comfortably span with their fingers  
        int firstFretToScan = 5;  
        int lastFretToScan = 11;  
        
        // minimum number of semitones between notes of the voicing, used by example to  
        // filter out voicings where the maj7th/min2nd and the root are right next to each other  
        int minimumSemitonesBetweenNotesOfTheVoicing  = 2;  
        
        List<Key> searchedKeys = Arrays.asList(  
                Key.AEOLIAN  
                , Key.HARMONIC_MINOR  
                );  
        
        List<Note> allowedKeyRoots = Arrays.asList(  
                Note.E);  
        
        int minNumberOfDifferentNotes = 3;  
        int maxNumberOfDifferentNotes = 4;  
        int mustContainAtLeastThisManyOpenStrings = 0;  
        int mustContainAtMostThisManyOpenStrings = 2;  
        int minimumNumberOfMutedLowestStrings = 0;  
        int minimumNumberOfMutedHighestStrings = 0;  
        
        boolean forbidTheSameNoteOnTheSameOctaveOnDifferentStrings = true;  
        
        NoteAndOctave lowestNoteAllowed = new NoteAndOctave(Note.E, 3);  
        NoteAndOctave highestNoteAllowed = new NoteAndOctave(Note.E, 6);  
        
        // avoid showing chord voicings that have neither a 5th nor a third (to not show  
        // that a E minor could be considered a B add11 b13 that doesn't have a  
        // third or a fifth). That makes things more readable  
        boolean hideChordVoicingsThatDoNotHaveAThirdOrAFifth = true;  
        
        // ------
        
        Map<Key, Map<Note, List<Note>>> keyToMapOfRootsToNotesOfKey = 
                computeMapOfKeyToMapOfRootsToNotesOfKey(searchedKeys, allowedKeyRoots);
                    
        List<Predicate<ChordVoicing>> filters = new ArrayList<>();
        filters.add(voicing -> {
            return voicing.smallestDistanceBetweenVoices() >= minimumSemitonesBetweenNotesOfTheVoicing;
        });
        filters.add(voicing -> {
            return voicing.isCompatibleWithAnyOfTheseKeys(keyToMapOfRootsToNotesOfKey);
        });
        filters.add(voicing -> {
            return voicing.getRepresentedChord().getNotes().size() <= maxNumberOfDifferentNotes;
        });
        filters.add(voicing -> {
            return voicing.getRepresentedChord().getNotes().size() >= minNumberOfDifferentNotes;
        });
        filters.add(voicing -> {
        	
        	return forbidTheSameNoteOnTheSameOctaveOnDifferentStrings 
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
            int numberOfOpenStrings = 0;
            for(Entry<GuitarString, FretAction> entry : voicing.getFrettings().entrySet()) {
                if(entry.getValue().isOpen()) {
                    numberOfOpenStrings++;
                }
            }
            return (numberOfOpenStrings <= mustContainAtMostThisManyOpenStrings);
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
        filters.add(voicing -> {
            return highestNoteAllowed == null 
                    || voicing.getHighestNote(tuning).isLowerThan(highestNoteAllowed);
            
        });
        filters.add(voicing -> {
            return lowestNoteAllowed == null 
                    || voicing.getLowestNote(tuning).isHigherThan(lowestNoteAllowed);
        
        });
        filters.add(voicing -> {
            return !hideChordVoicingsThatDoNotHaveAThirdOrAFifth 
                    || voicing.doAnyOfTheRepresentationsHaveAThirdOrAFifth(tuning);
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
        		keyToMapOfRootsToNotesOfKey,
        		hideChordVoicingsThatDoNotHaveAThirdOrAFifth);
        }
        finally {
            
            out.close();
        }
        
        System.out.println("stream closed");
                
    }

    private static Map<Key, Map<Note, List<Note>>> computeMapOfKeyToMapOfRootsToNotesOfKey(
            List<Key> searchedKeys, List<Note> allowedRoots) {
        Map<Key, Map<Note, List<Note>>> keyToMapOfRootsToNotesOfKey = new HashMap<>();
        
        for(Key searchedKey : searchedKeys ) {
            Map<Note, List<Note>> rootsToNotesOfKey = new HashMap<>();
            for(Note root : Note.values()) {
                
                if( allowedRoots == null 
                        || allowedRoots.isEmpty()
                        || allowedRoots.contains(root)) {
                
                    List<Note> notesInKeyStartingOnRoot = new ArrayList<Note>();
                    List<Integer> semitonesFromRootList = searchedKey.getSemitonesFromRootList();
                    for (Integer semitonesFromRoot : semitonesFromRootList) {
                        notesInKeyStartingOnRoot.add(root.up(semitonesFromRoot));
                    }
                    rootsToNotesOfKey.put(root, notesInKeyStartingOnRoot);
                }
            }
            keyToMapOfRootsToNotesOfKey.put(searchedKey, rootsToNotesOfKey);
        }
        return keyToMapOfRootsToNotesOfKey;
    }

    private void generateAllVoicings(
            Tuning tuning,
            int fretSpan,
            int firstFretToScan,
            int lastFretToScan,
            List<Predicate<ChordVoicing>> filters,
            PrintStream output, Map<Key, Map<Note, List<Note>>> keyToMapOfRootsToNotesOfKey,
            boolean hideChordVoicingsThatDoNotHaveAThirdOrAFifth) {
        
        System.out.println("Generating voicings for the tuning " + tuning );
        
        List<StartAndEnd> startEnds = new ArrayList<>();
        
        int fretStart = firstFretToScan;
        int fretEnd;
        while( (fretEnd = fretStart + fretSpan - 1) <= lastFretToScan ) {
        	
        	startEnds.add(new StartAndEnd(fretStart, fretEnd));
            fretStart++;
        }
        
        startEnds.stream().forEach((startEnd) -> {
        	
            Set<ChordVoicing> voicings = generateVoicings(
                    tuning , startEnd.getStart(), startEnd.getEnd(), filters, keyToMapOfRootsToNotesOfKey); 
            
            System.out.println(
                    "Voicings between frets " 
                    + startEnd.getStart() 
                    + " and " + startEnd.getEnd() 
                    + " generated succesfully");
            
            for(ChordVoicing voicing : voicings) {
                                
                output.println("____________ " + voicing.noteRepresentation(tuning) + "  ");
                
            	for( String fullRepresentation : voicing.fullRepresentations(tuning, hideChordVoicingsThatDoNotHaveAThirdOrAFifth)) {
            	    output.println(
                            "_________ " 
                            + fullRepresentation
                            + ":  ");
            	}
            	output.println(voicing.toString() + "  ");
            	output.println(voicing.notesOnStrings() + "  ");
            	StringJoiner sj = new StringJoiner(", ");
            	for(KeyAndRoot compatibleKeyAndRoot : voicing.getCompatibleKeysAndRoots()) {
            	    sj.add(compatibleKeyAndRoot.getRoot() 
            	            + " " 
            	            + compatibleKeyAndRoot.getKey());
            	}
                output.println("Diatonic to " + sj.toString() + "  ");

            	output.println("__________________________  ");
            }
                    
        });
        
        output.println("All voicings generated succesfully" );
        
    }
    
    Set<ChordVoicing> generateVoicings(
            Tuning tuning, 
            Integer lowestFretToScan, 
            Integer highestFretToScan,
            List<Predicate<ChordVoicing>> filters,
            Map<Key, Map<Note, List<Note>>> keyToMapOfRootsToNotesOfKey){
                
        if(lowestFretToScan == null
                || lowestFretToScan == 0) {
            lowestFretToScan = 1; // open is not a something that can be fretted
        }
        if(highestFretToScan == null) {
            highestFretToScan = 5;
        }
        
        Map<Integer, Map<Integer, NoteAndOctave>> stringNumberToFretNumberToNote
            = new HashMap<>();
        
        for( Entry<GuitarString, NoteAndOctave> stringTuning 
                : tuning.getStringNotes().entrySet())
        {
            NoteAndOctave stringTuningNote = stringTuning.getValue();
            int stringNumber = stringTuning.getKey().getPosition();
            if(stringNumberToFretNumberToNote.get(stringNumber) == null) {
                stringNumberToFretNumberToNote.put(stringNumber, new HashMap<>());
            }
            Map<Integer, NoteAndOctave> fretNumberToNote = stringNumberToFretNumberToNote.get(stringNumber);
            for( int currentFret  = lowestFretToScan; currentFret < highestFretToScan ; currentFret++ ) {
                NoteAndOctave currentNote = stringTuningNote.up(currentFret);
                fretNumberToNote.put(currentFret, currentNote);
            }
        }
        
        List<FretAction> possibleFretActions = new ArrayList<>();
        possibleFretActions.add(FretAction.MUTE);
        possibleFretActions.add(FretAction.OPEN);
        for( int currentFret  = lowestFretToScan; currentFret <= highestFretToScan ; currentFret++ ) {
            possibleFretActions.add(FretAction.hold(currentFret));
        }
        
        return generateVoicingsFromFretActions(possibleFretActions, tuning, filters, keyToMapOfRootsToNotesOfKey);
        
    }
    
    Set<ChordVoicing> generateVoicingsFromFretActions(
            List<FretAction> possibleFretActions,
            Tuning tuning,
            List<Predicate<ChordVoicing>> filters,
            Map<Key, Map<Note, List<Note>>> keyToMapOfRootsToNotesOfKey) {
        
        return iterateFrets(possibleFretActions, tuning, 0, new ArrayList<>(), filters, keyToMapOfRootsToNotesOfKey);
    }
    
    Set<ChordVoicing> iterateFrets(
            List<FretAction> possibleFretActions,
            Tuning tuning,
            int currentString, 
            List<FretAction> previousIterations,
            List<Predicate<ChordVoicing>> filters,
            Map<Key, Map<Note, List<Note>>> keyToMapOfRootsToNotesOfKey) {
        
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
                                keyToMapOfRootsToNotesOfKey));
            }
            else {
            	            	
            	ChordVoicing chordVoicing = new ChordVoicing(thisIteration);
            	
            	if(chordVoicing.numberOfNonMutedStrings()  > 1 ) {
	            	chordVoicing.postProcessing(tuning, keyToMapOfRootsToNotesOfKey);
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
    
    @Data
    private class StartAndEnd {
        private final Integer start;
        private final Integer end;
    }
    
}

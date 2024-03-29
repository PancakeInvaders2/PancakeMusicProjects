package com.campoy.chord.voicing.creator.model.guitar;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.StringJoiner;

import com.campoy.chord.voicing.creator.model.musictheory.Chord;
import com.campoy.chord.voicing.creator.model.musictheory.Interval;
import com.campoy.chord.voicing.creator.model.musictheory.Note;
import com.campoy.chord.voicing.creator.model.musictheory.NoteAndOctave;
import com.campoy.chord.voicing.creator.model.musictheory.Key;
import com.campoy.chord.voicing.creator.util.ChordService;

import java.util.Map.Entry;
import java.util.Set;

public class ChordVoicing {
    
    private Map<GuitarString, FretAction> frettings = new HashMap<>();
    private Chord representedChord = null;
    private Tuning lastTuningUsed;
    private boolean hasSeveralTimesTheSameNoteOnTheSameOctave = false;
    
    List<KeyAndRoot> compatibleKeysAndRoots = new ArrayList<>();
    
    int lowestFretPlaying = Integer.MAX_VALUE;
    
    public ChordVoicing() { }
    
    public ChordVoicing(List<FretAction> orderedFrettings) {
        this();
        int i = 0;
        for(FretAction fretAction : orderedFrettings) {
            frettings.put(new GuitarString(i), fretAction);
            i++;
        }
    }
    
    public int numberOfNonMutedStrings() {
    	int numberOfNonMutedStrings = 0;
    	for(Entry<GuitarString, FretAction> frettingEntry : frettings.entrySet()) {
    		if(!frettingEntry.getValue().isMute()) {
        		numberOfNonMutedStrings++;
    		}
    	}
    	return numberOfNonMutedStrings;
    }

    public Map<GuitarString, FretAction> getFrettings() {
        return frettings;
    }
    
    @Override
    public boolean equals(Object obj) {
        
        if( !( obj instanceof ChordVoicing) ) {
            return false;
        }
        
        ChordVoicing objChordVoicing = (ChordVoicing)obj;
        
        if(this.getFrettings().size() != objChordVoicing.getFrettings().size()) {
            return false;
        }
                
        for(Entry<GuitarString, FretAction> entry : this.getFrettings().entrySet()) {
            
            GuitarString guitarString = entry.getKey();
            FretAction stringFretAction = entry.getValue();
            FretAction otherStringFretAction = objChordVoicing.getFrettings().get(guitarString);
            
            if(stringFretAction != otherStringFretAction 
                    && !stringFretAction.equals(otherStringFretAction)) {
                return false;
            }
        }
        
        return true;
    }
    
    @Override
    public int hashCode() { // TODO this is probably not a great hash
        
        int result = 0;

        int multiplier = 30;
        for( Entry<GuitarString, FretAction> frettingEntry : frettings.entrySet()  ) {
            GuitarString guitarString = frettingEntry.getKey();
            FretAction fretAction = frettingEntry.getValue();
            
            result += multiplier * guitarString.getPosition() * fretAction.hashCode();
            
            multiplier++;
            
        }
        
        
        return result;
    }
    
    public void postProcessing(Tuning tuning, Map<Key, Map<Note, List<Note>>> keys){
        
        Chord representedChordBeingCreated = new Chord();
        
        Set<NoteAndOctave> notesPlaying = new HashSet<>();
        boolean duplicateOctavatedNotesPlaying = false;
        
        for( Entry<GuitarString, FretAction> frettingEntry : getFrettings().entrySet() ) {
            
            GuitarString guitarString = frettingEntry.getKey();
            FretAction fretAction = frettingEntry.getValue();
            
            NoteAndOctave stringBaseNote = tuning.getStringNotes().get(guitarString);
            
            Integer fretSounding = fretAction.getFretSounding();
            if(fretSounding != null) {
                
                NoteAndOctave stringNoteSounding;
                if(fretSounding == 0) {
                    stringNoteSounding = stringBaseNote;
                }
                else {
                    stringNoteSounding = stringBaseNote.up(fretSounding);
                    
                    if(fretSounding < lowestFretPlaying) {
                    	lowestFretPlaying = fretSounding;
                    }
                    
                }
                
                if(notesPlaying.contains(stringNoteSounding)) {
                	duplicateOctavatedNotesPlaying = true;
                }
                
                notesPlaying.add(stringNoteSounding);
                
                representedChordBeingCreated.getNotes().add(stringNoteSounding.getNote());
            }
            
        }
        
        this.hasSeveralTimesTheSameNoteOnTheSameOctave = duplicateOctavatedNotesPlaying;
        
        representedChord = representedChordBeingCreated;
                
        this.lastTuningUsed = tuning;
        
        computeCompatibleWithAnyOfTheseKeys(keys);
        
    }
    
    public Chord getRepresentedChord() {
        return representedChord;
    }
    
    @Override
    public String toString() {
        
        StringJoiner sj = new StringJoiner(" "); 
        for(int i = 0; i < frettings.size(); i++) {
            FretAction fretAction = frettings.get(new GuitarString(i));
            sj.add(fretAction.toString());
        }
        return sj.toString();
    }
    
    public String notesOnStrings() {
        
        StringJoiner sj = new StringJoiner(" "); 
        for(int i = 0; i < frettings.size(); i++) {
            FretAction fretAction = frettings.get(new GuitarString(i));
            Integer fretSounding = fretAction.getFretSounding();
            if(fretSounding == null) {
                sj.add(fretAction.toString());
            }
            else {
            	NoteAndOctave tuningNote = lastTuningUsed.getStringNotes().get(new GuitarString(i));
            	NoteAndOctave noteSounding = tuningNote.up(fretSounding);
                sj.add(noteSounding.toString());
            }
        }
        return sj.toString();
    }
    
    private Integer getFirstOccurence(List<NoteAndOctave> orderedNotes, Note note){
        int i = 0;
        for(NoteAndOctave orderedNote : orderedNotes) {
            if(orderedNote.getNote().equals(note)) {
                return i;
            }
            i++;
        }
        
        return null;
    }
    
    public List<String> fullRepresentations(Tuning tuning, boolean hideChordVoicingsThatDoNotHaveAThirdOrAFifth) {
    	List<String> result = new ArrayList<>();

        List<NoteAndOctave> orderedNotes = orderNotes(tuning);
        
        List<Entry<Note, List<Interval>>> listOfEntries = new ArrayList<>(
                getIntervalsFromRoots(tuning).entrySet());
        
        Collections.sort(listOfEntries, (entry1, entry2) -> {
            return getFirstOccurence(orderedNotes, entry1.getKey())
                    - getFirstOccurence(orderedNotes, entry2.getKey());
        });
               
    	for( Entry<Note, List<Interval>> entry : listOfEntries) {
    		
    		Note root = entry.getKey();
            List<Interval> intervals = entry.getValue();
			if(intervals .size() > 1
			        && ( !hideChordVoicingsThatDoNotHaveAThirdOrAFifth 
			                || hasAThirdOrAFifth(intervals)) ) {
                StringJoiner sj = new StringJoiner(" ");
                for(Interval interval : intervals) {
                	sj.add(interval.getName(intervals));
                }
        		result.add( root + " " + sj.toString() );
            }            

    	}
    	
    	return result;
    	
    }
    
    boolean hasAThirdOrAFifth(List<Interval> intervals){
        return intervals.contains(Interval.MIN3)
                || intervals.contains(Interval.MAJ3)
                || intervals.contains(Interval.PERF_FIFTH);
    }
    
    public boolean doAnyOfTheRepresentationsHaveAThirdOrAFifth(Tuning tuning) {

        List<NoteAndOctave> orderedNotes = orderNotes(tuning);
        
        List<Entry<Note, List<Interval>>> listOfEntries = new ArrayList<>(
                getIntervalsFromRoots(tuning).entrySet());
        
        Collections.sort(listOfEntries, (entry1, entry2) -> {
            return getFirstOccurence(orderedNotes, entry1.getKey())
                    - getFirstOccurence(orderedNotes, entry2.getKey());
        });
               
        for( Entry<Note, List<Interval>> entry : listOfEntries) {
            
            Note root = entry.getKey();
            List<Interval> intervals = entry.getValue();
            if ( hasAThirdOrAFifth(intervals) ) {
                return true;
            }
        }
        
        return false;
        
    }
    

    private List<NoteAndOctave> orderNotes(Tuning tuning) {
        List<NoteAndOctave> orderedNotes = new ArrayList<>();
        for(Entry<GuitarString, FretAction> frettingEntry : frettings.entrySet()) {
            
            FretAction fretting = frettingEntry.getValue();
            
            Integer fretSounding = fretting.getFretSounding();
            if(fretting.getFretSounding() != null) {
                NoteAndOctave tuningBaseNote = 
                        tuning.getStringNotes().get(frettingEntry.getKey());
                orderedNotes.add(tuningBaseNote.up(fretSounding));
            }
        }
        Collections.sort(orderedNotes, (note1, note2) -> {
            return note1.getSemitonesFromA0() - note2.getSemitonesFromA0();
        });
        return orderedNotes;
    }

    public String noteRepresentation(Tuning tuning) {
        StringJoiner sj = new StringJoiner(" "); 
        for(Entry<GuitarString, FretAction> frettingEntry : frettings.entrySet()) {
            
            FretAction fretting = frettingEntry.getValue();
            
            Integer fretSounding = fretting.getFretSounding();
            if(fretting.getFretSounding() != null) {
                NoteAndOctave tuningBaseNote = 
                        tuning.getStringNotes().get(frettingEntry.getKey());
                sj.add("" + tuningBaseNote.up(fretSounding));
            }
        }
        return sj.toString();
    }

    public int smallestDistanceBetweenVoices(){
        
        int smallestDistanceBetweenVoices = Integer.MAX_VALUE;
        List<Integer> semitonesFromA0List = new ArrayList<>();
        
        for(Entry<GuitarString, FretAction> frettingEntry : frettings.entrySet()) {
            
            FretAction fretting = frettingEntry.getValue();
            
            Integer fretSounding = fretting.getFretSounding();
            if(fretting.getFretSounding() != null) {
                NoteAndOctave tuningBaseNote = 
                        lastTuningUsed.getStringNotes().get(frettingEntry.getKey());
                NoteAndOctave voice = tuningBaseNote.up(fretSounding);
                semitonesFromA0List.add(voice.getSemitonesFromA0());
            }
        }
        
        for(Integer semitonesFromA0 : semitonesFromA0List) {
            for(Integer semitonesFromA0Other : semitonesFromA0List) {
                if(semitonesFromA0 != semitonesFromA0Other) {
                    int smDif = Math.abs(semitonesFromA0 - semitonesFromA0Other);
                    if(smDif < smallestDistanceBetweenVoices) {
                        
                        smallestDistanceBetweenVoices = smDif;
                    }
                }
            }
        }
        
        return smallestDistanceBetweenVoices;        
    }

	public Map<Note, List<Interval>> getIntervalsFromRoots(Tuning tuning) {
		
		Map<Note, List<Interval>> intervalsList = new HashMap<>();
		List<Note> notes = new ArrayList<>();
		
        for(Entry<GuitarString, FretAction> frettingEntry : frettings.entrySet()) {
            
            FretAction fretting = frettingEntry.getValue();
            
            Integer fretSounding = fretting.getFretSounding();
            if(fretting.getFretSounding() != null) {
                NoteAndOctave tuningBaseNote = 
                        tuning.getStringNotes().get(frettingEntry.getKey());
                NoteAndOctave octavatedNote = tuningBaseNote.up(fretSounding);
                
                if(! notes.contains(octavatedNote.getNote())) {
                	notes.add(octavatedNote.getNote());
                }
            }
        }		
        
        List<Note> previousNotes = new ArrayList<>();
        for(Note rootNote : notes) {
        	
        	List<Interval> intervals = new ArrayList<>();
        	
        	for(Note currentNote : notes) {
        		
        		if( ! previousNotes.contains(currentNote) ) {
        			intervals.add(intervalFromRoot(rootNote, currentNote) );
        		}
        	}
        	
        	for(Note prevNote : previousNotes) {
    			intervals.add(intervalFromRoot(rootNote, prevNote) );
        	}
        	
        	Collections.sort(intervals, (interval1, interval2) -> {
        		
        		return interval1.getOrderingPriority(intervals) - interval2.getOrderingPriority(intervals);
        	});
        	
       		previousNotes.add(rootNote);
        		
			intervalsList.put(rootNote, intervals);
        	
        }
        
        return intervalsList;
	}

	private Interval intervalFromRoot(Note rootNote, Note currentNote) {
		
		int rootSemis = rootNote.getSemitonesFromA();
		int currentSemis = currentNote.getSemitonesFromA();
		if(currentSemis < rootSemis) {
			currentSemis += 12; // octave up
		}
		
		int distance = currentSemis - rootSemis;
		return Interval.getIntervalBySemitones(distance);
	}
    
	public int getLowestFretPlaying() {
		return lowestFretPlaying;
	}

    public void computeCompatibleWithAnyOfTheseKeys(
            Map<Key, Map<Note, List<Note>>> keyToMapOfRootsToNotesOfKey) {
        
        Chord voicingChord = getRepresentedChord();

        for(Entry<Key, Map<Note, List<Note>>> 
            keyMapOfRootsToNotesOfKeyEntry : keyToMapOfRootsToNotesOfKey.entrySet()) {
            
            Key key = keyMapOfRootsToNotesOfKeyEntry.getKey();
            Map<Note, List<Note>> mapOfRootsToNotesOfKey = keyMapOfRootsToNotesOfKeyEntry.getValue();
            
            for(Entry<Note, List<Note>> rootToNotesOfKeyEntry 
                    : mapOfRootsToNotesOfKey.entrySet()) {
                
                boolean voicingMatches = true;
                
                Note root = rootToNotesOfKeyEntry.getKey();
                List<Note> notesOfKey = rootToNotesOfKeyEntry.getValue();
                
                for( Note voicingNote : voicingChord.getNotes()) {
                    
                    voicingMatches &= notesOfKey.contains(voicingNote);
                }
                
                if(voicingMatches == true) {
                    
                    compatibleKeysAndRoots.add(new KeyAndRoot(key, root));
                }
            }
        }
    }
    
    public boolean isCompatibleWithAnyOfTheseKeys(
            Map<Key, Map<Note, List<Note>>> keyToMapOfRootsToNotesOfKey) {            
        
        boolean result = false;
        
        for( KeyAndRoot compatibleKeyAndRoot : compatibleKeysAndRoots) {
            Key key = compatibleKeyAndRoot.getKey();
            
            if(keyToMapOfRootsToNotesOfKey.containsKey(key)) {
                result = true;
                break;
            };
        }
        
        return result;
    }
    
    public List<KeyAndRoot> getCompatibleKeysAndRoots() {
        return compatibleKeysAndRoots;
    }
    
    public boolean getHasSeveralTimesTheSameNoteOnTheSameOctave(){
    	return hasSeveralTimesTheSameNoteOnTheSameOctave;
    }
    
    public NoteAndOctave getHighestNote(Tuning tuning){
        NoteAndOctave highestNote = null;
        for(Entry<GuitarString, FretAction> frettingEntry : frettings.entrySet()) {
            FretAction fretting = frettingEntry.getValue();
            Integer fretSounding = fretting.getFretSounding();
            if(fretting.getFretSounding() != null) {
                NoteAndOctave tuningBaseNote = 
                        tuning.getStringNotes().get(frettingEntry.getKey());
                 NoteAndOctave note = tuningBaseNote.up(fretSounding);
                 
                 if( highestNote == null
                         || note.isHigherThan(highestNote) ) {
                     highestNote = note;
                 }
            }
        }
        return highestNote;
    }
    
    public NoteAndOctave getLowestNote(Tuning tuning){
        NoteAndOctave lowestNote = null;
        for(Entry<GuitarString, FretAction> frettingEntry : frettings.entrySet()) {
            FretAction fretting = frettingEntry.getValue();
            Integer fretSounding = fretting.getFretSounding();
            if(fretting.getFretSounding() != null) {
                NoteAndOctave tuningBaseNote = 
                        tuning.getStringNotes().get(frettingEntry.getKey());
                 NoteAndOctave note = tuningBaseNote.up(fretSounding);
                 
                 if( lowestNote == null
                         || note.isLowerThan(lowestNote) ) {
                     lowestNote = note;
                 }
            }
        }
        return lowestNote;
    }
    
}

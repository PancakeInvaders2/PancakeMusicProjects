package com.campoy.chord.voicing.creator.model;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.StringJoiner;
import java.util.Map.Entry;

public class ChordVoicing {
    
    private Map<GuitarString, FretAction> frettings = new HashMap<>();
    private Chord representedChord = null;
    private Tuning lastTuningUsed;
    
    public ChordVoicing() { }
    
    public ChordVoicing(List<FretAction> orderedFrettings) {
        this();
        int i = 0;
        for(FretAction fretAction : orderedFrettings) {
            frettings.put(new GuitarString(i), fretAction);
            i++;
        }
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
    
    public void postProcessing(Tuning tuning){
        
        Chord representedChordBeingCreated = new Chord();
        
        for( Entry<GuitarString, FretAction> frettingEntry : getFrettings().entrySet() ) {
            
            GuitarString guitarString = frettingEntry.getKey();
            FretAction fretAction = frettingEntry.getValue();
            
            OctavatedNote stringBaseNote = tuning.getStringNotes().get(guitarString);
            
            Integer fretSounding = fretAction.getFretSounding();
            if(fretSounding != null) {
                
                OctavatedNote stringNoteSounding;
                if(fretSounding == 0) {
                    stringNoteSounding = stringBaseNote;
                }
                else {
                    stringNoteSounding = stringBaseNote.up(fretSounding);
                }
                
                representedChordBeingCreated.getNotes().add(stringNoteSounding.getNote());
            }
            
        }
        
        representedChord = representedChordBeingCreated;
        
        representedChord.postProcessing();
        
        this.lastTuningUsed = tuning;
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

    public String fullRepresentation(Tuning tuning) {
        return "| " + getRepresentedChord() +" | " + noteRepresentation(tuning) +" |" ;
    }

    public String noteRepresentation(Tuning tuning) {
        StringJoiner sj = new StringJoiner(" "); 
        for(Entry<GuitarString, FretAction> frettingEntry : frettings.entrySet()) {
            
            FretAction fretting = frettingEntry.getValue();
            
            Integer fretSounding = fretting.getFretSounding();
            if(fretting.getFretSounding() != null) {
                OctavatedNote tuningBaseNote = 
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
                OctavatedNote tuningBaseNote = 
                        lastTuningUsed.getStringNotes().get(frettingEntry.getKey());
                OctavatedNote voice = tuningBaseNote.up(fretSounding);
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
    
    
}

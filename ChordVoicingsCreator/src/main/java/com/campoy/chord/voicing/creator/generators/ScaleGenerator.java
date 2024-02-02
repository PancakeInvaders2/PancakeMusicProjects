package com.campoy.chord.voicing.creator.generators;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Consumer;

import com.campoy.chord.voicing.creator.model.musictheory.Interval;
import com.campoy.chord.voicing.creator.model.musictheory.Key;



public class ScaleGenerator
{
    
    /**
     * 
     * Generates lists of theoretically valid scales
     * 
     */
 
    public static void main(String[] args) {
        
        try {
        
            int numberOfNotesInTheScales = 7;
            
            List<Key> scales = generateAllScalesOfSize(numberOfNotesInTheScales);
            
            printScales(scales);
        
        }
        catch(Exception e)
        {
            e.printStackTrace();
        }
    }

    private static List<Key> generateAllScalesOfSize(int numberOfNotesInTheScales) {
        List <Key> completeScales = new ArrayList<>();
        
        List <Key> scalesInCreation = new ArrayList<>();
        
        scalesInCreation.add(new Key());
        
        List<Interval> intervals = new ArrayList<>();
        // filter out the root interval
        for(Interval value : Interval.values()) {
            if(value.getSemitones() != 0) {
                intervals.add(value);
            }
        }
   
        for( int i = 0; i < numberOfNotesInTheScales; i ++) {
            
            List <Key> scalesInCreationFromPreviousLoop = scalesInCreation;
            scalesInCreation = new ArrayList<>();
            
            for( Key scaleFromPreviousLoop : scalesInCreationFromPreviousLoop)
            {
                
                for( Interval interval : intervals)
                {
                    Key newScale = new Key(scaleFromPreviousLoop);
                            
                    newScale.add(interval);
                    
                    int newScaleSize = newScale.getIntervals().size();
                    if ( newScaleSize == numberOfNotesInTheScales )
                    {
                        if( newScale.isValid())
                        {
                            boolean alreadyFound = false;
                            for(Key completeScale : completeScales) {
                                if(completeScale.equals(newScale)) {
                                    alreadyFound = true;
                                }
                                
                            }
                            
                            if(!alreadyFound) {
                                completeScales.add(newScale);
                            }
                        }
                        
                    }
                    else 
                    {
                        if(newScale.totalNumberOfIntervals() <= 12)
                        {
                            scalesInCreation.add(newScale);
                        }
                    }
                }               
            }
            
            
        }
        return completeScales;
    }

    private static void printScales(List<Key> completeScales) {
        int i = 1;
        for (Key scale : completeScales)
        {
            System.out.println("" + i + " ----------------");
            
            printScale(scale);
            
            i++;
        }
    }
    
    private static void printMajorModes() {
        
        System.out.println("IONIAN:");
        System.out.println(Key.IONIAN);
        
        System.out.println("DORIAN:");
        System.out.println(Key.DORIAN);
        
        System.out.println("PHRYGIAN:");
        System.out.println(Key.PHRYGIAN);
        
        System.out.println("LYDIAN:");
        System.out.println(Key.LYDIAN);
        
        System.out.println("MIXOLYDIAN:");
        System.out.println(Key.MIXOLYDIAN);
        
        System.out.println("AEOLIAN:");
        System.out.println(Key.AEOLIAN);
        
        System.out.println("LOCRIAN:");
        System.out.println(Key.LOCRIAN);
            
    }

    private static void printScale(Key scale) {
        for(Key scaleMode : scale.modes())
        {
            System.out.println("\t" + scaleMode.toString());
        }
    }
}
  
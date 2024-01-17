package com.campoy.chord.voicing.creator.generators;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Consumer;

import com.campoy.chord.voicing.creator.model.musictheory.Interval;
import com.campoy.chord.voicing.creator.model.musictheory.Scale;



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
            
            List<Scale> scales = generateAllScalesOfSize(numberOfNotesInTheScales);
            
            printScales(scales);
        
        }
        catch(Exception e)
        {
            e.printStackTrace();
        }
    }

    private static List<Scale> generateAllScalesOfSize(int numberOfNotesInTheScales) {
        List <Scale> completeScales = new ArrayList<>();
        
        List <Scale> scalesInCreation = new ArrayList<>();
        
        scalesInCreation.add(new Scale());
        
        List<Interval> intervals = new ArrayList<>();
        // filter out the root interval
        for(Interval value : Interval.values()) {
            if(value.getSemitones() != 0) {
                intervals.add(value);
            }
        }
   
        for( int i = 0; i < numberOfNotesInTheScales; i ++) {
            
            List <Scale> scalesInCreationFromPreviousLoop = scalesInCreation;
            scalesInCreation = new ArrayList<>();
            
            for( Scale scaleFromPreviousLoop : scalesInCreationFromPreviousLoop)
            {
                
                for( Interval interval : intervals)
                {
                    Scale newScale = new Scale(scaleFromPreviousLoop);
                            
                    newScale.add(interval);
                    
                    int newScaleSize = newScale.getIntervals().size();
                    if ( newScaleSize == numberOfNotesInTheScales )
                    {
                        if( newScale.isValid())
                        {
                            boolean alreadyFound = false;
                            for(Scale completeScale : completeScales) {
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

    private static void printScales(List<Scale> completeScales) {
        int i = 1;
        for (Scale scale : completeScales)
        {
            System.out.println("" + i + " ----------------");
            
            printScale(scale);
            
            i++;
        }
    }
    
    private static void printMajorModes() {
        
        System.out.println("IONIAN:");
        System.out.println(Scale.IONIAN);
        
        System.out.println("DORIAN:");
        System.out.println(Scale.DORIAN);
        
        System.out.println("PHRYGIAN:");
        System.out.println(Scale.PHRYGIAN);
        
        System.out.println("LYDIAN:");
        System.out.println(Scale.LYDIAN);
        
        System.out.println("MIXOLYDIAN:");
        System.out.println(Scale.MIXOLYDIAN);
        
        System.out.println("AEOLIAN:");
        System.out.println(Scale.AEOLIAN);
        
        System.out.println("LOCRIAN:");
        System.out.println(Scale.LOCRIAN);
            
    }

    private static void printScale(Scale scale) {
        for(Scale scaleMode : scale.modes())
        {
            System.out.println("\t" + scaleMode.toString());
        }
    }
}
  
package com.campoy.scales.generator.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Consumer;

import com.campoy.scales.generator.model.Interval;
import com.campoy.scales.generator.model.Scale;


public class ScaleGenerator
{
 
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
   
        for( int i = 0; i < numberOfNotesInTheScales; i ++) {
            
            List <Scale> scalesInCreationFromPreviousLoop = scalesInCreation;
            scalesInCreation = new ArrayList<>();
            
            
            for( Scale scaleFromPreviousLoop : scalesInCreationFromPreviousLoop)
            {
                
                for( Interval interval : Interval.values())
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

    private static void printScale(Scale scale) {
        for(Scale scaleMode : scale.modes())
        {
            System.out.println("\t" + scaleMode.toString());
        }
    }
}
  
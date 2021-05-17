package com.campoy.scales.generator.model;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Chord {

    
    
    private List<Interval> intervalList = new ArrayList<>();
    
    public Chord(List<Interval> pIntervalList)
    {
        intervalList = pIntervalList;
    }
    
    public Chord(Interval ... intervals)
    {
        intervalList = Arrays.asList(intervals);
    }
    
    public List<Interval> getIntervalList()
    {
        return intervalList;
    }
}

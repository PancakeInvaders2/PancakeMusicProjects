package com.campoy.scales.generator.model;

import java.util.ArrayList;
import java.util.List;

public class Scale {

            
    private CircularLinkedList<Interval> intervals;
    
    public Scale(){
        intervals = new CircularLinkedList<>();
    }
    
    public Scale(CircularLinkedList<Interval> pSemitoneIntervals)
    {
        this();
        
        CircularLinkedListNode<Interval> currentNode = pSemitoneIntervals.head;
        if (currentNode != null) {
            do
            {
                intervals.addNode(currentNode.value);
                
                currentNode = currentNode.nextNode;
            } while (currentNode != pSemitoneIntervals.head);
        }
    }
    
    public Scale(Scale other){
        this(other.intervals);
    }
    
    public Scale(List<Interval> pSemitoneIntervals){
        this();
        
        for( Interval semitoneInterval : pSemitoneIntervals) {
            
            intervals.addNode(semitoneInterval);
        }
        
    }
    
    public boolean isValid() {
        if(totalNumberOfIntervals() == 12)
        {
            return true;
        }
        return false;
    }

    public CircularLinkedList<Interval> getIntervals() {
        return intervals;
    }
    
    public List<Scale> modes()
    {
        List<Scale> modes = new ArrayList<>();

        for (List<CircularLinkedListNode<Interval>> intervalMode : intervals.modes())
        {
            List<Interval> intervalModeValues = new ArrayList<>();
            
            for(CircularLinkedListNode<Interval> intervalNode: intervalMode)
            {
                intervalModeValues.add(intervalNode.value);
            }
            
            modes.add(new Scale(intervalModeValues));

        }
        
        return modes;
    }
    
    public int totalNumberOfIntervals()
    {
        int totalNumberOfIntervals = 0;
        
        CircularLinkedListNode<Interval> currentNode = intervals.head;

        if (currentNode != null) {
            do {
                
                totalNumberOfIntervals += currentNode.value.getNumberOfSemitones();
                
                currentNode = currentNode.nextNode;
            } while (currentNode != intervals.head);
        }
        
        return totalNumberOfIntervals;
    }
    
    @Override
    public boolean equals(Object obj) {
        
        if(!(obj instanceof Scale))
        {
            return false;
        }
        Scale other = (Scale)obj;
        
        boolean ret = false;
        
        if(getIntervals().equals(other.getIntervals())) {
            
            return true;
        }
        
        return ret;
    }
    
    public void add(Interval i){
        
        intervals.addNode(i);
    }
    
    @Override
    public String toString()
    {
        return intervals.toString();
    }

    public int size()
    {
        return intervals.size();
    }

}


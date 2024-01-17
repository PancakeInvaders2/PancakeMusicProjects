package com.campoy.chord.voicing.creator.model.musictheory;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.StringJoiner;

public class Scale {
    
    public static final Scale MAJOR = new Scale(
            Interval.MAJ2,
            Interval.MAJ2,
            Interval.MIN2,
            Interval.MAJ2,
            Interval.MAJ2,
            Interval.MAJ2,
            Interval.MIN2)
            .setName("Major");
    
    public static final Scale IONIAN = MAJOR.modes().get(0).setName("Major");
    public static final Scale DORIAN = MAJOR.modes().get(1).setName("Dorian");
    public static final Scale PHRYGIAN = MAJOR.modes().get(2).setName("Phrygian");
    public static final Scale LYDIAN = MAJOR.modes().get(3).setName("Lydian");
    public static final Scale MIXOLYDIAN = MAJOR.modes().get(4).setName("Mixolydian");
    public static final Scale AEOLIAN = MAJOR.modes().get(5).setName("Minor");
    public static final Scale LOCRIAN = MAJOR.modes().get(6).setName("Locrian");

    public static final Scale MINOR = AEOLIAN;
    
    public static final Scale HARMONIC_MINOR = new Scale(
        Interval.MAJ2,
        Interval.MIN2,
        Interval.MAJ2,
        Interval.MAJ2,
        Interval.MIN2,
        Interval.MIN3,
        Interval.MIN2)
        .setName("Harmonic minor");
    
    public static final Scale PHRYGIAN_DOMINANT = 
            HARMONIC_MINOR.modes().get(4).setName("Phrygian dominant");

    public static final Scale MELODIC_MINOR = new Scale(
        Interval.MAJ2,
        Interval.MIN2,
        Interval.MAJ2,
        Interval.MAJ2,
        Interval.MAJ2,
        Interval.MAJ2,
        Interval.MIN2)
        .setName("Melodic minor");
    
    /**
     * Natural minor with the notes of harmonic and melodic minor in there
     * Example: A B C D E F F# G# G
     * Not really a Scale, just a collection of notes, whatever
     * 
     */
    public static final Scale GENERAL_MINOR = new Scale(
        Interval.MAJ2, // A -> B
        Interval.MIN2, // B -> C
        Interval.MAJ2, // C -> D
        Interval.MAJ2, // D -> E
        Interval.MIN2, // E -> F
        Interval.MIN2, // F -> F#
        Interval.MIN2, // F# -> G
        Interval.MIN2, // G -> G#
        Interval.MIN2) // G# -> A
        .setName("General minor");
    
    

    private CircularLinkedList<Interval> intervals;
    private List<Integer> semitonesFromRootList;

    private String name = null;
    
    private Scale(){
        intervals = new CircularLinkedList<>();
        semitonesFromRootList = new ArrayList<>();
    }
    
    public Scale(CircularLinkedList<Interval> pSemitoneIntervals)
    {
        this();
        
        CircularLinkedListNode<Interval> currentNode = pSemitoneIntervals.head;
        int semitonesFromRoot = 0;
        if (currentNode != null) {
            do
            {
                intervals.addNode(currentNode.value);
                
                semitonesFromRoot += currentNode.value.getSemitones();
                semitonesFromRootList.add(semitonesFromRoot);
                
                currentNode = currentNode.nextNode;
            } while (currentNode != pSemitoneIntervals.head);
        }
    }
    
    public Scale(Scale other){
        this(other.intervals);
    }
    
    public Scale(Interval ... pSemitoneIntervals){  
        this(Arrays.asList(pSemitoneIntervals));    
    }
    
    public Scale(List<Interval> pSemitoneIntervals){
        this();
        
        int semitonesFromRoot = 0;
        for( Interval semitoneInterval : pSemitoneIntervals) {
            
            intervals.addNode(semitoneInterval);
            
            semitonesFromRoot += semitoneInterval.getSemitones();
            semitonesFromRootList.add(semitonesFromRoot);
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
                
                totalNumberOfIntervals += currentNode.value.getSemitones();
                
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
        
        int size = semitonesFromRootList.size();
        int semitonesFromRoot;
        if(size == 0) {
            semitonesFromRoot = 0;
        }
        else {
            semitonesFromRoot = semitonesFromRootList.get(size -1);
        }
        semitonesFromRoot += i.getSemitones();
        
        semitonesFromRootList.add(semitonesFromRoot);
        
    }
    
    @Override
    public String toString()
    {        
        if(name != null) {
            return name;
        }
        
        StringJoiner sj = new StringJoiner(",");
        intervals.forEach((interval) -> {
            sj.add(interval.getScaleRepresentation());            
        });
        
        return "[" + sj.toString() + "]"; 
    }

    public int size()
    {
        return intervals.size();
    }

    public List<Integer> getSemitonesFromRootList() {
        return semitonesFromRootList;
    }
    
    public Scale setName(String name){
        
        this.name  = name;
        
        return this;
    }

    public String getName() {
        return name;
    }
}


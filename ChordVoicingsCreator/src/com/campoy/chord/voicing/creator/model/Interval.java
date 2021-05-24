package com.campoy.chord.voicing.creator.model;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public enum Interval {
	
	ROOT( 0, "", false, false, 0, "0"),
	MIN3( 3, "minor", true, false, 1, "3"),
	MAJ3( 4, "major", true, false, 2, "4"),
	FLAT_5( 6, "b5", false, false, 3, "6"),
	PERF_FIFTH( 7, "5", false, true, 4, "7"),
	MIN7TH( 10, "b7", false, false, 5, "t"),
	MAJ7TH( 11, "add7", false, false, 6, "e"),
	MIN2( 1, "b9", false, false, 7, "H"),
	MAJ2( 2, "add9", false, false, 8, "W"),
	PERF_FOURTH( 5, "add11", false, false, 9, "5"),
	MIN6TH( 8, "b13", false, false, 10, "8"),
	MAJ6TH( 9, "add13", false, false, 11, "9");
	
	private static Map<Integer, Interval> semitonesToInterval = new HashMap<>();
	
	static {
		for(Interval interval : values()) {
			semitonesToInterval.put(interval.getSemitones(), interval);
		}
	}
	
	public static Interval getIntervalBySemitones(int semitones) {
		return semitonesToInterval.get(semitones);
	}
	
	private int semitones;
	private String name;
	private String scaleRepresentation;
	
	boolean isThird;
	boolean isFifth;
	int orderingPriority;
	
	private Interval(int semitones,
			String name, 
			boolean isThird, 
			boolean isFifth, 
			int orderingPriority,
			String scaleRepresentation) {
		this.semitones = semitones;
		this.name = name;
		this.isThird = isThird;
		this.isFifth = isFifth;
		this.orderingPriority = orderingPriority;
		this.scaleRepresentation = scaleRepresentation;
	}
	
	public String getName(List<Interval> intervals) {
		
		if(intervals != null)
		{
			if( this.equals(MIN3) 
					&& intervals.contains(FLAT_5) ) {
				return "diminished";
			}
			else if( isThird 
				&& ! intervals.contains(PERF_FIFTH) ) {
				return name + "(no5th)";
			}
			else if( isFifth 
					&& (intervals.contains(MIN3)
							|| intervals.contains(MAJ3) )
					&& !( intervals.contains(FLAT_5)
							&& intervals.contains(MIN3))) {
					return "";
			}
			else if( this.equals(FLAT_5) 
					&& intervals.contains(MIN3) ) {
				return "";
			}			
		}
		
		return name;
	}
	
	public int getSemitones() {
		return semitones;
	}
	
	public int getOrderingPriority() {
		return orderingPriority;
	}
	
	public String getScaleRepresentation() {
	    return scaleRepresentation;
    }
	
}

package com.campoy.scales.generator.model;

public enum Interval {
    
    ONE_SM(1, "H"),
    TWO_SM(2, "W"),
    THREE_SM(3, "3"),
    FOUR_SM(4, "4"),
    FIVE_SM(5, "5"),
    SIX_SM(6, "6"),
    SEVEN_SM(7, "7"),
    EIGHT_SM(8, "8"),
    NINE_SM(9, "9"),
    TEN_SM(10, "t"),
    ELEVEN_SM(11, "e");
    
    Integer numberOfSemitones;
    String representation;

    Interval(Integer pNumberOfSemitones, String pRepresentation)
    {
        numberOfSemitones = pNumberOfSemitones;
        representation = pRepresentation;
    }
    
    public Integer getNumberOfSemitones() {
        return numberOfSemitones;
    }
    
    @Override
    public String toString() 
    {
        return representation;
    }

}
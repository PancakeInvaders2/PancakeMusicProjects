package com.campoy.chord.voicing.creator.model;

public class GuitarString {
    // 0 to however many strings the instrument has
    int position;
    
    public GuitarString(int position) {
        this.position = position;
    }
    
    public int getPosition() {
        return position;
    }
    
    @Override
    public boolean equals(Object obj) {
        
        if( !( obj instanceof GuitarString) ) {
            return false;
        }
        
        GuitarString objGuitarString = (GuitarString)obj;
        return this.getPosition() == objGuitarString.getPosition();
    }
    
    @Override
    public int hashCode() {
        return position;
    }
    
    @Override
    public String toString() {
        // TODO Auto-generated method stub
        return "S" + position;
    }
}

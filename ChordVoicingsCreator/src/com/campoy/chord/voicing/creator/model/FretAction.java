package com.campoy.chord.voicing.creator.model;

public class FretAction {
    
    public static final FretAction MUTE = new FretAction(true, false, null);
    
    public static final FretAction OPEN = new FretAction(false, true, null);

    private final Integer fretHeld;
    private final boolean isMute;
    private final boolean isOpen;
    private final String representation;

    
    private FretAction(boolean isMute, boolean isOpen, Integer fretHeld) {
        this.isMute = isMute;
        this.isOpen = isOpen;        
        this.fretHeld = fretHeld;
        
        if(isMute) {
            representation = "X";
        }
        else if (isOpen) {
            representation = "O";
        }
        else {
            representation = "" + fretHeld;
        }
    }
    
    public FretAction(int fretHeld) {
        this(false, false, fretHeld);
    }
    
    public static FretAction hold(Integer fretNumber) {
        return new FretAction(fretNumber);
    }
    
    @Override
    public boolean equals(Object obj) {
        
        if( !( obj instanceof FretAction) ) {
            return false;
        }
        
        FretAction objFretAction = (FretAction)obj;
        if(this.isMute() ) {
            if(objFretAction.isMute() ) {
                return true;
            }
            else {
                return false;
            }   
        }
        
        if(this.isOpen() ) {
            if(objFretAction.isOpen() ) {
                return true;
            }
            else {
                return false;
            }   
        }
        
        if(this.fretHeld == objFretAction.fretHeld) {
            return true;
        }
        else {
            return false;
        }
    }
    
    @Override
    public int hashCode() {
        if(isMute) {
            return -2;
        }
        else if (isOpen) {
            return -1;
        }
        else {
            return fretHeld;
        }
    }
    
    public Integer getFretHeld() {
        return fretHeld;
    }
    
    public Integer getFretSounding(){
        
        if(isMute()) {
            return null;
        }
        else if(isOpen()) {
            return 0;
        }
        else {
            return fretHeld;
        }
    }
    
    public boolean isMute() {
        return isMute;
    }
    
    public boolean isOpen() {
        return isOpen;
    }
    
    @Override
    public String toString() {
        return representation;
    }
   
}

package com.campoy.chord.voicing.creator.model;

public class CircularLinkedListNode <T> {
    
    T value;
    CircularLinkedListNode<T> nextNode;
 
    public CircularLinkedListNode(T value) {
        this.value = value;
    }
    
    @Override
    public String toString() {
        return "Node(" + value.toString() + ")";
    }
    
    @Override
    public boolean equals(Object obj) {
        
        if(obj == null || !(this.getClass().isAssignableFrom(obj.getClass())))
        {               
            return false;
        }
        
        CircularLinkedListNode<T> other = (CircularLinkedListNode<T>) obj;
        
        if(this.value == null 
                && other.value == null)
        {
            return true;
        }
        else if (this.value == null)
        {
            return false;
        }

        return value.equals(other.value);
    }
}
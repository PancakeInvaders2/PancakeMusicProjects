package com.campoy.scales.generator.model;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Consumer;

public class CircularLinkedList<T>
{
    CircularLinkedListNode<T> head = null;
    private CircularLinkedListNode<T> tail = null;

    public void addNode(T value) {
        CircularLinkedListNode<T> newNode = new CircularLinkedListNode<T>(value);
     
        if (head == null) {
            head = newNode;
        } else {
            tail.nextNode = newNode;
        }
     
        tail = newNode;
        tail.nextNode = head;
    }
    
    public int size()
    {
        int ret = 0;
        CircularLinkedListNode<T> currentNode = head;
        
        if (head != null) {
            do {
                
                ret += 1;
                
                currentNode = currentNode.nextNode;
            } while (currentNode != head);
        }
        return ret;
    }
    
    public boolean containsNode(T searchValue) {
        CircularLinkedListNode<T> currentNode = head;
     
        if (head == null) {
            return false;
        } else {
            do {
                if (currentNode.value == searchValue) {
                    return true;
                }
                currentNode = currentNode.nextNode;
            } while (currentNode != head);
            return false;
        }
    }
    
    public void deleteNode(T valueToDelete) {
        CircularLinkedListNode<T> currentNode = head;
     
        if (head != null) { 
            if (currentNode.value == valueToDelete) {
                head = head.nextNode;
                tail.nextNode = head;
            } else {
                do {
                    CircularLinkedListNode nextNode = currentNode.nextNode;
                    if (nextNode.value == valueToDelete) {
                        currentNode.nextNode = nextNode.nextNode;
                        break;
                    }
                    currentNode = currentNode.nextNode;
                } while (currentNode != head);
            }
        }
    }
    
    @Override
    public String toString() {
        CircularLinkedListNode<T> currentNode = head;
        StringBuilder sb = new StringBuilder(); 
        boolean first = true;
        sb.append("[");
        if (head != null) {
            do {
                if(first) {
                    first = false;
                }
                else
                {
                    sb.append(",");
                }
                sb.append(currentNode.value.toString());
                
                currentNode = currentNode.nextNode;
            } while (currentNode != head);
        }
        sb.append("]");
        
        return sb.toString();

    }
    
    public void forEach(Consumer<T> c)
    {
        forEach(c, head);
    }
    
    public void forEach(Consumer<T> c, CircularLinkedListNode<T> startingAt)
    {
        CircularLinkedListNode<T> currentNode = startingAt;

        if (startingAt != null) {
            do {
                
                c.accept(currentNode.value);
                
                currentNode = currentNode.nextNode;
            } while (currentNode != startingAt);
        }
    }
    
    
    public List<List<CircularLinkedListNode<T>>> modes()
    {
        List<List<CircularLinkedListNode<T>>> modes = new ArrayList<>();
        
        for( CircularLinkedListNode<T> node : nodes())
        {
            List<CircularLinkedListNode<T>> mode = nodes(node);
            modes.add(mode);
        }
        
        return modes;
        
    }
    
    public List<CircularLinkedListNode<T>> nodes()
    {
        return nodes(head);
    }
    
    public List<CircularLinkedListNode<T>> nodes(CircularLinkedListNode<T> startingAt)
    {
        List<CircularLinkedListNode<T>> ret = new ArrayList<>();
        CircularLinkedListNode<T> currentNode = startingAt;

        if (startingAt != null) {
            do {
                
                ret.add(currentNode);
                
                currentNode = currentNode.nextNode;
            } while (currentNode != startingAt);
        }
        
        return ret;
        
    }
    
    @Override
    public boolean equals(Object obj) {
        
        if(obj == null || !(this.getClass().isAssignableFrom(obj.getClass())))
        {               
            return false;
        }
        CircularLinkedList<T> other = (CircularLinkedList<T>) obj;
        
        
        List<CircularLinkedListNode<T>> otherNodes = other.nodes();
        
        for(List<CircularLinkedListNode<T>> mode : modes())
        {
            if ( mode.equals(otherNodes) )
            {
                return true;
            }
        }
        
        return false;
    }
    
}
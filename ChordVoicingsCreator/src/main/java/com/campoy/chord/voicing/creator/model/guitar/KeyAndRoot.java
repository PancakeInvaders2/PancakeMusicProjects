package com.campoy.chord.voicing.creator.model.guitar;

import com.campoy.chord.voicing.creator.model.musictheory.Note;
import com.campoy.chord.voicing.creator.model.musictheory.Key;

import lombok.Data;

@Data
public class KeyAndRoot {
    private final Key key;
    private final Note root;
}

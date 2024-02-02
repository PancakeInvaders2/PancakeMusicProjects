package com.campoy.chord.voicing.creator.model.guitar;

import com.campoy.chord.voicing.creator.model.musictheory.Note;
import com.campoy.chord.voicing.creator.model.musictheory.Key;

import lombok.Data;

@Data
public class ScaleAndRoot {
    private final Key scale;
    private final Note root;
}

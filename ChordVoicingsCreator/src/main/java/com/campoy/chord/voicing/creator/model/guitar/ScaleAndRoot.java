package com.campoy.chord.voicing.creator.model.guitar;

import com.campoy.chord.voicing.creator.model.musictheory.Note;
import com.campoy.chord.voicing.creator.model.musictheory.Scale;

import lombok.Data;

@Data
public class ScaleAndRoot {
    private final Scale scale;
    private final Note root;
}

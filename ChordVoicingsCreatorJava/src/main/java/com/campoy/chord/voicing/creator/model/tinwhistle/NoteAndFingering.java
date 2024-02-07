package com.campoy.chord.voicing.creator.model.tinwhistle;

import com.campoy.chord.voicing.creator.model.musictheory.Note;

import lombok.Data;

@Data
public class NoteAndFingering{
    private final Note note;
    private final WhistleFingering fingering;
}
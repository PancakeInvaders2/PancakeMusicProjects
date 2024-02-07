import { EqualsUtils } from "./util/EqualsUtils.js";
import { ChordVoicingGenerator } from "./generators/ChordVoicingGenerator.js";
import { Tuning } from "./model/guitar/Tuning.js";
import { Key } from "./model/musictheory/Key.js";
import { Note } from "./model/musictheory/Note.js";
import { NoteAndOctave } from "./model/musictheory/NoteAndOctave.js";

declare global {
    interface Window {
        generateVoicings: () => void;
        restrictToInteger: (input: HTMLInputElement) => void;
    }
}


window.restrictToInteger = function (input: HTMLInputElement): void {
    input.value = input.value.replace(/[^\d-]/g, ''); // Remove any characters that are not digits or minus sign
}

function populateTuning() {
    const tuningSelect = document.getElementById('tuning');
    const preselectedTuning = Tuning.DROP_D_6_STRING_GUITAR;

    Tuning.availableTunings.forEach(tuning => {
        const option = document.createElement('option');
        option.value = tuning.name;
        option.textContent = tuning.name;
        if ( preselectedTuning.equals(tuning)) {
            option.selected = true;
        }
        tuningSelect!.appendChild(option);
    });
}

function populateSearchedKeys() {
    const searchedKeysSelect = document.getElementById('searchedKeys');
    const preselectedKeys = [Key.AEOLIAN, Key.HARMONIC_MINOR];

    Key.availableKeysByName.forEach( (key, keyname) => {
        const option = document.createElement('option');
        option.value = keyname;
        option.textContent = keyname;
        if ( EqualsUtils.arrayContainsAnEqual(preselectedKeys,key)) {
            option.selected = true;
        }
        searchedKeysSelect!.appendChild(option);
    });

}


function populateKeyRoots() {
    const allowedKeyRootsSelect = document.getElementById('allowedKeyRoots');
    const preselectedKeyRoots = [Note.E];

    for( let note of Note.values){
        const option = document.createElement('option');
        option.value = "" + note.semitonesFromA;
        option.textContent = note.fullRepresentation();
        if ( EqualsUtils.arrayContainsAnEqual(preselectedKeyRoots,note)) {
            option.selected = true;
        }
        allowedKeyRootsSelect!.appendChild(option);

    }
}

function populateLowestNoteAllowedNote() {
    const allowedKeyRootsSelect = document.getElementById('lowestNoteAllowedNote');
    const preselectedNote = Note.E;

    for( let note of Note.values){
        const option = document.createElement('option');
        option.value = "" + note.semitonesFromA;;
        option.textContent = note.fullRepresentation();
        if ( preselectedNote.equals(note)) {
            option.selected = true;
        }
        allowedKeyRootsSelect!.appendChild(option);

    }
}

function populateHighestNoteAllowedNote() {
    const allowedKeyRootsSelect = document.getElementById('highestNoteAllowedNote');
    const preselectedNote = Note.E;

    for( let note of Note.values){
        const option = document.createElement('option');
        option.value = "" + note.semitonesFromA;;
        option.textContent = note.fullRepresentation();
        if ( preselectedNote.equals(note)) {
            option.selected = true;
        }
        allowedKeyRootsSelect!.appendChild(option);

    }
}

window.onload = function() {
    populateTuning();
    populateSearchedKeys();
    populateKeyRoots();
    populateLowestNoteAllowedNote();
    populateHighestNoteAllowedNote();
}; 

function getSelectedKeysRoots() : Note[] {

    const allowedKeyRoots = document.getElementById('allowedKeyRoots') as HTMLSelectElement;
    const selectedAllowedKeyRoots : Note[] = [];
    const options = allowedKeyRoots.options;

    for (let i = 0; i < options.length; i++) {
        let opt = options[i]!;
        if (opt.selected) {
            const semitonesFromA : number = parseInt(opt.value);
            const note : Note = Note.noteBySemitonesFromA(semitonesFromA)!;
            selectedAllowedKeyRoots.push(note);
        }
    }

    return selectedAllowedKeyRoots;
}

function getSelectedKeys() : Key[] {
    const searchedKeysSelect = document.getElementById('searchedKeys') as HTMLSelectElement;
    const selectedKeys : Key[] = [];
    const options = searchedKeysSelect.options;

    for (let i = 0; i < options.length; i++) {
        let opt = options[i]!;
        if (opt.selected) {
            selectedKeys.push(Key.getKeyByName(opt.value)!);
        }
    }

    return selectedKeys;
}

function getSelectedTuning(): Tuning {
    const tuningSelect = document.getElementById('tuning') as HTMLSelectElement;
    const selectedOption = tuningSelect.options[tuningSelect.selectedIndex] as HTMLOptionElement;
    const selectedTuningName = selectedOption.value;
    return Tuning.getTuningByName(selectedTuningName) as Tuning; // Parse the JSON back to an object
}

function getSelectedNote(selectElementId: string) : Note  {
    const noteSelect = document.getElementById(selectElementId) as HTMLSelectElement;
    const selectedOption = noteSelect.options[noteSelect.selectedIndex] as HTMLOptionElement;
    const semitonesFromA : number = parseInt(selectedOption.value);
    const selectedNote : Note = Note.noteBySemitonesFromA(semitonesFromA)!;
    return selectedNote;
}

function getSelectedNumberFromFormData(formData: FormData, inputElementId: string): number {
    const numberInput = formData.get(inputElementId) as FormDataEntryValue 
    const stringValue : string = numberInput.toString();
    const inputString = stringValue.trim(); // Trim whitespace
    const numericValue = parseInt(inputString); // Parse string to float
    if (!isNaN(numericValue)) { // TODO disallow non ints in the UI
        return numericValue;
    } else {
        return 0;
    }
}

window.generateVoicings  = function () {
    const form = document.getElementById('chordVoicingGeneratorConfigForm') as HTMLFormElement;
    const formData = new FormData(form);

    // Extract form data
    const tuning = getSelectedTuning();
    
    const fretSpan : number = getSelectedNumberFromFormData(formData, 'fretSpan');
    const firstFretToScan : number = getSelectedNumberFromFormData(formData, 'firstFretToScan');
    const lastFretToScan : number = getSelectedNumberFromFormData(formData, 'lastFretToScan');
    const minimumSemitonesBetweenNotesOfTheVoicing : number = getSelectedNumberFromFormData(formData, 'minimumSemitonesBetweenNotesOfTheVoicing');
    const searchedKeys : Key[] = getSelectedKeys();
    const allowedKeyRoots : Note[] = getSelectedKeysRoots();
    const minNumberOfDifferentNotes : number = getSelectedNumberFromFormData(formData, 'minNumberOfDifferentNotes');
    const maxNumberOfDifferentNotes : number = getSelectedNumberFromFormData(formData, 'maxNumberOfDifferentNotes');
    const mustContainAtLeastThisManyOpenStrings : number = getSelectedNumberFromFormData(formData, 'mustContainAtLeastThisManyOpenStrings');
    const mustContainAtMostThisManyOpenStrings : number = getSelectedNumberFromFormData(formData, 'mustContainAtMostThisManyOpenStrings');
    const minimumNumberOfMutedLowestStrings : number = getSelectedNumberFromFormData(formData, 'minimumNumberOfMutedLowestStrings');
    const minimumNumberOfMutedHighestStrings : number = getSelectedNumberFromFormData(formData, 'minimumNumberOfMutedHighestStrings');
    
    const forbidTheSameNoteOnTheSameOctaveOnDifferentStringsInput = document.getElementById('forbidTheSameNoteOnTheSameOctaveOnDifferentStrings') as HTMLInputElement;
    const forbidTheSameNoteOnTheSameOctaveOnDifferentStrings : boolean = forbidTheSameNoteOnTheSameOctaveOnDifferentStringsInput.checked;            
    
    const lowestNoteAllowedNote : Note = getSelectedNote('lowestNoteAllowedNote');

    const lowestNoteAllowedOctave : number = getSelectedNumberFromFormData(formData, 'lowestNoteAllowedOctave');
    const highestNoteAllowedNote : Note = getSelectedNote('highestNoteAllowedNote');
    const highestNoteAllowedOctave : number = getSelectedNumberFromFormData(formData, 'highestNoteAllowedOctave');
    
    const hideChordVoicingsThatDoNotHaveAThirdOrAFifthInput = document.getElementById('hideChordVoicingsThatDoNotHaveAThirdOrAFifth') as HTMLInputElement;
    const hideChordVoicingsThatDoNotHaveAThirdOrAFifth : boolean = hideChordVoicingsThatDoNotHaveAThirdOrAFifthInput.checked;            


    const hideChordVoicingsWithb5Input = document.getElementById('hideChordVoicingsWithb5') as HTMLInputElement;
    const hideChordVoicingsWithsharp5Input = document.getElementById('hideChordVoicingsWithsharp5') as HTMLInputElement;
    const hideChordVoicingsWithb7Input = document.getElementById('hideChordVoicingsWithb7') as HTMLInputElement;
    const hideChordVoicingsWithAdd7Input = document.getElementById('hideChordVoicingsWithAdd7') as HTMLInputElement;
    const hideChordVoicingsWithb9Input = document.getElementById('hideChordVoicingsWithb9') as HTMLInputElement;
    const hideChordVoicingsWithAdd9Input = document.getElementById('hideChordVoicingsWithAdd9') as HTMLInputElement;
    const hideChordVoicingsWithb11Input = document.getElementById('hideChordVoicingsWithb11') as HTMLInputElement;
    const hideChordVoicingsWithAdd11Input = document.getElementById('hideChordVoicingsWithAdd11') as HTMLInputElement;
    const hideChordVoicingsWithb13Input = document.getElementById('hideChordVoicingsWithb13') as HTMLInputElement;
    const hideChordVoicingsWithAdd13Input = document.getElementById('hideChordVoicingsWithAdd13') as HTMLInputElement;

    const hideChordVoicingsWithb5 : boolean = hideChordVoicingsWithb5Input.checked;   
    const hideChordVoicingsWithsharp5 : boolean = hideChordVoicingsWithsharp5Input.checked;   
    const hideChordVoicingsWithb7 : boolean = hideChordVoicingsWithb7Input.checked;   
    const hideChordVoicingsWithAdd7 : boolean = hideChordVoicingsWithAdd7Input.checked;   
    const hideChordVoicingsWithb9 : boolean = hideChordVoicingsWithb9Input.checked;   
    const hideChordVoicingsWithAdd9 : boolean = hideChordVoicingsWithAdd9Input.checked;   
    const hideChordVoicingsWithb11 : boolean = hideChordVoicingsWithb11Input.checked;   
    const hideChordVoicingsWithAdd11 : boolean = hideChordVoicingsWithAdd11Input.checked;   
    const hideChordVoicingsWithb13 : boolean = hideChordVoicingsWithb13Input.checked;   
    const hideChordVoicingsWithAdd13 : boolean = hideChordVoicingsWithAdd13Input.checked;   

    console.log("hideChordVoicingsWithb5: " + hideChordVoicingsWithb5 );
    console.log("hideChordVoicingsWithsharp5: " + hideChordVoicingsWithsharp5 );
    console.log("hideChordVoicingsWithb7: " + hideChordVoicingsWithb7 );
    console.log("hideChordVoicingsWithAdd7: " + hideChordVoicingsWithAdd7 );
    console.log("hideChordVoicingsWithb9: " + hideChordVoicingsWithb9 );
    console.log("hideChordVoicingsWithAdd9: " + hideChordVoicingsWithAdd9 );
    console.log("hideChordVoicingsWithb11: " + hideChordVoicingsWithb11 );
    console.log("hideChordVoicingsWithAdd11: " + hideChordVoicingsWithAdd11 );
    console.log("hideChordVoicingsWithb13: " + hideChordVoicingsWithb13 );
    console.log("hideChordVoicingsWithAdd13: " + hideChordVoicingsWithAdd13 );


    ChordVoicingGenerator.generateAndDownloadChordVoicings(
        tuning,
        fretSpan,
        firstFretToScan,
        lastFretToScan,
        minimumSemitonesBetweenNotesOfTheVoicing,
        searchedKeys,
        allowedKeyRoots,
        minNumberOfDifferentNotes,
        maxNumberOfDifferentNotes,
        mustContainAtLeastThisManyOpenStrings,
        mustContainAtMostThisManyOpenStrings,
        minimumNumberOfMutedLowestStrings,
        minimumNumberOfMutedHighestStrings,
        forbidTheSameNoteOnTheSameOctaveOnDifferentStrings,
        new NoteAndOctave(lowestNoteAllowedNote, lowestNoteAllowedOctave),
        new NoteAndOctave(highestNoteAllowedNote, highestNoteAllowedOctave),
        hideChordVoicingsThatDoNotHaveAThirdOrAFifth,
        hideChordVoicingsWithb5,
        hideChordVoicingsWithsharp5,
        hideChordVoicingsWithb7,
        hideChordVoicingsWithAdd7,
        hideChordVoicingsWithb9,
        hideChordVoicingsWithAdd9,
        hideChordVoicingsWithb11,
        hideChordVoicingsWithAdd11,
        hideChordVoicingsWithb13,
        hideChordVoicingsWithAdd13  
    )

}
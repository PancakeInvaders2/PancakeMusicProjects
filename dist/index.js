import { EqualsUtils } from "./util/EqualsUtils.js";
import { ChordVoicingGenerator } from "./generators/ChordVoicingGenerator.js";
import { Tuning } from "./model/guitar/Tuning.js";
import { Key } from "./model/musictheory/Key.js";
import { Note } from "./model/musictheory/Note.js";
import { NoteAndOctave } from "./model/musictheory/NoteAndOctave.js";
window.restrictToInteger = function (input) {
    input.value = input.value.replace(/[^\d-]/g, ''); // Remove any characters that are not digits or minus sign
};
function populateTuning() {
    const tuningSelect = document.getElementById('tuning');
    const preselectedTuning = Tuning.STANDARD_7_STRING_GUITAR;
    Tuning.availableTunings.forEach(tuning => {
        const option = document.createElement('option');
        option.value = tuning.name;
        option.textContent = tuning.name;
        if (preselectedTuning.equals(tuning)) {
            option.selected = true;
        }
        tuningSelect.appendChild(option);
    });
}
function populateSearchedKeys() {
    const searchedKeysSelect = document.getElementById('searchedKeys');
    const preselectedKeys = [Key.AEOLIAN, Key.HARMONIC_MINOR];
    Key.availableKeysByName.forEach((key, keyname) => {
        const option = document.createElement('option');
        option.value = keyname;
        option.textContent = keyname;
        if (EqualsUtils.arrayContainsAnEqual(preselectedKeys, key)) {
            option.selected = true;
        }
        searchedKeysSelect.appendChild(option);
    });
}
function populateKeyRoots() {
    const allowedKeyRootsSelect = document.getElementById('allowedKeyRoots');
    const preselectedKeyRoots = [Note.E];
    for (let note of Note.values) {
        const option = document.createElement('option');
        option.value = "" + note.semitonesFromA;
        option.textContent = note.fullRepresentation();
        if (EqualsUtils.arrayContainsAnEqual(preselectedKeyRoots, note)) {
            option.selected = true;
        }
        allowedKeyRootsSelect.appendChild(option);
    }
}
function populateLowestNoteAllowedNote() {
    const allowedKeyRootsSelect = document.getElementById('lowestNoteAllowedNote');
    const preselectedNote = Note.E;
    for (let note of Note.values) {
        const option = document.createElement('option');
        option.value = "" + note.semitonesFromA;
        ;
        option.textContent = note.fullRepresentation();
        if (preselectedNote.equals(note)) {
            option.selected = true;
        }
        allowedKeyRootsSelect.appendChild(option);
    }
}
function populateHighestNoteAllowedNote() {
    const allowedKeyRootsSelect = document.getElementById('highestNoteAllowedNote');
    const preselectedNote = Note.E;
    for (let note of Note.values) {
        const option = document.createElement('option');
        option.value = "" + note.semitonesFromA;
        ;
        option.textContent = note.fullRepresentation();
        if (preselectedNote.equals(note)) {
            option.selected = true;
        }
        allowedKeyRootsSelect.appendChild(option);
    }
}
function configureMasterCheckbox() {
    // Get master checkbox
    const masterCheckbox = document.getElementById('masterCheckbox');
    ;
    // Get all checkboxes controlled by the master checkbox
    const chordCheckboxes = document.querySelectorAll('.chordCheckbox');
    // Add event listener to master checkbox
    masterCheckbox.addEventListener('change', function () {
        // Loop through all chord checkboxes
        chordCheckboxes.forEach(function (checkbox) {
            // Set the state of each checkbox to match the state of the master checkbox
            checkbox.checked = masterCheckbox.checked;
        });
    });
}
window.onload = function () {
    populateTuning();
    populateSearchedKeys();
    populateKeyRoots();
    populateLowestNoteAllowedNote();
    populateHighestNoteAllowedNote();
    configureMasterCheckbox();
};
function getSelectedKeysRoots() {
    const allowedKeyRoots = document.getElementById('allowedKeyRoots');
    const selectedAllowedKeyRoots = [];
    const options = allowedKeyRoots.options;
    for (let i = 0; i < options.length; i++) {
        let opt = options[i];
        if (opt.selected) {
            const semitonesFromA = parseInt(opt.value);
            const note = Note.noteBySemitonesFromA(semitonesFromA);
            selectedAllowedKeyRoots.push(note);
        }
    }
    return selectedAllowedKeyRoots;
}
function getSelectedKeys() {
    const searchedKeysSelect = document.getElementById('searchedKeys');
    const selectedKeys = [];
    const options = searchedKeysSelect.options;
    for (let i = 0; i < options.length; i++) {
        let opt = options[i];
        if (opt.selected) {
            selectedKeys.push(Key.getKeyByName(opt.value));
        }
    }
    return selectedKeys;
}
function getSelectedTuning() {
    const tuningSelect = document.getElementById('tuning');
    const selectedOption = tuningSelect.options[tuningSelect.selectedIndex];
    const selectedTuningName = selectedOption.value;
    return Tuning.getTuningByName(selectedTuningName); // Parse the JSON back to an object
}
function getSelectedNote(selectElementId) {
    const noteSelect = document.getElementById(selectElementId);
    const selectedOption = noteSelect.options[noteSelect.selectedIndex];
    const semitonesFromA = parseInt(selectedOption.value);
    const selectedNote = Note.noteBySemitonesFromA(semitonesFromA);
    return selectedNote;
}
function getSelectedNumberFromFormData(formData, inputElementId) {
    const numberInput = formData.get(inputElementId);
    const stringValue = numberInput.toString();
    const inputString = stringValue.trim(); // Trim whitespace
    const numericValue = parseInt(inputString); // Parse string to float
    if (!isNaN(numericValue)) { // TODO disallow non ints in the UI
        return numericValue;
    }
    else {
        return 0;
    }
}
window.generateVoicings = function () {
    const form = document.getElementById('chordVoicingGeneratorConfigForm');
    const formData = new FormData(form);
    // Extract form data
    const tuning = getSelectedTuning();
    const fretSpan = getSelectedNumberFromFormData(formData, 'fretSpan');
    const firstFretToScan = getSelectedNumberFromFormData(formData, 'firstFretToScan');
    const lastFretToScan = getSelectedNumberFromFormData(formData, 'lastFretToScan');
    const minimumSemitonesBetweenNotesOfTheVoicing = getSelectedNumberFromFormData(formData, 'minimumSemitonesBetweenNotesOfTheVoicing');
    const searchedKeys = getSelectedKeys();
    const allowedKeyRoots = getSelectedKeysRoots();
    const minNumberOfDifferentNotes = getSelectedNumberFromFormData(formData, 'minNumberOfDifferentNotes');
    const maxNumberOfDifferentNotes = getSelectedNumberFromFormData(formData, 'maxNumberOfDifferentNotes');
    const mustContainAtLeastThisManyOpenStrings = getSelectedNumberFromFormData(formData, 'mustContainAtLeastThisManyOpenStrings');
    const mustContainAtMostThisManyOpenStrings = getSelectedNumberFromFormData(formData, 'mustContainAtMostThisManyOpenStrings');
    const minimumNumberOfMutedLowestStrings = getSelectedNumberFromFormData(formData, 'minimumNumberOfMutedLowestStrings');
    const minimumNumberOfMutedHighestStrings = getSelectedNumberFromFormData(formData, 'minimumNumberOfMutedHighestStrings');
    const forbidTheSameNoteOnTheSameOctaveOnDifferentStringsInput = document.getElementById('forbidTheSameNoteOnTheSameOctaveOnDifferentStrings');
    const forbidTheSameNoteOnTheSameOctaveOnDifferentStrings = forbidTheSameNoteOnTheSameOctaveOnDifferentStringsInput.checked;
    const lowestNoteAllowedNote = getSelectedNote('lowestNoteAllowedNote');
    const lowestNoteAllowedOctave = getSelectedNumberFromFormData(formData, 'lowestNoteAllowedOctave');
    const highestNoteAllowedNote = getSelectedNote('highestNoteAllowedNote');
    const highestNoteAllowedOctave = getSelectedNumberFromFormData(formData, 'highestNoteAllowedOctave');
    const hideChordVoicingsThatDoNotHaveAThirdOrAFifthInput = document.getElementById('hideChordVoicingsThatDoNotHaveAThirdOrAFifth');
    const hideChordVoicingsThatDoNotHaveAThirdOrAFifth = hideChordVoicingsThatDoNotHaveAThirdOrAFifthInput.checked;
    const hideSusChordVoicingsInput = document.getElementById('hideSusChordVoicings');
    const hideChordVoicingsWithno5thInput = document.getElementById('hideChordVoicingsWithno5th');
    const hideChordVoicingsWithb5Input = document.getElementById('hideChordVoicingsWithb5');
    const hideChordVoicingsWithsharp5Input = document.getElementById('hideChordVoicingsWithsharp5');
    const hideChordVoicingsWithb7Input = document.getElementById('hideChordVoicingsWithb7');
    const hideChordVoicingsWithAdd7Input = document.getElementById('hideChordVoicingsWithAdd7');
    const hideChordVoicingsWithb9Input = document.getElementById('hideChordVoicingsWithb9');
    const hideChordVoicingsWithAdd9Input = document.getElementById('hideChordVoicingsWithAdd9');
    const hideChordVoicingsWithb11Input = document.getElementById('hideChordVoicingsWithb11');
    const hideChordVoicingsWithAdd11Input = document.getElementById('hideChordVoicingsWithAdd11');
    const hideChordVoicingsWithb13Input = document.getElementById('hideChordVoicingsWithb13');
    const hideChordVoicingsWithAdd13Input = document.getElementById('hideChordVoicingsWithAdd13');
    const hideSusChordVoicings = hideSusChordVoicingsInput.checked;
    const hideChordVoicingsWithno5th = hideChordVoicingsWithno5thInput.checked;
    const hideChordVoicingsWithb5 = hideChordVoicingsWithb5Input.checked;
    const hideChordVoicingsWithsharp5 = hideChordVoicingsWithsharp5Input.checked;
    const hideChordVoicingsWithb7 = hideChordVoicingsWithb7Input.checked;
    const hideChordVoicingsWithAdd7 = hideChordVoicingsWithAdd7Input.checked;
    const hideChordVoicingsWithb9 = hideChordVoicingsWithb9Input.checked;
    const hideChordVoicingsWithAdd9 = hideChordVoicingsWithAdd9Input.checked;
    const hideChordVoicingsWithb11 = hideChordVoicingsWithb11Input.checked;
    const hideChordVoicingsWithAdd11 = hideChordVoicingsWithAdd11Input.checked;
    const hideChordVoicingsWithb13 = hideChordVoicingsWithb13Input.checked;
    const hideChordVoicingsWithAdd13 = hideChordVoicingsWithAdd13Input.checked;
    ChordVoicingGenerator.generateAndDownloadChordVoicings(tuning, fretSpan, firstFretToScan, lastFretToScan, minimumSemitonesBetweenNotesOfTheVoicing, searchedKeys, allowedKeyRoots, minNumberOfDifferentNotes, maxNumberOfDifferentNotes, mustContainAtLeastThisManyOpenStrings, mustContainAtMostThisManyOpenStrings, minimumNumberOfMutedLowestStrings, minimumNumberOfMutedHighestStrings, forbidTheSameNoteOnTheSameOctaveOnDifferentStrings, new NoteAndOctave(lowestNoteAllowedNote, lowestNoteAllowedOctave), new NoteAndOctave(highestNoteAllowedNote, highestNoteAllowedOctave), hideChordVoicingsThatDoNotHaveAThirdOrAFifth, hideSusChordVoicings, hideChordVoicingsWithno5th, hideChordVoicingsWithb5, hideChordVoicingsWithsharp5, hideChordVoicingsWithb7, hideChordVoicingsWithAdd7, hideChordVoicingsWithb9, hideChordVoicingsWithAdd9, hideChordVoicingsWithb11, hideChordVoicingsWithAdd11, hideChordVoicingsWithb13, hideChordVoicingsWithAdd13);
};

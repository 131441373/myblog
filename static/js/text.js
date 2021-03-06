function iftab(editor, e) {
    if (e.keyCode == 9) {
        e.preventDefault();
        insertText(editor, '  ');//'\t');
    }
}
function insertText(obj,str) {
    if (document.selection) {
        var sel = document.selection.createRange();
        sel.text = str;
    }
    else if (typeof obj.selectionStart === 'number' && typeof obj.selectionEnd === 'number') {
        var startPos = obj.selectionStart,
            endPos = obj.selectionEnd,
            cursorPos = startPos,
            tmpStr = obj.value;
        obj.value = tmpStr.substring(0, startPos) + str + tmpStr.substring(endPos, tmpStr.length);
        cursorPos += str.length;
        obj.selectionStart = obj.selectionEnd = cursorPos;
    }
    else {
        obj.value += str;
    }
}

function ifenter(folder, e) {
    if (e.keyCode == 13) {
        e.preventDefault();
        mkdir();
    }
}
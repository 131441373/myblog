function changemode(button) {
    var frame = document.getElementById("content").children[0];
    var editor = document.getElementById("content").children[1];
    if (editor.style.display == 'none') {
        frame.style.display = 'none';
        editor.style.display = 'block';
        button.innerHTML = '不保存';
    }
    else {
        frame.style.display = 'block';
        editor.style.display = 'none';
        button.innerHTML = '修改';
    }
}
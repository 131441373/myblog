var last;

function plusminus(button, tar) {
    if (flag == 1) {
        alert('请先确定是否保存');
        return;
    }
    var target = document.getElementById(tar);
    if (target.style.display != "none") {
        target.style.display = "none";
        button.firstChild.innerHTML = '+';
    }
    else {
        target.style.display = "block";
        button.firstChild.innerHTML = '-';
    }
    if (last != undefined) last.style.background = "rgb(245, 245, 245)";
    button.style.background = "rgb(116, 236, 216)";
    last = button;

    $('#frame').attr('src','/article/' + tar);
}
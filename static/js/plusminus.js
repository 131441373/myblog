function plusminus(button, tar) {
    loaded = 0;
    if (flag == 1) {
        alert('请先确定是否保存');
        return;
    }
    var target = document.getElementById(tar);
    if (target.style.display != "none") {
        target.style.display = "none";
        button.firstChild.innerHTML = '+';
        button.style.background = "rgb(245, 245, 245)";
    }
    else {
        target.style.display = "block";
        button.firstChild.innerHTML = '-';
        button.style.background = "rgb(116, 236, 216)";
    }

    $('#frame').attr('src','/article/' + tar);
}
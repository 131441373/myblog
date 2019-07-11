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
    if (last != undefined) {
        last.style.background = "rgb(245, 245, 245)";
        last.removeChild(last.children[1]);
    }
    button.style.background = "rgb(116, 236, 216)";
    var node = document.createElement('span');
    node.style.float = "right";
    node.innerHTML = "^";
    node.onclick = function() { $('#dirbox').css('display','block'); }
    button.appendChild(node);
    last = button;

    $('#frame').attr('src','/article/' + tar);
}
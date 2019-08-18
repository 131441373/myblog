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
        last.nextSibling.remove();
    }
    button.style.background = "rgb(116, 236, 216)";
    var node = document.createElement('button');
    node.style.float = "right";
    node.style.display = "inline";
    node.innerHTML = "^";
    node.onclick = function() {
        $('#dirbox').css('display','block');
        if (this.nextSibling.style.display=="none") {
            target.style.display = "block";
            button.firstChild.innerHTML = '-';
        }
        $('#dirname').focus();
    }
    button.after(node);
    last = button;

    tar = tar.replace(/\+/g,'_PlUs_');
    $('#frame').attr('src','/article/' + tar);
    cancel();
}
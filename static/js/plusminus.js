function plusminus(button, tar) {
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

    var disp = document.getElementById("content");
    disp.children[0].src = '/' + tar.replace(/_/g,'/') + '/' + 'index.html';
    disp.children[1].value = '/' + tar.replace(/_/g,'/') + '/' + 'index.md';
    disp.children[0].style.display = "block"
    disp.children[1].style.display = "none"
}
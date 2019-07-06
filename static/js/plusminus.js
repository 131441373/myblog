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
}
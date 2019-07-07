var flag = 0;

function changemode(button) {
    if ($('#editor').css('display') == 'none') {
        $('#frame').css('display','none');
        $('#editor').css('display','block');
        $('#editor').load(frame.src.replace(/html/,'md'));
        button.innerHTML = '不保存';
        flag = 1;
    }
    else {
        $('#frame').css('display','block');
        $('#editor').css('display','none');
        button.innerHTML = '修改';
        flag = 0;
    }
}
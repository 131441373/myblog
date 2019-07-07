var flag = 0;

function changemode() {
    if ($('#editor').css('display') == 'none') {
        $('#frame').css('display','none');
        $('#editor').css('display','block');
        $('#save').css('display','block');
        $('#editor').load(frame.src.replace(/html/,'md'));
        $('#mdf').html('不保存');
        flag = 1;
    }
    else {
        $('#frame').css('display','block');
        $('#editor').css('display','none');
        $('#save').css('display','none');
        $('#mdf').html('修改');
        flag = 0;
    }
}
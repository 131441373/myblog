function cancel() {
    $('#dirname').val('');
    $('#dirbox').css('display','none');
}

function mkdir() {
    var str = $('#frame').attr('src').replace(/\/article\//,'');
    $.post('/mkdir/'+str, $('#diropr').serialize(),function(ret){
        if (ret.status == 'N') alert('文件名重复');
        else {
            str = str.replace(/_PlUs_/g,'\\+'); // 注意转义符，否则选择器对+有别的理解
            $('#'+str).append(ret.content);
            cancel();
        }
    },'JSON');
}

function rmdir() {
    if (confirm("谨慎！确定要删除吗?")==true) {
        var str = $('#frame').attr('src').replace(/\/article\//,'');
        $.post('/rmdir/'+str, $('#diropr').serialize(),function(){
            str = str.replace(/_PlUs_/g,'\\+'); // 注意转义符，否则选择器对+有别的理解
            $('#'+str).parent().remove(); // parent是<dd>
        });
        cancel();
    }
}

function rename() {
    if (confirm("由于制作者太菜，这个操作需要刷新页面，确认继续?")==true) {
        var str = $('#frame').attr('src').replace(/\/article\//,'');
        $.post('/rename/'+str, $('#diropr').serialize(),function(ret){
            if (ret.status == 'N') alert('文件名重复');
            else location.reload();
        },'JSON');
    }
}
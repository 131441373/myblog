function cancel() {
    $('#dirname').val('');
    $('#dirbox').css('display','none');
}

function mkdir() {
    var str = $('#frame').attr('src').replace(/\/article\//,'');
    $.post('/mkdir/'+str, $('#diropr').serialize(),function(ret){
        if (ret.status == 'N') alert('文件名重复');
        else $('#'+str).append(ret.content);
    },'JSON');
    cancel();
}

function rmdir() {
    if (confirm("谨慎！确定要删除吗?")==true) {
        var str = $('#frame').attr('src').replace(/\/article\//,'');
        $.post('/rmdir/'+str, $('#diropr').serialize(),function(){
            $('#'+str).parent().remove()
        });
        cancel();
    }
}

function rename() {
    if (confirm("由于制作者太菜，这个操作需要刷新页面，确认继续?")==true) {
        var str = $('#frame').attr('src').replace(/\/article\//,'');
        $.post('/rename/'+str, $('#diropr').serialize(),function(){
        });
        location.reload();
    }
}
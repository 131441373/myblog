function cancel() {
    $('#dirname').val('');
    $('#dirbox').css('display','none');
}

function mkdir() {
    var str = $('#frame').attr('src').replace(/\/article\//,'');
    $.post('/mkdir/'+str, $('#mkdir').serialize(),function(ret){
        if (ret.status == 'N') alert('文件名重复');
        else $('#'+str).append(ret.content);
    },'JSON');
    cancel();
}
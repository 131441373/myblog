function cancel() {
    $('#dirname').val('');
    $('#dirbox').css('display','none');
}

function mkdir() {
    var str = $('#frame').attr('src').replace(/\/article\//,'');
    $.post('/mkdir/'+str, $('#mkdir').serialize(),function(ret){
        $('#'+str).append(ret.content);
    },'JSON');
    cancel();
}
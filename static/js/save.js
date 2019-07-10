function save() {
    $('#frame').css('display','block');
    $('#editor').css('display','none');
    $('#savebutton').css('display','none');
    $('#mdf').html('修改');
    var str = '/save/' + $('#frame').attr('src').replace(/\/article\//,'');
    $.post(str, $('#mdfile').serialize(),function(ret){
        $('#frame').attr('src', ret.path);
    },'JSON');
    flag = 0;
}
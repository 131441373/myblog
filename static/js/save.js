function save() {
    $('#frame').css('display','block');
    $('#editor').css('display','none');
    $('#savebutton').css('display','none');
    $('#mdf').html('修改');
    $('#mdfile').attr('action','/save/' + $('#frame').attr('src').replace(/\//g,'_'))
    flag = 0;
}
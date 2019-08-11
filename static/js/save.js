function save() {
    $('#frame').css('display','block');
    $('#editor').css('display','none');
    $('#savebutton').css('display','none');
    $('#mdf').html('修改');
    var str = $('#frame').attr('src').replace(/\/article\//,'');
    $.post('/save/' + str, $('#mdfile').serialize(),function(ret){
        $('#frame').attr('src', '/article/'+ret.path.replace(/\+/g,'_PlUs_'));
        str = str.replace(/_PlUs_/g,'\\+'); // 注意转义符，否则选择器对+有别的理解
        $('#'+str).prev().prev().attr('onclick',"plusminus(this,\'"+ret.path+"\')");//跳过button改<p>
        $('#'+str).attr('id', ret.path);
    },'JSON');
    flag = 0;
}
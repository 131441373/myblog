var flag = 0;

function changemode() {
    if ($('#frame').attr('src') == "/static/documents/index.html") return;
    if ($('#editor').css('display') == 'none') {
        $('#frame').css('display','none');
        $('#editor').css('display','block');
        $('#savebutton').css('display','block');
        var str = frame.src.replace(/\/article/,'').replace(/_/g,'/') + '.md';
        $("#editor").load(str,function(responseTxt,statusTxt,xhr){
            if (statusTxt == "success")//必须加载完callback再设
                document.getElementById('editor').value=
                document.getElementById('editor').defaultValue=
                document.getElementById('editor').textContent=
                document.getElementById('editor').innerHTML; //经测试innerHTML反而没过滤html标签
            else
                alert("Error: "+xhr.status+": "+xhr.statusText);
        });
        $('#mdf').html('不保存');
        flag = 1;
    }
    else {
        $('#frame').css('display','block');
        $('#editor').css('display','none');
        document.getElementById("savebutton").style.display="none";
        $('#mdf').html('修改');
        flag = 0;
    }
}
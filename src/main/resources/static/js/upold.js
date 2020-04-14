function shan(){
    $("#shanchu").hide();
    $("#uploadProgress").show();
    $("#fileImg").show();
    $("#url").val("");
    $("#label").text("0%");
    $("#upload").width("0%");

}

$(function () {
    $('#fileImg').on("click",function () {
        $('#file2').trigger("click")
    })
})

$(document).ready(function () {
    $("#file2").change(function () {
        createUploadFile();
    });
});
function createUploadFile() {
    var formData = new FormData();
    var file = $('#file2')[0].files[0];
    formData.append('file',file);

    var fd = new FormData();
    fd.append("file", file);

    var xhr = new XMLHttpRequest();
    var url = "/fileUploadShop/upload";

    xhr.open("POST", url, true);
    var elem = document.getElementById("upload");
    var width = 0;

    var reader = null;
    if (FileReader) {
        reader = new FileReader();
    }
    else {
        alert("不支持");
    }
    reader.readAsText(document.getElementById("file2").files[0]);
    var max = document.getElementById("file2").files[0].size;

    //进度条部分
    xhr.upload.onprogress = function (evt) {
        if (evt.lengthComputable) {
            elem.style.width = evt.loaded/max*100 + '%';
            document.getElementById("label").innerHTML = parseInt(evt.loaded/max*100)+ '%';
        }
    };
    xhr.send(fd);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            $.modal.alert("成功！");
            var responseText =JSON.parse(xhr.responseText);
            $("#urls").val(responseText.imgPath);
            $("#url").val(responseText.imgPath);
            $("#wenjian").html(responseText.imgPath);
            $("#shanchu").show();
            $("#uploadProgress").hide();
            $("#fileImg").hide();
        }
    }


}
///////////////////////////////////////
//与服务器请求数据时的ajax部分
//回传数据为json格式的字符串 jsonData中为转换后的json数组
//如需在其他位置使用时请设为全局变量
//上传数据部分暂未完成测试
//kagaya 2018年2月1日
//////////////////////////////////////
const uploadURL = "upload.php";
const downloadURL = "download.php";

function showData(Lng, Lat, Ref = false) {
    var jsonData;//可设为全局变量
    if (Ref == true) {//清空表
        $(".nearby-data").empty();
        return;
    }

    // xmlhttp = getXMLHttpRequest();

    $.ajax({
        url: downloadURL,        
        type: "get",
        dataType: "json",
        async: true,
        data: "Longitude="+Lng+"&Latitude="+Lat,
        success: function(data,state){
            $(".nearby-data").empty();
            jsonData = eval(data);      //将data字符串转换为json数组            
            $(".nearby-data").append("<tr><th>UID</th><th>Uname</th><th>Note</th><th>Lng</th><th>Lat</th><th>Alt</th><th>Time</th></tr>");
            
            //将数据插入地图时只需要遍历jsonData 替换下面这段代码

            //
            $.each(jsonData,function(index,elem){
                $(".nearby-data").append("<tr>");
                $(".nearby-data").append("<td>" + jsonData[index].UID + "</td>");
                $(".nearby-data").append("<td>" + jsonData[index].Uname + "</td>");
                $(".nearby-data").append("<td>" + jsonData[index].Note + "</td>");
                $(".nearby-data").append("<td>" + jsonData[index].Lng + "</td>");
                $(".nearby-data").append("<td>" + jsonData[index].Lat + "</td>");
                $(".nearby-data").append("<td>" + jsonData[index].Alt + "</td>");
                $(".nearby-data").append("<td>" + jsonData[index].Time + "</td>");
                $(".nearby-data").append("</tr>");
            })
            //        
        },
        error: function (XMLHttpRequest, textStatus, errorThrown){
            $(".nearby-data").append("<tr><td>status:" + XMLHttpRequest.status + "</td><td>" + textStatus + "</td></tr>");    
        }
    })

    
    // xmlhttp.open("GET", downloadURL + "?Longitude=" + Lng + "&Latitude=" + Lat + "&sid=" + Math.random(), true);
    // xmlhttp.send();
}

//暂未测试
function uploadData(UID, Uname, Note, Lng, Lat, Alt) {
    var xmlhttp;
    var data = "?UID=" + UID + "&Uname=" + Uname + "&Note=" + Note + "&Lng=" + Lon + "&Lat=" + Lat + "&Alt=" + Alt;
    xmlhttp = getXMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            document.getElementById("upload-result").innerHTML = xmlhttp.responseText;
        }
    }
    xmlhttp.open("POST", uploadURL, true);
    xmlhttp.send(data);
}
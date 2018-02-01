const uploadURL = "upload.php";
const downloadURL = "download.php";

// function getXMLHttpRequest() {
//     var xmlhttp;
//     if (window.XMLHttpRequest) {
//         // IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
//         xmlhttp = new XMLHttpRequest();
//     }
//     else {
//         // IE6, IE5 浏览器执行代码
//         xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
//     }

//     return xmlhttp;
// }

function showData(Lng, Lat, Ref = false) {
    // var xmlhttp;
    var jsonData;
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
        },
        error: function (XMLHttpRequest, textStatus, errorThrown){
            $(".nearby-data").append("<tr><td>status:" + XMLHttpRequest.status + "</td><td>" + textStatus + "</td></tr>");    
        }
    })

    
    // xmlhttp.open("GET", downloadURL + "?Longitude=" + Lng + "&Latitude=" + Lat + "&sid=" + Math.random(), true);
    // xmlhttp.send();
}

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
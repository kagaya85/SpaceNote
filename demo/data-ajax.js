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
        data: "Longitude=Lng&Latitude=Lat",
        success: function(data){
            $(".nearby-data").empty();
            jsonData = eval(data);      //将data字符串转换为json数组            
            $.each(jsonData,function(index,elem){
                $(".nearby-data").append("<tr>");
                $(".nearby-data").append("<td>" + jsonData[index].UID + "</td>");
                $(".nearby-data").append("<td>" + jsonData[index].Uname + "</td>");
                $(".nearby-data").append("<td>" + jsonData[index].Note + "</td>");
                $(".nearby-data").append("<td>" + jsonData[index].Lng + "</td>");
                $(".nearby-data").append("<td>" + jsonData[index].Lat + "</td>");
                $(".nearby-data").append("<td>" + jsonData[index].Alt + "</td>");
                $(".nearby-data").append("<td>" + jsonData[index].Time + "</td>");
                $(".nearby-data").append("</td>");
            })
            
        }
    })

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            //content = "";
            alert(xmlhttp.responseXML)
            item = xmlhttp.response.documentElement.getElementsByTagName("ITEM");
            for (let i = 0; i < data.length; i++) {//循环输出每行
                content += "<tr>"
                elem = item[i].getElementsByTagName("UID");
                try {
                    content += "<td>"+elem[0].firstChild.nodeValue+"</td>";
                } catch (error) {
                    content += "<td>"+"</td>";                    
                }
                elem = item[i].getElementsByTagName("Uname");
                try {
                    content += "<td>"+elem[0].firstChild.nodeValue+"</td>";
                } catch (error) {
                    content += "<td>"+"</td>";                    
                }
                elem = item[i].getElementsByTagName("Note");
                try {
                    content += "<td>"+elem[0].firstChild.nodeValue+"</td>";
                } catch (error) {
                    content += "<td>"+"</td>";                    
                }
                elem = item[i].getElementsByTagName("Longitude");
                try {
                    content += "<td>"+elem[0].firstChild.nodeValue+"</td>";
                } catch (error) {
                    content += "<td>"+"</td>";                    
                }
                elem = item[i].getElementsByTagName("Latitude");
                try {
                    content += "<td>"+elem[0].firstChild.nodeValue+"</td>";
                } catch (error) {
                    content += "<td>"+"</td>";                    
                }
                elem = item[i].getElementsByTagName("Altitude");
                try {
                    content += "<td>"+elem[0].firstChild.nodeValue+"</td>";
                } catch (error) {
                    content += "<td>"+"</td>";                    
                }
                elem = item[i].getElementsByTagName("Time");
                try {
                    content += "<td>"+elem[0].firstChild.nodeValue+"</td>";
                } catch (error) {
                    content += "<td>"+"</td>";                    
                }
            content += "</tr>";         
            }//end of for
            document.getElementById("nearby-data").innerHTML = content;
        }
    }
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
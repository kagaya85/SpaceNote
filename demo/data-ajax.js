const uploadURL = "upload.php";
const downloadURL = "download.php";

function getXMLHttpRequest() {
    var xmlhttp;
    if (window.XMLHttpRequest) {
        // IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
        xmlhttp = new XMLHttpRequest();
    }
    else {
        // IE6, IE5 浏览器执行代码
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    return xmlhttp;
}

function showData(Lng, Lat, Ref = false) {
    var xmlhttp;
    var item, elem;
    var content = "", url = "sever-demo.php?Logitude=";
    if (Ref == true) {//清空表
        document.getElementById("nearby-data").innerHTML = "";
        return;
    }

    xmlhttp = getXMLHttpRequest();

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
    xmlhttp.open("GET", downloadURL + "?Longitude=" + Lng + "&Latitude=" + Lat + "&sid=" + Math.random(), true);
    xmlhttp.send();
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
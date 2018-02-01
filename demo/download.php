<?php
require_once("spaceNote.php");

define('Range', '1');

$SN = new spaceNote();

if($_SERVER['REQUEST_METHOD']=='GET'){
    echo "get request from client<br>";
    echo "Longitude=".$_GET['Longitude']."Latirude=".$_GET['Latitude']."<br>";
    $SN->loadData($_GET['Longitude']-Range,$_GET['Longitude']+Range,$_GET['Latitude']-Range,$_GET['Latitude']+Range);
    echo "loadData OK<br>";
}

?>
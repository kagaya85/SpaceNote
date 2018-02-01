<?php
require_once("spaceNote.php");

define('Range', '1');

$SN = new spaceNote();

if($_SERVER['REQUEST_METHOD']=='GET'){
    $SN->loadData($_GET['Longitude']-Range,$_GET['Longitude']+Range,$_GET['Latitude']-Range,$_GET['Latitude']+Range);
}

?>
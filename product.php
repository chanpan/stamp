<?php 
    // var_dump($_GET);
    $widthCM = $_GET['widthCM']; 
    $heightCM = $_GET['heightCM'];
    $type = $_GET['type'];
    $endpoint = 'http://backend.stamp.local/product/api2';
    $params = ['widthCM'=>$widthCM,'heightCM'=>$heightCM,'type'=>$type];
    $url = $endpoint . '?' . http_build_query($params);
    curl_setopt($ch, CURLOPT_URL, $url);
?>
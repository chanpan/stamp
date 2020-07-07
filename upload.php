<?php 
    $storagePath = 'http://stampeditor.local/images/';
    // print_r($_FILES);
    $fileTmpPath = $_FILES['file']['tmp_name'];
    $fileName = $_FILES['file']['name'];
    $fileSize = $_FILES['file']['size'];
    $fileType = $_FILES['file']['type'];
    $fileNameCmps = explode(".", $fileName);
    $fileExtension = strtolower(end($fileNameCmps));
    $newFileName = md5(time() . $fileName) . '.' . $fileExtension;
    $allowedfileExtensions = array('jpg', 'gif', 'png','jpeg');
    if (in_array($fileExtension, $allowedfileExtensions)) {
        $uploadFileDir = './images/custom/';
        $dest_path = $uploadFileDir . $newFileName;
        if(move_uploaded_file($fileTmpPath, $dest_path))
        {
            $message =[
                        'storagePath'=>$storagePath,
                        'clipartName'=> $newFileName,
                        'clipartFile'=> "custom/".$newFileName,
                        'xSize'=> 216.66,
                        'ySize'=> 244.25,
                        'r'=> 133.33,
                        'rx'=> 136.234,
                        'ry'=> 136.973,
                    ];
        }else
        {
            $message = 'There was some error moving the file to upload directory. Please make sure the upload directory is writable by web server.';
        }
    }
    echo json_encode($message);
?>
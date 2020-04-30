<?php 
    $request_body = file_get_contents('php://input');
    $post = json_decode($request_body);
    $storagePath = 'http://stampeditor.local/images/';

    $data = [];
    // print_r($post->categoryName);exit();

    $categoryName = $post->categoryName; //$post['categoryName'];

    if($categoryName == 'Animals'){
        $data=[
            'd'=>[
                '__type'=> "StampmakerCore.ClipartCategoryNames", 
                'categoryName'=> "Animals",  
                'clipartPreviewImageURL'=> "http://stampeditor.local/images/",
                'clipartLayoutImageURL'=>"http://stampeditor.local/images/",
                'clipartNames'=> [ 
                    [
                        'clipartName'=> "Animals-043",
                        'clipartFile'=> "Animals/Animals-043.svg",
                        'xSize'=> 121.9,
                        'ySize'=> 93.02,
                        'r'=> 69.635,
                        'rx'=> 78.126,
                        'ry'=> 61.618,
                    ],
                    [
                        'clipartName'=> "Animals-044",
                        'clipartFile'=> "Animals/Animals-044.svg",
                        'xSize'=> 122.66,
                        'ySize'=> 106.59,
                        'r'=> 70.328,
                        'rx'=> 77.209,
                        'ry'=> 64.516,
                    ],
                    [
                        'clipartName'=> "Animals-045",
                        'clipartFile'=> "Animals/Animals-045.svg",
                        'xSize'=> 125.07,
                        'ySize'=> 101.36,
                        'r'=> 70.178,
                        'rx'=> 78.182,
                        'ry'=> 63.404,
                    ],
                    [
                        'clipartName'=> "Animals-046",
                        'clipartFile'=> "Animals/Animals-046.svg",
                        'xSize'=> 135.23,
                        'ySize'=> 106.36,
                        'r'=> 72.498,
                        'rx'=> 81.474,
                        'ry'=> 65.181,
                    ],
                    [
                        'clipartName'=> "Animals-047",
                        'clipartFile'=> "Animals/Animals-047.svg",
                        'xSize'=> 101.16,
                        'ySize'=> 123.22,
                        'r'=> 69.354,
                        'rx'=> 56.653,
                        'ry'=> 77.676,
                    ],
    
    
                ]
            ]
        ];
    }else if($categoryName == 'Arrows'){
        $data=[
            'd'=>[
                '__type'=> "StampmakerCore.ClipartCategoryNames", 
                'categoryName'=> "Arrows",  
                'clipartPreviewImageURL'=> "http://stampeditor.local/images/",
                'clipartLayoutImageURL'=>"http://stampeditor.local/images/",
                'clipartNames'=> [ 
                    [
                        'clipartName'=> "Arrows-001",
                        'clipartFile'=> "Animals/Arrows-001.svg",
                        'xSize'=> 73.19,
                        'ySize'=> 84.52,
                        'r'=> 55.317,
                        'rx'=> 50.912,
                        'ry'=> 59.397,
                    ],
                    [
                        'clipartName'=> "Arrows-002",
                        'clipartFile'=> "Animals/Arrows-002.svg",
                        'xSize'=> 90.08,
                        'ySize'=> 84.52,
                        'r'=> 50.478,
                        'rx'=> 54.32,
                        'ry'=> 52.825,
                    ]
                ]
            ]
        ];
    }else if($categoryName == 'Basic Recycling'){
        $data=[
            'd'=>[
                '__type'=> "StampmakerCore.ClipartCategoryNames", 
                'categoryName'=> "Basic Recycling",  
                'clipartPreviewImageURL'=> $storagePath,
                'clipartLayoutImageURL'=>$storagePath,
                'clipartNames'=> [ 
                    [
                        'clipartName'=> "BasicRecycling-001",
                        'clipartFile'=> "Animals/BasicRecycling-001.svg",
                        'xSize'=> 72.64,
                        'ySize'=> 82.92,
                        'r'=> 49.649,
                        'rx'=> 39.598,
                        'ry'=> 54.209,
                    ],
                    [
                        'clipartName'=> "BasicRecycling-002",
                        'clipartFile'=> "Animals/BasicRecycling-002.svg",
                        'xSize'=> 70.53,
                        'ySize'=> 68.5,
                        'r'=> 38.897,
                        'rx'=> 38.556,
                        'ry'=> 38.024,
                    ]
                ]
            ]
        ];
    }else if($categoryName == 'Beach & Summer'){
        $data=[
            'd'=>[
                '__type'=> "StampmakerCore.ClipartCategoryNames", 
                'categoryName'=> "Beach & Summer",  
                'clipartPreviewImageURL'=> $storagePath,
                'clipartLayoutImageURL'=>$storagePath,
                'clipartNames'=> [ 
                    [
                        'clipartName'=> "Beach-001",
                        'clipartFile'=> "Animals/Beach-001.svg",
                        'xSize'=> 216.66,
                        'ySize'=> 244.25,
                        'r'=> 133.33,
                        'rx'=> 136.234,
                        'ry'=> 136.973,
                    ]
                ]
            ]
        ];
    }
    

    echo json_encode($data);
?>
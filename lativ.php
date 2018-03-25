<?php
//请求类型
$type = $_REQUEST['type'];


//商品ID

//var_dump($menData[1]->info);

//echo $newdata;


switch ($type){

        //分类
        case 'category';
        //请求分类名字
        $name = strtoupper($_REQUEST['name']);
        //请求分类页数
        $page = $_REQUEST['page'];
        $url='https://www.lativ.com/Product/GetNewProductCategoryList?MainCategory='.$name.'&pageIndex='.$page.'&cacheID=8636';
            $html = file_get_contents($url);
            echo($html) ;
        break;

        //商品详情
        case 'MEN';
            $dataJSON = file_get_contents('data/Men.json');
            $newdata = json_encode($dataJSON,true);
            $index = $_REQUEST['id'];
            echo $newdata;
            break;
    case 'WOMEN';
        $dataJSON = file_get_contents('data/Women.json');
        $newdata = json_encode($dataJSON,true);
        $index = $_REQUEST['id'];
        echo $newdata;
        break;
    case 'BABY';
        $dataJSON = file_get_contents('data/Baby.json');
        $newdata = json_encode($dataJSON,true);
        $index = $_REQUEST['id'];
        echo $newdata;
        break;
    case 'KIDS';
        $dataJSON = file_get_contents('data/Kids');
        $newdata = json_encode($dataJSON,true);
        $index = $_REQUEST['id'];
        echo $newdata;
        break;
    case 'SPORTS';
        $dataJSON = file_get_contents('data/Sport.json');
        $newdata = json_encode($dataJSON,true);
        $index = $_REQUEST['id'];
        echo $newdata;
        break;
        case 'test';
            $url= 'https://www.lativ.com/';
        break;


}





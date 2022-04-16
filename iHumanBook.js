/*
unlock vip by saymiss
[rewrite_local]
# 洪恩(双语绘本、数学、儿童英语)
^https:\/\/.*\.ihuman\.com\/.*\/(get_user_info|get_purchase_list|get_products|data_crud|getRadical) url script-response-body https://raw.githubusercontent.com/Jockio/Shopping/main/iHumanBook.js
[mitm]
*.ihuman.com
*/

var url = $request.url;

if (url.indexOf("bookapi") != -1){
    console.log('双语绘本破解开始');
    body = $response.body.replace(/"vip_status":\{[^}]+\}/g, "\"vip_status\":\{\"last_product_id\":\"com\.ihuman\.book\.sub\.vip1y\",\"vip_type\":1,\"expire_time\":9876543210\}");
}

if (url.indexOf("mathapi") != -1){
    console.log('数学破解开始');
    body = $response.body.replace(/"vip":\{[^}]+\}/g, "\"vip\":\{\"expire_time\":9876543210,\"vip_type\":1,\"legacy_product_id\":\"com\.ihuman\.imath\.cons\.vip1y\"\}");
}

// 星星无限，可随意换装扮
if (url.indexOf("engapi") != -1){
    console.log('英语破解开始');
    body = $response.body.replace(/"vip":\{[^}]+\}/g, "\"vip\":\{\"expire_time\":9876543210,\"vip_type\":3,\"last_product_id\":\"com\.ihuman\.english\.cons\.vip1y\"\}").replace(/"expire_at":\d+/g, "\"expire_at\":9876543210").replace(/"redeemed":\d/g, "\"redeemed\":1").replace(/coin":\d+/g, "coin\":9999999");
}

var obj = JSON.parse($response.body || '{}');
if (obj.result && url.indexOf("shizibook") != -1 && url.indexOf("getRadical") != -1){
    console.log(`识字破解开始`);
    for (var i = 0; i < obj.result.length; i++) {
        obj.result[i].isvip = 0;
    }
    console.log(obj);
    $done({body: JSON.stringify(obj)});
    return;
}

$done({body});

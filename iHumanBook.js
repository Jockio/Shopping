/*
unlock vip by saymiss
[rewrite_local]
# 洪恩(双语绘本、数学、儿童英语)
^https:\/\/.*\.ihuman\.com\/.*\/(get_user_info|get_purchase_list|get_products|data_crud|getRadical) url script-response-body Shopping/iHumanBook.js
[mitm]
*.ihuman.com
*/

var url = $request.url;

if (url.indexOf("bookapi") != -1){
body = $response.body.replace(/"vip_status":\{[^}]+\}/g, "\"vip_status\":\{\"last_product_id\":\"com\.ihuman\.book\.sub\.vip1y\",\"vip_type\":1,\"expire_time\":9876543210\}");
}

if (url.indexOf("mathapi") != -1){
body = $response.body.replace(/"vip":\{[^}]+\}/g, "\"vip\":\{\"expire_time\":9876543210,\"vip_type\":1,\"legacy_product_id\":\"com\.ihuman\.imath\.cons\.vip1y\"\}");
}

// 星星无限，可随意换装扮
if (url.indexOf("engapi") != -1){
body = $response.body.replace(/"vip":\{[^}]+\}/g, "\"vip\":\{\"expire_time\":9876543210,\"vip_type\":3,\"last_product_id\":\"com\.ihuman\.english\.cons\.vip1y\"\}").replace(/"expire_at":\d+/g, "\"expire_at\":9876543210").replace(/"redeemed":\d/g, "\"redeemed\":1").replace(/coin":\d+/g, "coin\":9999999");
}

if (url.indexOf("shizibook") != -1 && url.indexOf("getRadical") != -1){
	body = $response.body.replaceAll(/"isvip"\s*:\s*\d+/g, "\"isvip\" : 0");
}

$done({body});

/*
unlock vip by saymiss
[rewrite_local]
# 洪恩(双语绘本、数学、儿童英语)
^https:\/\/.*\.ihuman\.com\/.*\/(get_user_info|get_purchase_list|get_products|data_crud|getRadical) url script-response-body https://raw.githubusercontent.com/Jockio/Shopping/main/iHumanBook.js
[mitm]
*.ihuman.com
*/

var url = $request.url;

var obj = JSON.parse($response.body || '{}');
if (obj.result && url.indexOf("shizibook") != -1 && url.indexOf("getRadical") != -1){
	for (var i = 0; i < obj.result.length; i++) {
		obj.result[i].isvip = 0;
	}
}

$done({body: JSON.stringify(obj)});

(function(){

var smartphone = 'sp.nicovideo.jp' == location.hostname;
if (smartphone)
{
	document.open();
	document.write('<a href="https://www.nicovideo.jp/my/top">PCページ</a>で実行してください');
	document.close();
	return;
}
if ('www.nicovideo.jp' != location.hostname)
{
	document.open();
	document.write('<a href="https://www.nicovideo.jp/my/top">ニコニコ動画</a>を開いた状態で実行してください');
	document.close();
	return;
}

var output = '<!DOCTYPE html><html><head><script>\n';

output += 'var DAYS=0,jsons=[],cursor="",smartphone="sp.nicovideo.jp"==location.hostname,xhr=new XMLHttpRequest;function main(a){DAYS=a;smartphone?(document.open(),document.write(\'<a href="https://www.nicovideo.jp/my/top">PC\u30da\u30fc\u30b8</a>\u3067\u5b9f\u884c\u3057\u3066\u304f\u3060\u3055\u3044\'),document.close()):"www.nicovideo.jp"!=location.hostname?(document.open(),document.write(\'<a href="https://www.nicovideo.jp/my/top">\u30cb\u30b3\u30cb\u30b3\u52d5\u753b</a>\u3092\u958b\u3044\u305f\u72b6\u614b\u3067\u5b9f\u884c\u3057\u3066\u304f\u3060\u3055\u3044\'),document.close()):(document.open(),document.write("loading:[]<br>"),document.close(),loader())}function loader(){xhr.onreadystatechange=function(){if(4==xhr.readyState&&200==xhr.status){var b=JSON.parse(xhr.responseText);jsons.push(b);cursor="cursor="+b.meta.minId+"&";var a=b.data[b.data.length-1];b=new Date;var d=new Date;d.setDate(b.getDate()-DAYS);a=new Date(a.createdAt);document.open();document.write("loading:["+Math.floor(100*(b.getTime()-a.getTime())/(864E5*DAYS))+"\uff05]<br>");document.close();d<a?loader():output()}};var a="https://"+location.hostname+"/api/nicorepo/timeline/my/all?"+cursor+"client_app=pc_myrepo&_="+Date.now();try{xhr.open("GET",a),xhr.send()}catch(b){document.open(),document.write("\u901a\u4fe1\u306b\u5931\u6557\u3057\u307e\u3057\u305f\u3002\u30d6\u30e9\u30a6\u30b6\u7279\u6709\u306e\u30d0\u30b0\u306e\u3088\u3046\u3067\u3059\u3002<br>\u3082\u3046\u4e00\u5ea6\u30d6\u30c3\u30af\u30de\u30fc\u30af\u30ec\u30c3\u30c8\u3092\u8d77\u52d5\u3059\u308b\u3068\u3046\u307e\u304f\u884c\u304f\u304b\u3082\u3002"),document.close()}}function output(){var a=\'<!DOCTYPE html><html><head></head><body><div><a target="_blank" href="https://www.nicovideo.jp/user/78823020/video"><img src="https://tn.smilevideo.jp/smile?i=32892185" align="left">\u5e83\u544a\uff1a\u9234\u97f3\u306e\u30d4\u30f3\u30af\u306a\u30dc\u30a4\u30ed\u52d5\u753b\u4e00\u89a7\u306f\u3053\u3061\u3089</a></div><br clear="all"><hr>\u6700\u8fd1\u306e\u52d5\u753b\u6295\u7a3f<hr>\';for(var b=0;b<jsons.length;b++)for(var e=jsons[b],d=0;d<e.data.length;++d){var c=e.data[d];if("nicovideo.user.video.upload"==c.topic){var f=c.senderNiconicoUser;c=c.video;a+="<div>";a+=\'<a target="_blank" href="https://www.nicovideo.jp/watch/\'+c.id+\'"><img src="\'+c.thumbnailUrl.normal+\'" align="left"></a>\';a+=\'<a target="_blank" href="https://www.nicovideo.jp/user/\'+f.id+\'">\'+f.nickname+"</a><br>";a+=\'<a target="_blank" href="https://www.nicovideo.jp/watch/\'+c.id+\'">\'+c.title+\'</a><br clear="all">\';a+="</div><br>"}}a+="</body></html>";document.open();document.write(a);document.close()};';

output += '\n</script></head><body>';
output += '<div><a target="_blank" href="https://www.nicovideo.jp/user/78823020/video"><img src="https://tn.smilevideo.jp/smile?i=32892185" align="left">広告：鈴音のピンクなボイロ動画一覧はこちら</a></div><br clear="all">';
output += '\n<hr>何日前までの動画投稿レポートを探しますか？<hr>\n';

output += '［<a href="javascript:main(2);">2日前</a>］';
output += '［<a href="javascript:main(4);">4日前</a>］';
output += '［<a href="javascript:main(7);">7日前</a>］';
output += '<hr>';

output += '</body></html>\n';
document.open();
document.write(output);
document.close();

})();
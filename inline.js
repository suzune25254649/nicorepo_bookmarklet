
var DAYS = 0;
var jsons = [];
var cursor = '';
var smartphone = 'sp.nicovideo.jp' == location.hostname;
var xhr = new XMLHttpRequest();

function main(days)
{
	DAYS = days;
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

	document.open();
	document.write('loading:[]<br>');
	document.close();

	loader();
}

function loader()
{
	xhr.onreadystatechange = function()
	{
		if (4 == xhr.readyState && 200 == xhr.status)
		{
			var js = JSON.parse(xhr.responseText);
			jsons.push(js);
			cursor = "cursor=" + js.meta.minId + "&";

			var data = js.data[js.data.length - 1];
			var now = new Date(); 
			var dt = new Date(); 
			dt.setDate(now.getDate() - DAYS);
			var tim = new Date(data.createdAt);

			document.open();
			document.write('loading:[' + Math.floor(100 * (now.getTime() - tim.getTime()) / (DAYS * 24 * 60 * 60 * 1000)) + '％]<br>');
			document.close();

			if (dt < tim)
			{
				loader();
			}
			else
			{
				output();
			}
			return;
		}
	};
	var url = "https://" + location.hostname + "/api/nicorepo/timeline/my/all?" + cursor + "client_app=pc_myrepo&_=" + Date.now();
	try
	{
		xhr.open('GET', url);
		xhr.send();
	}
	catch(e)
	{
		document.open();
		document.write("通信に失敗しました。ブラウザ特有のバグのようです。<br>もう一度ブックマークレットを起動するとうまく行くかも。");
		document.close();
	}
}

function output()
{
	var output = '<!DOCTYPE html><html><head></head><body>';
	output += '<div><a target="_blank" href="https://www.nicovideo.jp/user/78823020/video"><img src="https://tn.smilevideo.jp/smile?i=32892185" align="left">広告：鈴音のピンクなボイロ動画一覧はこちら</a></div><br clear="all">';
	output += '<hr>最近の動画投稿<hr>';
	for(var i = 0; i < jsons.length; i++)
	{
		var js = jsons[i];
		for(var n = 0; n < js.data.length; ++n)
		{
			var data = js.data[n];
			if ("nicovideo.user.video.upload" == data.topic)
			{
				var user = data.senderNiconicoUser;
				var video = data.video;
				output += '<div>';
				output += '<a target="_blank" href="https://www.nicovideo.jp/watch/' + video.id + '"><img src="' + video.thumbnailUrl.normal + '" align="left"></a>';
				output += '<a target="_blank" href="https://www.nicovideo.jp/user/' + user.id + '">' + user.nickname + '</a><br>';
				output += '<a target="_blank" href="https://www.nicovideo.jp/watch/' + video.id + '">' + video.title + '</a><br clear="all">';
				output += '</div><br>';
			}
		}
	}
	output += '</body></html>';
	document.open();
	document.write(output);
	document.close();
}
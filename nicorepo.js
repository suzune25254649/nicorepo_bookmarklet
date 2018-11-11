(function(){

var num_pages = 10;
var jsons = [];
var cursor = '';
var smartphone = 'sp.nicovideo.jp' == location.hostname;
var xhr = new XMLHttpRequest();
  
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
document.write('loading:[' + ':::'.repeat(num_pages) + ']<br>');
document.close();

function loader(index)
{
	if (index == num_pages)
	{
		output();
		return;
	}
	{
		xhr.onreadystatechange = function()
		{
			if (4 == xhr.readyState && 200 == xhr.status)
			{
				document.open();
				document.write('loading:[' + '|||'.repeat(index + 1) + ':::'.repeat(num_pages - index - 1) + ']<br>');
				document.close();
				var js = JSON.parse(xhr.responseText);
				jsons.push(js);
				cursor = "cursor=" + js.meta.minId + "&";
				loader(index + 1);
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
}

function output()
{
	var output = '<!DOCTYPE html><html><head></head><body>';
	output += '<div><a target="_blank" href="https://www.nicovideo.jp/user/78823020/video"><img src="https://tn.smilevideo.jp/smile?i=32892185" align="left">広告：鈴音のピンクなボイロ動画一覧はこちら</a></div><br clear="all">';
	output += '\n<hr>最近の動画投稿<hr>\n';
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
				output += '</div><br>\n';
			}
		}
	}
	output += '</body></html>\n';
	document.open();
	document.write(output);
	document.close();
}

loader(0);
})();
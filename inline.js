
var DAYS = 0;
var jsons = [];
var cursor = '';
var smartphone = 'sp.nicovideo.jp' == location.hostname;
var xhr = new XMLHttpRequest();

function main(days)
{
	DAYS = days;
	jsons = [];
	cursor = ''

	document.getElementById("movies").innerHTML = 'loading:[]<br>';

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

			if (0 < js.data.length)
			{
				var data = js.data[js.data.length - 1];
				var now = new Date(); 
				var dt = new Date(); 
				dt.setDate(now.getDate() - DAYS);
				var tim = new Date(data.createdAt);

				document.getElementById("movies").innerHTML = 'loading:[' + Math.floor(100 * (now.getTime() - tim.getTime()) / (DAYS * 24 * 60 * 60 * 1000)) + '％]<br>';
				if (tim <= dt)
				{
					output();
					return;
				}
			}
			loader();
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
		document.getElementById("movies").innerHTML = "通信に失敗しました。ブラウザ特有のバグのようです。<br>もう一度ブックマークレットを起動するとうまく行くかも。";
	}
}

function output()
{
	var output = '';
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
	document.getElementById("movies").innerHTML = output;
}
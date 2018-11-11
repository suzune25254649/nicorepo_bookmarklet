# nicorepo_bookmarklet
ニコレポのうち特定のレポートだけを抽出して表示するブックマークレット。

デフォルトでは動画投稿レポートだけを抽出します。

# 動作することを確認
- iOS Safari
- iOS GoogleChrome
- Windows10 GoogleChrome

# 動作しないことを確認
- Windows10 FireFox

# 使い方
- ブラウザのブックマーク機能で、どこのページでも良いのでブックマークする。
- そのブックマークを編集し、URLの部分に後述のプログラムをコピペして保存してください
- ニコニコのページを（ログインした状態で）開きます
- 開いている状態で、先ほどのブックマークを開きます（スマホでの開き方は後述）
- ニコニコのページが書き換わります

# URLにコピペするプログラム
```
javascript:(function(){function e(a){if(10==a)k();else{var b=new XMLHttpRequest;b.onreadystatechange=function(){if(4==b.readyState&&200==b.status){document.open();document.write("loading:["+"|||".repeat(a+1)+":::".repeat(10-a-1)+"]<br>");document.close();var d=JSON.parse(b.responseText);g.push(d);h="cursor="+d.meta.minId+"&";e(a+1)}};var f="https://"+location.hostname+"/api/nicorepo/timeline/my/all?"+h+"client_app=pc_myrepo&_="+Date.now();b.open("GET",f);b.send()}}function k(){var a='<a target="_blank" href="https://www.nicovideo.jp/user/78823020/video"><img src="https://tn.smilevideo.jp/smile?i=32892185" align="left">\u5e83\u544a\uff1a\u9234\u97f3\u306e\u30d4\u30f3\u30af\u306a\u30dc\u30a4\u30ed\u52d5\u753b\u4e00\u89a7\u306f\u3053\u3061\u3089</a><br clear="all"><hr>\u6700\u8fd1\u306e\u52d5\u753b\u6295\u7a3f<hr>\n';for(var b=0;b<g.length;b++)for(var f=g[b],d=0;d<f.data.length;++d){var c=f.data[d];if("nicovideo.user.video.upload"==c.topic){var e=c.senderNiconicoUser;c=c.video;a+="<div>";a+='<a target="_blank" href="https://www.nicovideo.jp/watch/'+c.id+'"><img src="'+c.thumbnailUrl.normal+'" align="left"></a>';a+='<a target="_blank" href="https://www.nicovideo.jp/user/'+e.id+'">'+e.nickname+"</a><br>";a+='<a target="_blank" href="https://www.nicovideo.jp/watch/'+c.id+'">'+c.title+'</a><br clear="all">';a+="</div><br>\n"}}document.open();document.write(a);document.close()}var g=[],h="";"sp.nicovideo.jp"==location.hostname?(document.open(),document.write('<a href="https://www.nicovideo.jp/my/top">PC\u30da\u30fc\u30b8</a>\u3067\u5b9f\u884c\u3057\u3066\u304f\u3060\u3055\u3044</a>'),document.close()):(document.write("loading:["+":::".repeat(10)+"]<br>"),e(0))})();
```

# FAQ
## Safari:スマホで「開いている状態で、先ほどのブックマークを開きます」の方法が分からない
URL入力欄の左側にある、本のアイコンからブックマークを選択してください。

## GoogleChrome:スマホで「開いている状態で、先ほどのブックマークを開きます」の方法が分からない
アドレスバーに、登録したブックマークのタイトルを打ち込むと、予測ページとしてブックマークが一覧に出てくるので選んでください。

# 希望
もっと素敵な結果ページを作ってくれる人、プルリクエストお願いします。


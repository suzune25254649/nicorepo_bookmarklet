# nicorepo_bookmarklet
ニコレポのうち特定のレポートだけを抽出して表示するブックマークレット。

デフォルトでは動画投稿レポートだけを抽出します。

# 動作することを確認
- iOS Safari
- iOS GoogleChrome
- Windows10 GoogleChrome
- Windows10 FireFox

# 使い方
- ブラウザのブックマーク機能で、どこのページでも良いのでブックマークする。
- そのブックマークを編集し、URLの部分に後述のプログラムをコピペして保存してください
- ニコニコのページを（ログインした状態で）開きます
- 開いている状態で、先ほどのブックマークを開きます（スマホでの開き方は後述）
- ニコニコのページが書き換わります

# URLにコピペするプログラム
```
javascript:(function(){function e(a){if(10==a)k();else{b.onreadystatechange=function(){if(4==b.readyState&&200==b.status){document.open();document.write("loading:["+"|||".repeat(a+1)+":::".repeat(10-a-1)+"]<br>");document.close();var d=JSON.parse(b.responseText);f.push(d);h="cursor="+d.meta.minId+"&";e(a+1)}};var l="https://"+location.hostname+"/api/nicorepo/timeline/my/all?"+h+"client_app=pc_myrepo&_="+Date.now();try{b.open("GET",l),b.send()}catch(d){document.open(),document.write("\u901a\u4fe1\u306b\u5931\u6557\u3057\u307e\u3057\u305f\u3002\u30d6\u30e9\u30a6\u30b6\u7279\u6709\u306e\u30d0\u30b0\u306e\u3088\u3046\u3067\u3059\u3002<br>\u3082\u3046\u4e00\u5ea6\u30d6\u30c3\u30af\u30de\u30fc\u30af\u30ec\u30c3\u30c8\u3092\u8d77\u52d5\u3059\u308b\u3068\u3046\u307e\u304f\u884c\u304f\u304b\u3082\u3002"),document.close()}}}function k(){var a='<!DOCTYPE html><html><head></head><body><div><a target="_blank" href="https://www.nicovideo.jp/user/78823020/video"><img src="https://tn.smilevideo.jp/smile?i=32892185" align="left">\u5e83\u544a\uff1a\u9234\u97f3\u306e\u30d4\u30f3\u30af\u306a\u30dc\u30a4\u30ed\u52d5\u753b\u4e00\u89a7\u306f\u3053\u3061\u3089</a></div><br clear="all">\n<hr>\u6700\u8fd1\u306e\u52d5\u753b\u6295\u7a3f<hr>\n';for(var b=0;b<f.length;b++)for(var d=f[b],g=0;g<d.data.length;++g){var c=d.data[g];if("nicovideo.user.video.upload"==c.topic){var e=c.senderNiconicoUser;c=c.video;a+="<div>";a+='<a target="_blank" href="https://www.nicovideo.jp/watch/'+c.id+'"><img src="'+c.thumbnailUrl.normal+'" align="left"></a>';a+='<a target="_blank" href="https://www.nicovideo.jp/user/'+e.id+'">'+e.nickname+"</a><br>";a+='<a target="_blank" href="https://www.nicovideo.jp/watch/'+c.id+'">'+c.title+'</a><br clear="all">';a+="</div><br>\n"}}a+="</body></html>\n";document.open();document.write(a);document.close()}var f=[],h="",b=new XMLHttpRequest;"sp.nicovideo.jp"==location.hostname?(document.open(),document.write('<a href="https://www.nicovideo.jp/my/top">PC\u30da\u30fc\u30b8</a>\u3067\u5b9f\u884c\u3057\u3066\u304f\u3060\u3055\u3044'),document.close()):"www.nicovideo.jp"!=location.hostname?(document.open(),document.write('<a href="https://www.nicovideo.jp/my/top">\u30cb\u30b3\u30cb\u30b3\u52d5\u753b</a>\u3092\u958b\u3044\u305f\u72b6\u614b\u3067\u5b9f\u884c\u3057\u3066\u304f\u3060\u3055\u3044'),document.close()):(document.open(),document.write("loading:["+":::".repeat(10)+"]<br>"),document.close(),e(0))})();
```

# FAQ
## Safari:スマホで「開いている状態で、先ほどのブックマークを開きます」の方法が分からない
URL入力欄の左側にある、本のアイコンからブックマークを選択してください。

## GoogleChrome:スマホで「開いている状態で、先ほどのブックマークを開きます」の方法が分からない
アドレスバーに、登録したブックマークのタイトルを打ち込むと、予測ページとしてブックマークが一覧に出てくるので選んでください。

# 希望
もっと素敵な結果ページを作ってくれる人、プルリクエストお願いします。


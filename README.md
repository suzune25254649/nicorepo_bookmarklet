# nicorepo_bookmarklet
ニコレポのうち特定のレポートだけを抽出して表示するブックマークレット。

デフォルトでは動画投稿レポートだけを抽出します。

# 使い方
- ブラウザのブックマーク機能で、どこのページでも良いのでブックマークする。
- そのブックマークを編集し、URLの部分に後述のプログラムをコピペして保存してください
- ニコニコのページを（ログインした状態で）開きます
- 開いている状態で、先ほどのブックマークを開きます
- ニコニコのページが書き代わります

# URLにコピペするプログラム
```
javascript:(function(){var num_pages=10;var jsons=[];var cursor='';document.write('loading:['+':::'.repeat(num_pages)+']<br>');function loader(index){if(index==num_pages){output();return;}var xhr=new XMLHttpRequest();xhr.onreadystatechange=function(){if(4==xhr.readyState&&200==xhr.status){document.open();document.write('loading:['+'|||'.repeat(index+1)+':::'.repeat(num_pages-index-1)+']<br>');document.close();var js=JSON.parse(xhr.responseText);jsons.push(js);cursor="cursor="+js.meta.minId+"&";loader(index+1);}};var url="https://www.nicovideo.jp/api/nicorepo/timeline/my/all?"+cursor+"client_app=pc_myrepo&_="+Date.now();xhr.open('GET',url);xhr.send();}function output(){var output='';output+='<hr>動画投稿<hr>\n';for(var i=0;i<jsons.length;i++){var js=jsons[i];for(var n=0;n<js.data.length;++n){var data=js.data[n];if("nicovideo.user.video.upload"==data.topic){var user=data.senderNiconicoUser;var video=data.video;output+='<div>';output+='<a target="_blank"href="https://www.nicovideo.jp/watch/'+video.id+'"><img src="'+video.thumbnailUrl.normal+'"align="left"></a>';output+='<a target="_blank"href="https://www.nicovideo.jp/user/'+user.id+'">'+user.nickname+'</a><br>';output+='<a target="_blank"href="https://www.nicovideo.jp/watch/'+video.id+'">'+video.title+'</a><br clear="all">';output+='</div><br>\n';}}}document.open();document.write(output);document.close();}loader(0);})();
```
# 希望
もっと素敵な結果ページを作ってくれる人、プルリクエストお願いします。


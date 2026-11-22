# kakko

https://c0t1.github.io/kakko/ — お遊び用の書体時計。1文字ずつ Google Fonts の書体・大きさ・色がバラバラで、数字が変わるたびに書体も変わる。リロード・タップ・スペースで動き方と配色がシャッフルされる。

- 動き: gravity / float / zerog / swing / jelly / explode / tornado / stamp
- `#gravity` のように付けるとその動きで開く
- 書体リストは `index.html` の `FONTS` 配列。3つめに可変軸を書くと秒に合わせて形が動く

## 以前のビジネスサイト

- 今も見られる場所: https://c0t1.github.io/kakko/business/
- 保存: ブランチ `archive/business-site`（移行前の状態そのまま）

トップをビジネスサイトに戻すとき:

```sh
git checkout main
git fetch origin archive/business-site
git checkout origin/archive/business-site -- index.html css js
git rm -r --cached business >/dev/null 2>&1; rm -rf business   # 残すなら省略
git commit -am "Restore business site" && git push
```

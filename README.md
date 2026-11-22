# kakko

https://c0t1.github.io/kakko/ — お遊び用の書体時計。リロード・タップ・スペースで Google Fonts の書体が変わる。

- `#書体名` を付けるとその書体で開く（例: `#Kablammo`）
- 書体リストは `index.html` の `FONTS` 配列。3つめに可変軸を書くと秒に合わせて動く

## 以前のビジネスサイト

- 今も見られる場所: https://c0t1.github.io/kakko/business/
- 保存: タグ `business-site-v1` ／ ブランチ `archive/business-site`

トップをビジネスサイトに戻すとき:

```sh
git checkout main
git checkout business-site-v1 -- index.html css js
git rm -r --cached business >/dev/null 2>&1; rm -rf business   # 残すなら省略
git commit -am "Restore business site" && git push
```

# WorldForWeb

[World](https://github.com/mmorise/world.git) をWebAssemblyを使用してブラウザ上で動かしてみるサンプル

## 対応状況

* ローカルファイルのwavファイルの分析
* F0の簡易的な可視化

## 開発の仕方

ShellScriptが動作する環境とEmscriptenが使用できる環境が必須．

またWebサーバーのホストはPython3を使用しているが，自由に変えて問題ない．
```
# SubmoduleのWorldをリストア
$ git submodue update --init
# 依存ライブラリの解決
$ npm i
# ビルド
$ npm run build
# Webサーバーをホストして確認
$ npm run host
```

## その他

babelやwebpack，その他設計などは
http://shogonir.hatenablog.com/entry/2017/05/22/015626
およびその記事で紹介されている
https://github.com/shogonir/wasm-sample/tree/master/06-wasm-babel-webpack
を参考にした．

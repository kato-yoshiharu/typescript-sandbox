# Honoを使ったパフォーマンスの計測の学習ログ

typescript-sandboxのHonoサンプルアプリで、ボトルネックを特定する方法を学んだ記録。

ボトルネックの特定に使用した計測ツールは`hono/timing`。
Server-Timingヘッダで、リクエスト内の区間ごとの所要時間を出せる。
`startTime(context, 'label')` / `endTime(context, 'label')` で挟んだところが計測される。

プロファイラは、プログラム全体を実行しながらサンプリングし、「どの関数がCPU時間を何%使ったか」を自動で出すツール。
`hono/timing`と違って、事前に「ここが怪しい」と当たりをつけなくても使える。

Node標準の`--cpu-prof`が手軽。

```sh
node --cpu-prof --cpu-prof-dir=./prof src/index.ts
```

## TODO

- [ ] autocannon

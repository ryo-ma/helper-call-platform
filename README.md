# MuscleHelper
本プロジェクトは["地域課題をハックする" 共創プログラム〜Tokyo OSS Party!! 2021](https://tokyo-oss-party.com/)で作成されたプロジェクトです

MuscleHelper(マッスルヘルパー)は視覚障害者や手に関する障害、デジタルディバイドなどによりスマホ使えず、いざと言う時に助けを求めることができない人が、筋電センサーを用いることで周囲のサポータへ通知を飛ばし助けを求められる仕組みです。

<img width=400 src="https://user-images.githubusercontent.com/6661165/142764580-d49109d0-68a8-4163-ab06-521c90abaa1c.jpg"/>


# Getting Started

## 必要なもの

* ラズパイ任意のバージョン(本READMEでは [Raspberry Pi Zero WH](https://www.switch-science.com/catalog/3646/)を使用します)
* 筋電センサー [SparkFun MyoWareマッスルセンサー SEN-13723](https://www.amazon.co.jp/dp/B08KW2WQ5L)
* ジャンプワイヤー オス-メス、オス-オス 任意の数
* ADコンバータ [mcp3208](https://www.amazon.co.jp/dp/B07VB53DJV/)
* [MyoWare用生体センサパッド](https://www.switch-science.com/catalog/2693/)

## ラズパイセッティング

OS導入等の本体のセットアップはこちらの記事などが参考になります。
https://qiita.com/hishi/items/8bdfd9d72fa8fe2e7573

### 設定

Raspberry PiのSPIを有効にする

```
$sudo raspi-config
```

config画面が出たら以下の選択を行う

Interfacing Options  -> P4 SPI -> enable

SPI接続の有効を確認

```
$ls /dev/spi*
/dev/spidev0.0  /dev/spidev0.1
```

### 回路図


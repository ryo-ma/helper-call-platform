# Helper Call Platform
本プロジェクトは["地域課題をハックする" 共創プログラム〜Tokyo OSS Party!! 2021](https://tokyo-oss-party.com/)で作成されたプロジェクトです

ハンデキャップを持った方々が外出先の施設などで発生するちょっとした困りごとや緊急時などにナースコールのような形で施設の職員などへ意思表示を行うことができるプラットフォームです。  
コールを行うデバイスはデジタルディバイド対策への意識およびハンデキャップの種類ごとに対応したものになっています。
また、デバイスの種類はコントリビュータによって増やすことが可能なため今後も様々なハンデキャップに対応することができます。

# 利用可能デバイス一覧

* [マッスルヘルパー](./devices/muscle_helper) ： 筋電センサーを用いたデバイスです。特定の部位の筋肉を稼働させることができればコールを行うことができます。
* [ヘルプボタン](./devices/help_button) ： シンプルなLED付きボタンです。様々な世代において最もなじみやすいユーザインタフェースのため利用が簡単です。

# アーキテクチャ図
<img width="1000" alt="スクリーンショット 2021-11-28 2 19 30" src="https://user-images.githubusercontent.com/6661165/143690792-4f2461ca-4c75-406a-bd54-aff3eb5ea432.png">


# Getting Started

## プラットフォームの起動

本プロジェクトをクローンします

```bash
git clone https://github.com/ryo-ma/helper-call-platform.git
```

### 各種コンテナの起動

* Next.js
* Nest.js
* PostgreSQL

```bash
docker-compose up
```

## デバイスの準備
[利用可能デバイス一覧](#利用可能デバイス一覧)のそれぞれのリンクから準備方法に進むことができます。

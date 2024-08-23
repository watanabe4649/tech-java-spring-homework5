# Homework5
Spring Boot, HTML, css, JavaScriptを駆使して、
ラーメンデータベースのようなモノを作っていきます。

## 2024年8月25日

### 1. 環境構築

#### リポジトリのクローン
クローンすれば以下の環境が構築されるはずです。
![image](https://github.com/user-attachments/assets/5770b743-0592-42ea-98b6-ab8cf925bed3)
  
    
#### mySQLのセットアップ
今回のプロジェクトでは、mySQLの`homework5`というデータベースを使用します。  
以下の手順を踏んでください。

- `homework5`データベースの作成
- mySQLのユーザ(名`tester`パスワード`000000`)を作成(既存の場合もあり)
- `tester`に対して、`homework5`データベースへのアクセス権を付与

#### ディレクトリ構成

- `_frontend`  
  このフォルダには、HTML, css, JavaScriptのファイルが入っています。  
  フロントエンドの実装はこのフォルダ内で完結してください。
- `com.example.homework5.config`  
  このフォルダの内容は初見だと思いますが、課題には関係無いので気にしないでください。


後は以前の課題と変わりないので、目を通しておいてください。

### 2. APIの確認と調整
現状、`ramen/findAll`というエンドポイントのみ存在します。  
それにアクセスしてみて、以下の結果になるか確認してください。

~~~ json
[
  {
    "id": 1,
    "name": "家系"
  }
]
~~~

現状、実行時に上記のようにひとつのデータがデータベースに格納されています。  
これを、実行時に4つのデータが格納され、エンドポイントから以下のデータが返ってくるように変更してください。

~~~ json
[
  {
    "id": 1,
    "name": "家系"
  },
  {
    "id": 2,
    "name": "豚骨"
  },
  {
    "id": 3,
    "name": "醤油"
  },
  {
    "id": 4,
    "name": "味噌"
  }
]
~~~

### 3. フロントエンドからのアクセス
次に、フロントエンドからAPI(`ramen/findAll`)にアクセスして、4つのラーメンのデータを取得します。

処理は完全に任せますが、`index.html`にアクセスした際に、以下のような画面が表示されるように`index.html`と`App.js`を実装してください。
![image](https://github.com/user-attachments/assets/df7253e1-6e63-4de8-aa12-7090e7251339)
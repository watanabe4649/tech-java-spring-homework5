# Homework5
Spring Boot, HTML, css, JavaScriptを駆使して、
ラーメンデータベースのようなモノを作っていきます。

## 2024年11月16日

### 1. 独自例外の追加
現状、`BadRequestException`という独自例外があると思います。新しく例外を追加し、それぞれ以下の役割とします。

- `NotFoundException`  
  ラーメンがひとつも見つからなかった場合に投げる例外
- `BadRequestException`(既存)  
  リクエストパラメータの値の形式に異常がある場合に投げる例外。  
  今回では、評価がマイナスの値である場合に投げる例外とする。
- `UnprocessableEntityException`  
  リクエストパラメータの値の形式は正常だが、ロジック上の問題がある場合に投げる例外。例えば、
  今回は、minとmaxの大小関係が逆転している場合に投げる例外とする。

### 2. 例外処理の追加
上記3つの例外を適切なメッセージを添えて適切な場所で投げるようにしてください。  
例外が投げられた際に、以下のステータスコードと共にメッセージを返すようにしてください。

- `NotFoundException`: 404  
- `BadRequestException`: 400  
- `UnprocessableEntityException`: 422  

### 3. 例外処理の追加(フロントエンド)
現状では、エラーが発生した際に、アラートでエラーメッセージが表示されます。  
これを、エラーメッセージを表示するだけでなく、ステータスコードに応じて、以下のように処理を分けてください。

- `404`:   
  受け取ったエラーメッセージを無視し、`該当するラーメンが見つかりませんでした。`とアラートで表示
- `400`と`422`:  
  受け取ったエラーメッセージをアラートで表示し、入力フォームの内容をクリア

## 2024年11月10日

### 1. 例外処理の実装(バックエンド)
現状、`findByFilter`において、`minEval`や`maxEval`は値に関わらず整数であれば許容してしまいます。  
そのため、`minEval`や`maxEval`が不適切な値の時に、例外を投げたいです。

そのため、`findByFilter`において、以下の条件のときに、`IllegalArgumentException`を投げるようにしてください。

- `minEval`が0以下の時
- `maxEval`が6以上の時
- `minEval`が`maxEval`より大きい時

### 2. 例外処理の実装(フロントエンド)
今の状態で、フロントエンドの`minEval`や`maxEval`のフォームに不適切な値(例えばminEvalが0)を入力して送信すると
、 バックエンドで例外が投げられ、正常なレスポンスが帰ってきません。

レスポンスが正常で無かった場合、アラートで`正しい値を入力してください`と表示するようにしてください。

また、正常でないレスポンスの中身がどのようになっているのか、JavaScriptの`console.log`で確認してください。  
(どうなっているのか全く分からなければpostmanを使うと簡単に確認できます。)

### 3. 独自の例外処理
現在、既存のExceptionを使って例外処理を行っていますが、独自の例外クラスを作成して、それを使って例外処理を行ってください。
例外クラスの名前は`BadRequestException`とし、exceptionパッケージの中に配置してください。

そして、`findByFilter`において、`minEval`や`maxEval`が不適切な値の時に、`BadRequestException`を投げるようにしてください。

exceptionのメッセージは`値が不適切です。`としてください。

### 4. 独自例外の受取り
現状フロントエンドではエラーの内容に関わらず、アラートで`正しい値を入力してください`と表示しています。

そうでは無く、受け取ったエラーのメッセージを転用して、アラートで表示するようにしてください。
例えば今回の場合、`値が不適切です。`と表示されるようにしてください。

### 5. メッセージのバリエーション
現在、`BadRequestException`に渡しているメッセージは1種類ですが、エラーの種類によってメッセージを変えたいです。

以下の様に、エラーの種類によって違うメッセージを渡すようにしてください。

- `minEval`が0以下の時`最小評価は1以上で入力してください。`
- `maxEval`が6以上の時`最大評価は5以下で入力してください。`
- `minEval`が`maxEval`より大きい時`最小評価は最大評価以下で入力してください。`

この変更後、フロントエンドでエラーが発生した際に、適切なメッセージが表示されることを確認してください。

## 2024年11月4日

### 1. キーワード検索フォームの実装

以下の画像のように、キーワード検索のフォームを作成してください。

![image](https://github.com/user-attachments/assets/41131e64-94b9-40ff-accb-ba6247846236)

### 2. キーワード検索の実装(フロントエンド)

検索ボタンを押した際に、キーワード検索フォームに入力した内容のurlにリダイレクトされるようにしてください。
例えばキーワードが「普通の」で、最小評価が3、最大評価が5の場合、以下のようなurlになります。

~~~
index.html?keyword=普通の&maxEval=5&minEval=3
~~~

このurlにアクセスさえ出来れば、バックエンド(SpringBoot側)にもこのパラメータが渡されるはずです。

また、ページネーションでページを移動した際にもこのパラメータが維持されるようにしてください。


### 3. キーワード検索の実装(バックエンド)
`findByFilter`にキーワード検索の機能を追加してください。  
フィルタリング処理はサービスクラスに実装し、for文等は使わずに書くようにしてください。

ここまで実装して、`index.html?keyword=普通の&maxEval=5&minEval=3&page=0`にアクセスした結果は以下の様になることを確認してください。

![image](https://github.com/user-attachments/assets/a587d016-291f-435e-a90a-13a46fe60333)


## 2024年10月20日

### 1. フィルターの演習

以下のメソッド`List<Ramen> findByFilter`をreturn文から始まる1文の処理だけに書き換えてください。

```java
@Override
public List<Ramen> findByFilter(int minEval, int maxEval) {
    List<Ramen> ramenList = ramenRepository.findAll();
    List<Ramen> filteredRamenList = new ArrayList<>();
    for (Ramen ramen : ramenList) {
        if (ramen.getEvaluation() >= minEval && ramen.getEvaluation() <= maxEval) {
            filteredRamenList.add(ramen);
        }
    }
    return filteredRamenList;
}
```

`Page<Ramen> findByFilter`も、1行は無理ですが、for文無しで書き換えてみてください。

```java
@Override
public Page<Ramen> findByFilter(int minEval, int maxEval, Pageable pageable) {
    List<Ramen> ramenList = ramenRepository.findAll();
    List<Ramen> filteredRamenList = new ArrayList<>();
    for (Ramen ramen : ramenList) {
        if (ramen.getEvaluation() >= minEval && ramen.getEvaluation() <= maxEval) {
            filteredRamenList.add(ramen);
        }
    }
    int start = (int)pageable.getOffset();
    int end = Math.min((start + pageable.getPageSize()), filteredRamenList.size());
    
    return new PageImpl<>(filteredRamenList.subList(start, end), pageable, filteredRamenList.size());
}
```

### 2. 検索ボックスの追加
ページ上部に最小評価と最大評価を入力するボックスを作成し、検索ができるようにします。

以下の画像のレイアウトに限りなく寄せてください。

ページネーションに関しても、上部と下部の2箇所に配置されるようにし、どちらも機能するようにしてください。

![image](https://github.com/user-attachments/assets/b3003e30-5137-45eb-9876-a34bc77ed659)

### 3. 検索ボックスの機能実装
検索ボックスに最小評価と最大評価を入力し、検索ボタンを押すと、その範囲内のラーメンが表示されるようにしてください。

ページ遷移を行った際も、検索ボックスに入力された値が維持されるようにしてください。


## 2024年10月14日

### 1. パラメータの維持
現在、ページ番号を選択すると、`minEval`や`maxEval`が維持されず、全アイテムの表示になってしまいます。

これを解決するために、ページ番号を選択した際に、`minEval`や`maxEval`も維持されるようにしてください。

### 2. 動的なページ数
現在、ページ数は固定で、10ページになっています。例えば`minEval=4`を指定した場合、評価が4以上のラーメンが20個なので、
4ページ目までしかアイテムがありません。

このような場合、ページ数の選択肢を動的に変更するようにしてください。
![image](https://github.com/user-attachments/assets/d2fa56f1-af3b-46f5-80af-3d19916bc713)


### 3. 選択中のページ
現在、自分のいるページ数に関わらず全てのページ番号真っ白になっていると思います。  
分かりづらいので、今自分が見ているページ番号だけグレーにしてください。

![image](https://github.com/user-attachments/assets/5907b5b8-ac5e-42e1-8b34-575358c3a929)



## 2024年10月5日

### 1. ページネーションのテスト
`findAll`のエンドポイントに対して、予めページネーションを実装しました。
そのページネーションが正常に動作するか、postman等でテストし、レスポンスを確認してください。

`data.sql`を見ると、50個のラーメンデータが登録されています。これを分けて取得するように実装しています。

例えば、`/ramen/findAll?page=2`というリクエストを送ると、以下のようなレスポンスが返ってきます。
page番号を0から9まで変化させてみて、レスポンスが変わる事も確かめてください。
```json
{
  "content": [
    {
      "id": 11,
      "name": "とても美味しいラーメン",
      "shopName": "第三ラーメン",
      "evaluation": 5
    },
    {
      "id": 12,
      "name": "美味しいラーメン",
      "shopName": "第三ラーメン",
      "evaluation": 4
    },
    {
      "id": 13,
      "name": "普通のラーメン",
      "shopName": "第三ラーメン",
      "evaluation": 3
    },
    {
      "id": 14,
      "name": "そこそこのラーメン",
      "shopName": "第三ラーメン",
      "evaluation": 2
    },
    {
      "id": 15,
      "name": "不味いラーメン",
      "shopName": "第三ラーメン",
      "evaluation": 1
    }
  ],
  "pageable": {
    "pageNumber": 2,
    "pageSize": 5,
    "sort": {
      "empty": true,
      "sorted": false,
      "unsorted": true
    },
    "offset": 10,
    "paged": true,
    "unpaged": false
  },
  "last": false,
  "totalElements": 50,
  "totalPages": 10,
  "size": 5,
  "number": 2,
  "sort": {
    "empty": true,
    "sorted": false,
    "unsorted": true
  },
  "first": false,
  "numberOfElements": 5,
  "empty": false
}
```

### 2. ソースコードの確認
ページネーションの実装に関して、どのようなソースコードが書かれているか、確認してください。


### 3. ページネーションの実装(フロントエンド)
前回、フロントエンドから呼び出すエンドポイントを`findByFilter`に変更しましたが、
一旦`findAll`に戻し、最初の5件が取得されるよう調整してください。

次に、見た目は問いませんので、10ページの切り替え用に、、
'index.html'のページ下部にページ番号選択ボタンを追加してください。

最後に、番号選択ボタンを押すと、そのページのラーメンデータが表示されるようにしてください。
以下画面構成の例です。

![image](https://github.com/user-attachments/assets/628ec8e0-c1de-44c9-879c-47a72fe13b0b)


### 4. ページネーションの実装(バックエンド)

`findAll`のエンドポイントに対して実装されているページネーションを参考にして、
`findByFilter`にもページネーションを実装してください。

その後、フロントエンドから呼び出すエンドポイントを`findByFilter`に戻し、
アクセスして正常に動作するか確認してください

※この場合、ページ下部のリンクをクリックすると上手く行かなくなる(minEval等が維持されない)と思います。
今回はそのままで大丈夫なので、urlにアクセスした際に上手くいくことだけを目標としてください。

例えば、`index.html?page=1&minEval=5`にアクセスした際に、★5の第六～十のラーメンが表示されるようになっていればOKです。
![image](https://github.com/user-attachments/assets/01baaa10-e4e8-4c26-95c5-099af9828039)


## 2024年9月22日

### 1. スタイルの適用
各ラーメンのタイトルに関して、以下のスタイルが適用されるようにしてください。

- フォントサイズ: 24px
- 太字

結果は以下の様になります。

![image](https://github.com/user-attachments/assets/451996bc-a8fb-43bc-8d15-5537b57b6278)


### 2. フィルタリング機能の実装(バックエンド)
`findByFilter`という新しいエンドポイントを作成してください。  
そのエンドポイントは**リクエストパラメータ**として、`minEval`と`maxEval`を受け取り、
その範囲内の評価を持つラーメンのみを返すようにしてください。

また、どちらも非必須のパラメータとし、指定されていなくても動作するようにしてください。

### 3. フィルタリング機能のテスト(フロントエンド)
`index.html`にアクセスした際にアクセスするエンドポイントを`findByFilter`に変更し、評価が3以上のラーメンのみを表示するようにしてください。

### 4. フィルタリング機能の追加(フロントエンド)
`index.html`自体がリクエストパラメータを受け付けるようにしてください。  
JavaScriptを使って、URLのパラメータを取得し、そのパラメータに応じて適切なgetリクエストをバックエンドに送るようにしてください。

| アクセス方法                        | 表示内容                                 |
|-------------------------------------|------------------------------------------|
| `index.html`                        | 全てのラーメンが表示される               |
| `index.html?minEval=3`              | 評価が3以上のラーメンのみが表示される    |
| `index.html?maxEval=4`              | 評価が4以下のラーメンのみが表示される    |
| `index.html?minEval=2&maxEval=4`    | 評価が2以上4以下のラーメンのみが表示される |
## 2024年9月15日

### 1. ラーメンの評価追加(DB, バックエンド)
ラーメンに対して、評価を追加できるようにしてください。
評価は1~5の整数で、nullになる事はありません。

### 2. ラーメンの評価追加機能の追加(フロントエンド)
`post.html`で評価を追加できるようにしてください。  
評価が入力されていなかったり、1~5の整数でない場合は、  
`"評価は1から5の間の整数で入力してください。"`というアラートを表示してください。

![image](https://github.com/user-attachments/assets/e223bc33-e429-470f-a593-73a6294bf676)


### 3. ラーメンの評価表示(フロントエンド)
`index.html`でラーメンの評価を表示できるようにしてください。

評価を表示できるようにすると共に、以下のような形式で表示できるようにしてください。  
(枠があって縦に並んで、それっぽい形で大丈夫です。)

![image](https://github.com/user-attachments/assets/c547c502-e7ef-4630-a761-7bed067613c3)

### 4. ラーメンの評価表示改善
評価が数字だと直感的に分からないので、星マークで表示してください。 
(例えば、評価が3なら`★★★`のように表示する)

![image](https://github.com/user-attachments/assets/05254748-827b-4cee-93a1-cdfd0cb774aa)


## 2024年9月8日

### 1. 店名の追加(DB)
現在、ラーメンの名称のみをデータベースに格納していますが、店名も追加してください。
それに伴い、`schema`や`data`も更新してください。

`data`での初期追加データは以下を用いてもOKです。

~~~ sql
("プレミアム塩とんこつ", "山岡家"),
("醤油ネギラーメン", "山岡家"),
("醤油ラーメン", "ラーメンショップ"),
("味噌ラーメン", "ラーメンショップ");
~~~

### 2. 店名の追加(バックエンド)
ラーメンに対して店名のプロパティも扱えるようにしてください。

### 3. 店名の追加(フロントエンド)
`index.html`で店名も表示し、`post.html`で店名も追加できるようにしてください。  
以下参考画像です。

| index                                                                                     | post                                                                                      |
|-------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------|
| ![image](https://github.com/user-attachments/assets/43a2b2b7-fb21-4e98-a1af-7fb1da8296a2) | ![image](https://github.com/user-attachments/assets/352c71cd-421c-4090-952b-0de5e1b00b56) |



## 2024年9月1日

### 1. ラーメンの投稿ページの作成
ラーメンを新しく追加するためのページを作成してください。
- ファイルは`post.html`として作成してください。
- 以下の画像の様に、ラーメンの名前を入力するテキストボックスと、投稿ボタンを配置してください。
- トップに戻るボタンを押すと、`index.html`に遷移するようにしてください。

![image](https://github.com/user-attachments/assets/9c5a2a44-aadb-409e-8238-a6a77f794666)

このページに移動できるように、`index.html`に`ラーメンを追加`というリンクを追加してください。   
![image](https://github.com/user-attachments/assets/b032eb14-ce16-4de9-910f-51b5be1810fe)

### 2. ラーメンの投稿処理の実装(バックエンド)
SpringBootのコントローラに、DBにラーメンを追加するためのエンドポイントを追加し、各クラス諸々の処理を追加してください。

基本的な処理は任せますが、以下の仕様を満たすように実装してください。
- エンドポイントは`ramen/insert`
- エンドポイントの引数は、`Ramen`クラス

### 3. ラーメンの投稿処理の実装(フロントエンド)
`post.html`に、ラーメンの名前を入力して投稿すると、投稿後トップに戻ったときに、追加したラーメンが表示されるようにしてください。


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

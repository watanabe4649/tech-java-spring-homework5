const ramenContainerElement = document.getElementById('ramen-container');

function callRamenFindAll() {
    // HTTPリクエストの作成
    const request = new XMLHttpRequest();
    request.open('GET', 'http://localhost:8080/ramen/findAll', true);
    request.responseType = 'json';

    // レスポンスを受け取った時の処理
    request.onload = function () {
        const data = this.response;

        for (let i = 0; i < data.length; i++) {
            const p = document.createElement('p');
            p.textContent = data[i].name;
            ramenContainerElement.appendChild(p);
        }
    };

    // リクエストの送信
    request.send();
}

function postBtn() {
    // フォームの値
    var formDatas = document.getElementById('merchandiseName');
    console.log(formDatas.value);
    // HTTPリクエストの作成
    const request = new XMLHttpRequest();
    request.open('POST', 'http://localhost:8080/ramen/insert', true);
    request.setRequestHeader("Content-Type", "application/json");

    // 送信の処理(文字列をJSONに変換)
    request.send(JSON.stringify(formDatas.value));

    formDatas.value = '';
}

//index.htmlファイル開いたときに走る処理
callRamenFindAll();

// ボタン要素を取得
const Btn = document.getElementById("post");

// クリックイベントリスナーを設定
Btn.addEventListener("click",postBtn);
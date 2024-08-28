function callApi() {
    // HTTPリクエストの作成

    // GET https://localhost:8080/ramen/findAll net::ERR_SSL_PROTOCOL_ERRORでdata変数内にapiのレスポンス取得できない
    let request = new XMLHttpRequest();
    request.open('GET', 'https://localhost:8080/ramen/findAll', true);
    request.responseType = 'json';

    // レスポンスを受け取った時の処理
    request.onload = function () {
        let data = this.response;
        console.log(data);
    };

    // リクエストの送信
    request.send();
}

callApi();
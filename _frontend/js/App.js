function findAllApi() {
    // GET https://localhost:8080/ramen/findAll apiのレスポンス取得
    let request = new XMLHttpRequest();
    request.open('GET', 'http://localhost:8080/ramen/findAll', true);
    request.responseType = 'json';

    // レスポンスを受け取った時の処理
    request.onload = function () {
        let data = this.response;
        let resultElement = document.getElementById("title-container");

        // APIのレスポンスのnameを順番に画面にpタグで表示する
        for (var i = 0, len = data.length; i < len; i++) {
          resultElement.insertAdjacentHTML('beforeend', "<p>" + data[i].name + "</p>");
        }
    };

    // リクエストの送信
    request.send();
}

findAllApi();
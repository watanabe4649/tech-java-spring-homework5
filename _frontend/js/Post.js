const ramenNameElement = document.getElementById('ramenName');
const shopNameElement = document.getElementById('shopName');
const evaluationElement = document.getElementById('evaluation');
const ramenPostButtonElement = document.getElementById('ramenPostButton');

function postRamen() {
    // HTTPリクエストの作成
    ramen = {
        name: ramenNameElement.value,
        shopName: shopNameElement.value,
        evaluation: evaluationElement.value
    }

    const request = new XMLHttpRequest();
    request.open('POST', 'http://localhost:8080/ramen/insert', true);
    request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    request.responseType = 'json';

    // レスポンスを受け取った時の処理
    request.onload = function () {
    };

    if(evaluationElement.value >6){
        alert("評価は1から5の間の整数で入力してください。")
    }else{
    // リクエストの送信
    request.send(JSON.stringify(ramen));
    }

}

ramenPostButtonElement.addEventListener('click', postRamen);

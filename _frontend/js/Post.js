const ramenNameElement = document.getElementById('ramenName');
const shopNameElement = document.getElementById('shopName');
const evalElement = document.getElementById('eval');
const ramenPostButtonElement = document.getElementById('ramenPostButton');

function postRamen() {
    let eval = evalElement.value;
    if (eval === ""|| eval.includes(".")  ||eval < 1 || eval > 5) {
        alert("評価は1から5の間の整数で入力してください。");
        return;
    }
    eval = parseInt(eval);

    const ramen = {
        name: ramenNameElement.value,
        shopName: shopNameElement.value,
        evaluation: eval
    }

    const request = new XMLHttpRequest();
    request.open('POST', 'http://localhost:8080/ramen/insert', true);
    request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    request.responseType = 'json';

    // レスポンスを受け取った時の処理
    request.onload = function () {
    };

    // リクエストの送信
    request.send(JSON.stringify(ramen));
}

ramenPostButtonElement.addEventListener('click', postRamen);

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

var stars = document.getElementsByClassName("star");
var clicked = false;
// 参考URL https://pen-tech.hateblo.jp/entry/2022/02/24/001512
document.addEventListener("DOMContentLoaded", () => {
  for (let i = 0; i < stars.length; i++) {

    stars[i].addEventListener(
      "mouseover",
      () => {
        if (!clicked) { //クリックが一度もされていないとき
          for (let j = 0; j <= i; j++) { //星1から上にカーソルがある星まで
            stars[j].style.color = "#f0da61"; //黄色に
          }
        }
      },
      false
    );

    stars[i].addEventListener(
      "mouseout",
      () => {
        if (!clicked) { //クリックが一度もされていないとき
          for (let j = 0; j < stars.length; j++) { //星1から星5まで
            stars[j].style.color = "#a09a9a"; //グレーに
          }
        }
      },
      false
    );

    stars[i].addEventListener(
      "click",
      () => {
        clicked = true;
        for (let j = 0; j <= i; j++) {
          stars[j].style.color = "#f0da61"; //黄色に
        }
        for (let j = i + 1; j < stars.length; j++) {
          stars[j].style.color = "#a09a9a"; //グレーに
        }
      },
      false
    );
  }
});

ramenPostButtonElement.addEventListener('click', postRamen);

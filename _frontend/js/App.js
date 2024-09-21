const ramenWrapperElement = document.getElementById('ramen-wrapper');

function callRamenFindByFilter(minEval, maxEval) {
    // HTTPリクエストの作成
    const request = new XMLHttpRequest();
    request.open('GET', `http://localhost:8080/ramen/findByFilter?minEval=${minEval}&maxEval=${maxEval}`, true);
    request.responseType = 'json';

    // レスポンスを受け取った時の処理
    request.onload = function () {
        const data = this.response;

        for (let i = 0; i < data.length; i++) {
            const p = createRamenElement(data[i]);
            ramenWrapperElement.appendChild(p);
        }
    };

    // リクエストの送信
    request.send();
}

function createRamenElement(ramen) {
    const container = document.createElement('div');
    container.classList.add('ramen-container');
    container.innerHTML = `
        <p class="ramen-name">${ramen.name}</p>
        <p>店名: ${ramen.shopName}</p>
        <p>評価: ${"★".repeat(ramen.evaluation)}</p>
    `;
    return container;
}

// 回答例
// function createRamenElement(ramen){
//     const container = document.createElement('div');
//     container.classList.add('ramen-container');
//     const ramenNameElement = document.createElement('p');
//     const shopNameElement = document.createElement('p');
//     const evalElement = document.createElement('p');
//     ramenNameElement.textContent = `${ramen.name}`;
//     shopNameElement.textContent = `店名: ${ramen.shopName}`;
//     evalElement.textContent = `評価: ${ramen.eval}`;
//     container.appendChild(ramenNameElement);
//     container.appendChild(shopNameElement);
//     container.appendChild(evalElement);
//     return container;
// }


// 現在のURLのクエリパラメータを取得
const urlParams = new URLSearchParams(window.location.search);

// minEvalがクエリパラメータに含まれているか確認
let minEval = urlParams.get('minEval') || "";
let maxEval = urlParams.get('maxEval') || "";


callRamenFindByFilter(minEval, maxEval);
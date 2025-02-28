const ramenImageURL = 'https://illust8.com/wp-content/uploads/2020/03/shouyu-ramen_7547.png';

const ramenListElement = document.getElementById('ramenList');
const storeEval4Element = document.getElementById('storeEval4');
const storeEval3Element = document.getElementById('storeEval3');
const storeEval2Element = document.getElementById('storeEval2');

function callRamenFindByEvaluation(eval, onLoadFunc = null) {
    // HTTPリクエストの作成
    const request = new XMLHttpRequest();
    request.open('GET', `http://localhost:8080/ramen/findByFilter?minEval=${eval}&maxEval=${eval}`, true);
    request.responseType = 'json';

    // レスポンスが返ってきた時の処理
    request.onload = onLoadFunc

    // リクエストの送信
    request.send();
}

/* 評価5のラーメンを取得し5件HTMLに追加*/
callRamenFindByEvaluation(5, function () {
    const content = this.response.content;
    ramenListElement.innerHTML = '';
    for (let i = 0; i < 5; i++) {
        const ramenHTML = `
            <div class="ramen-item">
                <img src="${ramenImageURL}" alt="${content[i].name}">
                <p class="ramen-item-ramen-name">${i + 1}. ${content[i].name}</p>
                <p class="ramen-item-shop-name">${content[i].shopName}</p>
            </div>
        `;

        ramenListElement.insertAdjacentHTML('beforeend', ramenHTML);
    }
});

/* 評価4,3,2のラーメンを取得し4件ずつHTMLに追加*/
callRamenFindByEvaluation(4, function () {
    const content = this.response.content;
    for (let i = 0; i < 4; i++) {
        const li = document.createElement('li');
        li.innerText = `${content[i].name} - ${content[i].shopName}`;
        storeEval4Element.appendChild(li);
    }
});
callRamenFindByEvaluation(3, function () {
    const content = this.response.content;
    for (let i = 0; i < 4; i++) {
        const li = document.createElement('li');
        li.innerText = `${content[i].name} - ${content[i].shopName}`;
        storeEval3Element.appendChild(li);
    }
});
callRamenFindByEvaluation(2, function () {
    const content = this.response.content;
    for (let i = 0; i < 4; i++) {
        const li = document.createElement('li');
        li.innerText = `${content[i].name} - ${content[i].shopName}`;
        storeEval2Element.appendChild(li);
    }
});
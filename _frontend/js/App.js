const ramenWrapperElement = document.getElementById('ramen-wrapper');

function callRamenFindByFilter() {
    // URLのクエリパラメータを取得
    const params = window.location.search;

//URLのキーminEval取得できない
//const minEval = urlParams.get('minEval');
console.log(urlParams.get('minEval'))

    // HTTPリクエストの作成
    const request = new XMLHttpRequest();
    request.open('GET', `http://localhost:8080/ramen/findByFilter${params}`, true);
    // request.open('GET', `http://localhost:8080/ramen/findAll${params}`, true);
    request.responseType = 'json';

    // レスポンスを受け取った時の処理
    request.onload = function () {
        const content = this.response.content;

        for (let i = 0; i < content.length; i++) {
            const p = createRamenElement(content[i]);
            ramenWrapperElement.appendChild(p);
        }
    };

//    location.href="http://localhost:63342/homework5/_frontend/index.html?page=1&minEval=2&maxEval=4";
//        return false;
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

callRamenFindByFilter();
//callRamen()

//const menuButtons = document.getElementsByClassName('pagination-item-link');
//Array.from(menuButtons).forEach((menuButton) => {
//  menuButton.addEventListener('click', () => {
//    const value = document.getElementsByClassName('pagination-item-link').value;
//    window.location.href = `https://example.com?value=${value}`;
//
//////      url.searchParams.append("minEval", "params.get('minEval')");
//////      url.searchParams.append("maxEval", "params.get('maxEval')");
//console.log(params.get('maxEval'))
//  })
//});

//    // URLを取得
//    let url = new URL(window.location.href);
//       console.log(url)
//
//    // URLSearchParamsオブジェクトを取得
//    let params = url.searchParams;
//
//    url.searchParams.append("minEval", "params.get('minEval')");
//    url.searchParams.append("maxEval", "params.get('maxEval')");
//
//    if( params.get('minEval') ) {
//        params.set('username','taro');
//        console.log(params.get('username')); // taro
//    }
//
//    if( params.get('maxEval') ) {
//        params.set('mode','view');
//        console.log(params.getAll('mode')); // ['view']
     //}
//     var baseUrl = 'http://localhost:63342/homework5/_frontend/index.html?page=';
//     var idList= [1, 2, 3, 4,5,6,7,8,9,10];
//     var els = document.getElementsByClassName('pagination-item-link');
//     for (var i = 0; i < idList.length; i++) {
//     els[i].href = baseUrl +idList[i]+params.get('minEval');
//     }

//}

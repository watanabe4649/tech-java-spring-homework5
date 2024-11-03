const ramenWrapperElement = document.getElementById('ramen-wrapper');

function callRamenFindByFilter() {
    // URLのクエリパラメータを取得
    const params = window.location.search;

    // HTTPリクエストの作成
    const request = new XMLHttpRequest();
    request.open('GET', `http://localhost:8080/ramen/findByFilter${params}`, true);
    // request.open('GET', `http://localhost:8080/ramen/findAll${params}`, true);
    request.responseType = 'json';

    // レスポンスを受け取った時の処理
    request.onload = function () {
        const response = this.response;
        const totalPages = response.totalPages;
        const currentPage = response.number;

        console.log(response);

        const content = response.content;
        for (let i = 0; i < content.length; i++) {
            const p = createRamenElement(content[i]);
            ramenWrapperElement.appendChild(p);
        }

        createPagination(totalPages, currentPage);
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

function createPagination(totalPages, currentPage) {
    const paginationElement = document.getElementById('pagination');
    for (let i = 0; i < totalPages; i++) {
        const selected = i === currentPage
        const paginationItem = createPaginationItemElement(i, selected);
        paginationElement.appendChild(paginationItem);
    }

}

function createPaginationItemElement(pageNumber, selected = false) {
    const item = document.createElement('li');
    item.classList.add('pagination-item');
    if (selected) {
        item.classList.add('pagination-item-selected');
    }

    // 現在のURLのクエリパラメータを取得
    const url = new URL(window.location);
    const params = url.searchParams;

    // pageパラメータを更新
    params.set('page', pageNumber);

    item.innerHTML = `
        <a class="pagination-item-link" href="?${params}"><span>${pageNumber + 1}</span></a>
    `;
    return item;
}

// Btn 押した時の処理を書く
function searchBtn(){
    // URLのクエリパラメータを取得

//console.log(params)

    const num1 = parseFloat(document.getElementById("num1").value);
    const num2 = parseFloat(document.getElementById("num2").value);

    const num3 = "?minEval=" +num1
    const num4 = "?maxEval=" +num2
    console.log(num1);
    console.log(num4);


        const params = num3;
            console.log(params);
    // HTTPリクエストの作成
    const request = new XMLHttpRequest();
    request.open('GET', `http://localhost:8080/ramen/findByFilter${params}`, true);
    // request.open('GET', `http://localhost:8080/ramen/findAll${params}`, true);
    request.responseType = 'json';



    // リクエストの送信
    request.send();

}



callRamenFindByFilter();
document.getElementById("button2").addEventListener("click", searchBtn);
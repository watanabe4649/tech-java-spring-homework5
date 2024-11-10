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
    const paginationTopElement = document.getElementById('pagination-top');
    const paginationBottomElement = document.getElementById('pagination-bottom');
    for (let i = 0; i < totalPages; i++) {
        const selected = i === currentPage
        const paginationItem = createPaginationItemElement(i, selected);
        paginationTopElement.appendChild(paginationItem.cloneNode(true));
        paginationBottomElement.appendChild(paginationItem.cloneNode(true));
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



const urlParams = new URLSearchParams(window.location.search);

const minEval = urlParams.get('minEval');
const maxEval = urlParams.get('maxEval');
const keyword = urlParams.get('keyword');

// if (minEval) {
//     document.getElementById('search-input-min').value = minEval;
// }
// if (maxEval) {
//     document.getElementById('search-input-max').value = maxEval;
// }
// if (keyword) {
//     document.getElementById('search-input-keyword').value = keyword;
// }
document.getElementById('search-input-min').value = minEval;
document.getElementById('search-input-max').value = maxEval;
document.getElementById('search-input-keyword').value = keyword;


callRamenFindByFilter();
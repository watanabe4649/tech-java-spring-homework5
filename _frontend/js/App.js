const ramenContainerElement = document.getElementById('ramen-container');

function callRamenFindAll() {
    // HTTPリクエストの作成
    const request = new XMLHttpRequest();
    request.open('GET', 'http://localhost:8080/ramen/findAll', true);
    request.responseType = 'json';

    // レスポンスを受け取った時の処理
    request.onload = function () {
        const data = this.response;

        for (let i = 0; i < data.length; i++) {
            const p = document.createElement('p');
            let memo = "";
            if(data[i].evaluation == 1){
               memo = `評価: ★`;
            }else if(data[i].evaluation == 2){
               memo = `評価: ★★`;
            }else if(data[i].evaluation == 3){
               memo = `評価: ★★★`;
            }else if(data[i].evaluation == 4){
               memo = `評価: ★★★★`;
            }else if(data[i].evaluation == 5){
               memo = `評価: ★★★★★`;
            }
            p.innerHTML = `${data[i].name} <br> 店名:${data[i].shopName} <br>${memo}`;
//            p.textContent = `${data[i].name} 店名:${data[i].shopName} 評価${data[i].evaluation}`;
            p.style.border = "solid 1px";
            p.style.backgroundColor = '#808080';
            p.style.margin = '10px';
            p.style.padding = '5px';
            ramenContainerElement.appendChild(p);
        }
    };

    // リクエストの送信
    request.send();
}

callRamenFindAll();
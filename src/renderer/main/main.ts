/// <reference types="vite/client" />

var today = new Date(); //获得当前日期
var tt = today.getTime();
var beforeText = "";
const mainEl = document.getElementById("main");

function showCDD() {
    //倒数日
    function fInShowCDD(now: number, text: string, mdd: string) {
        let endDate = new Date(mdd); //设置截止时间
        let end = endDate.getTime();
        let leftTime = end - now; //时间差
        let d: string, h: string, m: string, s: string, ms: string;
        if (leftTime >= 0) {
            d = String(Math.floor(leftTime / 1000 / 60 / 60 / 24));
            h = String(Math.floor((leftTime / 1000 / 60 / 60) % 24));
            m = String(Math.floor((leftTime / 1000 / 60) % 60) + 1);
            s = String(Math.floor((leftTime / 1000) % 60));
            ms = String(Math.floor(leftTime % 1000));
            ms.padStart(4, "0");
            s.padStart(2, "0");
            m.padStart(2, "0");
        }
        if (d != undefined) {
            return "距离" + text + "：" + d;
        } else {
            return "";
        }
    }

    let div = document.createElement("div");
    for (let i in markdd) {
        if (markdd[i][0] != undefined) {
            let it = document.createElement("div");
            it.innerText = fInShowCDD(tt, markdd[i][0], markdd[i][1]);
            div.append(it);
        }
    }
    return div;
}

var markdd = [["高考", "2024-6-7"]];

function reflash() {
    today = new Date();
    tt = today.getTime();
    let c = showCDD();
    if (beforeText != c.innerText) {
        beforeText = c.innerText;
        mainEl.innerHTML = "";
        mainEl.append(showCDD());
    }
    setTimeout(() => {
        reflash();
    }, 200);
}

reflash();
/// <reference types="vite/client" />

var markdd = [["高考", "2024-6-7"]];

var today = new Date(); //获得当前日期
var tt = today.getTime();
var beforeText = "";
const mainEl = document.getElementById("main");

function num(s: string) {
    let span = document.createElement("span");
    span.classList.add("num");
    span.innerText = s;
    return span;
}
function sy(s: string) {
    let span = document.createElement("span");
    span.classList.add("sy");
    span.innerText = s;
    return span;
}

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
            h = h.padStart(2, "0");
            ms = ms.padStart(4, "0");
            s = s.padStart(2, "0");
            m = m.padStart(2, "0");
        }
        let div = document.createElement("div");
        if (d != undefined) {
            let a = document.createElement("span");
            a.innerText = "距离";
            let b = document.createElement("span");
            b.innerText = text;
            let c = document.createElement("span");
            c.append(num(d), sy(":"), num(h));
            div.append(a, b, c);
        }
        return div;
    }

    let div = document.createElement("div");
    for (let i in markdd) {
        if (markdd[i][0] != undefined) {
            div.append(fInShowCDD(tt, markdd[i][0], markdd[i][1]));
        }
    }
    return div;
}

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

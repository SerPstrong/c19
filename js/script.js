const arrHumans = [" ", 1, 1, 1, 1, 7, 11, 14, 17, 20, 28, 34, 45, 59, 63, 93, 114, 147, 199, 253, 306, 367,
    438, 495, 658, 840, 1036, 1264, 1534, 1836, 2337, 2777, 3548, 4149, 4731, 5389];
let recovered = 355; //выздоровлений
let deaths = 45; // смертей
let sverdlRegion = 40;
let sverdlRegionRecovered = 13;

let active = arrHumans[arrHumans.length - 1] - recovered - deaths;

const arrComparePercent = [];
let leftBeforeInfection = 0;
let result = document.getElementById("result");
let resultTop = document.getElementById("result_top");
let resultCom = "";

let i = 1;
let k = 0; // берем с 10 индекса arrComparePercent = []

let compare = 1;
let difference = 1;
let difference2 = 1;
let insCont = 1;
// let html;
let iResult = 1;
let dif = 0;

render = () => {

    // resultCom += `<div class="resBlock result"><div class="span-flex"><span class="color-number color-number_size">ДЕНЬ</span></div><div class="span-flex"><span class="color-number color-number_size">ЗАРАЖЕНИЙ</span></div><div class="span-flex"><span class="color-number color-number_size">%</span></div></div>`;
    for (; i < arrHumans.length; i++) {
        difference = arrHumans[i] - compare;
        difference2 = Math.floor(100 / compare * difference);
        arrComparePercent.push(difference2);
        compare = arrHumans[i];
        funcIResult();
        //resultCom += `<div class="resBlock">День <span class="color-number">${i}</span> Заражений <span class="color-number">${arrHumans[i]} (+${difference})</span>   <span class="color-number">${iResult} ${difference2}%</span></div>`;
        resultCom += `<div class="resBlock result"><div class="span-flex"><span class="color-number color-number_size">${i}</span></div><div class="span-flex"><span class="color-number color-number_size">${arrHumans[i]} (+${difference})</span></div><div class="span-flex"><span class="color-number color-number_size">${iResult} ${difference2}%</span></div></div>`;
    }

    let countHumansSum = 0;
    let hCount = 0;
    let countHuSum = 1;

    for (; hCount < 7; hCount++) {
        countHumansSum += arrComparePercent[arrComparePercent.length - countHuSum];
        countHuSum++
    }
    countHumansSum = Math.floor(countHumansSum / hCount);

    let iToday = i - 1;

    resultCom += `<h1 class="h1">РнаОПД</h1>`;
    result.innerHTML += resultCom;

    let humans = arrHumans[arrHumans.length - 1];

    for (; i <= 150; i++) {
        if (humans <= 9000000000) {
            dif = humans;
            humans += resultFunc(humans);
            let y = Math.floor(humans);
            dif = Math.floor(humans - dif);
            resultCom += `<div class="resBlock resBlock_abs"><span class="color-number_small">${i}</span><span class="color-number color-number_bot">${y}</span><span class="color-number_small_bottom-right">+${dif}</span></div>`;

            if (y > 140000000 && leftBeforeInfection === 0) {
                leftBeforeInfection = i - iToday;
            }
        }
    }

    result.innerHTML = resultCom;

    function resultFunc(x) {
        return humans / 100 * countHumansSum;
    }

    function funcIResult() {
        if (arrComparePercent[arrComparePercent.length - 1] > arrComparePercent[arrComparePercent.length - 2]) {
            return iResult = `<i class="fa fa-arrow-up i-fa-speed" aria-hidden="true"></i>`
        } else if (arrComparePercent[arrComparePercent.length - 1] < arrComparePercent[arrComparePercent.length - 2]) {
            return iResult = `<i class="fa fa-arrow-down" aria-hidden="true"></i>`
        } else {
            return iResult = `<i class="fa fa-arrow-right" aria-hidden="true"></i>`
        }
    }

    function sec() {
        let today = new Date().toLocaleDateString();
        let todayTime = new Date().toLocaleTimeString();

        resultTop.innerHTML = `
<div class="res_top_flex_left">
<div>
<div class="res_top_text">день</div>
</div>
<div>
<div class="res_top_text">Зар.</div>
</div>
<div>
<div class="res_top_text">средний</div>
</div>
<div>
<div class="res_top_text">Выздор.</div>
</div>
<div>
<div class="res_top_text">Смерт.</div>
</div>
<div>
<div class="res_top_text">Cвердл. обл.</div>
</div>
<div>
<div class="res_top_text">Актив.</div>
</div>
<div>
<div class="res_top_text">До ПЗ</div>
</div>
</div>

<div class="res_top_flex_right">
<div>
<span class="color-number">${iToday}</span><span class="color-number">${today}</span>
</span> <span class="color-number">${todayTime}</span>
</div>
<div>
<span class="color-number">${arrHumans[arrHumans.length - 1]} (+${difference})</span><span class="color-number">${iResult} ${difference2}%</span>
</div>
<div>
<span class="color-number">${countHumansSum}%</span>
</div>
<div>
<span class="color-number recovered_color">${recovered}</span> 
</div>
<div>
<span class="color-number">${deaths}</span> 
</div>
<div>
<span class="color-number">${sverdlRegion}</span> <span class="color-number recovered_color">${sverdlRegionRecovered}</span>
</div>
<div>
<span class="color-number">${active}</span> 
</div>
<div>
<span class="color-number">${leftBeforeInfection}</span>
</div></div>`;

    }
    setInterval(sec, 1000);
};

render();

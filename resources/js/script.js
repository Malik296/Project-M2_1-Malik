let button = document.getElementById("action");
button.addEventListener('click', callFunction);

let closeButton = document.getElementById("closebtn");
closeButton.addEventListener('click', closeErrorAlert);

function closeErrorAlert() {
    document.getElementById('alert').style.display = "none";
}

function callFunction() {
    let firstAmount = correctInmput(+document.getElementById('first-amoun').value);
    let mounthAmount = correctInmput(+document.getElementById('mounthly-amount').value);
    let percent = correctPercent(+document.getElementById('percent').value);
    let days = correctDay(+document.getElementById('days').value);

    if (isNaN(firstAmount)) {
        alertErrorMesage('Не корректная начальная сумма!');
    } else if (isNaN(mounthAmount)) {
        alertErrorMesage('Не корректная сумма ежемесячного пополнения!');
    } else if (isNaN(percent)) {
        alertErrorMesage('Не корректная процентная ставка!');
    } else if (isNaN(days)) {
        alertErrorMesage('Не корректный  срок вклада!');
    } else {
        closeErrorAlert();
        alert(`Ваш финальный счет: \n ${alertResult(firstAmount, mounthAmount, percent, days).toFixed(2)} `)
    }

    console.log(days);
}

function correctDay(days){
    if (Math.trunc(days) != days) {
        return NaN;
    }
    return correctInmput(days);
}

function alertErrorMesage(mesage) {
    document.getElementById('error-mesage').innerHTML = mesage;
    document.getElementById('alert').style.display = "block";
}

function alertResult(firstAmount, mounthAmount, percent, days) {
    let result = firstAmount;
    for (let i = 0; i < days / 30; i++) {
        result *= (1 + (percent * 30) / (100 * 360));
        result += mounthAmount;
    }
    return result;
}


function correctPercent(percent) {
    correctInmput(percent);
    if (percent > 100) {
        console.log('Процент привышел лимит! (Мах: 100%)')
        return NaN;
    }
    return percent;
}

function correctInmput(testValue) {
    if (testValue < 0 || isNaN(testValue)) {
        console.log('Не корректные данные!')
        return NaN;
    } else {
        return testValue;
    }
}
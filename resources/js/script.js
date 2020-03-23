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
    let typeReplenishment = document.getElementById('type-replenishment').value;

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
        alert(`Ваш финальный счет: \n ${alertResult(firstAmount, mounthAmount, percent, days, typeReplenishment).toFixed(2)} `)
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

function alertResult(firstAmount, mounthAmount, percent, days, typeReplenishment) {
    let period = 0;
    if (typeReplenishment == 'mounthly') {
        period = 1;
    } else if (typeReplenishment == 'quarterly') {
        period = 3;
    } else {
        period = 12;
    }
    let result = firstAmount;

    for (let i = 0; i < Math.trunc( days / 30); i++) {
        result *= (1 + (percent * 30) / (100 * 360));
        if ((i + 1) % period == 0) {
            result += mounthAmount;
        }
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
function additionLadder(level, subtraction) {
    var x, y;
    switch (level) {
        case 0:
            x = getRandom(0, 5);
            y = getRandom(0, 5);
            break;
        case 0.1:
            x = getRandom(5, 10);
            y = getRandom(5, 10);
            break;
        case 0.2:
            x = getRandom(10, 20);
            y = getRandom(10, 20);
            break;
        case 0.3:
            x = getRandom(20, 50);
            y = getRandom(20, 50);
            break;
        case 0.4:
            x = getRandom(50, 100);
            y = getRandom(50, 100);
            break;
        case 0.5:
            x = getRandom(100, 500);
            y = getRandom(100, 500);
            break;
        case 0.6:
            x = getRandom(100, 999);
            y = getRandom(100, 999);
            break;
        case 0.7:
            x = getRandom(500, 999);
            y = getRandom(500, 999);
            break;
        case 0.8:
            x = getRandom(1000, 9999);
            y = getRandom(1000, 9999);
            break;
        case 0.9:
            x = getRandom(10000, 99999);
            y = getRandom(10000, 99999);
            break;
        case 1:
            x = getRandom(100000, 999999);
            y = getRandom(100000, 999999);
            break;
    }
    if (subtraction) {
        question.push(fourOps(roundError(Math.max(x, y)), roundError(Math.min(x, y)), "-"));
    } else {
        question.push(fourOps(roundError(x), roundError(y), "+"));
    }
}
function additionDecimalLadder(level, subtraction) {
    var x, y;
    x = getRandom(0, 1) + getRandom(1, 5) / Math.pow(10, getRandom(1, 1));
    y = getRandom(0, 1) + getRandom(1, 5) / Math.pow(10, getRandom(1, 1));
    if (level > 0.1) {
        x = getRandom(0, 5) + getRandom(5, 10) / Math.pow(10, getRandom(1, 1));
        y = getRandom(0, 5) + getRandom(5, 10) / Math.pow(10, getRandom(1, 1));
    }
    if (level > 0.2) {
        x = getRandom(10, 99) / Math.pow(10, getRandom(1, 2));
        y = getRandom(10, 99) / Math.pow(10, getRandom(1, 2));
    }
    if (level > 0.3) {
        x = getRandom(10, 99) / Math.pow(10, getRandom(2, 3));
        y = getRandom(10, 99) / Math.pow(10, getRandom(2, 3));
    }
    if (level > 0.4) {
        x = getRandom(100, 999) / Math.pow(10, getRandom(1, 3));
        y = getRandom(100, 999) / Math.pow(10, getRandom(1, 3));
    }
    if (level > 0.5) {
        x = getRandom(100, 999) / Math.pow(10, getRandom(1, 4));
        y = getRandom(100, 999) / Math.pow(10, getRandom(1, 4));
    }
    if (level > 0.7) {
        x = getRandom(100, 999) / Math.pow(10, getRandom(2, 5));
        y = getRandom(100, 999) / Math.pow(10, getRandom(2, 5));
    }
    if (level > 0.9) {
        x = getRandom(1000, 9999) / Math.pow(10, getRandom(3, 6));
        y = getRandom(1000, 9999) / Math.pow(10, getRandom(3, 6));
    }
    if (subtraction) {
        question.push(fourOps(roundError(Math.max(x, y)), roundError(Math.min(x, y)), "-"));
    } else {
        question.push(fourOps(roundError(x), roundError(y), "+"));
    }
}
function multiplicationLadder(level, division) {
    var x, y;
    switch (level) {
        case 0:
            x = getRandom(0, 5);
            y = getRandom(0, 5);
            break;
        case 0.1:
            x = getRandom(5, 10);
            y = getRandom(5, 10);
            break;
        case 0.2:
            x = getRandom(2, 9);
            y = getRandom(13, 49);
            break;
        case 0.3:
            x = getRandom(2, 9);
            y = getRandom(51, 199);
            break;
        case 0.4:
            x = getRandom(11, 29);
            y = getRandom(11, 29);
            break;
        case 0.5:
            x = getRandom(21, 99);
            y = getRandom(21, 99);
            break;
        case 0.6:
            x = getRandom(11, 19);
            y = getRandom(101, 499);
            break;
        case 0.7:
            x = getRandom(51, 99);
            y = getRandom(101, 999);
            break;
        case 0.8:
            x = getRandom(11, 19);
            y = getRandom(101, 499);
        case 0.9:
            x = getRandom(101, 199);
            y = getRandom(101, 199);
            break;
        case 1:
            x = getRandom(199, 999);
            y = getRandom(199, 999);
            break;
    }
    if (division) {
        question.push(fourOps(roundError(x * y), roundError(x), "/"));
    } else {
        question.push(fourOps(roundError(x), roundError(y), "*"));
    }
}
function multiplicationDecimalLadder(level, division) {
    var x, y;
    switch (level) {
        case 0:
            x = getRandom(1, 5);
            y = getRandom(1, 5) / Math.pow(10, getRandom(1, 1));
            break;
        case 0.1:
            x = getRandom(1, 5) / Math.pow(10, getRandom(1, 1));
            y = getRandom(1, 9);
            break;
        case 0.2:
            x = getRandom(1, 9);
            y = getRandom(1, 9) / Math.pow(10, getRandom(1, 2));
            break;
        case 0.3:
            x = getRandom(1, 5) / Math.pow(10, getRandom(1, 1));
            y = getRandom(1, 5) / Math.pow(10, getRandom(1, 1));
        case 0.4:
            x = getRandom(1, 5) / Math.pow(10, getRandom(1, 2));
            y = getRandom(1, 5) / Math.pow(10, getRandom(1, 2));
        case 0.5:
            x = getRandom(1, 9) / Math.pow(10, getRandom(1, 2));
            y = getRandom(1, 9) / Math.pow(10, getRandom(1, 2));
        case 0.6:
            x = getRandom(11, 20) / Math.pow(10, getRandom(1, 2));
            y = getRandom(11, 20) / Math.pow(10, getRandom(1, 2));
            break;
        case 0.7:
            x = getRandom(11, 50) / Math.pow(10, getRandom(1, 2));
            y = getRandom(11, 50) / Math.pow(10, getRandom(0, 2));
            break;
        case 0.8:
            x = getRandom(50, 100) / Math.pow(10, getRandom(1, 2));
            y = getRandom(20, 50) / Math.pow(10, getRandom(0, 2));
            break;
        case 0.9:
            x = getRandom(50, 200) / Math.pow(10, getRandom(1, 2));
            y = getRandom(20, 50) / Math.pow(10, getRandom(0, 2));
            break;
        case 1:
            x = getRandom(100, 500) / Math.pow(10, getRandom(1, 3));
            y = getRandom(20, 50) / Math.pow(10, getRandom(1, 2));
            break;
    }

    if (division) {
        question.push(fourOps(roundError(x * y), roundError(y), "/"));
    } else {
        question.push(fourOps(roundError(x), roundError(y), "*"));
    }
}
function fourOpsLadder(level) {
    switch (getRandom(0, 3)) {
        case 0:
            additionLadder(level);
            break;
        case 1:
            additionLadder(level, true);
            break;
        case 2:
            multiplicationLadder(level);
            break;
        case 3:
            multiplicationLadder(level, true);
            break;
    }
}
function fourOpsDecimalLadder(level) {
    switch (getRandom(0, 3)) {
        case 0:
            additionDecimalLadder(level);
            break;
        case 1:
            additionDecimalLadder(level, true);
            break;
        case 2:
            multiplicationDecimalLadder(level);
            break;
        case 3:
            multiplicationDecimalLadder(level, true);
            break;
    }
}
function halvingLadder(level) {
    var x;
    switch (level) {
        case 0:
            x = 2 * getRandom(1, 5);
            break;
        case 0.1:
            x = 2 * getRandom(6, 20);
            break;
        case 0.2:
            x = 2 * getRandom(21, 100);
            break;
        case 0.3:
            x = 2 * getRandom(11, 49) + 1;
            break;
        case 0.4:
            x = 2 * getRandom(101, 499) + 1;
            break;
        case 0.5:
            x = getRandom(1001, 9999);
            break;
        case 0.6:
            x = 2 * getRandom(11, 49) / Math.pow(10, getRandom(1, 2));
            break;
        case 0.7:
            x = getRandom(11, 99) / Math.pow(10, getRandom(1, 2));
            break;
        case 0.8:
            x = getRandom(101, 999) / Math.pow(10, getRandom(1, 3));
            break;
        case 0.9:
            x = getRandom(1001, 9999) / Math.pow(10, getRandom(1, 3));
            break;
        case 1:
            x = getRandom(10001, 99999) / Math.pow(10, getRandom(1, 4));
            break;
    }
    question.push(halving(roundError(x)));
}
function doublingLadder(level) {
    var x;
    switch (level) {
        case 0:
            x = getRandom(1, 9);
            break;
        case 0.1:
            x = getRandom(11, 99);
            break;
        case 0.2:
            x = getRandom(101, 999);
            break;
        case 0.3:
            x = getRandom(1001, 9999);
            break;
        case 0.4:
            x = getRandom(1, 99) / 10;
            break;
        case 0.5:
            x = getRandom(11, 999) / 100;
            break;
        case 0.6:
            x = getRandom(10001, 99999);
            break;
        case 0.7:
            x = getRandom(101, 999) / Math.pow(10, getRandom(1, 3));
            break;
        case 0.8:
            x = getRandom(1001, 9999) / Math.pow(10, getRandom(1, 3));
            break;
        case 0.9:
            x = getRandom(10001, 99999) / Math.pow(10, getRandom(2, 4));
            break;
        case 1:
            x = getRandom(100001, 999999) / Math.pow(10, getRandom(3, 5));
            break;
    }
    question.push(doubling(roundError(x)));
}
function fractionOfAmountLadder(level) {
    var x, y, amount;
    switch (level) {
        case 0:
            x = 1;
            y = 2;
            break;
        case 0.1:
            x = 1;
            y = 4;
            break;
        case 0.2:
            y = 4;
            x = getRandom(2, 3);
            break;
        case 0.3:
            y = 3;
            x = getRandom(1, 2);
            break;
        case 0.4:
            y = getRandom(3, 10);
            x = getRandom(1, y);
            break;
        case 0.5:
            y = getRandom(10, 15);
            x = getRandom(1, y);
            break;
        case 0.6:
            y = getRandom(15, 20);
            x = getRandom(1, y);
            break;
        case 0.7:
            x = getRandom(2, 5);
            y = getRandom(2, x);
            break;
        case 0.8:
            x = getRandom(4, 10);
            y = getRandom(2, x);
            break;
        case 0.9:
            x = getRandom(10, 15);
            y = getRandom(2, x);
            break;
        case 1:
            x = getRandom(15, 30);
            y = getRandom(2, x);
            break;
    }
    if (x % y === 0) {
        x++;
    }
    amount = y * getRandom(2, 9) * getRandom(1, 5 * level);
    question.push(fractionOfAmount(x, y, amount));
}
function fractionalChangeLadder(level) {
    var x, y, amount;
    var decrease = false;
    if (level > 0.1 && Math.random() < 0.5) {
        decrease = true;
    }
    switch (level) {
        case 0:
            x = 1;
            y = 2;
            break;
        case 0.1:
            x = 1;
            y = 4;
            break;
        case 0.2:
            y = 4;
            x = getRandom(2, 3);
            break;
        case 0.3:
            y = 3;
            x = getRandom(1, 2);
            break;
        case 0.4:
            y = getRandom(3, 10);
            x = getRandom(1, y);
            break;
        case 0.5:
            y = getRandom(10, 15);
            x = getRandom(1, y);
            break;
        case 0.6:
            y = getRandom(15, 20);
            x = getRandom(1, y);
            break;
        case 0.7:
            x = getRandom(2, 5);
            y = getRandom(2, x);
            break;
        case 0.8:
            x = getRandom(4, 10);
            y = getRandom(2, x);
            break;
        case 0.9:
            x = getRandom(10, 15);
            y = getRandom(2, x);
            break;
        case 1:
            x = getRandom(15, 30);
            y = getRandom(2, x);
            break;
    }
    if (x % y === 0) {
        x++;
    }
    amount = y * getRandom(2, 9) * getRandom(1, 5 * level);
    question.push(fractionalChange(x, y, amount, decrease));
}
function percentageOfAmountLadder(level) {
    var percentage, amount;
    var percent = new Array(50, 25, 75, 10, 5, 20, 1);
    var minLevel = level * 10 - 3;
    if (minLevel < 0) {
        minLevel === 0;
    }
    if (level < 0.7) {
        percentage = percent[Math.max(minLevel, getRandom(0, level * 10))];
    }
    switch (level) {
        case 0.7:
            do {
                percentage = 5 * getRandom(3, 19);
            } while (percentage % 10 === 0 || percentage % 25 === 0);
            break;
        case 0.8:
            do {
                percentage = getRandom(1, 100);
            } while (percentage % 5 === 0 || percentage % 4 === 0);
            break;
        case 0.9:
            do {
                percentage = getRandom(101, 199);
            } while (percentage % 5 === 0 || percentage % 4 === 0);
            break;
        case 1:
            do {
                percentage = getRandom(200, 399);
            } while (percentage % 5 === 0 || percentage % 4 === 0);
            break;
    }
    amount = getRandom(2, 20 + 20 * level);
    if (level < 0.3 && amount % 4 !== 0) {
        amount += amount % 4;
    }
    if (level > 0.2 && level < 0.6 && amount % 5 !== 0) {
        amount += amount % 5;
    }
    question.push(percentageOfAmount(percentage, amount));
}
function percentageIncreaseDecreaseLadder(level) {
    var percentage, amount;
    var increase = true;
    if (Math.random() < 0.5) {
        increase = false;
    }
    var percent = new Array(50, 25, 75, 10, 5, 20, 1);
    var minLevel = level * 10 - 3;
    if (minLevel < 0) {
        minLevel === 0;
    }
    if (level < 0.7) {
        percentage = percent[Math.max(minLevel, getRandom(0, level * 10))];
    }
    switch (level) {
        case 0.7:
            do {
                percentage = 5 * getRandom(3, 19);
            } while (percentage % 10 === 0 || percentage % 25 === 0);
            break;
        case 0.8:
            do {
                percentage = getRandom(1, 100);
            } while (percentage % 5 === 0 || percentage % 4 === 0);
            break;
        case 0.9:
            do {
                percentage = getRandom(101, 199);
            } while (percentage % 5 === 0 || percentage % 4 === 0);
            break;
        case 1:
            do {
                percentage = getRandom(200, 399);
            } while (percentage % 5 === 0 || percentage % 4 === 0);
            break;
    }
    amount = getRandom(2, 20 + 20 * level);
    if (level < 0.3 && amount % 4 !== 0) {
        amount += amount % 4;
    }
    if (level > 0.2 && level < 0.6 && amount % 5 !== 0) {
        amount += amount % 5;
    }
    question.push(percentageIncreaseDecrease(percentage, amount, increase, false));
}
function percentageChangeLadder(level) {
    do {
        var oldAmount = getRandom(1 + level * 40, 10 + level * 100);
        var newAmount = getRandom(1 + level * 40, 10 + level * 100);
        var change = roundError(100 * (oldAmount - newAmount) / oldAmount);
    } while (oldAmount === newAmount || (change !== Math.round(change) && level < 0.6) || change !== Math.round(10 * change) / 10);
    question.push(percentageChange(oldAmount, newAmount));
}
function percentageMultiplierLadder(level) {
    var percentage, type;
    var percent = new Array(50, 25, 75, 10, 5, 20, 1, 15, 35, 95, 60, 35, 90, 80);
    percentage = percent[getRandom(0, percent.length - 1)];
    type = 0;
    if (level > 0) {
        type = 1;
    }
    if (level > 0.1) {
        type = 2;
    }
    if (level > 0.2) {
        type = getRandom(0, 2);
    }
    if (level > 0.4) {
        percentage = getRandom(level * 50, 5 + level * 200);
    }
    question.push(percentageMultipliers(percentage, type));
}
function repeatedPercentageChangeLadder(level) {
    var originalAmount = 20 * getRandom(10, 200);
    var percent = new Array(10, 50, 20, 5, 25, 75, 1, 15, 35, 95, 60, 35, 90, 80);
    var percentage = percent[getRandom(0, 2)];
    var iterations = getRandom(2, 3 + level * 15);
    var increase = true;

    if (level > 0.1) {
        percent[getRandom(0, percent.length - 1)];
    }
    if (level > 0.3) {
        percentage = getRandom(0, 5 + level * 100);
    }
    if (level > 0.4 && toss()) {
        increase = false;
    }
    if (level < 0.5) {
        originalAmount = 100 * getRandom(1, 20);
    }
    if (level < 0.2) {
        originalAmount = 200 * getRandom(1, 5);
    }
    if (level > 0.6 && toss()) {
        percentage += 0.5;
    }
    if (level > 0.8 && toss()) {
        percentage /= 10;
    }
    if (level > 0.9 && toss()) {
        percentage += 100;
    }
    if (percentage > 100 && !increase) {
        increase = true;
    }
    question.push(repeatedPercentageChange(originalAmount, percentage, iterations, increase));
}
function reversePercentageLadder(level) {
    var percentage, amount;
    var increase = true;
    if (Math.random() < 0.5) {
        increase = false;
    }
    var percent = new Array(50, 25, 75, 10, 5, 20, 1);
    var minLevel = level * 10 - 3;
    if (minLevel < 0) {
        minLevel === 0;
    }
    if (level < 0.7) {
        percentage = percent[Math.max(minLevel, getRandom(0, level * 10))];
    }
    switch (level) {
        case 0.7:
            do {
                percentage = 5 * getRandom(3, 19);
            } while (percentage % 10 === 0 || percentage % 25 === 0);
            break;
        case 0.8:
            do {
                percentage = getRandom(1, 100);
            } while (percentage % 5 === 0 || percentage % 4 === 0);
            break;
        case 0.9:
            do {
                percentage = getRandom(101, 199);
            } while (percentage % 5 === 0 || percentage % 4 === 0);
            break;
        case 1:
            do {
                percentage = getRandom(200, 399);
            } while (percentage % 5 === 0 || percentage % 4 === 0);
            break;
    }
    amount = 10 * getRandom(2, 20 + 20 * level);
    if (level < 0.3 && amount % 4 !== 0) {
        amount += amount % 4;
    }
    if (level > 0.2 && level < 0.6 && amount % 5 !== 0) {
        amount += amount % 5;
    }
    question.push(percentageIncreaseDecrease(percentage, amount, increase, true));
}
function roundingSigFigLadder(level) {
    var x, accuracy;
    switch (level) {
        case 0:
            accuracy = 1;
            x = (10 * getRandom(1, 9) + getRandom(1, 9));
            break;
        case 0.1:
            accuracy = 1;
            x = (10 * getRandom(10, 99) + getRandom(1, 9));
            break;
        case 0.2:
            accuracy = 1;
            x = (10 * getRandom(1, 9) + getRandom(1, 9)) / Math.pow(10, getRandom(2, 4));
            break;
        case 0.3:
            accuracy = 1;
            x = (10 * getRandom(10, 99) + getRandom(1, 9)) / Math.pow(10, getRandom(3, 5));
            break;
        case 0.4:
            accuracy = 2;
            x = (10 * getRandom(100, 999) + getRandom(1, 9));
            break;
        case 0.5:
            accuracy = 2;
            x = (10 * getRandom(100, 999) + getRandom(1, 9)) / Math.pow(10, getRandom(0, 2));
            break;
        case 0.6:
            accuracy = 2;
            x = (10 * getRandom(10, 99) + getRandom(1, 9)) / Math.pow(10, getRandom(2, 5));
            break;
        case 0.7:
            accuracy = 2;
            x = (10 * getRandom(10, 99) + getRandom(1, 9)) / Math.pow(10, getRandom(3, 6));
            break;
        case 0.8:
            accuracy = getRandom(2, 3);
            x = getRandom(0, 1000) / Math.pow(10, getRandom(0, 6));
            break;
        case 0.9:
            accuracy = getRandom(2, 3);
            x = getRandom(0, 100000) / Math.pow(10, getRandom(0, 5));
            break;
        case 1:
            accuracy = getRandom(3, 4);
            x = getRandom(0, 1000000) / Math.pow(10, getRandom(0, 6));
            break;
    }
    question.push(sigFigs(roundError(x), accuracy));
}
function roundingDecimal(level) {
    var x, accuracy;
    switch (level) {
        case 0:
            accuracy = 1;
            x = (10 * getRandom(1, 9) + getRandom(1, 9)) / 10;
            break;
        case 0.1:
            accuracy = 1;
            x = (10 * getRandom(10, 99) + getRandom(1, 9)) / Math.pow(10, getRandom(1, 2));
            break;
        case 0.2:
            accuracy = 1;
            x = (100 * getRandom(100, 999) + getRandom(1, 9)) / Math.pow(10, getRandom(2, 3));
        case 0.3:
            accuracy = 0.1;
            x = (10 * getRandom(10, 99) + getRandom(1, 9)) / 100;
            break;
        case 0.4:
            accuracy = 0.01;
            x = getRandom(1000, 9999) / Math.pow(10, getRandom(3, 5));
            break;
        case 0.5:
            accuracy = 0.001;
            x = getRandom(1000, 9999) / Math.pow(10, getRandom(4, 5));
            break;
        case 0.6:
            accuracy = 0.0001;
            x = getRandom(1000, 9999) / Math.pow(10, getRandom(5, 6));
            break;
        case 0.7:
            accuracy = 0.0001;
            x = getRandom(1000, 9999) / Math.pow(10, getRandom(5, 6));
        case 0.8:
            accuracy = 1 / Math.pow(10, getRandom(2, 3));
            x = getRandom(100000, 1000000) / Math.pow(10, getRandom(5, 6));
        case 0.9:
            accuracy = 1 / Math.pow(10, getRandom(3, 4));
            x = getRandom(100000, 1000000) / Math.pow(10, getRandom(5, 7));
        case 1:
            accuracy = 1 / Math.pow(10, getRandom(4, 5));
            x = getRandom(100000, 1000000) / Math.pow(10, getRandom(5, 8));
            break;
    }
    question.push(rounding(roundError(x), accuracy));
}
function roundingPowerOfTen(level) {
    var x, accuracy;
    switch (level) {
        case 0:
            accuracy = 10;
            x = getRandom(0, 100);
            break;
        case 0.1:
            accuracy = 10;
            x = getRandom(100, 1000) / Math.pow(10, getRandom(0, 1));
            break;
        case 0.2:
            accuracy = 10;
            x = getRandom(1000, 10000) / Math.pow(10, getRandom(0, 2));
            break;
        case 0.3:
            accuracy = 100;
            x = getRandom(0, 1000);
            break;
        case 0.4:
            accuracy = 100;
            x = getRandom(1000, 10000) / Math.pow(10, getRandom(0, 1));
            break;
        case 0.5:
            accuracy = 100;
            x = getRandom(10000, 100000) / Math.pow(10, getRandom(0, 2));
            break;
        case 0.6:
            accuracy = 1000;
            x = getRandom(1000, 10000);
            break;
        case 0.7:
            accuracy = 1000;
            x = getRandom(10000, 100000) / Math.pow(10, getRandom(0, 1));
            break;
        case 0.8:
            accuracy = 1000;
            x = getRandom(100000, 1000000) / Math.pow(10, getRandom(0, 3));
            break;
        case 0.9:
            accuracy = 10000;
            x = getRandom(100000, 1000000) / Math.pow(10, getRandom(0, 3));
            break;
        case 1:
            accuracy = 100000;
            x = getRandom(1000000, 10000000) / Math.pow(10, getRandom(0, 3));
            break;
    }
    question.push(rounding(roundError(x), accuracy));
}
function addingNegativesLadder(level) {
    var n = 2 + level * 3;
    var maxSum = 20 + level * 50;
    var maxTerm = 5 + level * 20;
    var mixed = false;
    question.push(rewriteAsSum(n, maxSum, maxTerm, mixed, true, true));
}
function subtractingNegativesLadder(level) {
    var n = 2 + level * 3;
    var maxSum = 20 + level * 50;
    var maxTerm = 5 + level * 20;
    var mixed = false;
    question.push(rewriteAsSum(n, maxSum, maxTerm, mixed, true, false));
}
function addSubtractNegativesLadder(level) {
    var n = 3 + level * 3;
    var maxSum = 20 + level * 50;
    var maxTerm = 5 + level * 20;
    var mixed = true;
    question.push(rewriteAsSum(n, maxSum, maxTerm, mixed, true, false));
}
function multiplyingDividingNegativesLadder(level, type) {
    var x, y;
    x = getRandom(1, 5 + level * 40);
    y = getRandom(1, 5 + level * 40);
    x = -Math.abs(x);
    if (level === 0) {
        y += Math.abs(x);
    }
    if (level > 0.1 && toss()) {
        y = -Math.abs(y);
        x = Math.abs(x);
    }
    if (level > 0.3 && toss()) {
        y = -Math.abs(y);
        x = -Math.abs(x);
    }
    if (level > 0.5 & toss()) {
        x *= 3;
    }
    if (level > 0.6 & toss()) {
        y *= 3;
    }
    if (level > 0.8 & toss()) {
        x /= 10;
    }
    if (level > 0.9 & toss()) {
        y /= 10;
    }
    if (type === "/") {
        x *= y;
    }
    question.push(fourOps(roundError(x), roundError(y), type));
}
function negativeLadder(level) {
    var x, y;
    switch (getRandom(0, 3)) {
        case 0:
            addingNegativesLadder(level);
            break;
        case 1:
            subtractingNegativesLadder(level);
            break;
        case 2:
            multiplyingDividingNegativesLadder(level, "*");
            break;
        case 3:
            multiplyingDividingNegativesLadder(level, "/");
            break;
    }
}
function powersOfTenLadder(level) {
    var x, y;
    switch (level) {
        case 0:
            x = getRandom(1, 100);
            y = 10;
            question.push(fourOps(x, y, "*"));
            break;
        case 0.1:
            x = 10 * getRandom(1, 100);
            y = 10;
            question.push(fourOps(x, y, "/"));
            break;
        case 0.2:
            x = getRandom(1, 100);
            y = 100;
            question.push(fourOps(x, y, "*"));
            break;
        case 0.3:
            x = 100 * getRandom(1, 100);
            y = 100;
            question.push(fourOps(x, y, "/"));
            break;
        case 0.4:
            x = getRandom(10, 100) / 10;
            y = Math.pow(10, getRandom(1, 2));
            question.push(fourOps(x, y, "*"));
            break;
        case 0.5:
            x = getRandom(10, 100) / 10;
            y = Math.pow(10, getRandom(1, 2));
            question.push(fourOps(x, y, "/"));
            break;
        case 0.6:
            x = getRandom(100, 1000) / Math.pow(10, getRandom(1, 2));
            y = Math.pow(10, getRandom(1, 3));
            question.push(fourOps(roundError(x), roundError(y), "*"));
            break;
        case 0.7:
            x = getRandom(100, 1000) / Math.pow(10, getRandom(1, 2));
            y = Math.pow(10, getRandom(1, 3));
            question.push(fourOps(roundError(x), roundError(y), "/"));
            break;
        case 0.8:
            x = getRandom(100, 10000) / Math.pow(10, getRandom(1, 3));
            y = Math.pow(10, getRandom(2, 4));
            question.push(fourOps(roundError(x), roundError(y), "*"));
            break;
        case 0.9:
            x = getRandom(100, 10000) / Math.pow(10, getRandom(1, 3));
            y = Math.pow(10, getRandom(2, 4));
            question.push(fourOps(roundError(x), roundError(y), "/"));
            break;
        case 1:
            x = getRandom(1000, 100000) / Math.pow(10, getRandom(2, 4));
            y = Math.pow(10, getRandom(3, 5));
            if (Math.random() < 0.5) {
                question.push(fourOps(roundError(x), roundError(y), "*"));
            } else {
                question.push(fourOps(roundError(x), roundError(y), "/"));
            }
            break;
    }
}
function ratioShareLadder(level) {
    var amount = 0;
    var parts = 0;
    var ratio = new Array();
    var shares = Math.floor(2 + level * 3);
    if (level < 0.4) {
        shares = 2;
    }
    for (var i = 0; i < shares; i++) {
        ratio.push(getRandom(1, 3 + level * 12));
        parts += ratio[i];
    }
    if (shares === 2 && ratio[0] === ratio[1]) {
        ratio[1]++;
        parts++;
    }
    amount = parts * getRandom(2, 5 + level * 14);
    question.push(ratioShare(amount, ratio));
}
function ratioReverseLadder(level) {
    var amount = 0;
    var parts = 0;
    var ratio = new Array();
    var shares = Math.floor(2 + level * 3);
    if (level < 0.4) {
        shares = 2;
    }
    for (var i = 0; i < shares; i++) {
        ratio.push(getRandom(1, 3 + level * 12));
        parts += ratio[i];
    }
    if (shares === 2 && ratio[0] === ratio[1]) {
        ratio[1]++;
        parts++;
    }
    amount = parts * getRandom(2, 5 + level * 14);
    question.push(ratioReverse(amount, ratio));
}
function ratioDifferenceLadder(level) {
    var amount = 0;
    var parts = 0;
    var ratio = new Array();
    var shares = 2;
    if (level > 0.5) {
        shares++;
    }
    if (level < 0.4) {
        shares = 2;
    }
    for (var i = 0; i < shares; i++) {
        ratio.push(getRandom(1, 3 + level * 12));
        parts += ratio[i];
    }
    if (shares === 2 && ratio[0] === ratio[1]) {
        ratio[1]++;
        parts++;
    }
    if (shares === 3) {
        do {
            ratio[0] = getRandom(1, 3 + level * 12);
            ratio[1] = getRandom(1, 3 + level * 12);
            ratio[2] = getRandom(1, 3 + level * 12);
            parts = ratio[0] + ratio[1] + ratio[2];
        } while (ratio[0] === ratio[1] || ratio[0] === ratio[2] || ratio[1] === ratio[2])
    }
    amount = parts * getRandom(2, 5 + level * 14);
    question.push(ratioDifference(amount, ratio));
}
function convertingFDPLadder(level, from) {
    var types = new Array("FD", "FP", "PD", "PF", "DF", "DP");
    var num, den;
    switch (from) {
        case "random":
            var type = types[getRandom(0, types.length - 1)];
            break;
        case "fraction":
            type = types[getRandom(0, 1)];
            break;
        case "percentage":
            type = types[getRandom(2, 3)];
            break;
        case "decimal":
            type = types[getRandom(4, 5)];
            break;
    }

    switch (level) {
        case 0:
            num = 1;
            den = 2;
            break;
        case 0.1:
            num = getRandom(1, 3);
            den = 4;
            break;
        case 0.2:
            num = getRandom(1, 9);
            den = 10;
            break;
        case 0.3:
            num = getRandom(1, 4);
            den = 5;
            break;
        case 0.4:
            num = getRandom(1, 19);
            den = 20;
            break;
        case 0.5:
            num = getRandom(1, 39);
            den = 40;
            break;
        case 0.6:
            num = getRandom(1, 8);
            den = 8;
            break;
        case 0.7:
            num = getRandom(1, 100);
            den = 100;
            break;
        case 0.8:
            num = getRandom(1, 200);
            den = 100;
            break;
        case 0.9:
            num = getRandom(200, 600);
            den = 100;
            break;
        case 1:
            num = getRandom(500, 1000);
            den = 100;
            break;
    }
    question.push(convertFDP(type, num, den));
}
function collectingTermsLadder(level) {
    var letters = new Array('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'm', 'n', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'w');
    var lets = new Array();
    var vars = new Array();
    var cos = new Array();
    var choice = 21;
    var terms;
    switch (level) {
        case 0:
            terms = 2;
            lets.push(letters[choice]);
            for (var i = 0; i < terms; i++) {
                vars.push(lets[0]);
                cos.push(getRandom(1, 10));
            }
            break;
        case 0.1:
            terms = 2;
            lets.push(letters[choice]);
            for (i = 0; i < terms; i++) {
                vars.push(lets[0]);
            }
            cos.push(getRandom(5, 10));
            cos.push(getRandom(-5, -1));
            break;
        case 0.2:
            terms = 3;
            lets.push(letters[choice]);
            for (i = 0; i < terms; i++) {
                vars.push(lets[0]);
            }
            var lastCo = 1;
            for (i = 0; i < terms; i++) {
                var co = getRandom(1, 10);
                if (Math.random() < 0.5 && i > 0) {
                    co = -getRandom(1, lastCo);
                }
                cos.push(co);
                var lastCo = co;
            }
            break;
        case 0.3:
        {
            terms = getRandom(3, 4);
            lets.push(letters[choice]);
            lets.push(letters[choice + 1]);
            vars.push(lets[0]);
            for (i = 1; i < terms; i++) {
                vars.push(lets[getRandom(0, lets.length - 1)]);
            }
            for (i = 0; i < terms; i++) {
                co = getRandom(1, 10);
                cos.push(co);
            }
            break;
        }
        case 0.4:
        {
            terms = 3;
            lets.push(letters[choice]);
            lets.push(letters[choice + 1]);
            vars.push(lets[0]);
            for (i = 1; i < terms; i++) {
                vars.push(lets[getRandom(0, lets.length - 1)]);
            }
            for (i = 0; i < terms; i++) {
                co = getRandom(1, 10);
                if (Math.random() < 0.5 && i > 0) {
                    co = -co;
                }
                cos.push(co);
            }
            break;
        }
        case 0.5:
        {
            terms = 4;
            lets.push(letters[choice]);
            lets.push(letters[choice + 1]);
            vars.push(lets[0]);
            for (i = 1; i < terms; i++) {
                vars.push(lets[getRandom(0, lets.length - 1)]);
            }
            for (i = 0; i < terms; i++) {
                co = getRandom(1, 10);
                if (Math.random() < 0.5) {
                    co = -co;
                }
                cos.push(co);
            }
            break;
        }
        case 0.6:
        {
            terms = 4;
            lets.push(letters[choice] + letters[choice + 1]);
            lets.push(letters[choice + 2]);
            vars.push(lets[0]);
            for (i = 1; i < terms; i++) {
                vars.push(lets[getRandom(0, lets.length - 1)]);
            }
            for (i = 0; i < terms; i++) {
                co = getRandom(1, 10);
                if (Math.random() < 0.5) {
                    co = -co;
                }
                cos.push(co);
            }
            break;
        }
        case 0.7:
        {
            terms = 4;
            lets.push(letters[choice] + letters[choice + 1]);
            lets.push(letters[choice + 2] + "^2");
            vars.push(lets[0]);
            for (i = 1; i < terms; i++) {
                vars.push(lets[getRandom(0, lets.length - 1)]);
            }
            for (i = 0; i < terms; i++) {
                co = getRandom(1, 15);
                if (Math.random() < 0.5) {
                    co = -co;
                }
                cos.push(co);
            }
            break;
        }
        case 0.8:
        {
            terms = 4;
            lets.push(letters[choice]);
            lets.push(letters[choice + 1]);
            lets.push(letters[choice + 2]);
            vars.push(lets[0]);
            for (i = 1; i < terms; i++) {
                vars.push(lets[getRandom(0, lets.length - 1)]);
            }
            for (i = 0; i < terms; i++) {
                co = getRandom(1, 15);
                if (Math.random() < 0.5) {
                    co = -co;
                }
                cos.push(co);
            }
            break;
        }
        case 0.9:
        {
            terms = 5;
            lets.push(letters[choice] + letters[choice + 1]);
            lets.push(letters[choice + 2] + "^2");
            vars.push(lets[0]);
            for (i = 1; i < terms; i++) {
                vars.push(lets[getRandom(0, lets.length - 1)]);
            }
            for (i = 0; i < terms; i++) {
                co = getRandom(1, 15);
                if (Math.random() < 0.5) {
                    co = -co;
                }
                cos.push(co);
            }
            break;
        }
        case 1:
        {
            terms = 5;
            lets.push(letters[choice]);
            lets.push(letters[choice + 1]);
            lets.push(letters[choice + 2]);
            vars.push(lets[0]);
            for (i = 1; i < terms; i++) {
                vars.push(lets[getRandom(0, lets.length - 1)]);
            }
            for (i = 0; i < terms; i++) {
                co = getRandom(1, 15);
                if (Math.random() < 0.5) {
                    co = -co;
                }
                cos.push(co);
            }
            break;
        }
    }
    question.push(collectingTerms(lets, vars, cos));
}
function multiplyingTermsLadder(level) {
    if (level > 0.5) {
        var negatives = true;
    }
    var min = 0;
    if (level > 0.6) {
        var min = 3;
    }
    var type = getRandom(min, level * 6);
    question.push(multiplyingTerms(type, negatives));
}
function factorLadder(level) {
    var maxFactors, minNumber, maxNumber;
    switch (level) {
        case 0:
            maxFactors = 4;
            minNumber = 1;
            maxNumber = 25;
            break;
        case 0.1:
            maxFactors = 6;
            minNumber = 5;
            maxNumber = 30;
            break;
        case 0.2:
            maxFactors = 6;
            minNumber = 10;
            maxNumber = 40;
            break;
        case 0.3:
            maxFactors = 6;
            minNumber = 10;
            maxNumber = 60;
            break;
        case 0.4:
            maxFactors = 8;
            minNumber = 20;
            maxNumber = 80;
            break;
        case 0.5:
            maxFactors = 8;
            minNumber = 40;
            maxNumber = 100;
            break;
        case 0.6:
            maxFactors = 10;
            minNumber = 50;
            maxNumber = 200;
            break;
        case 0.7:
            maxFactors = 10;
            minNumber = 100;
            maxNumber = 400;
            break;
        case 0.8:
            maxFactors = 10;
            minNumber = 100;
            maxNumber = 800;
            break;
        case 0.9:
            maxFactors = 12;
            minNumber = 400;
            maxNumber = 1000;
            break;
        case 1:
            maxFactors = 15;
            minNumber = 1000;
            maxNumber = 4000;
            break;
    }
    question.push(factors(maxFactors, minNumber, maxNumber));
}
function multipleLadder(level) {
    var multiple, x;
    switch (level) {
        case 0:
            multiple = getRandom(1, 5);
            x = getRandom(1, 10);
            break;
        case 0.1:
            multiple = getRandom(1, 10);
            x = getRandom(1, 10);
            break;
        case 0.2:
            multiple = getRandom(1, 15);
            x = getRandom(5, 12);
            break;
        case 0.3:
            multiple = getRandom(1, 15);
            x = getRandom(5, 15);
            break;
        case 0.4:
            multiple = getRandom(1, 20);
            x = getRandom(5, 15);
            break;
        case 0.5:
            multiple = getRandom(1, 20);
            x = getRandom(1, 20);
            break;
        case 0.6:
            multiple = getRandom(1, 30);
            x = getRandom(5, 15);
            break;
        case 0.7:
            multiple = getRandom(5, 30);
            x = getRandom(11, 25);
            break;
        case 0.8:
            multiple = getRandom(10, 20);
            x = getRandom(15, 30);
            break;
        case 0.9:
            multiple = getRandom(10, 25);
            x = getRandom(20, 50);
            break;
        case 1:
            multiple = getRandom(15, 30);
            x = getRandom(20, 100);
            break;
    }
    question.push(multiples(multiple, x));
}
function hcfLadder(level, decomp) {
    var x, y;
    var z = 0;
    multiple = getRandom(1, 2 + level * 15);
    multiple *= getRandom(1, 2 + level * 15);
    x = multiple * getRandom(1, 2 + level * 20);
    y = multiple * getRandom(1, 2 + level * 20);
    while (y === x) {
        y = multiple * getRandom(1, 2 + level * 20);
    }
    if (level > 0.7) {
        z = multiple * getRandom(1, 2 + level * 20);
        while (z === x || z === y) {
            z = multiple * getRandom(1, 2 + level * 20);
        }
    }
    if (z > 0) {
        question.push(hcf(x, y, z, decomp));
    } else {
        question.push(hcf(x, y, null, decomp));
    }
}

function lcmLadder(level, decomp) {
    var x, y;
    var z = 0;
    var multiple = 1 + getRandom(0, level * 10);
    x = multiple * getRandom(2, 6 + level * 20);
    y = multiple * getRandom(2, 6 + level * 20);
    while (y == x) {
        y = multiple * getRandom(2, 6 + level * 20);
    }
    if (level > 0.7) {
        z = multiple * getRandom(2, 6 + level * 10);
        while (z == x || z == y) {
            z = multiple * getRandom(2, 6 + level * 10);
        }
    }
    if (z > 0) {
        question.push(lcm(x, y, z, decomp));
    } else {
        question.push(lcm(x, y, null, decomp));
    }
}
function simplifyingRatiosLadder(level) {
    var terms = Math.max(2, Math.round(level * 5));
    var maxPrime = Math.max(10, Math.round(level * 25));
    question.push(simplifyingRatios(terms, maxPrime));
}
function simplifyingFractionsLadder(level) {
    var maxPrime = Math.max(5, Math.round(level * 30));
    question.push(simplifyingFractions(maxPrime));
}
function nthTermLinearLadder(level) {
    var a, b, c;
    a = 0;
    b = getRandom(1, 6 + level * 12);
    c = 0;
    if (level > 0) {
        c = getRandom(1, 6 + level * 16);
    }
    if (level > 0.3 && toss()) {
        c *= -1;
    }
    if (level === 0.4 && toss()) {
        b *= -1;
        c = 0;
    }
    if (level > 0.5) {
        b = Math.abs(b) / 2;
    }
    if (level > 0.6) {
        b *= -1;
    }
    if (level > 0.7) {
        c /= 2;
    }
    if (level > 0.8) {
        b /= 5;
    }
    if (level > 0.9) {
        c /= 5;
    }
    b = roundError(b);
    c = roundError(c);
    question.push(nthTermFinding(a, b, c));
}
function nthTermQuadraticLadder(level) {
    var a, b, c;
    a = 1;
    b = 0;
    c = 0;
    if (level > 0) {
        c = getRandom(1, 5 + level * 10);
    }
    if (level > 0.1) {
        b = getRandom(1, 2 + level * 10);
        c = 0;
    }
    if (level > 0.2) {
        b = getRandom(1, 2 + level * 10);
        c = getRandom(1, 5 + level * 10);
    }
    if (level > 0.3 && toss()) {
        c *= -1;
    }
    if (level > 0.4 && toss()) {
        b *= -1;
    }
    if (level > 0.5) {
        a = getRandom(1, 1 + level * 8);
    }
    if (level > 0.6 && toss()) {
        a *= -1;
    }
    if (level > 0.7 && toss()) {
        c /= 2;
    }
    if (level > 0.8 && toss()) {
        b /= 2;
    }
    if (level > 0.8 && toss()) {
        a /= 2;
    }
    if (level > 0.9) {
        a = -Math.abs(a);
    }
    question.push(nthTermFinding(a, b, c));
}
function sequencesNextTermLadder(level) {
    var a, b, c;
    a = getRandom(1, 3 + level * 5);
    b = getRandom(1, 3 + level * 15);
    c = getRandom(1, 15 + level * 50);
    if (level < 0.7) {
        a = 0;
    }
    if (level < 0.1) {
        b = getRandom(1, 5);
        if (Math.random() < 0.2) {
            b = 10;
        }
    }
    if (level > 0.3 && Math.random() < 0.7) {
        c /= 2;
    }
    if (level > 0.4 && Math.random() < 0.7) {
        c = -c;
    }
    if (level > 0.5 && Math.random() < 0.7) {
        c /= 5;
    }
    if (level > 0.2 && Math.random() < 0.7) {
        b = -b;
        if (level < 0.5) {
            c = getRandom(4, 10) * Math.abs(b);
        }
    }
    if (level > 0.6 && Math.random() < 0.7) {
        b /= 2;
    }
    if (level > 0.7 && Math.random() < 0.7) {
        a = -a;
    }
    if (level > 0.8 && Math.random() < 0.7) {
        a /= 2;
    }
    question.push(sequencesNextTerm(a, b, c));
}
function nthTermGeneratingLadder(level) {
    var a, b, c;
    a = b = c = 0;
    switch (level) {
        case 0:
            b = getRandom(1, 10);
            break;
        case 0.1:
            do {
                b = getRandom(-10, 10);
            } while (b == 0);
            break;
        case 0.2:
            b = getRandom(1, 10);
            c = getRandom(1, 10);
            break;
        case 0.3:
            b = getRandom(1, 10);
            c = getRandom(-15, 15);
            break;
        case 0.4:
            do {
                b = getRandom(-10, 10);
                c = getRandom(-10, 10);
            } while (b == 0 || c == 0);
            break;
        case 0.5:
            do {
                b = getRandom(-15, 15);
                c = getRandom(-25, 25);
            } while (b == 0 || c == 0);
            break;
        case 0.6:
            a = getRandom(1, 10);
            break;
        case 0.7:
            a = getRandom(1, 5);
            c = getRandom(-10, 10);
            break;
        case 0.8:
            do {
                a = getRandom(-5, 5);
                b = getRandom(-10, 10);
            } while (a == 0 || b == 0);
            break;
        case 0.9:
            a = getRandom(1, 5);
            do {
                b = getRandom(-5, 5);
                c = getRandom(-25, 25);
            } while (b == 0 || c == 0);
            break;
        case 1:
            do {
                a = getRandom(-5, 5);
                b = getRandom(-10, 10);
                c = getRandom(-25, 25);
            } while (a == 0 || b == 0 || c == 0);
            break;
    }
    question.push(nthTermGenerating(a, b, c));
}
function nthTermSpecificTermLadder(level) {
    var a, b, c;
    a = b = c = 0;
    switch (level) {
        case 0:
            b = getRandom(1, 10);
            break;
        case 0.1:
            do {
                b = getRandom(-10, 10);
            } while (b == 0);
            break;
        case 0.2:
            b = getRandom(1, 10);
            c = getRandom(1, 10);
            break;
        case 0.3:
            b = getRandom(1, 10);
            c = getRandom(-15, 15);
            break;
        case 0.4:
            do {
                b = getRandom(-10, 10);
                c = getRandom(-10, 10);
            } while (b == 0 || c == 0);
            break;
        case 0.5:
            do {
                b = getRandom(-15, 15);
                c = getRandom(-25, 25);
            } while (b == 0 || c == 0);
            break;
        case 0.6:
            a = getRandom(1, 10);
            break;
        case 0.7:
            a = getRandom(1, 5);
            c = getRandom(-10, 10);
            break;
        case 0.8:
            do {
                a = getRandom(-5, 5);
                b = getRandom(-10, 10);
            } while (a == 0 || b == 0);
            break;
        case 0.9:
            a = getRandom(1, 5);
            do {
                b = getRandom(-5, 5);
                c = getRandom(-25, 25);
            } while (b == 0 || c == 0);
            break;
        case 1:
            do {
                a = getRandom(-5, 5);
                b = getRandom(-10, 10);
                c = getRandom(-25, 25);
            } while (a == 0 || b == 0 || c == 0);
            break;
    }
    var n = getRandom(1, 5 + level * 40);
    question.push(nthTermSpecificTerm(a, b, c, n));
}
function addingCoinsLadder(level) {
    var coins = Math.round((level * 8) + (level * 8) + 2);
    question.push(addingCoins(coins));
}
function countingCoinsLadder(level) {
    var coins = getRandom(2 + Math.pow(level * 10, 2), 5 + Math.pow(level * 10, 3));
    question.push(countingCoins(coins));
}
function speedDistTimeLadder(level) {
    level = roundError(level + 0.1);
    var divisor = 1;
    if (level > 0.4) {
        divisor *= 2;
    }
    if (level > 0.8) {
        divisor *= 2;
    }
    var speed = getRandom(1 * (level * 4) + 1, 1 + 5 * level * 4) * 10 / divisor;
    var time = getRandom(1 * (level * 4) + 1, 1 + 5 * level * 4) * 10 / divisor;
    question.push(speedDistTime(speed, time, getRandom(0, 2)));
}
function powersAndRootsLadder(level) {
    var x, a, b;
    a = getRandom(1, 5);
    b = getRandom(1, 5);
    x = Math.pow(getRandom(0, 10), b)
    switch (level) {
        case 0:
            a = 2;
            b = 1;
            break;
        case 0.1:
            a = 1;
            b = 2;
            break;
        case 0.2:
            a = 3;
            b = 1
            break;
        case 0.3:
            a = 1
            b = 3;
            break;
        case 0.4:
            a = getRandom(0, 3);
            b = 1;
            break;
        case 0.5:
            a = 1;
            b = getRandom(1, 3);
            break;
        case 0.6:
            a = getRandom(0, 3);
            b = getRandom(1, 3);
            break;
        case 0.7:
            a = getRandom(-2, 2);
            b = getRandom(1, 3);
            break;
        case 0.8:
            a = getRandom(-3, 3);
            b = getRandom(1, 4);
            break;
        case 0.9:
            a = getRandom(-4, 4);
            b = getRandom(2, 4);
            break;
        case 1:
            a = getRandom(-6, 6);
            b = getRandom(3, 5);
            break;
    }
    if (level > 0.6 && a == 0) {
        a--;
    }
    x = Math.pow(getRandom(1, 10), b);
    if (level > 0.6 && a > 0) {
        x = Math.pow(getRandom(1, 10) / Math.pow(10, getRandom(0, 1)), b);
    }
    question.push(powersAndRoots(roundError(x), a, b));
}
function orderingLadder(level) {
    var length, decimal, negative, descending, range;
    length = 3 + Math.round(level * 3);
    range = 10 + (level * 20);
    decimal = false;
    negative = false;
    descending = false;
    if (level > 0.1) {
        if (Math.random() < 0.5) {
            descending = true;
        }
    }
    if (level > 0.2) {
        negative = true;
    }
    if (level > 0.4 && level < 0.8) {
        decimal = true;
        negative = false;
    }
    if (level > 0.7) {
        negative = true;
        decimal = true;
    }
    if (decimal && negative) {
        length = 4;
    }
    question.push(ordering(length, decimal, negative, descending, range))
}
function oneStepEquationLadder(level, inequality) {
    var type, x, answer;
    x = getRandom(2, 4 + level * 12);
    answer = getRandom(2, 4 + level * 12);
    type = getRandom(0, Math.min(level * 15, 7));
    if (type == 3 && level < 0.5) {
        answer += x;
    }
    if (type == 4 && level < 0.5) {
        x += answer;
    }
    if (type == 5) {
        answer *= x;
    }
    if (type == 6) {
        x *= answer;
    }
    if (type == 7) {
        x = 2;
        if (level > 0.8) {
            x = getRandom(2, 4);
        }
        if (Math.random() < 0.1) {
            x = 1;
        }
    }
    if (level > 0.5 && type != 7) {
        if (Math.random() < 0.4) {
            x = -x;
        }
        if (Math.random() < 0.4) {
            answer = -answer;
        }
    }
    if (level > 0.7 && type != 7) {
        if (Math.random() < 0.4) {
            x /= 10;
        }
        if (Math.random() < 0.4) {
            answer /= 10;
        }
    }
    question.push(oneStepEquations(type, x, answer, inequality))
}
function twoStepEquationLadder(level, inequality) {
    var type, x, y, answer;
    x = getRandom(2, 4 + level * 12);
    y = getRandom(1, 4 + level * 12);
    answer = getRandom(2, 4 + level * 12);
    type = getRandom(0, Math.min(level * 12, 8));
    if (type == 4 && level < 0.5) {
        answer += y;
    }
    if (type == 3 || type == 4 || type == 5) {
        answer *= x;
    }
    if (type == 7 || type == 8) {
        x = 2;
        if (level > 0.8) {
            x = getRandom(2, 4);
        }
        if (Math.random() < 0.1) {
            x = 1;
        }
    }
    if (level > 0.6 && type != 7 && type != 8) {
        if (Math.random() < 0.4) {
            x = -x;
        }
        if (Math.random() < 0.4) {
            answer = -answer;
        }
    }
    if (level > 0.8 && type != 7 && type != 8) {
        if (Math.random() < 0.4) {
            x /= 5;
        }
        if (Math.random() < 0.4) {
            answer /= 5;
        }
    }
    question.push(twoStepEquations(type, x, y, answer, inequality));
}
function threeStepEquationLadder(level, inequality) {
    var x, y, z, answer;
    var reversable = false;
    do {
        x = getRandom(1, 3 + level * 10);
        y = getRandom(1, 3 + level * 10);
        z = getRandom(1, 3 + level * 10);
        answer = getRandom(2, 4 + level * 12);
        if (level > 0.1 && Math.random() < 0.7) {
            z = -z;
        }
        if (level > 0.3 && Math.random() < 0.7) {
            y = -y;
        }
        if (level > 0.5 && Math.random() < 0.7) {
            x = -x;
        }
    } while (x + y === 0 || roundError(x * answer + z) === 0);
    if (level > 0.4 && Math.random() < 0.5) {
        reversable = true;
    }
    if (level > 0.6 && Math.random() < 0.7) {
        answer /= 2;
    }
    if (level > 0.7 && Math.random() < 0.7) {
        answer = -answer;
    }
    if (level > 0.8 && Math.random() < 0.7) {
        answer /= 5;
    }
    question.push(threeStepEquations(x, y, z, answer, reversable, inequality));
}
function equationsWithBracketsLadder(level) {
    var x, y, answer;
    var reversable = false;
    x = getRandom(2, 3 + level * 10);
    y = getRandom(1, 4 + level * 10);
    z = getRandom(1, 4 + level * 10);
    answer = getRandom(0, 10 + level * 14);
    if (level > 0.1 && Math.random() < 0.7) {
        z = -z;
    }
    if (level < 0.2) {
        y = 1;
    }
    if (level > 0.5 && Math.random() < 0.7) {
        x = -x;
    }
    if (level > 0.6 && Math.random() < 0.7) {
        y = -y;
    }
    if (level > 0.7 && Math.random() < 0.7) {
        answer = -answer;
    }
    if (level > 0.8 && Math.random() < 0.7) {
        answer /= 2;
    }
    if (level > 0.9 && Math.random() < 0.7) {
        answer /= 5;
    }
    if (level > 0.4 && Math.random() < 0.5) {
        reversable = true;
    }
    question.push(equationsWithBrackets(x, y, z, answer, reversable));
}
function equationsWithBracketsBothLadder(level) {
    var reversable = false;
    do {
        var good = true;
        a = getRandom(2, 5 + level * 8);
        b = getRandom(1, 5 + level * 8);
        c = getRandom(1, 8 + level * 25);
        d = getRandom(2, 5 + level * 8);
        e = getRandom(1, 5 + level * 8);
        f = getRandom(1, 8 + level * 25);
        if (level > 0.1 && Math.random() < 0.7) {
            c = -c;
        }
        if (level > 0.3 && Math.random() < 0.7) {
            f = -f;
        }
        if (level > 0.5 && Math.random() < 0.7) {
            b = -b;
        }
        if (level > 0.7 && Math.random() < 0.7) {
            e = -e;
        }
        if (level > 0.8 && Math.random() < 0.7) {
            d = -d;
        }
        if (level > 0.9 && Math.random() < 0.7) {
            a = -a;
        }
        var answer = (d * f - a * c) / (a * b - d * e);
        if (level < 0.3 && answer < 0) {
            good = false;
        }
        if (level < 0.6 && answer !== Math.round(answer)) {
            good = false;
        }
        if (answer !== Math.round(10 * answer) / 10) {
            good = false;
        }
    } while (!good || (a * b - d * e) === 0);
    if (level > 0.4 && Math.random() < 0.5) {
        reversable = true;
    }
    question.push(equationsWithBracketsBoth(a, b, c, d, e, f, answer, reversable));
}
function equationsMixedLadder(level) {
    switch (getRandom(0, 4)) {
        case 0:
            oneStepEquationLadder(level);
            break;
        case 1:
            twoStepEquationLadder(level);
            break;
        case 2:
            threeStepEquationLadder(level);
            break;
        case 3:
            equationsWithBracketsLadder(level);
            break;
        case 4:
            equationsWithBracketsBothLadder(level);
            break;
    }
}
function substitutionLadder(level) {
    var negatives = false;
    if (level > 0.4) {
        negatives = true;
    }
    var max = Math.min(level * 15, 8);
    var min = level * 15 - 3;
    if (min < 0) {
        min = 0;
    }
    if (min > max) {
        min = max - 1;
    }
    var type = getRandom(min, max);
    var v1 = getRandom(1, 6 + 10 * level);
    var v2 = getRandom(1, 6 + 10 * level);
    if (level > 0.5 && Math.random() < 0.7) {
        v1 = -v1;
    }
    if (level > 0.8 && Math.random() < 0.7) {
        v2 = -v2;
    }
    if (level > 0.6 && Math.random() < 0.7) {
        v1 /= 10;
    }
    if (level > 0.9 && Math.random() < 0.7) {
        v2 /= 10;
    }
    question.push(substitution(type, negatives, v1, v2));
}
function numberBondsLadder(level) {
    var bond = new Array(10, 20, 40, 50, 100, 200, 500, 1000, 1, 1, 1);
    var currentBond = bond[getRandom(Math.max(0, level * 10 - 3), level * 10)];
    var type = getRandom(0, 7);
    if (level < 0.3) {
        type = getRandom(0, 3);
    }
    if (level >= 0.3) {
        type = getRandom(4, 7);
    }
    var x = getRandom(0, currentBond);
    if (currentBond === 1) {
        switch (level) {
            case 0.8:
                x = getRandom(1, 9) / 10;
                break;
            case 0.9:
                x = getRandom(11, 99) / 100;
                break;
            case 1:
                x = getRandom(101, 999) / 1000;
                break;
        }
    }
    question.push(numberBonds(type, currentBond, roundError(x)));
}
function tableBondsLadder(level) {
    var type = getRandom(0, 3);
    do {
        var a = getRandom(2, 5 + level * 20);
        var b = getRandom(2, 5 + level * 20);
        var c = getRandom(2, 5 + level * 20);
        var d = getRandom(2, 5 + level * 20);
    } while (a * b === a * c || c * d === b * c || a * b === b * d)
    question.push(tableBonds(type, a, b, c, d));
}
function addSubtractFractionsLadder(level, type) {
    var w1, w2, w3, n1, n2, n3, d1, d2, d3, o1, o2;
    o1 = "+";
    o2 = "+";
    switch (type) {
        case 0:
            o1 = "+";
            o2 = "+";
            break;
        case 1:
            o1 = "-";
            o2 = "-";
        case 2:
            if (Math.random() < 0.5) {
                o1 = "-";
            }
            if (Math.random() < 0.5) {
                o2 = "-";
            }
            break;
    }

    w1 = w2 = w3 = 0;
    do {
        n1 = 1 + getRandom(0, 2 + level * 5);
        n2 = 1 + getRandom(0, 2 + level * 5);
        n3 = 1 + getRandom(0, 2 + level * 5);
        d1 = n1 + 1 + getRandom(0, 2 + level * 6);
        d2 = n2 + 1 + getRandom(0, 2 + level * 6);
        d3 = n3 + 1 + getRandom(0, 2 + level * 6);
        if (level < 0.2) {
            n1 = getRandom(1, d1);
            n2 = getRandom(1, n1);
        }
        if (level < 0.4 && level > 0) {
            if (toss()) {
                d2 = d1 * getRandom(2, 5);
            } else {
                d1 = d2 * getRandom(2, 5);
            }
        }
        if (level < 0.1) {
            d2 = d1;
        }
        if (level < 0.7) {
            o2 = "";
        }
    } while (n1 / d1 < n2 / d2);
    question.push(fourOpsFractions(w1, n1, d1, w2, n2, d2, w3, n3, d3, o1, o2));
}

function addSubtractMixedLadder(level, type) {
    var w1, w2, w3, n1, n2, n3, d1, d2, d3, o1, o2;
    o1 = "+";
    o2 = "+";
    switch (type) {
        case 0:
            o1 = "+";
            o2 = "+";
            break;
        case 1:
            o1 = "-";
            o2 = "-";
        case 2:
            if (Math.random() < 0.5) {
                o1 = "-";
            }
            if (Math.random() < 0.5) {
                o2 = "-";
            }
            break;
    }
    w1 = w2 = w3 = 0;
    do {
        n1 = 1 + getRandom(0, 2 + level * 8);
        n2 = 1 + getRandom(0, 2 + level * 8);
        n3 = 1 + getRandom(0, 2 + level * 8);
        d1 = n1 + 1 + getRandom(0, 4 + level * 8);
        d2 = n2 + 1 + getRandom(0, 4 + level * 8);
        d3 = n3 + 1 + getRandom(0, 4 + level * 8);
        if (level < 0.2) {
            d1 = getRandom(2, 8);
            n1 = getRandom(1, d1);
            n2 = getRandom(1, n1);
        }
        w1 = getRandom(1, 5 * level);
        if (level > 0.3) {
            w2 = getRandom(1, 5 * level);
        }
        if (level > 0.6) {
            w3 = getRandom(1, 5 * level);
        }
        if (level < 0.5 && level > 0.2) {
            if (d1 > d2) {
                d2 = d1 * getRandom(2, 9);
            } else {
                d1 = d2 * getRandom(2, 9);
            }
        }
        if (level === 0.2) {
            if (d1 > d2) {
                d1 = d2 * getRandom(2, 4);
            } else {
                d2 = d1 * getRandom(2, 4);
            }
        }
        if (level < 0.2) {
            d2 = d1;
        }
        if (level < 0.7) {
            o2 = "";
        }
    } while (n1 / d1 < n2 / d2);
    question.push(fourOpsFractions(w1, n1, d1, w2, n2, d2, w3, n3, d3, o1, o2));
}

function multiplyDivideFractionsLadder(level, type) {
    var w1, w2, w3, n1, n2, n3, d1, d2, d3, o1, o2;
    o1 = "&#215;";
    o2 = "&#215;";
    switch (type) {
        case 0:
            o1 = "&#215;";
            o2 = "&#215;";
            break;
        case 1:
            o1 = "&divide;";
            o2 = "&divide;";
        case 2:
            if (Math.random() < 0.5) {
                o1 = "&divide;";
            }
            if (Math.random() < 0.5) {
                o2 = "&divide;";
            }
            break;
    }
    w1 = w2 = w3 = 0;
    do {
        n1 = 1 + getRandom(0, 2 + level * 7);
        n2 = 1 + getRandom(0, 2 + level * 7);
        n3 = 1 + getRandom(0, 2 + level * 7);
        d1 = n1 + 1 + getRandom(0, 2 + level * 5);
        d2 = n2 + 1 + getRandom(0, 2 + level * 5);
        d3 = n3 + 1 + getRandom(0, 2 + level * 5);
    } while (n1 / d1 < n2 / d2);
    if (level < 0.1 && o1 === "&divide;") {
        d1 = d2;
    }
    if (level < 0.2 && o1 === "&divide;") {
        d2 = d1 * getRandom(2, 3);
    }
    if (level < 0.3 && o1 === "&divide;") {
        d2 = d1 * getRandom(2, 5);
    }
    if (level < 0.7) {
        o2 = "";
    }
    question.push(fourOpsFractions(w1, n1, d1, w2, n2, d2, w3, n3, d3, o1, o2));
}

function multiplyDivideMixedLadder(level, type) {
    var w1, w2, w3, n1, n2, n3, d1, d2, d3, o1, o2;
    o1 = "&#215;";
    o2 = "&#215;";
    switch (type) {
        case 0:
            o1 = "&#215;";
            o2 = "&#215;";
            break;
        case 1:
            o1 = "&divide;";
            o2 = "&divide;";
        case 2:
            if (Math.random() < 0.5) {
                o1 = "&divide;";
            }
            if (Math.random() < 0.5) {
                o2 = "&divide;";
            }
            break;
    }
    w1 = w2 = w3 = 0;
    do {
        n1 = 1 + getRandom(0, 2 + level * 7);
        n2 = 1 + getRandom(0, 2 + level * 7);
        n3 = 1 + getRandom(0, 2 + level * 7);
        d1 = n1 + 1 + getRandom(0, 2 + level * 5);
        d2 = n2 + 1 + getRandom(0, 2 + level * 5);
        d3 = n3 + 1 + getRandom(0, 2 + level * 5);
    } while (n1 / d1 < n2 / d2);
    w1 = getRandom(1, 3 * level);
    if (level > 0.3) {
        w2 = getRandom(1, 3 * level);
    }
    if (level > 0.6) {
        w3 = getRandom(1, 3 * level);
    }
    if (level < 0.1 && o1 === "&divide;") {
        d1 = d2;
    }
    if (level < 0.2 && o1 === "&divide;") {
        d2 = d1 * getRandom(2, 3);
    }
    if (level < 0.3 && o1 === "&divide;") {
        d2 = d1 * getRandom(2, 5);
    }
    if (level < 0.7) {
        o2 = "";
    }
    question.push(fourOpsFractions(w1, n1, d1, w2, n2, d2, w3, n3, d3, o1, o2));
}


function fractionsFourOpsLadder(level) {
    switch (getRandom(0, 1)) {
        case 0:
            addSubtractFractionsLadder(level, 2);
            break;
        case 1:
            multiplyDivideFractionsLadder(level, 2);
            break;
    }
}
function meanLadder(level) {
    do {
        var data = [];
        var total = 0;
        for (var i = 0; i < 2 + level * 5; i++) {
            data.push(getRandom(1, 10 + level * 50));
            if (level > 0.5) {
                data[i] /= 10;
            }
            if (level > 0.6) {
                data[i] *= -1;
            }
            if (level > 0.8 && Math.random() < 0.5) {
                data[i] *= -1;
            }
            if (level > 0.9 && Math.random() < 0.5) {
                data[i] *= 10;
            }
            total += data[i];
        }
        var average = total / data.length;
    } while (Math.round(10 * average) / 10 != average);
    question.push(mean(data));
}
function medianLadder(level) {
    var data = [];
    var terms = 2 + level * 5 + getRandom(0, 1);
    if (level < 0.3 && terms % 2 == 0) {
        terms--;
    }
    if (level > 0.7 && terms % 2 == 1) {
        terms--;
    }
    for (var i = 0; i < terms; i++) {
        data.push(getRandom(1, 10 + level * 50));
        if (level > 0.5) {
            data[i] /= 10;
        }
        if (level > 0.6) {
            data[i] *= -1;
        }
        if (level > 0.8 && Math.random() < 0.5) {
            data[i] *= -1;
        }
        if (level > 0.9 && Math.random() < 0.5) {
            data[i] *= 10;
        }
    }
    question.push(median(data));
}
function rangeLadder(level) {
    var data = [];
    for (var i = 0; i < 2 + level * 5; i++) {
        data.push(getRandom(1, 10 + level * 100));
        if (level > 0.5) {
            data[i] /= 10;
        }
        if (level > 0.6) {
            data[i] *= -1;
        }
        if (level > 0.8 && Math.random() < 0.5) {
            data[i] *= -1;
        }
        if (level > 0.9 && Math.random() < 0.5) {
            data[i] *= 20;
        }
    }
    question.push(range(data));
}
function modeLadder(level) {
    var data = [];
    if (level < 0.4 && Math.random() < 0.8) {
        switch (getRandom(0, 4)) {
            case 0:
                for (var i = 0; i < 3 + level * 10; i++) {
                    data.push(colourPicker());
                }
                break;
            case 1:
                for (var i = 0; i < 3 + level * 10; i++) {
                    data.push(fruitPicker());
                }
                break;
            case 2:
                for (var i = 0; i < 3 + level * 10; i++) {
                    data.push(itemPicker("small"));
                }
                break;
            case 3:
                for (var i = 0; i < 3 + level * 10; i++) {
                    data.push(itemPicker("large"));
                }
                break;
            case 4:
                for (var i = 0; i < 3 + level * 10; i++) {
                    data.push(letterPicker(getRandom(0, 5)));
                }
                break;
        }
    } else {
        for (var i = 0; i < 2 + level * 5; i++) {
            data.push(getRandom(1, 10 + level * 100));
            if (level > 0.5) {
                data[i] /= 10;
            }
            if (level > 0.6) {
                data[i] *= -1;
            }
            if (level > 0.8 && Math.random() < 0.5) {
                data[i] *= -1;
            }
            if (level > 0.9 && Math.random() < 0.5) {
                data[i] *= 20;
            }
        }
    }
    if (level < 0.8) {
        data.push(data[getRandom(0, data.length - 1)]);
    }
    if (level >= 0.8 && Math.random() > 0.2) {
        data.push(data[getRandom(0, data.length - 1)]);
    }
    for (i = 0; i < data.length; i++) {
        var temp = data[i];
        var choice = getRandom(0, data.length - 1);
        data[i] = data[choice];
        data[choice] = temp;
    }
    question.push(mode(data));
}
function averagesLadder(level) {
    switch (getRandom(0, 3)) {
        case 0:
            meanLadder(level);
            break;
        case 1:
            medianLadder(level);
            break;
        case 2:
            modeLadder(level);
            break;
        case 3:
            rangeLadder(level);
            break;
    }
}
function multiplyDivideStandardFormLadder(level, op) {
    var x = {};
    var y = {};
    x.co = getRandom(1, 3 + level * 20);
    y.co = getRandom(1, 3 + level * 20);
    y.pow = getRandom(1, 3 + level * 20);
    x.pow = y.pow + getRandom(1, 3 + level * 20);
    if (level > 0.7 && Math.random() > 0.5) {
        y.pow = -y.pow;
    }
    if (level > 0.5 && Math.random() > 0.5) {
        x.pow = -x.pow;
    }
    if (level > 0.8) {
        y.pow = -Math.abs(y.pow);
        x.pow = -Math.abs(x.pow);
    }
    if (op === "/") {
        x.co = x.co * y.co;
    }
    checkCo(x);
    checkCo(y);
    function checkCo(term) {
        while (term.co >= 10) {
            term.co /= 10;
            term.pow++;
        }
        while (term.co < 1) {
            term.co *= 10;
            term.pow--;
        }
        return term;
    }
    x.co = roundError(x.co);
    y.co = roundError(y.co);
    question.push(standardForm(x, y, op));
}
function addSubtractStandardFormLadder(level, op) {
    var x = {};
    var y = {};
    y.co = getRandom(1, 9 + level * 10);
    y.pow = getRandom(1, 2 + level * 10);
    x.co = getRandom(1, 9 + level * 10);
    x.pow = y.pow + getRandom(1, 1 + level * 5);
    if (level > 0.5 && Math.random() > 0.5) {
        x.pow = -x.pow;
        y.pow = -y.pow;
    }
    if (level > 0.8) {
        y.pow = -Math.abs(y.pow);
        x.pow = -Math.abs(x.pow);
    }
    if (op === "-") {
        x.pow = y.pow + getRandom(1, 3 + level * 5);
    }
    checkCo(x);
    checkCo(y);
    function checkCo(term) {
        while (term.co >= 10) {
            term.co /= 10;
            term.pow++;
        }
        while (term.co < 1 && term.co > 0) {
            term.co *= 10;
            term.pow--;
        }
        return term;
    }
    x.co = roundError(x.co);
    y.co = roundError(y.co);
    question.push(standardForm(x, y, op));
}
function convertingToStandardFormLadder(level) {
    var x = {};
    var type = 0;
    x.co = getRandom(1, 9 + level * 50);
    x.pow = getRandom(0, 3 + level * 3);
    if (level > 0.3 && Math.random() > 0.5) {
        x.pow = -x.pow;
    }
    if (level > 0.5 && Math.random() > 0.4) {
        x.co *= Math.pow(10, getRandom(1, 3));
    }
    if (level > 0.7 && Math.random() > 0.4) {
        x.co *= Math.pow(10, -getRandom(1, 3));
    }
    if (level < 0.8) {
        checkCo(x);
    }
    if (level >= 0.8) {
        type = 2;
        do {
            x.co *= Math.pow(10, getRandom(-2, 3));
        } while (x.co >= 1 && x.co < 10)
    }
    function checkCo(term) {
        while (term.co >= 10) {
            term.co /= 10;
            term.pow++;
        }
        while (term.co < 1 && term.co > 0) {
            term.co *= 10;
            term.pow--;
        }
        return term;
    }
    x.co = roundError(x.co);
    question.push(convertingStandardForm(x, type));
}
function convertingFromStandardFormLadder(level) {
    var x = {};
    var type = 1;
    x.co = getRandom(1, 9 + level * 50);
    x.pow = getRandom(0, 3 + level * 3);
    if (level > 0.3 && Math.random() > 0.5) {
        x.pow = -x.pow;
    }
    if (level > 0.5 && Math.random() > 0.4) {
        x.co *= Math.pow(10, getRandom(1, 3));
    }
    if (level > 0.7 && Math.random() > 0.4) {
        x.co *= Math.pow(10, -getRandom(1, 3));
    }
    checkCo(x);
    function checkCo(term) {
        while (term.co >= 10) {
            term.co /= 10;
            term.pow++;
        }
        while (term.co < 1 && term.co > 0) {
            term.co *= 10;
            term.pow--;
        }
        return term;
    }
    x.co = roundError(x.co);
    question.push(convertingStandardForm(x, type));
}
function convertingFractionsLadder(level, mixed) {
    var toMixed = mixed;
    var den = getRandom(2, 4 + level * 40);
    do {
        var num = den + getRandom(1, 4 + level * 20);
        num *= getRandom(1, level * 20);
    } while (num % den === 0);
    question.push(convertingFractions(num, den, toMixed));
}
function convertingMeticLengthLadder(level) {
    var from, to, gap;
    gap = 1;
    if (level > 0.5) {
        gap++;
    }
    if (level > 0.8) {
        gap++;
    }
    do {
        from = getRandom(0, 3);
        if (level < 0.2) {
            from = getRandom(1, 2);
        }
        if (Math.random() < 0.5) {
            to = from + gap;
        } else {
            to = from - gap;
        }
        to %= 4;
    } while (Math.abs(to - from) !== gap || to < 0);
    var metres = getRandom(10, 100) / 10;
    if (level < 0.5) {
        metres = getRandom(1, 20);
    }
    if (from === 0) {
        metres /= 100;
    }
    if (from === 1) {
        metres /= 10;
    }
    if (from === 3) {
        metres *= 1000;
    }
    if (to === 3) {
        metres *= 10;
    }
    question.push(convertingMetricLength(roundError(metres), from, to));
}
function convertingMeticWeightLadder(level) {
    var from, to, gap;
    gap = 1;
    if (level > 0.5) {
        gap++;
    }
    if (level > 0.8) {
        gap++;
    }
    do {
        from = getRandom(0, 3);
        if (level < 0.2) {
            from = getRandom(1, 2);
        }
        if (Math.random() < 0.5) {
            to = from + gap;
        } else {
            to = from - gap;
        }
        to %= 4;
    } while (Math.abs(to - from) !== gap || to < 0);
    var kg = getRandom(10, 100) / 10;
    if (level < 0.5) {
        kg = getRandom(1, 20);
    }
    if (level === 0) {
        to = 1;
        from = 2;
    }
    if (level === 0.1) {
        to = 2;
        from = 1;
    }
    if (from === 0) {
        kg /= 100;
    }
    if (from === 1) {
        kg /= 10;
    }
    if (from === 3) {
        kg *= 1000;
    }
    if (to === 3) {
        kg *= 10;
    }
    question.push(convertingMetricWeight(roundError(kg), from, to));
}
function convertingMeticVolumeLadder(level) {
    var from, to, gap;
    gap = 1;
    if (level > 0.5) {
        gap++;
    }
    do {
        from = getRandom(0, 2);
        if (level < 0.2) {
            from = getRandom(1, 2);
        }
        if (Math.random() < 0.5) {
            to = from + gap;
        } else {
            to = from - gap;
        }
        to %= 3;
    } while (Math.abs(to - from) !== gap || to < 0);
    var litres = getRandom(10, 100) / 10;
    if (level < 0.5) {
        litres = getRandom(1, 20);
    }
    if (from === 0) {
        litres /= 100;
    }
    if (from === 1) {
        litres /= 10;
    }
    question.push(convertingMetricVolume(roundError(litres), from, to));
}
function convertingMeticMixedLadder(level) {
    switch (getRandom(0, 2)) {
        case 0:
            convertingMeticLengthLadder(level);
            break;
        case 1:
            convertingMeticWeightLadder(level);
            break;
        case 2:
            convertingMeticVolumeLadder(level);
            break;
    }
}
function unitaryMethodLadder(level) {
    var cost = 2 * getRandom(3, 10 + level * 50) + 1;
    if (level < 0.4) {
        cost = 5 * Math.round(cost / 5);
    }
    if (level < 0.2) {
        cost = 5 * Math.round(cost / 5);
    }
    var quantity = getRandom(2 + level * 10, 3 + level * 25);
    if (level === 0) {
        quantity = 2;
    }
    do {
        var newQuantity = quantity + getRandom(1 + level * 10, 2 + level * 25);
    } while (level > 0.3 && newQuantity % quantity === 0);
    question.push(unitaryMethod(cost, quantity, newQuantity));
}
function probabilityBasicLadder(level) {
    var type = 0;
    if (level > 0.2) {
        type++;
    }
    if (level > 0.5) {
        type++;
    }
    if (level > 0.8) {
        type++;
    }
    question.push(basicProbability(type));
}
function expectedFrequencyLadder(level) {
    var trials = 6;
    if (level > 0.1) {
        trials *= getRandom(1, 3);
    }
    if (level > 0.3) {
        trials *= getRandom(1, 3);
    }
    if (level > 0.5) {
        trials *= getRandom(1, 3);
    }
    if (level > 0.7) {
        trials *= getRandom(1, 3);
    }
    if (level > 0.9) {
        trials *= getRandom(1, 3);
    }
    question.push(expectedFrequency(trials));
}
function differenceLadder(level) {
    var a, b;
    var a = getRandom(0, 10 + (level * 20));
    var b = getRandom(0, 10 + (level * 20));
    if (level > 0.2 && Math.random() < 0.7) {
        a = -a;
    }
    if (level > 0.4 && Math.random() < 0.7) {
        b = -b;
    }
    if (level > 0.7) {
        a *= 1.1;
    }
    if (level > 0.9) {
        b *= 1.1;
    }
    question.push(difference(roundError(a), roundError(b)));
}
function changingTemperaturesLadder(level) {
    var a, b;
    var a = getRandom(0, 10 + (level * 20));
    var b = getRandom(0, 10 + (level * 20));
    if (level > 0.2 && Math.random() < 0.7) {
        a = -a;
    }
    if (level > 0.4 && Math.random() < 0.7) {
        b = -b;
    }
    if (level > 0.7) {
        a *= 1.1;
    }
    if (level > 0.9) {
        b *= 1.1;
    }
    question.push(changingTemperatures(roundError(a), roundError(b)));
}
function polygonSidesLadder(level) {
    var maxPol = 0;
    if (level > 0.1) {
        maxPol += 5;
    }
    if (level > 0.2) {
        maxPol += 5;
    }
    if (level > 0.3) {
        maxPol += 5;
    }
    if (level > 0.4) {
        maxPol += 5;
    }
    if (level > 0.5) {
        maxPol += 5;
    }
    if (level > 0.6) {
        maxPol += 5;
    }
    if (level > 0.7) {
        maxPol += 5;
    }
    if (level > 0.9) {
        maxPol += 2;
    }
    question.push(polygonSides(maxPol));
}
function expandSimplifySingleBracketsLadder(level) {
    var type = Math.min(6, 1 + Math.round(level * 8));
    var max = 2 + 3 * level;
    question.push(expandSimplifySingleBrackets(type, max));
}
function interchangingFDPLadder(level, type) {
    var dec = new Array(0.5, 0.25, 0.75, 0.10, 0.20, 0.05, 0.01, 0.02, 1.50, getRandom(0, 200) / 100);
    var max = Math.min(2 + level * 10, dec.length - 1);
    var min = Math.max(0, max - 2);
    do {
        var x = dec[getRandom(min, max)];
        var y = dec[getRandom(min, max)];
        var amount = 10 * getRandom(1, 10 * max);
    } while (x === y || amount * x !== Math.round(amount * x) || amount * y !== Math.round(amount * y));

    question.push(interchangingFDP(x, y, roundError(amount), type));
}
function fibonacciLadder(level) {
    var f0 = getRandom(0, 5);
    var f1 = f0 + getRandom(1, 5);
    var given1 = 0;
    var given2 = 1;
    if (level > 0.1 && level < 0.3) {
        f0 *= -1;
        if (toss()) {
            f1 *= -1;
        }
    }
    if (level > 0.2 && level < 0.4) {
        f0 /= 2;
        if (toss()) {
            f1 /= 2;
        }
    }
    if (level > 0.4) {
        given2++;
    }
    if (level > 0.6) {
        given1 = getRandom(1, 2);
        given2 = given1 + getRandom(1, 2);
    }
    if (level > 0.7) {
        given1 = getRandom(2, 4);
        given2 = given1 + getRandom(2, 3);
    }
    if (level > 0.8) {
        f0 *= -1;
        if (toss()) {
            f1 *= -1;
        }
    }
    if (level > 0.9) {
        f0 /= 2;
        if (toss()) {
            f1 /= 2;
        }
    }
    do {
        var find = getRandom(1, given2 + 2);
    } while (find === given1 || find === given2);
    question.push(fibonacci(f0, f1, given1, given2, find));
}
function geometricSequenceLadder(level) {
    var a = getRandom(1, 10);
    var r = getRandom(2, 5);
    var given1 = 0;
    var given2 = 1;
    if (level > 0.2 && toss()) {
        if (r === 3) {
            r = 10;
        }
        a *= Math.pow(r, 3);
        r = 1 / r;
    }
    if (level > 0.4) {
        given2++;
    }
    if (level > 0.4 && toss()) {
        r *= -1;
    }
    if (level > 0.6) {
        given1 = getRandom(1, 2);
        given2 = given1 + getRandom(1, 2);
    }
    if (level > 0.7) {
        given1 = getRandom(2, 3);
        given2 = given1 + getRandom(1, 2);
    }
    do {
        var find = getRandom(1, given2 + 2);
    } while (find === given1 || find === given2);
    question.push(geometricSequence(a, r, given1, given2, find));
}
function convertingTimeLadder(level) {
    do {
        var step = 1;
        if (level > 0.5) {
            step++;
        }
        if (level > 0.7) {
            step++;
        }
        if (level > 0.9) {
            step++;
        }
        var from = getRandom(0, 4);
        var to = getRandom(0, 4);
    } while (Math.abs(from - to) > step || from - to === 0);
    do {
        var decimal = false;
        if (level > 0.4) {
            decimal = true;
        }
        var x = 6 * getRandom(1, 2 + level * 15);
        if (step > 2) {
            x *= 3;
        }
        if (to > from) {
            x *= 3;
        } else {
            x /= 3;
        }
        if (to === 4) {
            x *= 7;
        }
        if (to === 3 && from < 3) {
            x *= 2;
        }
        if (level < 0.3 && from === 0 && to === 1) {
            x *= 10;
        }
        if (level < 0.3 && from === 1 && to === 2) {
            x *= 10;
        }
        if (level > 0.3 && toss()) {
            x /= 5;
        }
        if (level > 0.5 && toss()) {
            x /= 5;
        }
    } while (x !== Math.round(x) && !decimal);
    question.push(convertingTime(from, to, roundError(x)));
}
function gradientTwoPointsLadder(level) {
    do {
        var x1 = getRandom(1, 10 + level * 20);
        var x2 = x1 + getRandom(1, 10 + level * 20);
        var y1 = getRandom(1, 10 + level * 20);
        var y2 = y1 + getRandom(1, 10 + level * 20);
        if (level > 0.2) {
            var temp = x1;
            x1 = x2;
            x2 = temp;
        }
        if (level > 0.3) {
            temp = y1;
            y1 = y2;
            y2 = temp;
        }
        if (level > 0.4 & toss()) {
            y1 *= -1;
        }
        if (level > 0.5 & toss()) {
            x1 *= -1;
        }
        if (level > 0.6 & toss()) {
            y2 *= -1;
        }
        if (level > 0.7 & toss()) {
            x2 *= -1;
        }
        if (level > 0.8) {
            if (toss()) {
                x1 /= 2;
            }
            if (toss()) {
                x2 /= 2;
            }
            if (toss()) {
                y1 /= 2;
            }
            if (toss()) {
                y2 /= 2;
            }
        }
    } while (y1 === y2);
    question.push(gradientFromTwoPoints(x1, y1, x2, y2));
}
function midpointTwoPointsLadder(level) {
    do {
        var x1 = getRandom(1, 10 + level * 20);
        var x2 = x1 + getRandom(1, 10 + level * 20);
        var y1 = getRandom(1, 10 + level * 20);
        var y2 = y1 + getRandom(1, 10 + level * 20);
        if (level < 0.3 && (x1 + x2) % 2 !== 0) {
            x2++;
        }
        if (level < 0.3 && (y1 + y2) % 2 !== 0) {
            y2++;
        }
        if (level > 0.2) {
            var temp = x1;
            x1 = x2;
            x2 = temp;
        }
        if (level > 0.3) {
            temp = y1;
            y1 = y2;
            y2 = temp;
        }
        if (level > 0.4 & toss()) {
            y1 *= -1;
        }
        if (level > 0.5 & toss()) {
            x1 *= -1;
        }
        if (level > 0.6 & toss()) {
            y2 *= -1;
        }
        if (level > 0.7 & toss()) {
            x2 *= -1;
        }
        if (level > 0.8) {
            if (toss()) {
                x1 /= 2;
            }
            if (toss()) {
                x2 /= 2;
            }
            if (toss()) {
                y1 /= 2;
            }
            if (toss()) {
                y2 /= 2;
            }
        }
        if (level > 0.9) {
            if (toss()) {
                x1 /= 2;
            }
            if (toss()) {
                x2 /= 2;
            }
            if (toss()) {
                y1 /= 2;
            }
            if (toss()) {
                y2 /= 2;
            }
        }
    } while (y1 === y2);
    question.push(midpointFromTwoPoints(x1, y1, x2, y2));
}
function lengthBetweenTwoPointsLadder(level) {
    do {
        var x1 = getRandom(1, 10 + level * 20);
        var x2 = x1 + getRandom(1, 10 + level * 20);
        var y1 = getRandom(1, 10 + level * 20);
        var y2 = y1 + getRandom(1, 10 + level * 20);
        if (level < 0.3 && (x1 + x2) % 2 !== 0) {
            x2++;
        }
        if (level < 0.3 && (y1 + y2) % 2 !== 0) {
            y2++;
        }
        if (level > 0.2) {
            var temp = x1;
            x1 = x2;
            x2 = temp;
        }
        if (level > 0.3) {
            temp = y1;
            y1 = y2;
            y2 = temp;
        }
        if (level > 0.4 & toss()) {
            y1 *= -1;
        }
        if (level > 0.5 & toss()) {
            x1 *= -1;
        }
        if (level > 0.6 & toss()) {
            y2 *= -1;
        }
        if (level > 0.7 & toss()) {
            x2 *= -1;
        }
        if (level > 0.8) {
            if (toss()) {
                x1 /= 2;
            }
            if (toss()) {
                x2 /= 2;
            }
            if (toss()) {
                y1 /= 2;
            }
            if (toss()) {
                y2 /= 2;
            }
        }
        if (level > 0.9) {
            if (toss()) {
                x1 /= 2;
            }
            if (toss()) {
                x2 /= 2;
            }
            if (toss()) {
                y1 /= 2;
            }
            if (toss()) {
                y2 /= 2;
            }
        }
    } while (y1 === y2);
    question.push(lengthBetweenTwoPoints(x1, y1, x2, y2));
}
function completingSquareLadder(level) {
    var a = 1;
    var b = 2 * getRandom(1, 5 + level * 15);
    var c = b * b / 4;
    if (level > 0) {
        c = 2 * getRandom(0, 5 + level * 15);
    }
    if (level > 0.2 && toss()) {
        c *= -1;
    }
    if (level > 0.4) {
        b = getRandom(1, 5 + level * 20);
    }
    if (level > 0.5 && toss()) {
        b *= -1;
    }
    if (level > 0.8) {
        a = 2 * getRandom(1, 2);
        b *= 2;
    }
    if (level > 0.9 && toss()) {
        a = -a;
    }
    question.push(completingSquare(a, b, c));
}
function turningPointToQuadraticLadder(level) {
    var x = getRandom(1, 10 + level * 10);
    var y = getRandom(1, 10 + level * 10);
    var min = true;
    if (level > 0.1 && toss()) {
        y *= -1;
    }
    if (level > 0.3 && toss()) {
        x *= -1;
    }
    if (level > 0.5 && toss()) {
        min = false;
    }
    if (level > 0.7) {
        min = false;
    }
    question.push(turningPointToQuadratic(x, y, min));
}
function factoriseExpandMonicQuadraticsLadder(level, expanding) {
    var a = 1;
    var b = getRandom(1, 3 + level * 12);
    var c = 1;
    var d = getRandom(1, 3 + level * 12);
    if (level > 0.1 && toss()) {
        b = -b;
    }
    if (level > 0.3 && toss()) {
        d = -d;
    }
    if (level > 0.5 && toss()) {
        a = -a;
    }
    if (level > 0.7 && toss()) {
        c = -c;
    }
    question.push(factoriseExpandQuadratics(a, b, c, d, expanding));
}
function factoriseExpandNonMonicQuadraticsLadder(level, expanding) {
    var a = getRandom(2, 3);
    var b = getRandom(1, 3 + level * 12);
    var c = 1;
    var d = getRandom(1, 3 + level * 12);
    if (level > 0.1 && toss()) {
        b = -b;
    }
    if (level > 0.3) {
        c = getRandom(1, 3);
    }
    if (level > 0.5 && toss()) {
        d = -d;
    }
    if (level > 0.7 && toss()) {
        a = -a;
    }
    if (level > 0.9 && toss()) {
        c = -c;
    }
    question.push(factoriseExpandQuadratics(a, b, c, d, expanding));
}
function indexLawMultiplyLadder(level) {
    var base = letterPicker();
    base = getRandom(2, 4 + level * 2);
    do {
        var ex1 = getRandom(1, 5 + level * 2);
        var ex2 = getRandom(1, 5 + level * 2);
        var shift1 = 1;
        var shift2 = 1;
        if (level > 0.1 && toss()) {
            ex1 = -ex1;
        }
        if (level > 0.3 && toss()) {
            ex2 = -ex2;
        }
        if (level > 0.5 && toss()) {
            shift1 = getRandom(2, 4);
            ex1 = Math.abs(ex1);
        }
        if (level > 0.7) {
            shift2 = getRandom(2, 4);
            ex2 = Math.abs(ex2);
        }
        if (level > 0.8 && toss()) {
            ex1 = -ex1;
        }
        if (level > 0.9 && toss()) {
            ex2 = -ex2;
        }
    } while (ex1 === -ex2);

    question.push(indexLawMultiply(base, ex1, shift1, ex2, shift2));
}
function indexLawDivideLadder(level) {
    var base = letterPicker();
    base = getRandom(2, 4 + level * 2);
    do {
        var ex1 = getRandom(1, 5 + level * 2);
        var ex2 = getRandom(1, 5 + level * 2);
        var shift1 = 1;
        var shift2 = 1;
        if (level > 0.1 && toss()) {
            ex1 = -ex1;
        }
        if (level > 0.3 && toss()) {
            ex2 = -ex2;
        }
        if (level > 0.5 && toss()) {
            shift1 = getRandom(2, 4);
            ex1 = Math.abs(ex1);
        }
        if (level > 0.7) {
            shift2 = getRandom(2, 4);
            ex2 = Math.abs(ex2);
        }
        if (level > 0.8 && toss()) {
            ex1 = -ex1;
        }
        if (level > 0.9 && toss()) {
            ex2 = -ex2;
        }
    } while (ex1 === -ex2);
    question.push(indexLawDivide(base, ex1, shift1, ex2, shift2));
}
function indexLawPowerOfPowerLadder(level) {
    var base = letterPicker();
    base = getRandom(2, 4 + level * 2);
    var ex1 = getRandom(1, 5 + level * 5);
    var ex2 = getRandom(1, 5 + level * 10);
    var shift1 = 1;
    if (level > 0.2 && toss()) {
        ex1 = -ex1;
    }
    if (level > 0.4 && toss()) {
        ex1 = Math.abs(ex1);
        if (base < 4) {
            shift1 = getRandom(2, 3 + level * 3);
        } else {
            shift1 = getRandom(2, 3);
        }
    }
    if (level > 0.6 && toss()) {
        ex1 = -ex1;
    }
    if (level > 0.7 && shift1 < 2) {
        shift1++;
    }
    if (level > 0.8) {
        ex1 = -Math.abs(ex1);
    }
    question.push(indexLawPowerOfPower(base, ex1, shift1, ex2));
}
function indexLawMixedLadder(level) {
    switch (getRandom(0, 2)) {
        case 0:
            indexLawMultiplyLadder(level);
            break;
        case 1:
            indexLawDivideLadder(level);
            break;
        case 2:
            indexLawPowerOfPowerLadder(level);
            break;
    }
}
function ratioMixedLadder(level) {
    switch (getRandom(0, 6)) {
        case 0:
            ratioShareLadder(level);
            break;
        case 1:
            ratioReverseLadder(level);
            break;
        case 2:
            simplifyingRatiosLadder(level);
            break;
        case 3:
            combiningRatiosLadder(level);
            break;
        case 4:
            ratioDifferenceLadder(level);
            break;
        case 5:
            unitRatioLadder(level);
            break;
        case 6:
            ratioAsFractionLadder(level);
            break;
    }
}
function combiningRatiosLadder(level) {
    var max = getRandom(3, 5 + level * 35);
    question.push(combiningRatios(max));
}
function stateEquationOfCircleLadder(level) {
    var a = getRandom(0, 10 + level * 30);
    var b = getRandom(0, 10 + level * 30);
    var r = getRandom(1, 10 + level * 30);
    if (level < 0.1) {
        a = 0;
    }
    if (level < 0.2) {
        b = 0;
    }
    if (level > 0.4 && toss()) {
        a = -a;
    }
    if (level > 0.5 && toss()) {
        b = -b;
    }
    if (level > 0.7 && toss()) {
        a /= 5;
    }
    if (level > 0.9 && toss()) {
        b /= 5;
    }
    if (level > 0.8 && toss()) {
        r /= 5;
    }

    question.push(stateEquationOfCircle(a, b, r));
}
function orderOfOpsTimesDivideLadder(level) {
    var pairs = 1;
    var max = 4 + level * 10;
    if (level > 0.2) {
        pairs++;
    }
    if (level > 0.7) {
        pairs++;
    }
    question.push(orderOfOpsTimesDivide(pairs, max));
}
function orderOfOpsAddSubtractLadder(level) {
    var pairs = 1;
    var max = 4 + level * 20;
    if (level > 0.2) {
        pairs++;
    }
    if (level > 0.7) {
        pairs++;
    }
    question.push(orderOfOpsAddSubtract(pairs, max));
}
function givenDecimalFindFractionLadder(level) {
    var dens = [2, 4, 5, 16, 25, 32, 50, 64, 125, 128];
    var n1, d1, n2, d2;
    do {
        d1 = dens[getRandom(0, 2)];
        if (level > 0) {
            d1 = dens[getRandom(1, 3)];
        }
        if (level > 0.2) {
            d1 = dens[getRandom(2, 5)];
        }
        if (level > 0.5) {
            d1 = dens[getRandom(4, 7)];
        }
        if (level > 0.8) {
            d1 = dens[getRandom(6, 9)];
        }
        n1 = getRandom(1, Math.floor(d1 / 4));

        n2 = getRandom(1, 2) * d1 + n1;
        d2 = d1;

        if (toss() && d1 > 2) {
            n2 = getRandom(1, Math.round(level * 5)) * d1 - n1;
        } else if (toss() && d2 % 2 === 0 && d1 > 2) {
            n2 = n1;
            d2 /= 2;
        } else if (toss()) {
            n2 = n1;
            d2 *= 2;
        }
    } while (n1 === n2 && d1 === d2);
    question.push(givenDecimalFindFraction(n1, d1, n2, d2));
}
function equationsIfThenLadder(level) {
    var primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 29];
    var type = getRandom(0, Math.min(9, 2 + level * 15));
    if (level > 0.8) {
        type = getRandom(8, 9);
    }
    var a = getRandom(2 + level * 10, 3 + level * 20);
    var b = getRandom(2 + level * 10, 3 + level * 20);
    var rhs = primes[getRandom(level * 5, Math.min(2 + level * 10, primes.length - 1))] * primes[getRandom(level * 5, Math.min(2 + level * 10, primes.length - 1))];
    question.push(equationsIfThen(type, a, b, rhs));
}
function productOfPrimesLadder(level, reversed) {
    var primes = 2 + level * 5;
    question.push(productOfPrimes(primes, reversed));
}
function primeConsecutivesLadder(level) {
    var start = getRandom(1, 2 + level * 20);
    var total = getRandom(2 + level * 2, 2 + level * 4);
    if (start >= 10) {
        total = 3;
    }
    if (level > 0.7) {
        start *= -1;
        if (total % 2 === 0) {
            total -= 1;
        }
        if (start + total >= 0) {
            start = -total - 1;
        }
    }
    question.push(primeConsecutives(start, total));
}
function placeValuePowersLadder(level) {
    var base = getRandom(2 + 10 * level, 6 + 25 * level);
    if (base === 10) {
        base++;
    }
    var index = 2;
    var shift = getRandom(1, 1 + 2 * level);
    if (level > 0.3) {
        index = getRandom(2, 3);
    }
    if (level > 0.3 && toss()) {
        shift *= -1;
    }
    if (level > 0.5) {
        base /= 2;
    }
    if (level > 0.8) {
        base /= 5;
    }
    base = roundError(base);
    question.push(placeValuePowers(base, index, shift));
}
function factoriseSingleLadder(level, expand) {
    var hcf = getRandom(2, 3 + level * 10);
    var terms = 2;
    var variables = 1;
    var max = getRandom(0, 1 + level * 8);
    if (level > 0.4) {
        variables = 2;
    }
    if (level > 0.6) {
        terms = 3;
    }
    question.push(factoriseSingle(hcf, terms, variables, max, expand));
}
function equationsWithRatioLadder(level) {
    var accuracy = 1;
    var den = false;
    if (level > 0.2) {
        accuracy = 2;
    }
    if (level > 0.4) {
        accuracy = 5;
    }
    if (level > 0.6) {
        accuracy = 4;
    }
    if (level > 0.8) {
        accuracy = 10;
    }
    do {
        var co = getRandom(1, 1 + level * 15);
        var a = getRandom(1, 5 + level * 15);
        var b = getRandom(1, 5 + level * 15);
        var c = getRandom(1, 5 + level * 15);
    } while (((a * b) / (c * co) !== Math.round((a * b) / (c * co) * accuracy) / accuracy) || b === c || (co === 1 && a === c));
    if (level > 0.4 && toss()) {
        var den = true;
    }
    question.push(equationsWithRatio(co, a, b, c, den));
}
function integersBetweenFractionLadder(level) {
    do {
        var d1 = getRandom(2, 5 + level * 12);
        var n1 = d1 * getRandom(1, 5);
        //if (level > 0.1) {
        n1 += getRandom(1, d1 - 1);
        //}
        if (level < 0.2) {
            var d2 = d1;
        } else {
            d2 = getRandom(2, 5 + level * 12);
        }
        var n2 = d2 * getRandom(1, 5);
        //if (level > 0.2) {
        n2 += getRandom(1, d2 - 1);
        //}
        if (level > 0.6) {
            n1 *= -1;
        }
        if (level > 0.8) {
            n2 *= -1;
        }
        var total = Math.abs(n1 / d1 - n2 / d2);
    } while (total < 1 || total > 5 || n1 === d1 || n2 === d2);
    if (level < 0.5 && n1 / d1 > n2 / d2) {
        var t1 = n1;
        var t2 = d1;
        n1 = n2;
        d1 = d2;
        n2 = t1;
        d2 = t2;
    }
    question.push(integersBetweenFraction(n1, d1, n2, d2));
}
function ratioDonatingLadder(level) {
    var max = getRandom(4 + level * 5, 8 + level * 20);
    question.push(ratioDonating(max));
}
function howManyFactorsLadder(level) {
    var primes = [2, 3, 5, 7, 11, 13, 17];
    var indices = [];
    var totalPrimes = 0;
    for (var i = 0; i < Math.min(primes.length, 3 + level * 8); i++) {
        var n = getRandom(0, 2 + level * 4);
        if (i > 3 && n > 1) {
            n = 1;
        }
        totalPrimes += n;

        indices.push(n);
        if (totalPrimes > 1 + level * 5) {
            break;
        }
    }
    question.push(howManyFactors(indices));
}
function closeMultiplesOfTenLadder(level) {
    var power = Math.round(2 + level * 2);
    question.push(closeMultiplesOfTen(power));
}
function linearSimultLadder(level) {
    var negSol, decSol, negCo, decCo, com, same;
    if (level < 0.1) {
        same = 1;
    } else {
        same = 0;
    }
    if (level < 0.3) {
        com = 1;
    } else {
        com = 0;
    }
    if (level < 0.4) {
        negCo = 0;
    } else {
        negCo = 1;
    }
    if (level < 0.5) {
        negSol = 0;
    } else {
        negSol = 1;
    }
    if (level < 0.7) {
        decSol = 0;
    } else {
        decSol = 1;
    }
    if (level < 0.8) {
        decCo = 0;
    } else {
        decCo = 1;
    }
    question.push(linearSimult(negSol, decSol, negCo, decCo, com, same));
}
function errorIntervalLadder(level) {
    var acc = 10;
    if (level > 0) {
        acc = Math.pow(10, getRandom(0, 3));
    }
    if (level > 0.3) {
        acc = Math.pow(10, getRandom(-2, 2));
    }
    if (level > 0.5) {
        acc = Math.pow(10, getRandom(-4, 4));
    }
    if (level > 0.7) {
        acc /= 2;
    }
    question.push(errorIntervals(roundError(acc)));
}
function unitRatioLadder(level) {
    var type = 0;
    if (level > 0.2) {
        type = getRandom(0, 1);
    }
    var mult = getRandom(2, level * 20);
    if (level > 0.5) {
        mult /= 2;
    }
    if (level > 0.7) {
        mult /= 5;
    }
    if (level > 0.9) {
        mult /= 2;
    }
    question.push(unitRatio(type, roundError(mult)));
}
function ratioAsFractionLadder(level) {
    var quantities = [];
    for (var i = 0; i < 2 + Math.floor(level * 2.5); i++) {
        quantities.push(getRandom(1, 5 + level * 20));
    }
    question.push(ratioAsFraction(quantities));
}
function recurrOrTerminateLadder(level) {
    var primes = Math.ceil(1 + level * 5);
    question.push(recurrOrTerminate(primes));
}
function tableOfValuesLinearLadder(level) {
    var m = 1 + getRandom(0, level * 6);
    var c = 0 + getRandom(0, level * 8);
    if (level > 0.2 && toss()) {
        c *= -1;
    }
    if (level > 0.5 && toss()) {
        m *= -1;
    }
    if (level > 0.7 && toss()) {
        m /= 2;
    }
    if (level > 0.8) {
        m = -Math.abs(m);
    }
    if (level > 0.9) {
        c = -Math.abs(c);
    }
    var min = getRandom(0, level * 6);
    if (level > 0.5 && toss()) {
        min *= -1;
    }
    var max = min + 5;
    question.push(tableOfValuesLinear(m, c, min, max));
}
function tableOfValuesQuadraticLadder(level) {
    var a = 1;
    var b = 0;
    var c = 0 + getRandom(0, 5 + level * 8);
    if (level > 0.1 && toss()) {
        c *= -1;
    }
    if (level > 0.2) {
        b = 1 + getRandom(0, level * 6);
        c = 0;
    }
    if (level > 0.3) {
        c = 1 + getRandom(0, 5 + level * 8);
    }
    if (level > 0.4 && toss()) {
        b *= -1;
    }
    if (level > 0.5 && toss()) {
        a = 2 + getRandom(0, level * 5);
    }
    if (level > 0.6 && toss()) {
        a *= -1;
    }
    if (level > 0.7) {
        b = -Math.abs(b);
    }
    if (level > 0.8 && toss()) {
        b /= 2;
    }
    if (level > 0.9) {
        c = -Math.abs(c);
    }
    var min = getRandom(0, level * 6);
    if (level > 0.5 && toss()) {
        min *= -1;
    }
    var max = min + 5;
    question.push(tableOfValuesQuadratic(a, b, c, min, max));
}
function tableOfValuesCubicLadder(level) {
    var a = 1;
    var b = 0;
    var c = 0;
    var d = 0 + getRandom(0, 5 + level * 8);
    if (level > 0.1 && toss()) {
        d *= -1;
    }
    if (level > 0.2) {
        c = 1 + getRandom(0, level * 6);
        d = 0;
    }
    if (level > 0.3) {
        d = 1 + getRandom(0, 5 + level * 8);
    }
    if (level > 0.4 && toss()) {
        c *= -1;
    }
    if (level > 0.5 && toss()) {
        a = 2 + getRandom(0, level * 5);
    }
    if (level > 0.6 && toss()) {
        a *= -1;
    }
    if (level > 0.7 && toss()) {
        b = 1 + getRandom(0, level * 6);
    }
    if (level > 0.8) {
        c = -Math.abs(c);
    }
    if (level > 0.9 && toss()) {
        b = -Math.abs(b);
    }
    var min = getRandom(0, level * 6);
    if (level > 0.5 && toss()) {
        min *= -1;
    }
    var max = min + 5;
    question.push(tableOfValuesCubic(a, b, c, d, min, max));
}
function recurringDecimalsLadder(level) {
    var den = 3;
    if (toss() && level > 0.1) {
        den = 11;
    }
    den *= getRandom(1, level * 4);
    var pow = 0;
    if (level > 0.2) {
        pow++;
    }
    if (level > 0.5) {
        pow++;
    }
    if (level > 0.8) {
        pow++;
    }
    question.push(recurringDecimals(den, pow));
}
function multiplyingSurdsLadder(level) {
    question.push(multiplyingSurds(Math.floor(3 + level * 10)));
}
function simplifyingSurdsLadder(level) {
    var totalSquares = 1;
    var totalSurds = 1;
    var maxPrime = 2;
    if (level > 0) {
        maxPrime++;
    }
    totalSquares += Math.round(level * 1);
    totalSurds += Math.round(level * 2);
    maxPrime += Math.round(level * 1);
    question.push(simplifyingSurds(totalSquares, totalSurds, maxPrime));
}
function addingSurdsLadder(level) {
    var minSeed = 2 + level * 4;
    var maxPrime = 2 + level * 4;
    var subtraction = getRandom(0, 1);
    if (level < 0.2) {
        subtraction = 0;
    }
    question.push(addingSurds(minSeed, maxPrime, subtraction));
}
function functionMachineLadder(level, showOutput) {
    var maxInput = 6 + level * 12;
    var ops = 1 + level * 2.5;
    var negatives = 0;
    if (level > 0.6 && toss()) {
        negatives = true;
    }
    var decimals = 0;
    if (level > 0.8 && toss()) {
        decimals = true;
    }
    question.push(functionMachine(maxInput, ops, showOutput, negatives, decimals));
}
function algebraicDivisionLadder(level, twoVariables) {
    var x1 = getRandom(1, 3 + level * 5);
    var x2 = 0;
    if (level > 0.5) {
        x2 = getRandom(1, 3 + level * 5);
    }
    var y1 = 0;
    var y2 = 0;
    if (twoVariables) {
        var y1 = getRandom(1, 3 + level * 5);
        if (level > 0.2) {
            var y2 = getRandom(1, 3 + level * 5);
        }
    }
    var c1 = getRandom(1, 3 + level * 5);
    var c2 = getRandom(1, 3 + level * 5);
    if (twoVariables) {
        c1 = getRandom(0, 3 + level * 5);
    }
    if (level > 0.2 && toss()) {
        x1 *= -1;
    }
    if (level > 0.3 && toss()) {
        x2 *= -1;
    }
    if (level > 0.4 && toss()) {
        y1 *= -1;
    }
    if (level > 0.4 && toss()) {
        y2 *= -1;
    }
    if (level > 0.4 && toss()) {
        c1 *= -1;
    }
    if (level > 0.4 && toss()) {
        c2 *= -1;
    }
    question.push(algebraicDivision(x1, y1, c1, x2, y2, c2));
}
function rationalisingDenominatorsLadder(level) {
    var maxPrimes = 2 + level * 8;
    var commonFactor = false;
    var numSurd = false;
    if (level > 0.2) {
        numSurd = true;
    }
    if (level > 0.4) {
        commonFactor = true;
    }
    question.push(rationalisingDenominators(maxPrimes, commonFactor, numSurd));
}
function rewriteAsSumLadder(level) {
    var n = 2 + level * 3;
    var maxSum = 20 + level * 50;
    var maxTerm = 5 + level * 20;
    var negatives = true;
    if (level < 0.2) {
        negatives = false;
    }
    question.push(rewriteAsSum(n, maxSum, maxTerm, negatives, false));
}
function areaCircleLadder(level) {
    var radius = getRandom(1, 12);
    var pi = false;
    if (level > 0.5 && toss()) {
        pi = true;
    }
    question.push(areaCircle(radius, pi));
}
function circumfereceCircleLadderLadder(level) {
    var radius = getRandom(1, 12);
    var pi = false;
    if (level > 0.5 && toss()) {
        pi = true;
    }
    question.push(circumferenceCircle(radius, pi));
}
function solvingQuadraticFactoriseLadder(level, monic) {
    var a = getRandom(2, 1 + level * 3);
    var b = getRandom(1, 2 + level * 8);
    var c = getRandom(1, 1 + level * 3);
    var d = getRandom(1, 2 + level * 8);
    if (monic) {
        a = 1;
        c = 1;
    }
    if (level > 0.2 & toss()) {
        b *= -1;
    }
    if (level > 0.4 & toss()) {
        d *= -1;
    }
    if (level > 0.6 & toss()) {
        a *= -1;
    }
    if (level > 0.8 & toss()) {
        c *= -1;
    }

    question.push(solvingQuadraticFactorise(a, b, c, d));
}
function calcAcrossZeroLadder(level) {
    var start = getRandom(-1, -(5 + level * 40));
    var end = getRandom(0, (5 + level * 40));
    if (level > 0.3) {
        start *= 3;
        end *= 3;
    }
    if (level > 0.5) {
        start /= 2;
        end /= 2;
    }
    if (level > 0.7) {
        start *= 3;
        end *= 3;
    }
    if (level > 0.9) {
        start /= 2;
        end /= 2;
    }
    question.push(calcAcrossZero(start, end));
}
function findHypLadder(level) {
    do {
        var a = getRandom(2, 12 + level * 20);
        var b = getRandom(2, 12 + level * 20);
        if (level > 0.5 && toss()) {
            a /= 2;
        }
        if (level > 0.7 && toss()) {
            b /= 2;
        }
    } while (a / b > 3 || b / a > 3);
    question.push(findHyp(a, b));
}
function findLegLadder(level) {
    do {
        var a = getRandom(2, 12 + level * 20);
        var b = getRandom(2, 12 + level * 20);
        if (level > 0.1 && toss()) {
            a /= 2;
        }
        if (level > 0.2 && toss()) {
            b /= 2;
        }
        if (level > 0.3 && toss()) {
            a /= 5;
        }
        if (level > 0.4 && toss()) {
            b /= 5;
        }
        if (level > 0.6 && toss()) {
            a /= 2;
        }
        if (level > 0.8 && toss()) {
            b /= 2;
        }
    } while (a / b > 3 || b / a > 3);
    question.push(findLeg(a, b));
}
function perimeterPythagLadder(level) {
    do {
        var a = getRandom(2, 12 + level * 20);
        var b = getRandom(2, 12 + level * 20);
        if (level > 0.1 && toss()) {
            a /= 2;
        }
        if (level > 0.2 && toss()) {
            b /= 2;
        }
        if (level > 0.3 && toss()) {
            a /= 5;
        }
        if (level > 0.4 && toss()) {
            b /= 5;
        }
        if (level > 0.6 && toss()) {
            a /= 2;
        }
        if (level > 0.8 && toss()) {
            b /= 2;
        }
    } while (a / b > 3 || b / a > 3);
    question.push(perimeterPythag(a, b));
}
function areaPythagLadder(level) {
    do {
        var a = getRandom(2, 12 + level * 20);
        var b = getRandom(2, 12 + level * 20);
        if (level > 0.1 && toss()) {
            a /= 2;
        }
        if (level > 0.2 && toss()) {
            b /= 2;
        }
        if (level > 0.3 && toss()) {
            a /= 5;
        }
        if (level > 0.4 && toss()) {
            b /= 5;
        }
        if (level > 0.6 && toss()) {
            a /= 2;
        }
        if (level > 0.8 && toss()) {
            b /= 2;
        }
    } while (a / b > 3 || b / a > 3);
    question.push(areaPythag(a, b));
}

function findAngleTrigLadder(level) {
    do {
        var a = getRandom(2, 12 + level * 20);
        var b = getRandom(2, 12 + level * 20);
        if (level > 0.1 && toss()) {
            a /= 2;
        }
        if (level > 0.2 && toss()) {
            b /= 2;
        }
        if (level > 0.3 && toss()) {
            a /= 5;
        }
        if (level > 0.4 && toss()) {
            b /= 5;
        }
    } while (a / b > 3 || b / a > 3);
    question.push(findAngleTrig(a, b));
}
function findLengthTrigLadder(level) {
    do {
        var a = getRandom(2, 12 + level * 20);
        var b = getRandom(2, 12 + level * 20);
        if (level > 0.1 && toss()) {
            a /= 2;
        }
        if (level > 0.2 && toss()) {
            b /= 2;
        }
        if (level > 0.3 && toss()) {
            a /= 5;
        }
        if (level > 0.4 && toss()) {
            b /= 5;
        }
    } while (a / b > 3 || b / a > 3);
    if (toss()) {
        question.push(findLengthTrig(a, b, undefined));
    } else {
        question.push(findLengthTrig(a, b, getRandom(20, 70)));
    }
}
function findAreaTrigLadder(level) {
    do {
        var a = getRandom(2, 12 + level * 20);
        var b = getRandom(2, 12 + level * 20);
        if (level > 0.1 && toss()) {
            a /= 2;
        }
        if (level > 0.2 && toss()) {
            b /= 2;
        }
        if (level > 0.3 && toss()) {
            a /= 5;
        }
        if (level > 0.4 && toss()) {
            b /= 5;
        }
    } while (a / b > 3 || b / a > 3);
    if (toss()) {
        question.push(findAreaTrig(a, b, undefined));
    } else {
        question.push(findAreaTrig(a, b, getRandom(20, 70)));
    }
}
function findPerimeterTrigLadder(level) {
    do {
        var a = getRandom(2, 12 + level * 20);
        var b = getRandom(2, 12 + level * 20);
        if (level > 0.1 && toss()) {
            a /= 2;
        }
        if (level > 0.2 && toss()) {
            b /= 2;
        }
        if (level > 0.3 && toss()) {
            a /= 5;
        }
        if (level > 0.4 && toss()) {
            b /= 5;
        }
    } while (a / b > 3 || b / a > 3);
    if (toss()) {
        question.push(findPerimeterTrig(a, b, undefined));
    } else {
        question.push(findPerimeterTrig(a, b, getRandom(20, 70)));
    }
}

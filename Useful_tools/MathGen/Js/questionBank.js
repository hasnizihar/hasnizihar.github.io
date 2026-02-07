function fourOps(x, y, type) {
    var problem = {};
    problem.question = "<div>\\(";
    switch (type) {
        case "+":
            problem.question += x + " + " + y;
            problem.answer = x + y;
            break;
        case "-":
            problem.question += x + " &minus; " + y;
            problem.answer = x - y;
            break;
        case "*":
            problem.question += x + "\\ &#215;\\ " + y;
            problem.answer = x * y;
            break;
        case "/":
            problem.question += x + "\\ &divide;\\ " + y;
            problem.answer = x / y;
            break;
    }
    problem.question += "\\)</div>";
    problem.typedAnswer = roundError(problem.answer);
    problem.answer = "<div>\\(" + roundError(problem.answer) + "\\)</div>";
    return problem;
}
function fractionOfAmount(num, den, amount) {
    var problem = {};
    problem.answer = roundError(amount * num / den);
    var whole = Math.floor(num / den);
    if (whole < 0) {
        whole++;
        if (whole !== 0) {
            num = Math.abs(num);
        }
    }
    num = num % den;
    var hcf = HCF(num, den);
    num /= hcf;
    den /= hcf;
    var fraction = "";
    if (whole !== 0) {
        fraction += whole;
    }
    fraction += "\\( \\frac{" + num + "}{" + den + "} \\)";
    problem.question = fraction + " of " + amount;
    return problem;
}
function fractionalChange(num, den, amount, decrease) {
    var problem = {};
    if (decrease) {
        problem.answer = amount - roundError(amount * num / den);
    } else {
        problem.answer = amount + roundError(amount * num / den);
    }
    var whole = Math.floor(num / den);
    if (whole < 0) {
        whole++;
        if (whole !== 0) {
            num = Math.abs(num);
        }
    }
    num = num % den;
    var hcf = HCF(num, den);
    num /= hcf;
    den /= hcf;
    var fraction = "";
    if (whole !== 0) {
        fraction += whole;
    }
    fraction += "\\frac{" + num + "}{" + den + "}";
    if (decrease) {
        problem.question = "Decrease \\(" + amount + "\\) by \\(" + fraction + "\\)";
    } else {
        problem.question = "Increase \\(" + amount + "\\) by \\(" + fraction + "\\)";
    }
    return problem;
}
function percentageOfAmount(percentage, amount) {
    var problem = {};
    problem.question = "<div>Find \\(" + percentage + "\\)% of \\(" + amount + "\\)</div>";
    problem.answer = "\\(" + roundError(percentage * amount / 100) + "\\)";
    problem.typedAnswer = roundError(percentage * amount / 100);
    return problem;
}
function percentageIncreaseDecrease(percentage, amount, increase, reverse) {
    var problem = {};
    if (increase) {
        var newAmount = roundError(amount + percentage * amount / 100);
    } else {
        newAmount = roundError(amount - percentage * amount / 100);
    }
    if (!reverse) {
        if (increase) {
            problem.question = "Increase " + amount + " by " + percentage + "%";
        } else {
            problem.question = "Decrease " + amount + " by " + percentage + "%";
        }
        problem.answer = newAmount;
    } else {
        problem.question = "<div>An amount was ";
        if (increase) {
            problem.question += "increased";
        } else {
            problem.question += "decreased";
        }
        problem.question += " by " + percentage + "% to " + newAmount + ".<br>";
        problem.question += "What was the original amount?</div>";
        problem.answer = amount;
    }
    return problem;
}
function percentageMultipliers(percentage, type) {
    var problem = {};
    problem.question = "<div>";
    switch (type) {
        case 0:
            problem.question += "What would you multiply by to find " + percentage + "% of an amount?";
            problem.answer = roundError(percentage / 100);
            break;
        case 1:
            problem.question += "What would you multiply by to increase an amount by " + percentage + "%?";
            problem.answer = roundError((100 + percentage) / 100);
            break;
        case 2:
            problem.question += "What would you multiply by to decrease an amount by " + percentage + "%?";
            problem.answer = roundError((100 - percentage) / 100);
            break;
    }
    problem.question += "</div>";
    return problem;
}
function percentageChange(oldAmount, newAmount) {
    var problem = {};
    problem.question = "<div>";
    if (oldAmount > newAmount) {
        problem.question += "An amount was decreased from " + oldAmount + " to " + newAmount + ".";
        problem.question += "<br>Work out the percentage decrease.";
    } else {
        problem.question += "An amount was increased from " + oldAmount + " to " + newAmount + ".";
        problem.question += "<br>Work out the percentage increase.";
    }
    problem.answer = roundError(100 * Math.abs(oldAmount - newAmount) / oldAmount) + "%";
    problem.question += "</div>";
    return problem;
}
function repeatedPercentageChange(originalAmount, percentage, iterations, increase) {
    var problem = {};
    var units = ["second", "minute", "hour", "day", "week", "year"];
    var timeUnit = units[getRandom(0, units.length - 1)];
    var newAmount;
    problem.question = "<div>";
    if (increase) {
        problem.question += "An amount of " + originalAmount + " is increased by " + percentage + "% every " + timeUnit + ".<br>";
        problem.question += "How much will it be worth after " + iterations + " " + timeUnit + "s?";
        newAmount = originalAmount * Math.pow(1 + percentage / 100, iterations);
    } else {
        problem.question += "An amount of " + originalAmount + " is decreased by " + percentage + "% every " + timeUnit + ".<br>";
        problem.question += "How much will it be worth after " + iterations + " " + timeUnit + "s?";
        newAmount = originalAmount * Math.pow(1 - percentage / 100, iterations);
    }
    problem.question += "</div>";
    problem.answer = Math.round(100 * newAmount) / 100;
    return problem;
}
function halving(x) {
    var problem = {};
    problem.question = "<div>Find half of " + x + ".</div>";
    problem.answer = roundError(x / 2);
    return problem;
}
function doubling(x) {
    var problem = {};
    problem.question = "<div>Double " + x + ".</div>";
    problem.answer = roundError(x * 2);
    return problem;
}
function rounding(x, accuracy) {
    var problem = {};
    var suffix = accuracy;
    if (accuracy === 1) {
        suffix = "the nearest whole number";
    }
    if (accuracy > 1) {
        suffix = "the nearest \\(" + accuracy + "\\)";
    }
    if (accuracy < 1) {
        suffix = -Math.round(Math.log(accuracy) / Math.log(10)) + " decimal place";
        if (accuracy !== 0.1) {
            suffix += "s";
        }
    }

    problem.question = "<div>Round \\(" + x + "\\) to " + suffix + "</div>";
    problem.answer = roundError(Math.round(x / accuracy) * accuracy);
    if (accuracy < 1) {
        problem.answer = problem.answer.toFixed(-Math.round(Math.log(accuracy) / Math.log(10)));
    }
    return problem;
}
function sigFigs(x, accuracy) {
    var problem = {};
    var plural = "";
    if (accuracy !== 1) {
        plural = "s";
    }
    problem.question = "Round " + x + " to " + accuracy + " significant figure" + plural;
    problem.answer = x.toPrecision(accuracy) - 0;
    return problem;
}
function ratioShare(amount, ratio) {
    var problem = {};
    problem.answer = "";
    var parts = 0;
    problem.question = "<div>Share \\(" + amount + "\\) in the ratio \\(";
    for (var i = 0; i < ratio.length; i++) {
        parts += ratio[i];
        problem.question += ratio[i] + ":";
    }
    problem.question = problem.question.slice(0, -1);
    problem.question += "\\)</div>"
    var amountPerPart = amount / parts;
    for (i = 0; i < ratio.length; i++) {
        problem.answer += ratio[i] * amountPerPart + ":";
    }
    problem.answer = problem.answer.slice(0, -1);
    problem.typedAnswer = problem.answer;
    problem.answer = "<div>\\(" + problem.answer + "\\)</div>";
    return problem;
}
function ratioReverse(amount, ratio) {
    var problem = {};
    problem.answer = "";
    var parts = 0;
    problem.question = "<div>An amount was shared in the ratio \\(";
    for (var i = 0; i < ratio.length; i++) {
        parts += ratio[i];
        problem.question += ratio[i] + ":";
    }
    problem.question = problem.question.slice(0, -1);
    problem.question += "\\).</div>";
    var amountPerPart = amount / parts;
    switch (getRandom(0, 3)) {
        case 0:
            problem.question += "<div>The largest share was \\(" + Math.max.apply(Math, ratio) * amountPerPart + "\\).</div>";
            problem.question += "<div>What was the smallest share?</div>";
            problem.answer = Math.min.apply(Math, ratio) * amountPerPart;
            break;
        case 1:
            problem.question += "<div>The smallest share was \\(" + Math.min.apply(Math, ratio) * amountPerPart + "\\).</div>";
            problem.question += "<div>What was the largest share?</div>";
            problem.answer = Math.max.apply(Math, ratio) * amountPerPart;
            break;
        case 2:
            problem.question += "<div>The largest share was \\(" + Math.max.apply(Math, ratio) * amountPerPart + "\\).</div>";
            problem.question += "<div>What was the total amount shared?</div>";
            problem.answer = amount;
            break;
        case 3:
            problem.question += "<div>The smallest share was \\(" + Math.min.apply(Math, ratio) * amountPerPart + "\\).</div>";
            problem.question += "<div>What was the total amount shared?</div>";
            problem.answer = amount;
            break;
    }
    problem.typedAnswer = problem.answer;
    problem.answer = "<div>\\(" + problem.answer + "\\)</div>";
    return problem;
}
function ratioDifference(amount, ratio) {
    var problem = {};
    problem.answer = "";
    var parts = 0;
    var person = [];
    var ratioDisp = "";
    var seed = getRandom(0, 20);
    for (var i = 0; i < ratio.length; i++) {
        parts += ratio[i];
        ratioDisp += ratio[i] + ":";
        person.push(namePicker(i + seed));
    }
    ratioDisp = ratioDisp.slice(0, -1);
    var amountPerPart = amount / parts;
    if (ratio.length < 3) {
        problem.question = "<div>" + person[0].name + " and " + person[1].name + " shared some money in the ratio \\(" + ratioDisp + "\\).</div>";
    } else {
        problem.question = "<div>" + person[0].name + ", " + person[1].name + " and " + person[2].name + " shared some money in the ratio \\(" + ratioDisp + "\\).</div>";
    }
    do {
        var c1 = getRandom(0, ratio.length - 1);
        var c2 = getRandom(0, ratio.length - 1);
    } while (c1 === c2);
    var c3 = getRandom(0, ratio.length - 1);
    var c1Amount = ratio[c1] * amountPerPart;
    var c2Amount = ratio[c2] * amountPerPart;
    var diff = c2Amount - c1Amount;
    if (diff < 0) {
        var adj = "more than";
    } else if (diff > 0) {
        adj = "less than";
    } else {
        adj = "the same as";
    }
    problem.question += "<div>" + person[c1].name + " gets &pound;\\(" + Math.abs(diff) + "\\) " + adj + " " + person[c2].name + ".</div>";
    problem.question += "<div>How much does " + person[c3].name + " receive?</div>";
    problem.answer = "&pound;" + ratio[c3] * amountPerPart;
    problem.typedAnswer = problem.answer;
    problem.answer = "<div>\\(" + problem.answer + "\\)</div>";
    return problem;
}
function convertFDP(type, num, den) {
    var problem = {};
    var decimal = "\\(" + roundError(num / den) + "\\)";
    var percentage = "\\(" + roundError(num / den * 100) + "\\)";
    num = roundError(num);
    den = roundError(den);
    var whole = Math.floor(num / den);
    if (whole < 0) {
        whole++;
        if (whole != 0) {
            num = Math.abs(num);
        }
    }
    num = num % den;
    var hcf = HCF(num, den);
    num /= hcf;
    den /= hcf;
    var fraction = "\\(";
    var typedFraction = "";
    if (whole != 0) {
        fraction += whole;
        typedFraction += whole;
    }
    if (whole != 0 && num != 0) {
        typedFraction += " ";
    }
    if (num != 0) {
        fraction += "\\frac{" + num + "}{" + den + "}";
        typedFraction += num + "/" + den;
    }
    if (whole == 0 && num == 0) {
        fraction += "0";
        typedFraction = "0";
    }
    fraction += "\\)";
    problem.question = "Write ";
    switch (type) {
        case "PD":
            problem.question += percentage + "% as a decimal.";
            problem.answer = decimal;
            break;
        case "DP":
            problem.question += decimal + " as a percentage.";
            problem.answer = percentage + "%";
            break;
        case "DF":
            problem.question += decimal + " as a fraction.";
            problem.answer = fraction;
            problem.typedAnswer = typedFraction;
            break;
        case "PF":
            problem.question += percentage + "% as a fraction.";
            problem.answer = fraction;
            problem.typedAnswer = typedFraction;
            break;
        case "FD":
            problem.question += fraction + " as a decimal.";
            problem.answer = decimal;
            break;
        case "FP":
            problem.question += fraction + " as a percentage.";
            problem.answer = percentage + "%";
            break;
    }
    return problem;
}
function collectingTerms(letters, variables, coeff, mixed) {
    var problem = {};
    var totalTerms = coeff.length;
    problem.question = "<div>Simplify fully</div><div>\\(";
    for (var i = 0; i < totalTerms; i++) {
        if (coeff[i] > 0 && i > 0) {
            problem.question += " + ";
        }
        if (coeff[i] < 0) {
            problem.question += " - ";
        }
        if (Math.abs(coeff[i]) > 1) {
            problem.question += Math.abs(coeff[i]);
        }
        if (coeff[i] !== 0) {
            problem.question += variables[i];
        }
    }
    problem.question += "\\)</div>";
    var collected = new Array();
    for (i = 0; i < letters.length; i++) {
        var count = 0;
        for (var j = 0; j < totalTerms; j++) {
            if (variables[j] === letters[i]) {
                count += coeff[j];
            }
        }
        collected.push(count);
    }
    var answer = "";
    for (i = 0; i < letters.length; i++) {
        if (collected[i] > 0 && i > 0) {
            answer += " + ";
        }
        if (collected[i] < 0) {
            answer += " - ";
        }
        if (Math.abs(collected[i]) > 1) {
            answer += Math.abs(collected[i]);
        }
        if (collected[i] !== 0) {
            answer += letters[i];
        }
    }
    if (answer === "") {
        answer = "0";
    }
    problem.typedAnswer = answer;
    problem.answer = "\\(" + answer + "\\)";
    return problem;
}
function multiplyingTerms(type, negatives) {
    var problem = {};
    var l = [];
    var letters = ["x", "y", "z", "w"];
    for (var i = 0; i < 4; i++) {
        l.push(letters[i]);
    }
    var c = [];
    for (i = 0; i < 4; i++) {
        c.push(getRandom(2, 8 + i));
        if (negatives && toss()) {
            c[i] = -c[i];
        }
    }
    problem.question = "<div>Simplify fully</div><div>\\(";
    if (type > 5) {
        type = 5;
    }
    switch (type) {
        case 0:
            if (toss()) {
                problem.question += c[0] + l[0] + "\\ &#215;\\ " + c[1];
            } else {
                problem.question += c[0] + "\\ &#215;\\ " + c[1] + l[0];
            }
            problem.answer = (c[0] * c[1]) + l[0];
            break;
        case 1:
            if (toss()) {
                problem.question += l[0] + "\\ &#215;\\ " + l[0];
                problem.answer = l[0] + "^2";
                problem.typedAnswer = l[0] + "^2";
            } else if (toss()) {
                problem.question += l[0] + "\\ &#215;\\ " + l[0] + "\\ &#215;\\ " + l[0];
                problem.answer = l[0] + "^3";
                problem.typedAnswer = l[0] + "^3";
            } else {
                problem.question += l[0] + "\\ &#215;\\ " + l[0] + "\\ &#215;\\ " + l[0] + "\\ &#215;\\ " + l[0];
                problem.answer = l[0] + "^4";
                problem.typedAnswer = l[0] + "^4";
            }
            break;
        case 2:
            if (toss()) {
                problem.question += l[0] + "\\ &#215;\\ " + l[1];
                problem.answer = l[0] + l[1];
            } else {
                problem.question += l[0] + "\\ &#215;\\ " + l[1] + "\\ &#215;\\ " + l[2];
                problem.answer = l[0] + l[1] + l[2];
            }
            break;
        case 3:
            if (toss()) {
                problem.question += c[0] + l[0] + "\\ &#215;\\ " + c[1] + l[1];
                problem.answer = (c[0] * c[1]) + l[0] + l[1];
            } else {
                problem.question += c[0] + l[0] + "\\ &#215;\\ " + c[1] + l[0];
                problem.answer = (c[0] * c[1]) + l[0] + "^2";
                problem.typedAnswer = (c[0] * c[1]) + l[0] + "^2";
            }
            break;
        case 4:
            if (toss()) {
                problem.question += c[0] + l[0] + l[1] + "\\ &#215;\\ " + c[1] + l[0];
                problem.answer = (c[0] * c[1]) + l[0] + "^2" + l[1];
            } else {
                problem.question += c[0] + l[0] + l[1] + "\\ &#215;\\ " + c[1] + l[0] + l[1];
                problem.answer = (c[0] * c[1]) + l[0] + "^2" + l[1] + "^2";
            }
            break;
        case 5:
            if (toss()) {
                problem.question += c[0] + l[0] + "^2" + l[1] + "\\ &#215;\\ " + c[1] + l[0] + "\\ &#215;\\ " + l[1] + l[2];
                problem.answer = (c[0] * c[1]) + l[0] + "^3" + l[1] + "^2" + l[2];
            } else {
                problem.question += c[0] + l[1] + l[2] + "\\ &#215;\\ " + c[1] + l[1] + "\\ &#215;\\ " + c[2] + l[0] + l[2];
                problem.answer = (c[0] * c[1] * c[2]) + l[0] + l[1] + "^2" + l[2] + "^2";
            }
            break;
    }
    problem.question += "\\)</div>";
    problem.answer = "<div>\\(" + problem.answer + "\\)</div>";
    return problem;
}
function factors(maxFactors, minNumber, maxNumber) {
    var problem = {};
    var totalFactors = maxFactors + 1;
    while (totalFactors > maxFactors) {
        totalFactors = 1;
        var answer = "1";
        var x = getRandom(minNumber, maxNumber);
        if (x % 2 === 1 && Math.random() < 0.5 && x < maxNumber) {
            x++;
        }
        for (var i = 2; i <= x; i++) {
            if (x % i === 0) {
                answer += "," + i;
                totalFactors++;
            }
        }
    }
    problem.question = "<div>List all the factors of \\(" + x + "\\).</div>";
    problem.answer = "<div>\\(" + answer + "\\)</div>";
    problem.typedTanswer = answer;
    return problem;
}
function multiples(multiple, x) {
    var problem = {};
    problem.question = "<div>Write down the \\(" + multiple + "\\)<sup>" + ordinal(multiple) + "</sup> multiple of \\(" + x + "\\).</div>";
    problem.answer = x * multiple;
    return problem;
}
function hcf(x, y, z, decomp) {
    var problem = {};
    if (!decomp) {
        if (z) {
            problem.question = "Find the highest common factor of " + x + ", " + y + " and " + z + ".";
            problem.answer = HCF(HCF(x, y), z);
        } else {
            problem.question = "Find the highest common factor of " + x + " and " + y + ".";
            problem.answer = HCF(x, y);
        }
    } else {
        if (z) {
            problem.question = "<div>\\(A = " + primeFactors(x, true) + "\\)</div>";
            problem.question += "<div>\\(B = " + primeFactors(y, true) + "\\)</div>";
            problem.question += "<div>\\(C = " + primeFactors(z, true) + "\\)</div>";
            problem.question += "Find the highest common factor of A, B and C.";
            problem.answer = HCF(HCF(x, y), z);
        } else {
            problem.question = "<div>\\(A = " + primeFactors(x, true) + "\\)</div>";
            problem.question += "<div>\\(B = " + primeFactors(y, true) + "\\)</div>";
            problem.question += "Find the highest common factor of A and B.";
            problem.answer = HCF(x, y);
        }
    }
    return problem;
}
function lcm(x, y, z, decomp) {
    var problem = {};
    if (!decomp) {
        if (z) {
            var temp = x * y / (HCF(x, y));
            problem.question = "Find the lowest common multiple of " + x + ", " + y + " and " + z + ".";
            problem.answer = temp * z / HCF(temp, z);
        } else {
            problem.question = "Find the lowest common multiple of " + x + " and " + y + ".";
            problem.answer = x * y / (HCF(x, y));
        }
    } else {
        if (z) {
            var temp = x * y / (HCF(x, y));
            problem.question = "<div>\\(A = " + primeFactors(x, true) + "\\)</div>";
            problem.question += "<div>\\(B = " + primeFactors(y, true) + "\\)</div>";
            problem.question += "<div>\\(C = " + primeFactors(z, true) + "\\)</div>";
            problem.question += "Find the lowest common multiple of A, B and C.";
            problem.answer = temp * z / HCF(temp, z);
        } else {
            problem.question = "<div>\\(A = " + primeFactors(x, true) + "\\)</div>";
            problem.question += "<div>\\(B = " + primeFactors(y, true) + "\\)</div>";
            problem.question += "Find the lowest common multiple of A and B.";
            problem.answer = x * y / (HCF(x, y));
        }
    }
    return problem;
}
function simplifyingRatios(terms, maxPrime) {
    var problem = {};
    var simplifiedRatio = Array(terms);
    var ratio = new Array(terms);
    var multiplier = getRandom(2, maxPrime);
    for (var i = 0; i < ratio.length; i++) {
        simplifiedRatio[i] = getRandom(1, maxPrime);
        while (!isPrime(simplifiedRatio[i])) {
            simplifiedRatio[i] = getRandom(1, maxPrime);
        }
        ratio[i] = simplifiedRatio[i] * multiplier;
    }
    while (simplifiedRatio[0] === simplifiedRatio[1]) {
        simplifiedRatio[1] = getRandom(1, maxPrime);
        while (!isPrime(simplifiedRatio[1])) {
            simplifiedRatio[1] = getRandom(1, maxPrime);
        }
        ratio[1] = simplifiedRatio[1] * multiplier;
    }
    problem.question = "<div>Simplify fully</div><div>\\(";
    problem.answer = "<div>\\(";
    problem.typedAnswer = "";
    for (i = 0; i < ratio.length - 1; i++) {
        problem.question += ratio[i] + ":";
        problem.typedAnswer += simplifiedRatio[i] + ":";
        problem.answer += simplifiedRatio[i] + ":";
    }
    problem.question += ratio[i] + "\\)</div>";
    problem.typedAnswer += simplifiedRatio[i];
    problem.answer += simplifiedRatio[i] + "\\)</div>";
    return problem;
}
function simplifyingFractions(maxPrime) {
    var problem = {};
    var numerator = getRandom(1, maxPrime / 2);
    var denominator = getRandom(2, maxPrime);
    while (denominator <= numerator || HCF(numerator, denominator) !== 1) {
        denominator = getRandom(1, maxPrime);
    }
    var multiplier = Math.max(2, getRandom(maxPrime / 4, maxPrime));
    problem.question = "Simplify fully \\( \\frac{" + numerator * multiplier + "}{" + denominator * multiplier + "} \\)";
    problem.answer = "\\( \\frac{" + numerator + "}{" + denominator + "}\\)";
    problem.typedAnswer = numerator + "/" + denominator;
    return problem;
}
function nthTermFinding(a, b, c) {
    var problem = {};
    var terms = [];
    for (var i = 1; i < 5; i++) {
        terms.push(roundError((a * i * i) + (b * i) + (c)));
    }
    problem.question = "<div>Find the \\(n^{th} \\text{ term}\\) rule for the sequence:</div><div>\\(";
    for (var i = 0; i < terms.length; i++) {
        problem.question += terms[i] + ", ";
    }
    problem.question += "...\\)</div>";
    problem.answer = "n\\(^{th} \\text{ term} = ";
    problem.typedAnswer = "";
    var firstTerm = true;
    problem.answer += fixTerm(a, "n^2", firstTerm);
    problem.typedAnswer += fixTerm(a, "n^2", firstTerm);
    if (a !== 0) {
        firstTerm = false;
    }
    problem.answer += fixTerm(b, "n", firstTerm);
    problem.typedAnswer += fixTerm(b, "n", firstTerm);
    if (b !== 0) {
        firstTerm = false;
    }
    problem.answer += fixTerm(c, "", firstTerm) + "\\)";
    problem.answer = "<div>" + problem.answer + "</div>";
    problem.typedAnswer += fixTerm(c, "", firstTerm);
    return problem;
}
function sequencesNextTerm(a, b, c) {
    var problem = {};
    var terms = [];
    var sequence = "<div>Find the next term in this sequence:</div><div>\\(";
    for (var i = 1; i < 5; i++) {
        terms.push(roundError((a * i * i) + (b * i) + (c)));
        sequence += terms[i - 1] + ",\\ ";
    }
    sequence += " ?\\)</div>";
    problem.question = sequence;
    problem.answer = (a * 5 * 5) + (b * 5) + (c);
    return problem;
}
function nthTermGenerating(a, b, c) {
    var problem = {};
    var term = getRandom(1, 10);
    var nthTerm = "";
    var firstTerm = true;
    nthTerm += fixTerm(a, "n^2", firstTerm);
    if (a !== 0) {
        firstTerm = false;
    }
    nthTerm += fixTerm(b, "n", firstTerm);
    if (b !== 0) {
        firstTerm = false;
    }
    nthTerm += fixTerm(c, "", firstTerm);
    var terms = [];
    for (var i = 1; i <= 5; i++) {
        terms.push((a * i * i) + (b * i) + c);
    }
    problem.question = "<div>\\(n^{th}\\text{ term} = " + nthTerm + "\\)</div>";
    problem.question += "<div>List the first five terms of the sequence.</div>";
    problem.answer = "\\(" + terms + "\\)";
    problem.typedAnswer = terms;
    return problem;
}
function nthTermSpecificTerm(a, b, c, n) {
    var problem = {};
    var nthTerm = "";
    var firstTerm = true;
    nthTerm += fixTerm(a, "n^2", firstTerm);
    if (a !== 0) {
        firstTerm = false;
    }
    nthTerm += fixTerm(b, "n", firstTerm);
    if (b !== 0) {
        firstTerm = false;
    }
    nthTerm += fixTerm(c, "", firstTerm);
    var terms = (a * n * n) + (b * n) + c;
    problem.question = "<div>The \\(n^{th}\\) term of a sequence is given by the rule \\(" + nthTerm + "\\).</div>";
    problem.question += "<div>Find the " + n + "<sup>" + ordinal(n) + "</sup> term of the sequence.</div>";
    problem.answer = "\\(" + terms + "\\)";
    problem.typedAnswer = terms;
    return problem;
}
function addingCoins(coins) {
    var problem = {};
    var coin = new Array("1p", "2p", "5p", "10p", "20p", "50p", "&pound;1", "&pound;2");
    var value = new Array(1, 2, 5, 10, 20, 50, 100, 200);
    var quantity = new Array(0, 0, 0, 0, 0, 0, 0, 0);
    var total = 0;
    var coinsUsed = 0;
    var plural = "";
    for (var i = 0; i < coins; i++) {
        quantity[Math.floor(Math.random() * coin.length)] += 1;
    }
    problem.question = "<div>Add together:<br>";
    var singleValue = true;
    for (i = 0; i < coin.length; i++) {
        if (quantity[i] > 0) {
            if (quantity[i] > 1) {
                plural = "'s";
            } else {
                plural = "";
            }
            coinsUsed += quantity[i];
            if (coinsUsed === coins && !singleValue) {
                problem.question += "and " + wordedNumber(quantity[i]) + " " + coin[i] + plural + ". ";
            } else {
                problem.question += wordedNumber(quantity[i]) + " " + coin[i] + plural + ", ";
            }
            singleValue = false;
        }
        total += value[i] * quantity[i];
    }
    problem.question = problem.question.slice(0, -2);
    problem.question += ".</div>";
    problem.answer = toPounds(total);
    problem.typedAnswer = (total / 100).toFixed(2);
    return problem;
}
function countingCoins(quantity) {
    var problem = {};
    var coin = new Array("2p", "5p", "10p", "20p", "50p", "&pound;2");
    var value = new Array(2, 5, 10, 20, 50, 200);
    var currentCoin = Math.floor(Math.random() * coin.length);
    var total = quantity * value[currentCoin];
    problem.question = "<div>How many " + coin[currentCoin] + " coins are in " + toPounds(total) + "?</div>";
    problem.answer = quantity;
    return problem;
}
function speedDistTime(speed, time, type) {
    var problem = {};
    var distanceUnit = "m";
    var timeUnit = "s";
    if (Math.random() < 0.5) {
        distanceUnit = "km";
        timeUnit = "h";
    }
    var speedUnit = distanceUnit + "/" + timeUnit;
    var distance = speed * time;
    problem.question = "<div>";
    switch (type) {
        case 0:
            problem.question += "An object travels at " + speed + " " + speedUnit + " for " + time + " " + timeUnit + ".<br>How far does it travel?";
            problem.answer = distance + " " + distanceUnit;
            problem.typedAnswer = distance + " " + distanceUnit;
            break;
        case 1:
            problem.question += "An object travels at " + speed + " " + speedUnit + " for " + distance + " " + distanceUnit + ".<br>How long did it take?";
            problem.answer = time + " " + timeUnit;
            problem.typedAnswer = time + timeUnit;
            break;
        case 2:
            problem.question += "An object travels " + distance + " " + distanceUnit + " in " + time + " " + timeUnit + ".<br>What speed was it travelling?";
            problem.answer = speed + " " + speedUnit;
            problem.typedAnswer = speed + speedUnit;
            break;
    }
    problem.question += "</div>";
    return problem;
}
function powersAndRoots(x, a, b) {
    var problem = {};
    problem.question = "<div>\\(";
    if (a === 0) {
        problem.question += x + "^{" + a + "}";
    } else if (b === 2 && a === 1) {
        problem.question += "\\sqrt{" + x + "}";
    } else if (b === 3 && a === 1) {
        problem.question += "\\sqrt[3]{" + x + "}";
    } else if (b !== 1) {
        if (a < 0) {
            problem.question += x + "^{-\\frac{" + Math.abs(a) + "}{" + b + "}}";
        } else {
            problem.question += x + "^{\\frac{" + a + "}{" + b + "}}";
        }
    } else {
        problem.question += x + "^{" + a + "}";
    }
    problem.question += "\\)</div>";
    if (a < 0 && x !== 1) {
        x = roundError(Math.pow(x, Math.abs(a) / b));
        problem.answer = "\\( \\frac{1}{" + x + "}\\)";
        problem.typedAnswer = 1 + "/" + x;
    } else {
        x = roundError(Math.pow(x, a / b));
        problem.answer = "\\(" + x + "\\)";
    }
    return problem;
}
function ordering(length, decimal, negative, descending, range) {
    var list = new Array(length);
    var problem = {};
    var sequence = "";
    for (var i = 0; i < list.length; i++) {
        list[i] = Math.floor(Math.random() * range);
        if (decimal) {
            list[i] /= Math.pow(10, getRandom(0, 2));
        }
        if (negative) {
            list[i] = -list[i];
        }
    }
    problem.question = "<div>Write in ";
    if (descending) {
        problem.question += "descending";
    } else {
        problem.question += "ascending";
    }
    problem.question += " order:</div><div>\\(";
    for (i = 0; i < list.length - 1; i++) {
        problem.question += list[i] + ", ";
    }
    problem.question += list[i];
    if (descending) {
        list.sort(function (a, b) {
            return b - a
        });
    } else {
        list.sort(function (a, b) {
            return a - b
        });
    }
    for (i = 0; i < list.length - 1; i++) {
        sequence += list[i] + ", ";
    }
    sequence += list[i];
    problem.question += "\\)</div>";
    problem.answer = "<div>\\(" + list + "\\)</div>";
    return problem;
}
function oneStepEquations(type, x, answer, inequality) {
    var problem = {};
    var letter = "x";
    var side1, side2;
    var symbol = "=";
    if (inequality) {
        switch (getRandom(0, 3)) {
            case 0:
                symbol = "&lt;";
                break;
            case 1:
                symbol = "&le;";
                break;
            case 2:
                symbol = "&gt;";
                break;
            case 3:
                symbol = "&ge;";
                break;
        }
        if (type === 7) {
            type = getRandom(0, 4);
        }
    }
    switch (type) {
        case 0:
            side1 = letter + " + " + x;
            side2 = x + answer;
            break;
        case 1:
            side1 = x + " + " + letter;
            side2 = x + answer;
            break;
        case 2:
            side1 = x + letter;
            side2 = x * answer;
            break;
        case 3:
            side1 = letter + " - " + x;
            side2 = answer - x;
            break;
        case 4:
            side1 = x + " - " + letter;
            side2 = x - answer;
            break;
        case 5:
            side1 = "\\frac{" + letter + "}{" + x + "}";
            side2 = answer / x;
            break;
        case 6:
            side1 = "\\frac{" + x + "}{" + letter + "}";
            side2 = x / answer;
            break;
        case 7:
            side1 = letter + "^" + x + "";
            side2 = Math.pow(answer, x);
            break;
    }
    side2 = roundError(side2);
    problem.question = "<div>Solve:</div><div>" + "\\(";
    if (Math.random() < 0.5 || inequality) {
        problem.question += side1 + " " + symbol + " " + side2;
    } else {
        problem.question += side2 + " " + symbol + " " + side1;
    }
    problem.question += "\\)</div>";
    answer = roundError(answer);
    if (!inequality) {
        problem.answer = "\\(" + letter + " " + symbol + " " + answer + "\\)";
        problem.typedAnswer = letter + symbol + answer;
    } else {
        problem.answer = "\\(" + answer + "\\)";
    }
    return problem;
}
function twoStepEquations(type, x, y, answer, inequality) {
    var problem = {};
    var letter = "x";
    var side1, side2;
    var symbol = "=";
    if (inequality) {
        switch (getRandom(0, 3)) {
            case 0:
                symbol = "&lt;";
                break;
            case 1:
                symbol = "&le;";
                break;
            case 2:
                symbol = "&gt;";
                break;
            case 3:
                symbol = "&ge;";
                break;
        }
        if (type > 6) {
            type = getRandom(0, 6);
        }
    }
    switch (type) {
        case 0:
            side1 = x + letter + " + " + y;
            side2 = answer * x + y;
            break;
        case 1:
            side1 = x + letter + " - " + y;
            side2 = answer * x - y;
            break;
        case 2:
            side1 = y + " + " + x + letter;
            side2 = answer * x + y;
            break;
        case 3:
            side1 = "\\frac{" + letter + "}{" + x + "} + " + y;
            side2 = answer / x + y;
            break;
        case 4:
            side1 = "\\frac{" + letter + "}{" + x + "} - " + y;
            side2 = answer / x - y;
            break;
        case 5:
            side1 = y + " + \\frac{" + letter + "}{" + x + "}";
            side2 = answer / x + y;
            break;
        case 6:
            side1 = y + " - " + x + letter;
            side2 = -(answer * x - y);
            break;
        case 7:
            side1 = letter + "^" + x + " + " + y;
            side2 = Math.pow(answer, x) + y;
            break;
        case 8:
            side1 = letter + "^" + x + " - " + y;
            side2 = Math.pow(answer, x) - y;
            break;
    }
    side2 = roundError(side2);
    problem.question = "<div>Solve:</div><div>" + "\\(";
    if (Math.random() < 0.5 || inequality) {
        problem.question += side1 + " " + symbol + " " + side2;
    } else {
        problem.question += side2 + " " + symbol + " " + side1;
    }
    problem.question += "\\)</div>";
    answer = roundError(answer);
    if (!inequality) {
        problem.answer = "\\(" + letter + " " + symbol + " " + answer + "\\)";
        problem.typedAnswer = letter + symbol + answer;
    } else {
        problem.answer = "\\(" + answer + "\\)";
    }
    return problem;
}
function threeStepEquations(x, y, z, answer, reversable, inequality) {
    var problem = {};
    var letter = "x";
    var side1, side2;
    var symbol = "=";
    if (inequality) {
        switch (getRandom(0, 3)) {
            case 0:
                symbol = "&lt;";
                break;
            case 1:
                symbol = "&le;";
                break;
            case 2:
                symbol = "&gt;";
                break;
            case 3:
                symbol = "&ge;";
                break;
        }
    }
    if (reversable && Math.random() < 0.5) {
        side1 = fixTerm(z, "", true) + fixTerm((x + y), letter, false);
    } else {
        side1 = fixTerm((x + y), letter, true) + fixTerm(z, "", false);
    }
    if (reversable && Math.random() < 0.5) {
        side2 = fixTerm(roundError(x * answer + z), "", true) + fixTerm(y, letter, false);
    } else {
        side2 = fixTerm(y, letter, true) + fixTerm(roundError(x * answer + z), "", false);
    }
    problem.question = "<div>Solve:</div><div>" + "\\(";
    if ((reversable && Math.random() < 0.5) || inequality) {
        problem.question += side1 + " " + symbol + " " + side2;
    } else {
        problem.question += side2 + " " + symbol + " " + side1;
    }
    problem.question += "\\)</div>";
    answer = roundError(answer);
    if (!inequality) {
        problem.answer = "\\(" + letter + " " + symbol + " " + answer + "\\)";
        problem.typedAnswer = letter + symbol + answer;
    } else {
        problem.answer = "\\(" + answer + "\\)";
    }
    return problem;
}
function equationsWithBrackets(x, y, z, answer, reversable) {
    var problem = {};
    var letter = "x";
    var side1, side2;
    if (reversable) {
        side1 = fixTerm(x, "", true) + "(" + fixTerm(z, "", true) + fixTerm(y, letter, false) + ")";
    } else {
        side1 = fixTerm(x, "", true) + "(" + fixTerm(y, letter, true) + fixTerm(z, "", false) + ")";
    }
    side2 = roundError(x * (y * answer + z));
    problem.question = "<div>Solve:</div><div>\\(";
    if (Math.random() < 0.5 && reversable) {
        problem.question += side2 + " = " + side1;
    } else {
        problem.question += side1 + " = " + side2;
    }
    problem.question += "\\)</div>";
    answer = roundError(answer);
    problem.answer = "\\(" + letter + " = " + answer + "\\)";
    problem.typedAnswer = letter + "=" + answer;
    return problem;
}
function equationsWithBracketsBoth(a, b, c, d, e, f, answer, reversable) {
    var problem = {};
    var letter = "x";
    var side1, side2;
    if (reversable) {
        side1 = fixTerm(a, "", true) + "(" + fixTerm(c, "", true) + fixTerm(b, letter, false) + ")";
    } else {
        side1 = fixTerm(a, "", true) + "(" + fixTerm(b, letter, true) + fixTerm(c, "", false) + ")";
    }
    side2 = fixTerm(d, "", true) + "(" + fixTerm(e, letter, true) + fixTerm(f, "", false) + ")";
    problem.question = "<div>Solve:</div><div>" + "\\(";
    if (Math.random() < 0.5 && reversable) {
        problem.question += side2 + " = " + side1;
    } else {
        problem.question += side1 + " = " + side2;
    }
    problem.question += "\\)</div>";
    answer = roundError(answer);
    problem.answer = "\\(" + letter + " = " + answer + "\\)";
    problem.typedAnswer = letter + "=" + answer;
    return problem;
}
function equationsIfThen(type, a, b, rhs) {
    var problem = {};
    var letter = "x";
    var e1 = "";
    var e2 = "";
    var ans = 0;
    switch (type) {
        case 0:
            e1 = a + letter + "=" + rhs;
            e2 = a + letter + "+" + b;
            ans = rhs + b;
            break;
        case 1:
            e1 = a + letter + "=" + rhs;
            e2 = a + letter + "-" + b;
            ans = rhs - b;
            break;
        case 2:
            var mults = [2, 10];
            var m = mults[getRandom(0, mults.length - 1)];
            e1 = a + letter + "=" + rhs;
            e2 = m * a + letter;
            ans = rhs * m;
            break;
        case 3:
            e1 = a + letter + "=" + rhs;
            e2 = a / 2 + letter;
            ans = rhs / 2;
            break;
        case 4:
            e1 = a + letter + "=" + rhs;
            e2 = a + "(" + letter + "+" + 1 + ")";
            ans = rhs + a;
            break;
        case 5:
            e1 = a + letter + "=" + rhs;
            e2 = a + "(" + letter + "-" + 1 + ")";
            ans = rhs - a;
            break;
        case 6:
            e1 = a + letter + "=" + rhs;
            e2 = -a + letter + "+" + b;
            ans = -rhs + b;
            break;
        case 7:
            e1 = a + letter + "=" + rhs;
            e2 = -a + letter + "-" + b;
            ans = -rhs - b;
            break;
        case 8:
            e1 = a + letter + "=" + rhs;
            e2 = -a + "(" + letter + "+" + 1 + ")";
            ans = -rhs - a;
            break;
        case 9:
            e1 = a + letter + "=" + rhs;
            e2 = -a + "(" + letter + "-" + 1 + ")";
            ans = -rhs + a;
            break;
    }
    var answer = e2 + "=" + ans;
    e2 += "=\\text{ }?";

    problem.question = "<div>If \\(" + e1 + "\\),</div>";
    problem.question += "<div>then \\(" + e2 + "\\)</div>";
    problem.answer = "\\(" + answer + "\\)";
    return problem;
}
function numberBonds(type, bond, x) {
    var problem = {};
    var data = "";
    switch (type) {
        case 0:
            data = x + " + ? = " + bond;
            break;
        case 1:
            data = "? + " + x + " = " + bond;
            break;
        case 2:
            data = bond + " &minus; " + " ? = " + x;
            break;
        case 3:
            data = bond + " &minus; " + x + " = ?";
            break;
        case 4:
            data = bond + " + " + x + "+? = " + 2 * bond;
            break;
        case 5:
            data = bond + " + " + "? + " + x + " = " + 2 * bond;
            break;
        case 6:
            data = 2 * bond + " - " + "? = " + bond + "+" + x;
            break;
        case 7:
            data = 2 * bond + " - " + x + " = " + bond + "+?";
            break;
    }
    problem.question = "\\(" + data + "\\)";
    problem.answer = "\\(" + roundError(bond - x) + "\\)";
    problem.typedAnswer = roundError(bond - x);
    return problem;
}
function tableBonds(type, a, b, c, d) {
    var problem = {};
    var question = "";
    var answer = "";
    switch (type) {
        case 0:
            question = a * b + "\\text{ }&times;\\text{ }" + c * d + "\\text{ }=\\text{ }" + a * c + "\\text{ }&times\\text{ }" + " ?";
            answer = b * d;
            break;
        case 1:
            question = a * b + "\\text{ }&times;\\text{ }" + c * d + "\\text{ }=\\text{ }?\\text{ }&times\\text{ }" + b * c;
            answer = a * d;
            break;
        case 2:
            question = a * b + "\\text{ }&times;\\text{ }?\\text{ }=\\text{ }" + a * c + "\\text{ }&times\\text{ }" + b * d;
            answer = c * d;
            break;
        case 3:
            question = "?\\text{ }&times;\\text{ }" + c * d + "\\text{ }=\\text{ }" + a * c + "\\text{ }&times\\text{ }" + b * d;
            answer = a * b;
            break;
    }
    problem.question = "\\(" + question + "\\)";
    problem.answer = "\\(" + answer + "\\)";
    return problem;
}
function fourOpsFractions(w1, n1, d1, w2, n2, d2, w3, n3, d3, o1, o2) {
// w = whole, n = numerator, d = denominator, o = operation, a = answer
    var problem = {};
    if (w1 === 0) {
        w1 = "";
    }
    if (w2 === 0) {
        w2 = "";
    }
    if (w3 === 0) {
        w3 = "";
    }
    var hcf = HCF(n1, d1);
    n1 /= hcf;
    d1 /= hcf;
    hcf = HCF(n2, d2);
    n2 /= hcf;
    d2 /= hcf;
    hcf = HCF(n3, d3);
    n3 /= hcf;
    d3 /= hcf;

    var f1 = w1 + "\\frac{" + n1 + "}{" + d1 + "}";
    var f2 = w2 + "\\frac{" + n2 + "}{" + d2 + "}";
    var f3 = w3 + "\\frac{" + n3 + "}{" + d3 + "}";
    n1 = w1 * d1 + n1;
    n2 = w2 * d2 + n2;
    n3 = w3 * d3 + n3;
    if (o1 == "+") {
        var num = n1 * d2 + n2 * d1;
        var den = d1 * d2;
    } else if (o1 == "-") {
        num = n1 * d2 - n2 * d1;
        den = d1 * d2;
    } else if (o1 == "&#215;") {
        num = n1 * n2;
        den = d1 * d2;
    } else if (o1 == "&divide;") {
        num = n1 * d2;
        den = d1 * n2;
    }
    if (o2 == "+") {
        num = num * d3 + n3 * den;
        den *= d3;
    } else if (o2 == "-") {
        num = num * d3 - n3 * den;
        den *= d3;
    } else if (o2 == "&#215;") {
        num = num * n3;
        den = den * d3;
    } else if (o2 == "&divide;") {
        num = num * d3;
        den = den * n3;
    }
    problem.question = "\\( " + f1 + "\\ " + o1 + "\\ " + f2;
    if (o2) {
        problem.question += "\\ " + o2 + "\\ " + f3;
    }
    problem.question += "\\)";
    var whole = Math.floor(num / den);
    if (whole < 0) {
        whole++;
        if (whole != 0) {
            num = Math.abs(num);
        }
    }
    num = num % den;
    hcf = HCF(num, den);
    num /= hcf;
    den /= hcf;
    problem.answer = "\\(";
    problem.typedAnswer = "";
    if (whole != 0) {
        problem.answer += whole;
        problem.typedAnswer += whole;
    }
    if (whole != 0 && num != 0) {
        problem.typedAnswer += " ";
    }
    if (num != 0) {
        problem.answer += "\\frac{" + num + "}{" + den + "}";
        problem.typedAnswer += num + "/" + den;
    }
    if (whole == 0 && num == 0) {
        problem.answer += "0";
        problem.typedAnswer = "0";
    }
    problem.answer += "\\)";
    return problem;
}
function mean(data) {
    var problem = {};
    var total = 0;
    for (var i = 0; i < data.length; i++) {
        total += data[i];
    }
    var mean = total / data.length;
    problem.question = "<div>Find the mean of:<br>"

    for (var i = 0; i < data.length; i++) {
        problem.question += data[i] + ", ";
    }
    problem.question = problem.question.slice(0, -2);
    problem.question += "</div>";
    problem.answer = mean;
    return problem;
}
function median(data) {
    var problem = {};
    var median;
    problem.question = "<div>Find the median of:<br>"
    for (var i = 0; i < data.length; i++) {
        problem.question += data[i] + ", ";
    }
    problem.question = problem.question.slice(0, -2);
    problem.question += "</div>";
    data.sort(function (a, b) {
        return a - b;
    });
    if (data.length % 2 == 1) {
        median = data[(data.length + 1) / 2 - 1];
    } else {
        median = roundError((data[data.length / 2] + data[data.length / 2 - 1]) / 2);
    }
    problem.answer = median;
    return problem;
}
function range(data) {
    var problem = {};
    problem.question = "<div>Find the range of:</div><div>\\("
    for (var i = 0; i < data.length - 1; i++) {
        problem.question += data[i] + ",\\ ";
    }
    problem.question += data[i];
    problem.question += "\\)</div>";
    data.sort(function (a, b) {
        return a - b;
    });
    var range = data[data.length - 1] - data[0];
    problem.answer = range;
    return problem;
}
function mode(data) {
    var problem = {};
    problem.question = "<div>Find the mode of:</div>";
    for (var i = 0; i < data.length; i++) {
        problem.question += data[i] + ", ";
    }
    problem.question = problem.question.slice(0, -2);
    problem.question += "</div>";
    var mode = [];
    var count = [];
    var maxFrequency = 1;
    var current = 0;
    for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < data.length; j++) {
            if (data[i] == data[j]) {
                current++;
            }
        }
        count.push(current);
        if (current > maxFrequency) {
            maxFrequency = current;
        }
        current = 0;
    }
    for (var i = 0; i < data.length; i++) {
        if (count[i] == maxFrequency && count[i] > 1) {
            mode.push(data[i]);
        }
    }
    if (!isNaN(mode[0])) {
        mode.sort(function (a, b) {
            return a - b;
        });
    } else {
        mode.sort();
    }
    if (mode.length == 0) {
        problem.answer = "no mode";
    } else {
        var currentMode = "";
        problem.answer = "";
        for (i = 0; i < mode.length; i++) {
            if (mode[i] != currentMode) {
                problem.answer += mode[i] + ", ";
                currentMode = mode[i];
            }
        }
        problem.answer = problem.answer.slice(0, -2);
    }
    return problem;
}
function standardForm(x, y, op) {
    var problem = {};
    var a = {};
    switch (op) {
        case "*":
            op = "\\ &#215;\\ ";
            a.co = x.co * y.co;
            a.pow = x.pow + y.pow;
            break;
        case "/":
            op = "\\ &divide;\\ ";
            a.co = x.co / y.co;
            a.pow = x.pow - y.pow;
            break;
        case "+":
            op = "+";
            a.co = x.co * Math.pow(10, x.pow) + y.co * Math.pow(10, y.pow);
            a.pow = 0;
            break;
        case "-":
            op = "-";
            a.co = x.co * Math.pow(10, x.pow) - y.co * Math.pow(10, y.pow);
            a.pow = 0;
            break;
    }
    problem.question = "<div>\\((" + x.co + "\\ &#215;\\ 10^{" + x.pow + "}) " + op + " (" + y.co + "\\ &#215;\\ 10^{" + y.pow + "})\\)</div>";
    while (a.co >= 10) {
        a.co /= 10;
        a.pow++;
    }
    while (a.co < 1 && a.co > 0) {
        a.co *= 10;
        a.pow--;
    }
    a.co = roundError(a.co);
    problem.answer = "<div>\\(" + a.co + "\\ &#215;\\ 10^{" + a.pow + "}\\)</div>";
    problem.typedAnswer = a.co + "*10^" + a.pow;
    return problem;
}
function convertingStandardForm(x, type) {
    var problem = {};
    problem.question = "<div>";
    switch (type) {
        case 0:
            problem.question += "Write \\(" + roundError(x.co * Math.pow(10, x.pow)) + "\\) in standard form.";
            checkCo(x);
            problem.answer = roundError(x.co) + "\\ &#215;\\ 10^{" + x.pow + "}";
            problem.typedAnswer = roundError(x.co) + "*10^" + x.pow;
            break;
        case 1:
            problem.question += "Write \\(" + roundError(x.co) + "\\ &#215;\\ 10^{" + x.pow + "}\\) as an ordinary number.";
            checkCo(x);
            problem.answer = roundError(x.co * Math.pow(10, x.pow));
            break;
        case 2:
            problem.question += "Write \\(" + roundError(x.co) + "\\ &#215;\\ 10^{" + x.pow + "}\\) in standard form.";
            checkCo(x);
            problem.answer = roundError(x.co) + " &#215; 10^{" + x.pow + "}";
            problem.typedAnswer = roundError(x.co) + "*10^" + x.pow;
            break;
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
        roundError(term.co);
        return term;
    }
    problem.question += "</div>";
    problem.answer = "<div>\\(" + problem.answer + "\\)</div>";
    return problem;
}
function convertingFractions(num, den, toMixed) {
    var problem = {};
    var hcf = HCF(num, den);
    num /= hcf;
    den /= hcf;
    var improper = "\\frac{" + num + "}{" + den + "}";
    var mixed = Math.floor(num / den) + "\\frac{" + (num % den) + "}{" + den + "}";
    if (toMixed) {
        problem.question = "Write \\(" + improper + "\\) as a mixed number.";
        problem.answer = "\\(" + mixed + "\\)";
    } else {
        problem.question = "Write \\(" + mixed + "\\) as an improper fraction.";
        problem.answer = "\\(" + improper + "\\)";
    }
    return problem;
}
function convertingMetricLength(m, from, to) {
//0, 1, 2, 3 -> mm, cm, m, km
    var problem = {};
    var unit = new Array("mm", "cm", "m", "km");
    var cm = roundError(m * 100);
    var mm = roundError(cm * 10);
    var km = roundError(m / 1000);
    var value = new Array(mm, cm, m, km);
    problem.question = "Convert " + value[from] + " " + unit[from] + " to " + unit[to];
    switch (to) {
        case 0:
            problem.answer = mm;
            break;
        case 1:
            problem.answer = cm;
            break;
        case 2:
            problem.answer = m;
            break;
        case 3:
            problem.answer = km;
            break;
    }
    problem.answer += " " + unit[to];
    return problem;
}
function convertingMetricWeight(kg, from, to) {
//0, 1, 2, 3 -> mg, g, kg, tonnes
    var problem = {};
    var unit = new Array("mg", "g", "kg", "tonnes");
    var g = roundError(kg * 1000);
    var mg = roundError(g * 1000);
    var tonnes = roundError(kg / 1000);
    var value = new Array(mg, g, kg, tonnes);
    problem.question = "Convert " + value[from] + " " + unit[from] + " to " + unit[to];
    switch (to) {
        case 0:
            problem.answer = mg;
            break;
        case 1:
            problem.answer = g;
            break;
        case 2:
            problem.answer = kg;
            break;
        case 3:
            problem.answer = tonnes;
            break;
    }
    problem.answer += " " + unit[to];
    return problem;
}
function convertingMetricVolume(l, from, to) {
//0, 1, 2 -> l, cl, l
    var problem = {};
    var unit = new Array("ml", "cl", "l");
    var cl = roundError(l * 100);
    var ml = roundError(cl * 10);
    var value = new Array(ml, cl, l);
    problem.question = "Convert " + value[from] + " " + unit[from] + " to " + unit[to];
    switch (to) {
        case 0:
            problem.answer = ml;
            break;
        case 1:
            problem.answer = cl;
            break;
        case 2:
            problem.answer = l;
            break;
    }
    problem.answer += " " + unit[to];
    return problem;
}
function basicProbability(type) {
    var problem = {};
    problem.question = "<div>";
    switch (type) {
        case 0:
            var side = "heads";
            if (Math.random() < 0.5) {
                side = "tails";
            }
            problem.question += "A fair coin is flipped. What is the probability of getting " + side + "?";
            problem.answer = "<sup>1</sup>&frasl;<sub>2</sub>";
            problem.typedAnswer = "1/2";
            break;
        case 1:
            problem.question += "A fair six sided dice is rolled. What is the probability of rolling a " + getRandom(1, 6) + "?";
            problem.answer = "<sup>1</sup>&frasl;<sub>6</sub>";
            problem.typedAnswer = "1/6";
            break;
        case 2:
            var sides = 2 * getRandom(2, 6);
            var number = getRandom(2, sides);
            var noun = "less";
            var outcomes = number - 1;
            if (Math.random() < 0.5) {
                noun = "more";
                outcomes = sides - number;
            }
            problem.question += "A fair " + sides + " sided spinner labelled 1 to " + sides + " is spun. What is the probability of spinning a number " + noun + " than " + number + "?";
            problem.answer = "<sup>" + outcomes + "</sup>&frasl;<sub>" + sides + "</sub>";
            problem.typedAnswer = outcomes + "/" + sides;
            break;
        case 3:
            switch (getRandom(0, 4)) {
                case 0:
                    noun = "two heads";
                    outcomes = 1;
                    break;
                case 1:
                    noun = "two tails";
                    outcomes = 1;
                    break;
                case 2:
                    noun = "at least one heads";
                    outcomes = 3;
                    break;
                case 3:
                    noun = "at least one tails";
                    outcomes = 3;
                    break;
                case 4:
                    noun = "exactly one head and tails";
                    outcomes = 2;
                    break;
            }
            problem.question += "A fair coin is flipped twice. What is the probability of getting " + noun + "?";
            problem.answer = "<sup>" + outcomes + "</sup>&frasl;<sub>4</sub>";
            problem.typedAnswer = outcomes + "/4";
            break;
    }
    problem.question += "</div>";
    return problem;
}
function expectedFrequency(trials) {
    var problem = {};
    var number = getRandom(1, 6);
    problem.question = "<div>";
    problem.question += "A fair six sided dice is rolled " + trials + " times. How many times would you expect to roll a " + number + "?";
    problem.answer = Math.round(trials / 6);
    problem.question += "</div>";
    return problem;
}
function substitution(type, negatives, v1, v2) {
    var problem = {};
    var choice = getRandom(0, 21);
    var l1 = letterPicker(choice);
    var l2 = letterPicker(choice + 1);
    var x = getRandom(2, 10);
    var y = getRandom(1, 10);
    var z = getRandom(2, 10);
    if (negatives && Math.random() < 0.5) {
        x = -x;
    }
    if (negatives && Math.random() < 0.5) {
        y = -y;
    }
    var answer = 0;
    problem.question = "<div>If \\(" + l1 + " = " + v1 + "\\)";
    if (type > 4) {
        problem.question += " and \\(" + l2 + " = " + v2 + "\\)";
    }
    switch (getRandom(0, 2)) {
        case 0:
            problem.question += ", work out:</div><div>";
            break;
        case 1:
            problem.question += ", evaluate:</div><div>";
            break;
        case 2:
            problem.question += ", calculate:</div><div>";
            break;
    }
    switch (type) {
        case 0:
            if (Math.random() < 0.5) {
                problem.question += "\\(" + fixTerm(1, l1, true) + fixTerm(x, "", false) + "\\)";
            } else {
                problem.question += "\\(" + fixTerm(x, "", true) + fixTerm(1, l1, false) + "\\)";
            }
            answer = v1 + x;
            break;
        case 1:
            if (x < v1) {
                problem.question += "\\(" + fixTerm(1, l1, true) + fixTerm(-x, "", false) + "\\)";
                answer = v1 - x;
            } else {
                problem.question += "\\(" + fixTerm(x, "", true) + fixTerm(-1, l1, false) + "\\)";
                answer = x - v1;
            }
            break;
        case 2:
            problem.question += "\\(" + fixTerm(x, l1, true) + "\\)";
            answer = v1 * x;
            break;
        case 3:
            if (Math.random() < 0.5) {
                problem.question += "\\(" + fixTerm(y, "", true) + fixTerm(x, l1, false) + "\\)";
            } else {
                problem.question += "\\(" + fixTerm(x, l1, true) + fixTerm(y, "", false) + "\\)";
            }
            answer = v1 * x + y;
            break;
        case 4:
            if (v1 % x === 0) {
                problem.question += "\\( \\frac{" + fixTerm(1, l1, true) + "}{" + fixTerm(x, "", true) + "}\\)";
                answer = v1 / x;
            } else {
                x *= v1;
                problem.question += "\\( \\frac{" + fixTerm(x, "", true) + "}{" + fixTerm(1, l1, true) + "}\\)";
                answer = x / v1;
            }
            break;
        case 5:
            if (v1 * x < v2 * y) {
                problem.question += "\\(" + fixTerm(x, l1, true) + fixTerm(y, l2, false) + "\\)";
                answer = v1 * x + v2 * y;
            } else {
                problem.question += "\\(" + fixTerm(x, l1, true) + fixTerm(-y, l2, false) + "\\)";
                answer = v1 * x - v2 * y;
            }
            break;
        case 6:
            if (Math.random() < 0.5) {
                problem.question += "\\(" + fixTerm(1, l1, true) + "^2" + fixTerm(x, l2, false) + "\\)";
                answer = v1 * v1 + x * v2;
            } else {
                problem.question += "\\(" + fixTerm(1, l1 + l2, true) + "^2" + "\\)";
                answer = v1 * v2 * v2;
            }
            break;
        case 7:
            if (Math.random() < 0.5) {
                problem.question += "\\(" + fixTerm(1, l1 + l2, true) + fixTerm(x, "", false) + "\\)";
                answer = v1 * v2 + x;
            } else {
                problem.question += "\\(" + fixTerm(1, x + l1 + l2, true) + "\\)";
                answer = x * v1 * v2;
            }
            break;
        case 8:
            switch (getRandom(0, 2)) {
                case 0:
                    problem.question += "\\(" + z + "(" + fixTerm(x, l1, true) + fixTerm(y, l2, false) + ")\\)";
                    answer = z * (v1 * x + v2 * y);
                    break;
                case 1:
                    problem.question += "\\(" + z + "(" + fixTerm(1, l1, true) + "^2" + fixTerm(y, l2, false) + ")\\)";
                    answer = z * (v1 * v1 + v2 * y);
                    break;
                case 2:
                    problem.question += "\\(" + fixTerm(1, l1, true) + "(" + fixTerm(x, l1, true) + fixTerm(y, l2, false) + ")\\)";
                    answer = v1 * (x * v1 + y * v2);
                    break;
            }
            break;
    }
    problem.question += "</div>";
    problem.answer = "<div>\\(" + roundError(answer) + "\\)</div>";
    problem.typedAnswer = roundError(answer);
    return problem;
}
function unitaryMethod(cost, quantity, newQuantity) {
    var problem = {};
    var noun = {};
    noun.name = itemPicker("small");
    noun.cost = cost;
    noun.quantity = quantity;
    noun.newQuantity = newQuantity;
    noun.total = toPounds(noun.cost * noun.quantity);
    noun.newTotal = toPounds(noun.cost * noun.newQuantity);
    problem.question = "<div>" + noun.quantity + " " + noun.name + "s costs " + noun.total + ".<br>";
    problem.question += "How much would " + noun.newQuantity + " " + noun.name + "s cost?</div>";
    problem.answer = noun.newTotal;
    problem.typedAnswer = ((noun.cost * noun.newQuantity) / 100).toFixed(2);
    return problem;
}
function difference(a, b) {
    var problem = {};
    problem.question = "<div>Find the difference between:<br>" + a + " and " + b + ".</div>";
    problem.answer = roundError(Math.abs(a - b));
    return problem;
}
function changingTemperatures(original, change) {
    var problem = {};
    var newTemp = roundError(original + change);
    var time = getRandom(1, 12);
    if (change > 0) {
        var verb = "increased";
    } else {
        verb = "decreased";
    }
    problem.question = "<div>At " + time + " o'clock the temperature was " + original + "&deg;C. ";
    problem.question = "<div>The temperature " + verb + " by " + Math.abs(change) + "&degC from " + original + "&deg;C.</div><div>What is the new temperature?</div>";
    problem.answer = newTemp + "&deg;C";
    problem.typedAnswer = newTemp;
    return problem;
}
function polygonSides(maxPol) {
    var problem = {};
    var polygon = [];
    polygon.push({name: "a triangle", sides: 3});
    polygon.push({name: "an equilateral triangle", sides: 3});
    polygon.push({name: "an isosceles triangle", sides: 3});
    polygon.push({name: "a scalene triangle", sides: 3});
    polygon.push({name: "a quadrilateral", sides: 4});
    polygon.push({name: "a square", sides: 4});
    polygon.push({name: "a rectangle", sides: 4});
    polygon.push({name: "a parallelogram", sides: 4});
    polygon.push({name: "a rhombus", sides: 4});
    polygon.push({name: "a trapezium", sides: 4});
    polygon.push({name: "a kite", sides: 4});
    polygon.push({name: "a pentagon", sides: 5});
    polygon.push({name: "a hexagon", sides: 6});
    polygon.push({name: "a heptagon", sides: 7});
    polygon.push({name: "an octagon", sides: 8});
    polygon.push({name: "a nonagon", sides: 9});
    polygon.push({name: "a decagon", sides: 10});
    polygon.push({name: "a hendecagon", sides: 11});
    polygon.push({name: "a dodecagon", sides: 12});
    polygon.push({name: "a tridecagon", sides: 13});
    polygon.push({name: "a tetradecagon", sides: 14});
    polygon.push({name: "a pentadecagon", sides: 15});
    polygon.push({name: "a hexadecagon", sides: 16});
    polygon.push({name: "a heptadecagon", sides: 17});
    polygon.push({name: "a octadecagon", sides: 18});
    polygon.push({name: "a enneadecagon", sides: 19});
    polygon.push({name: "an icosagon", sides: 20});
    polygon.push({name: "a triacontagon", sides: 30});
    polygon.push({name: "a tetracontagon", sides: 40});
    polygon.push({name: "a pentacontagon", sides: 50});
    polygon.push({name: "a hexacontagon", sides: 60});
    polygon.push({name: "a heptacontagon", sides: 70});
    polygon.push({name: "an octacontagon", sides: 80});
    polygon.push({name: "an enneacontagon", sides: 90});
    polygon.push({name: "a hectogon", sides: 100});
    polygon.push({name: "a chiliagon", sides: 1000});
    polygon.push({name: "a myriagon", sides: 10000});
    polygon.push({name: "a megagon", sides: 1000000});
    temp = getRandom(0, maxPol);
    problem.question = "<div>How many sides does " + polygon[temp].name + " have?</div>";
    problem.answer = polygon[temp].sides;
    return problem;
}
function expandSimplifySingleBrackets(type, max) {
    var problem = {};
    var x = "x";
    var y = "y";
    if (toss()) {
        y = "";
    }
    var a = getRandom(2, max);
    var b = getRandom(2, max);
    var c = getRandom(2, max);
    var d = getRandom(2, max);
    var e = getRandom(2, max);
    var f = getRandom(2, max);
    var exp = "";
    var expansion = "";
    if (type > 6) {
        type = 6;
    }
    switch (type) {
        case 0:
            exp = a + "(" + x + " + " + b + ") + " + c + "(" + x + " + " + d + ")";
            expansion = (a + c) + x + " + " + (a * b + c * d);
            break;
        case 1:
            exp = a + "(" + b + x + " + " + c + ") + " + d + "(" + e + x + " + " + f + ")";
            expansion = (a * b + d * e) + x + " + " + (a * c + d * f);
            break;
        case 2:
            exp = a + "(" + x + " + " + b + y + ") + " + c + "(" + x + " - " + d + y + ")";
            if (a * b < c * d) {
                expansion = (a + c) + x + " - " + Math.abs(a * b - c * d) + y;
            } else {
                expansion = (a + c) + x + " + " + (a * b - c * d) + y;
            }
            break;
        case 3:
            exp = a + "(" + x + " - " + b + y + ") + " + c + "(" + x + " - " + d + y + ")";
            expansion = (a + c) + x + " - " + (a * b + c * d) + y;
            break;
        case 4:
            while (a * b <= d * e) {
                b++;
            }
            exp = a + "(" + b + x + " + " + c + y + ") - " + d + "(" + e + x + " + " + f + y + ")";
            if (a * c < d * f) {
                expansion = (a * b - d * e) + x + " - " + Math.abs(a * c - d * f) + y;
            } else {
                expansion = (a * b - d * e) + x + " + " + (a * c - d * f) + y;
            }
            break;
        case 5:
            while (a * b <= d * e) {
                b++;
            }
            exp = a + "(" + b + x + " + " + c + y + ") - " + d + "(" + e + x + " - " + f + y + ")";
            expansion = (a * b - d * e) + x + " + " + (a * c + d * f) + y;
            break;
        case 6:
            while (a * b <= d * e) {
                b++;
            }
            exp = a + "(" + b + x + " - " + c + y + ") - " + d + "(" + e + x + " - " + f + y + ")";
            if (a * c < d * f) {
                expansion = (a * b - d * e) + x + " + " + (d * f - a * c) + y;
            } else {
                expansion = (a * b - d * e) + x + " - " + Math.abs(d * f - a * c) + y;
            }
            break;
    }
    problem.question = "<div>Expand and simplify</div><div>" + "\\(" + exp + "\\)</div>";
    problem.answer = "\\(" + expansion + "\\)";
    return problem;
}
function interchangingFDP(x, y, amount, type) {
    var problem = {};
    var givenAmount = roundError(x * amount);
    var newAmount = roundError(y * amount);
    problem.question = "";
    switch (type) {
        case "random":
            if (toss()) {
                problem.question += "<div>\\(" + toFraction(x) + "\\) of an amount is \\(" + givenAmount + "\\).</div>";
                problem.question += "<div>What is \\(" + toPercentage(y) + "\\)%?</div>";
            } else {
                problem.question += "<div>\\(" + toPercentage(x) + "\\)% of an amount is \\(" + givenAmount + "\\).</div>";
                problem.question += "<div>What is \\(" + toFraction(y) + "\\)?</div>";
            }
            break;
        case "fraction":
            problem.question += "<div>\\(" + toFraction(x) + "\\) of an amount is \\(" + givenAmount + "\\).</div>";
            problem.question += "<div>What is \\(" + toFraction(y) + "\\)?</div>";
            break;
        case "percentage":
            problem.question += "<div>\\(" + toPercentage(x) + "\\)% of an amount is \\(" + givenAmount + "\\).</div>";
            problem.question += "<div>What is \\(" + toPercentage(y) + "\\)%?</div>";
            break;
    }
    problem.answer = "\\(" + newAmount + "\\)";
    problem.typedAnswer = newAmount;
    return problem;
}
function fibonacci(f0, f1, given1, given2, find) {
    var problem = {};
    var s = [];
    s[0] = f0;
    s[1] = f1;
    for (var i = 2; i < Math.max(given2, find) + 1; i++) {
        s.push(roundError(s[i - 1] + s[i - 2]));
    }
    problem.question = "<div>A fibonacci sequence begins:<br>";
    for (var i = 0; i < s.length; i++) {
        if (i === given1 || i === given2) {
            problem.question += s[i] + ", ";
        } else {
            problem.question += "&#9634;, ";
        }
    }
    problem.question += "...<br>";
    problem.question += "Find the " + (find + 1) + ordinal(find + 1) + " term.</div>";
    problem.answer = s[find];
    return problem;
}
function geometricSequence(a, r, given1, given2, find) {
    var problem = {};
    var s = [];
    s[0] = a;
    for (var i = 1; i < Math.max(given2, find) + 1; i++) {
        s.push(roundError(s[i - 1] * r));
    }
    problem.question = "<div>A geometric sequence begins:<br>";
    for (var i = 0; i < s.length; i++) {
        if (i === given1 || i === given2) {
            problem.question += s[i] + ", ";
        } else {
            problem.question += "&#9634;, ";
        }
    }
    problem.question += "...<br>";
    problem.question += "Find the " + (find + 1) + ordinal(find + 1) + " term.</div>";
    problem.answer = s[find];
    return problem;
}
function convertingTime(from, to, x) {
    var units = ["seconds", "minutes", "hours", "days", "weeks"];
    var mutliplier = [1, 60, 60, 24, 7];
    var problem = {};
    problem.question = "Convert " + x + " " + units[from] + " to " + units[to];
    if (to > from) {
        for (var i = from + 1; i <= to; i++) {
            x /= mutliplier[i];
        }
    }
    if (from > to) {
        for (var i = to + 1; i <= from; i++) {
            x *= mutliplier[i];
        }
    }
    problem.answer = roundError(x) + " " + units[to];
    return problem;
}
function gradientFromTwoPoints(x1, y1, x2, y2) {
    var problem = {};
    var num = y2 - y1;
    var den = x2 - x1;
    var gradient = num / den;
    var answer = gradient;
    if (gradient !== Math.round(gradient)) {
        var hcf = HCF(num, den);
        num /= hcf;
        den /= hcf;
        if (num < 0 && den < 0) {
            num *= -1;
            den *= -1;
        }
        if (num > 0 && den < 0) {
            num *= -1;
            den *= -1;
        }
        answer = "<sup>" + num + "</sup>&frasl;<sub>" + den + "</sub>";
    }
    problem.question = "<div>A straight line passes through the points (" + x1 + ", " + y1 + ") and (" + x2 + ", " + y2 + ").</div>";
    problem.question += "<div>Find the gradient of the line.</div>";
    problem.answer = answer;
    return problem;
}
function midpointFromTwoPoints(x1, y1, x2, y2) {
    var problem = {};
    var ym = roundError((y2 + y1) / 2);
    var xm = roundError((x2 + x1) / 2);
    problem.question = "<div>A line segment passes from (" + x1 + ", " + y1 + ") to (" + x2 + ", " + y2 + ").</div>";
    problem.question += "<div>Find the midpoint of the line segment.</div>";
    problem.answer = "(" + xm + ", " + ym + ")";
    return problem;
}
function lengthBetweenTwoPoints(x1, y1, x2, y2) {
    var problem = {};
    var a = (x2 - x1);
    var b = (y2 - y1);
    var c = a * a + b * b;
    var ans = simplifySurd(c);
    problem.question = "<div>A line segment passes from \\( (" + x1 + ", " + y1 + ") \\) to \\( (" + x2 + ", " + y2 + ") \\).</div>";
    problem.question += "<div>Find the length of the line segment.</div>";
    problem.answer = "\\( " + ans + " \\) ";
    return problem;
}
function completingSquare(a, b, c) {
    var problem = {};
    problem.question = "<div>Write ";
    problem.question += "\\(";
    if (a !== 1) {
        problem.question += a;
    }
    problem.question += "x^2 ";
    if (b > 0) {
        problem.question += " + " + b;
    } else if (b !== 0) {
        problem.question += " - " + Math.abs(b);
    }
    problem.question += "x";
    if (c > 0) {
        problem.question += " + " + c;
    } else if (c !== 0) {
        problem.question += " - " + Math.abs(c);
    }
    if (a === 1) {
        problem.question += "\\) in the form \\((x+a)^2+b\\), where \\(a\\) and \\(b\\) are constants.</div>";
    } else {
        problem.question += "\\) in the form \\(a(x+b)^2+c\\), where \\(a\\), \\(b\\) and \\(c\\) are constants.</div>";
    }
    b /= a;
    var xCo = b / 2;
    var constant = c - (((b / 2) * (b / 2)) * a);
    var square = "";
    if (a !== 1) {
        square = a + "(x";
    } else {
        square = "(x";
    }
    if (xCo > 0) {
        square += " + " + xCo + ")^2";
    } else {
        square += " - " + Math.abs(xCo) + ")^2";
    }
    if (constant > 0) {
        square += " + " + constant;
    } else if (constant < 0) {
        square += " - " + Math.abs(constant);
    }
    problem.answer = "<div>\\(" + square + "\\)</div>";
    return problem;
}
function turningPointToQuadratic(xTurn, yTurn, min) {
    var problem = {};
    var type = min ? "minimum" : "maximum";
    problem.question = "<div>The " + type + " turning point of a quadratic curve is ";
    problem.question += "(" + xTurn + ", " + yTurn + ").<br>";
    if (type === "minimum") {
        problem.question += "Write an equation for this in the form:<br>y = x&sup2; + ax + b.</div>";
    } else {
        problem.question += "Write an equation for this in the form:<br>y = -x&sup2; + ax + b.</div>";
    }
    var a = (type === "minimum") ? 1 : -1;
    var b = -2 * xTurn * a;
    var c = xTurn * xTurn * a + yTurn;
    problem.answer = "y = ";
    if (a === -1) {
        problem.answer += "-";
    }
    problem.answer += "x&sup2; ";
    if (b > 0) {
        problem.answer += " + " + b;
    } else if (b !== 0) {
        problem.answer += " - " + Math.abs(b);
    }
    problem.answer += "x";
    if (c > 0) {
        problem.answer += " + " + c;
    } else if (c !== 0) {
        problem.answer += " - " + Math.abs(c);
    }

    return problem;
}
function factoriseExpandQuadratics(a, b, c, d, expanding) {
    var problem = {};
    var let = "x";
    var exp = "";
    var co = [];
    co[0] = a * c;
    co[1] = a * d + b * c;
    co[2] = b * d;
    if (Math.abs(co[0]) > 1) {
        exp += co[0] + let + "^2";
    } else {
        if (co[0] < 0) {
            exp += "-";
        }
        exp += let + "^2";
    }
    if (co[1] < 0) {
        if (co[1] < -1) {
            exp += " - " + Math.abs(co[1]) + let;
        } else {
            exp += " - " + let;
        }
    } else {
        if (co[1] > 1) {
            exp += " + " + co[1] + let;
        } else if (co[1] !== 0) {
            exp += " + " + let;
        }
    }
    if (co[2] < 0) {
        exp += " - " + Math.abs(co[2]);
    } else {
        exp += " + " + co[2];
    }

    var fact = "(";
    if (a < 0) {
        fact += "-";
    }
    if (Math.abs(a) > 1) {
        fact += Math.abs(a);
    }
    fact += let;
    if (b > 0) {
        fact += " + " + b;
    } else {
        fact += " - " + Math.abs(b);
    }
    fact += ")(";
    if (c < 0) {
        fact += "-";
    }
    if (Math.abs(c) > 1) {
        fact += Math.abs(c);
    }
    fact += let;
    if (d > 0) {
        fact += " + " + d;
    } else {
        fact += " - " + Math.abs(d);
    }
    fact += ")";
    if (!expanding) {
        problem.question = "<div>Factorise:</div><div>\\(" + exp + "\\)</div>";
        problem.answer = "\\(" + fact + "\\)";
    } else {
        problem.question = "<div>Expand and simplify</div><div>\\(" + fact + "\\)</div>";
        problem.answer = "\\(" + exp + "\\)";
    }
    return problem;
}
function indexLawMultiply(base, ex1, shift1, ex2, shift2) {
    var problem = {};
    problem.question = "<div>Simplify</div><div>\\(";
    var exp = Math.pow(base, shift1) + "^{" + (ex1) + "}";
    exp += "\\ &times;\\ ";
    exp += Math.pow(base, shift2) + "^{" + (ex2) + "}\\)</div>";
    var sol = base + "^{" + ((ex1 * shift1) + (ex2 * shift2)) + "}";
    problem.question += exp;
    problem.answer = "\\(" + sol + "\\)";
    return problem;
}
function indexLawDivide(base, ex1, shift1, ex2, shift2) {
    var problem = {};
    problem.question = "<div>Simplify</div><div>\\(";
    var exp = Math.pow(base, shift1) + "^{" + (ex1) + "}";
    exp += "\\ &divide;\\ ";
    exp += Math.pow(base, shift2) + "^{" + (ex2) + "}\\)</div>";
    var sol = base + "^{" + ((ex1 * shift1) - (ex2 * shift2)) + "}";
    problem.question += exp;
    problem.answer = "\\(" + sol + "\\)";
    return problem;
}
function indexLawPowerOfPower(base, ex1, shift1, ex2) {
    var problem = {};
    problem.question = "<div>Write ";
    var exp = "\\((" + Math.pow(base, shift1) + "^{" + (ex1) + "})^{" + ex2 + "}\\)";
    exp += " as a single power of " + base + ".</div>";
    var sol = base + "^{" + ((ex1 * shift1) * ex2) + "}";
    problem.question += exp;
    problem.answer = "\\(" + sol + "\\)";
    return problem;
}
function combiningRatios(max) {
    var problem = {};
    var seed = getRandom(0, 30);
    var x = letterPicker(seed);
    var y = letterPicker(seed + 1);
    var z = letterPicker(seed + 2);
    var a = getRandom(1, max);
    var c = getRandom(1, max);
    do {
        var b = getRandom(1, max);
        var d = getRandom(1, max);
    } while (a === b || c === d);
    problem.question = "<div>The ratio of " + x + " to " + y + " is " + a + " : " + b + ".<br>The ratio of " + y + " to " + z + " is " + c + " : " + d + ".</div>";
    problem.question += "<div>Find the ratio " + x + " : " + y + " : " + z + " in its simplest form.</div>";
    var hcf = HCF(HCF(a * c, b * c), b * d);
    problem.answer = a * c / hcf + " : " + b * c / hcf + " : " + b * d / hcf;
    return problem;
}
function stateEquationOfCircle(xShift, yShift, radius) {
    var problem = {};
    var equation = "\\( ";
    if (xShift === 0) {
        equation += "x^2 + ";
    } else if (xShift > 0) {
        equation += "(x - " + xShift + ")^2 + ";
    } else {
        equation += "(x + " + Math.abs(xShift) + ")^2 + ";
    }
    if (yShift === 0) {
        equation += "y^2 = ";
    } else if (yShift > 0) {
        equation += "(y - " + yShift + ")^2 = ";
    } else {
        equation += "(y + " + Math.abs(yShift) + ")^2 = ";
    }
    equation += radius + "^2 \\)";
    problem.question = "<div>A circle has centre (" + xShift + ",  " + yShift + ") and  radius " + radius + ".</div>";
    problem.question += "<div>State the equation of the circle.</div>";
    problem.answer = equation;
    return problem;
}
function orderOfOpsTimesDivide(pairs, max) {
    var problem = {};
    var m = [];
    var d = [];
    var seed = getRandom(1, max);
    var answer = seed;
    for (var i = 0; i < pairs; i++) {
        var x = getRandom(1, max);
        d.push(x);
        m.push(x * getRandom(2, 5));
        answer *= m[i] / d[i];
    }
    m.sort(() => Math.random() - 0.5);
    d.sort(() => Math.random() - 0.5);
    var data = seed;
    for (var i = 0; i < m.length; i++) {
        data += "\\ &times\\ " + m[i] + "\\ &divide;\\ " + d[i];
    }
    problem.question = "<div>\\(" + data + "\\)</div>";
    problem.answer = "<div>\\(" + answer + "\\)</div>";
    return problem;
}
function orderOfOpsAddSubtract(pairs, max, negatives) {
    var problem = {};
    var a = [];
    var s = [];
    var seed = getRandom(1, max);
    var answer = seed;
    for (var i = 0; i < pairs; i++) {
        var x = getRandom(1, max);
        if (negatives && toss()) {
            x *= -1;
        }
        a.push(x);
        x = getRandom(1, max);
        if (negatives && toss()) {
            x *= -1;
        }
        s.push(x);
        answer += a[i];
        answer -= s[i];
    }
    a.sort(() => Math.random() - 0.5);
    s.sort(() => Math.random() - 0.5);
    var data = "\\( " + seed;
    for (var i = 0; i < a.length; i++) {
        data += " &minus; " + s[i] + " + " + a[i];
    }
    data += "\\)";
    problem.question = "<div>" + data + "</div>";
    problem.answer = "<div>\\(" + answer + "\\)</div>";
    return problem;
}
function givenDecimalFindFraction(n1, d1, n2, d2) {
    var problem = {};
    var dec1 = roundError(n1 / d1);
    var dec2 = roundError(n2 / d2);
    var data = "<div>Given that \\( \\frac{" + n1 + "}{" + d1 + "} = " + dec1 + "\\).</div>";
    data += "<div>What is \\( \\frac{" + n2 + "}{" + d2 + "}\\) as a decimal?</div>";
    problem.question = data;
    problem.answer = dec2;
    return problem;
}
function productOfPrimes(totalPrimes, reversed) {
    var problem = {};
    var primesLeft = totalPrimes;
    var primeList = new Array(2, 3, 5, 7, 11, 13, 17, 19, 23, 27);
    var primeQuantity = [];
    var product = 1;
    var factorisation = "";
    for (var i = 0; i < primeList.length; i++) {
        var amount = getRandom(0, primesLeft);
        primeQuantity[i] = amount;
        primesLeft -= amount;
        product *= Math.pow(primeList[i], primeQuantity[i]);
        if (primeQuantity[i] > 1) {
            factorisation += primeList[i] + "^" + primeQuantity[i] + "&#215;";
        } else if (primeQuantity[i] === 1) {
            factorisation += primeList[i] + "&#215;";
        }
        if (i === primeList.length && primesLeft !== 0) {
            i = 0;
        }
    }
    factorisation = factorisation.slice(0, -6);
    if (!reversed) {
        problem.question = "Express \\(" + product + "\\) as the product of its prime factors.";
        problem.answer = "\\(" + product + " = " + factorisation + "\\)";
    } else {
        problem.question = "Work out \\(" + factorisation + "\\)";
        problem.answer = "\\(" + product + "\\)";
    }
    return problem;
}
function primeConsecutives(start, total) {
    var problem = {};
    var list = [];
    var product = 1;
    for (var i = 0; i < total; i++) {
        list.push(start + i);
        product *= list[i];
    }
    problem.question = "<div>Find " + wordedNumber(total) + " consecutive integers that have a product of \\(" + product + "\\).</div>";
    problem.answer = "\\(" + list + "\\)";
    return problem;
}
function placeValuePowers(base, index, shift) {
    var problem = {};
    var power = roundError(Math.pow(base, index));
    var newBase = roundError(base * Math.pow(10, shift));
    var newPower = roundError(Math.pow(newBase, index));
    problem.question = "<div>\\(" + base + "^" + index + " = " + power + "\\)</div>";
    problem.question += "<div>Work out \\(" + newBase + "^" + index + "\\)</div>";
    problem.answer = "<div>\\(" + newPower + "\\)</div>";
    return problem;
}
function factoriseSingle(hcf, totalTerms, variables, max, expand) {
    var problem = {};
    var primes = [2, 3, 5, 7, 11, 13, 17];
    for (var i = 0; i < primes.length; i++) {
        var x = getRandom(0, Math.min(primes.length - 1, max + 2));
        var temp = primes[x];
        primes[x] = primes[0];
        primes[0] = temp;
    }
    var expression = "";
    var terms = [];
    var hcx = 999;
    var hcy = 999;
    for (i = 0; i < totalTerms; i++) {
        terms[i] = {};
        terms[i].coeff = hcf * primes[i];
        terms[i].xPow = getRandom(0, max);
        if (variables > 1) {
            terms[i].yPow = getRandom(0, max);
        } else {
            terms[i].yPow = 0;
        }
        terms[i].op = "+";
        if (toss() && max > 1) {
            terms[i].op = "-";
        }
        hcx = Math.min(hcx, terms[i].xPow);
        hcy = Math.min(hcy, terms[i].yPow);
    }
    if (expand && terms[0].xPow === terms[1].xPow) {
        terms[0].xPow++;
    }
    var noVar = true;
    for (i = 0; i < totalTerms; i++) {
        if (terms[i].xPow !== 0) {
            noVar = false;
        }
    }
    if (noVar) {
        terms[0].xPow = 1;
    }
    for (i = 0; i < totalTerms; i++) {
        terms[i].xFact = terms[i].xPow - hcx;
        terms[i].yFact = terms[i].yPow - hcy;
    }
    for (i = 0; i < totalTerms; i++) {
        expression += terms[i].coeff;
        if (terms[i].xPow > 0) {
            if (terms[i].xPow > 1) {
                expression += "x^" + terms[i].xPow;
            } else {
                expression += "x";
            }
        }
        if (terms[i].yPow > 0) {
            if (terms[i].yPow > 1) {
                expression += "y^" + terms[i].yPow;
            } else {
                expression += "y";
            }
        }
        if (i < totalTerms - 1) {
            expression += terms[i].op;
        }
    }
    var factorisation = "";
    if (hcf > 1) {
        factorisation += hcf;
    }
    if (hcx > 0) {
        if (hcx > 1) {
            factorisation += "x^" + hcx;
        } else {
            factorisation += "x";
        }
    }
    if (hcy > 0) {
        if (hcy > 1) {
            factorisation += "y^" + hcy;
        } else {
            factorisation += "y";
        }
    }
    factorisation += "(";
    for (i = 0; i < totalTerms; i++) {
        factorisation += primes[i];
        if (terms[i].xFact > 0) {
            if (terms[i].xFact > 1) {
                factorisation += "x^" + terms[i].xFact;
            } else {
                factorisation += "x";
            }
        }
        if (terms[i].yFact > 0) {
            if (terms[i].yFact > 1) {
                factorisation += "y^" + terms[i].yFact;
            } else {
                factorisation += "y";
            }
        }
        if (i < totalTerms - 1) {
            factorisation += terms[i].op;
        }
    }
    factorisation += ")";
    if (expand) {
        problem.question = "<div>Expand:</div>";
        problem.question += "<div>\\(" + factorisation + "\\)</div>";
        problem.answer = "<div>\\(" + expression + "\\)</div>";
    } else {
        problem.question = "<div>Factorise fully:</div>";
        problem.question += "<div>\\(" + expression + "\\)</div>";
        problem.answer = "<div>\\(" + factorisation + "\\)</div>";
    }
    return problem;
}
function equationsWithRatio(co, a, b, c, den) {
    var problem = {};
    var let = "x";
    var sol = roundError((a * b) / (c * co));
    if (den) {
        var r1 = fixTerm(co, let, true) + ":" + a;
        var r2 = b + ":" + c;
        var answer = sol;
    } else {
        var r1 = roundError((co * sol)) + ":" + let;
        var r2 = b + ":" + c;
        var answer = a;
    }
    problem.question = "<div>Solve:</div>";
    if (toss()) {
        problem.question += "<div>\\( " + r1 + " = " + r2 + "\\)</div>";
    } else {
        problem.question += "<div>\\( " + r2 + " = " + r1 + "\\)</div>";
    }
    problem.answer = "<div>\\(" + let + " = " + answer + "\\)</div>";
    return problem;
}
function integersBetweenFraction(n1, d1, n2, d2) {
    var problem = {};
    var f1 = "\\frac{" + n1 + "}{" + d1 + "}";
    var f2 = "\\frac{" + n2 + "}{" + d2 + "}";
    var list = [];
    var dec1 = n1 / d1;
    var dec2 = n2 / d2;
    if (dec1 <= dec2) {
        var min = Math.ceil(n1 / d1);
        var max = Math.floor(n2 / d2);
    } else {
        min = Math.ceil(n2 / d2);
        max = Math.floor(n1 / d1);
    }
    for (var i = min; i <= max; i++) {
        list.push(i);
    }
    problem.question = "<div>List all the integers between \\(" + f1 + "\\) and \\(" + f2 + "\\)</div>";
    problem.answer = "<div>\\(" + list + "\\)</div>";
    return problem;
}
function ratioDonating(max) {
    var problem = {};
    var seed = getRandom(2, max);
    var x = seed * getRandom(2, max);
    do {
        var y = seed * getRandom(2, max);
    } while (x === y);
    var hcf = HCF(x, y);
    var r1 = {};
    r1.x = x / hcf;
    r1.y = y / hcf;
    do {
        var donation = getRandom(1, x);
        var newX = x - donation;
        var newY = y + donation;
        hcf = HCF(newX, newY);
    } while (hcf < 2 || newX < 1);
    var r2 = {};
    r2.x = newX / hcf;
    r2.y = newY / hcf;
    var p1 = namePicker();
    do {
        var p2 = namePicker();
    } while (p1.name === p2.name);
    problem.question = "<div>" + p1.name + " and " + p2.name + " share sweets in the ratio \\(" + r1.x + ":" + r1.y + "\\).</div>";
    problem.question += "<div>If " + p1.name + " then gives " + p2.name + " " + donation + " sweets then the ratio becomes \\(" + r2.x + ":" + r2.y + "\\).</div>";
    problem.question += "<div>How many sweets did they each have initially?</div>";
    problem.answer = "<div>\\(" + x + ":" + y + "\\)</div>";
    return problem;
}
function howManyFactors(indices) {
    var problem = {};
    var primes = [2, 3, 5, 7, 11, 13, 17, 23, 29];
    var x = 1;
    var totalFactors = 1;
    for (var i = 0; i < indices.length; i++) {
        x *= Math.pow(primes[i], indices[i]);
        totalFactors *= (indices[i] + 1);
    }
    problem.question = "<div>How many factors does " + x + " have?</div>";
    problem.answer = totalFactors;
    return problem;
}
function closeMultiplesOfTen(power) {
    var problem = {};
    var max = Math.pow(10, power);
    var x = getRandom(1, max);
    var y = max;
    var d = getRandom(1, 5);
    if (toss()) {
        d *= -1;
    }
    y += d;
    if (toss()) {
        problem.question = "\\(" + x + " + " + y + "\\)";
    } else {
        problem.question = "\\(" + y + " + " + x + "\\)";
    }
    problem.answer = x + y;
    return problem;
}
function linearSimult(negSol, decSol, negCo, decCo, com, same) {
    var problem = {};
    do {
        var x = getRandom(1, 25);
        var y = getRandom(1, 25);
        var attempts = 0;
        var c = [];
        for (var k = 0; k < 4; k++) {
            var current = getRandom(1, 25);
            if (toss() && negCo) {
                current *= -1;
            }
            if (toss() && decCo) {
                current += getRandom(1, 9) / 10;
            }
            c.push(roundError(current));
        }
        if (toss() && negSol) {
            x *= -1;
        }
        if (toss() && decSol) {
            x /= 10;
        }
        if (toss() && negSol) {
            y *= -1;
        }
        if (toss() && decSol) {
            y /= 10;
        }

        if (com || same) {
            if (toss()) {
                if (same) {
                    c[0] = c[1];
                } else {
                    c[0] = roundError(c[1] * getRandom(2, 6));
                }
            } else {
                if (same) {
                    c[2] = c[3];
                } else {
                    c[2] = roundError(c[3] * getRandom(2, 6));
                }
            }
        }
        var common = false;
        if (!com) {
            if (HCF(c[0], c[1]) === 1 || HCF(c[2], c[3]) === 1) {
                common = true;
            }
        }
        x = roundError(x);
        y = roundError(y);
        var t1 = roundError((c[0] * x) + (c[2] * y));
        var t2 = roundError((c[1] * x) + (c[3] * y));
        attempts++;
    } while (((Math.abs(c[0]) === Math.abs(c[1]) && Math.abs(c[2]) === Math.abs(c[3])) || common || Math.max(Math.abs(t1), Math.abs(t2)) > Math.max(20, 50)) || attempts > 500);

    problem.question = "<div>\\(" + fixTerm(c[0], "x", true) + fixTerm(c[2], "y", false) + "=" + t1 + "\\)</div>";
    problem.question += "<div>\\(" + fixTerm(c[1], "x", true) + fixTerm(c[3], "y", false) + "=" + t2 + "\\)</div>";
    problem.answer = "\\(x = " + x + "\\) and \\(y = " + y + "\\)";
    return problem;
}
function errorIntervals(acc) {
    var problem = {};
    var x = roundError(acc * getRandom(0, 100));
    var lb = roundError(x - acc / 2);
    var ub = roundError(x + acc / 2);
    var type = "the nearest " + acc;
    switch (acc) {
        case 1:
            type = "the nearest integer";
            break;
        case 0.1:
            type = "1 decimal place";
            break;
        case 0.01:
            type = "2 decimal places";
            break;
        case 0.001:
            type = "3 decimal places";
            break;
    }
    problem.question = "<div>A number, \\(x\\), is rounded to " + type + ".</div>";
    problem.question += "<div>The result is " + x + ".</div>";
    problem.question += "<div>Write down the error interval for \\(x\\).</div>";
    problem.answer = "\\(" + lb + " \\le x \\lt " + ub + "\\)";
    return problem;
}
function unitRatio(type, mult) {
    var problem = {};
    var a = getRandom(2, 10);
    var b = roundError(a * mult);
    switch (type) {
        case 0:
            var ratio = a + ":" + b;
            var form = "1:n";
            var fromAns = 1 + ":" + roundError(b / a);
            break;
        case 1:
            var ratio = b + ":" + a;
            var form = "n:1";
            var fromAns = roundError(b / a) + ":" + 1;
            break;
    }

    problem.question = "<div>Write the ratio \\(" + ratio + "\\) in the form \\(" + form + "\\).</div>";
    problem.answer = "\\(" + fromAns + "\\)";
    return problem;
}
function ratioAsFraction(quantities) {
    var problem = {};

    var object = "";
    switch (getRandom(0, 2)) {
        case 0:
            object = "counters";
            break;
        case 1:
            object = "balls";
            break;
        case 2:
            object = "sweets";
            break;
    }
    var c = [];
    var x = getRandom(0, 10);
    var total = 0;
    var colours = "";
    var ratio = "";
    for (var i = 0; i < quantities.length; i++) {
        c.push(colourPicker(x + i));
        total += quantities[i];
        colours += c[i];
        ratio += quantities[i];
        if (i < quantities.length - 1) {
            colours += " to ";
            ratio += ":";
        }
    }
    var choice = getRandom(0, quantities.length - 1);

    problem.question = "<div>The ratio of " + colours + " " + object + " in a bag is \\(" + ratio + "\\).</div>";
    problem.question += "<div>What fraction of the " + object + " are " + c[choice] + "?</div>";
    problem.answer = "\\(\\frac{" + quantities[choice] + "}{" + total + "}\\)";
    return problem;
}
function recurrOrTerminate(n) {
    var problem = {};
    var primes = [2, 2, 5, 3, 3, 7, 11];
    var terminate = true;
    var den = 1;
    for (var i = 0; i < n; i++) {
        var p = primes[getRandom(0, 2)];
        den *= p;
    }
    if (toss()) {
        var p = primes[getRandom(3, 6)];
        den *= p;
        terminate = false;
    }
    var num = getRandom(1, den - 1);
    problem.question = "<div>Is \\( \\frac{" + num + "}{" + den + "}\\) a terminating or recurring decimal?</div>";
    if (terminate) {
        problem.answer = "Terminating";
    } else {
        problem.answer = "Recurring";
    }
    return problem;
}
function tableOfValuesLinear(m, c, min, max) {
    var problem = {};
    var equation = "y=" + fixTerm(m, "x", true) + fixTerm(c, "", false);
    problem.question = "<div>Complete the table of values for \\(" + equation + "\\).</div>";
    problem.question += "<table class='questionTable'><tr><td>\\(x\\)</td>";
    problem.answer = "<table class='questionTable'><tr><td>\\(x\\)</td>";
    for (var i = min; i <= max; i++) {
        problem.question += "<td>\\(" + i + "\\)</td>";
        problem.answer += "<td>\\(" + i + "\\)</td>";
    }
    problem.question += "</tr><tr><td>\\(y\\)</td>";
    problem.answer += "</tr><tr><td>\\(y\\)</td>";
    for (i = min; i <= max; i++) {
        problem.question += "<td></td>";
        problem.answer += "<td>\\(" + (m * i + c) + "\\)</td>";
    }
    problem.question += "</tr></table>";
    problem.answer += "</tr></table>";
    return problem;
}
function tableOfValuesQuadratic(a, b, c, min, max) {
    var problem = {};
    var equation = "y=" + fixTerm(a, "x^2", true) + fixTerm(b, "x", false) + fixTerm(c, "", false);
    problem.question = "<div>Complete the table of values for \\(" + equation + "\\).</div>";
    problem.question += "<table class='questionTable'><tr><td>\\(x\\)</td>";
    problem.answer = "<table class='questionTable'><tr><td>\\(x\\)</td>";
    for (var i = min; i <= max; i++) {
        problem.question += "<td>\\(" + i + "\\)</td>";
        problem.answer += "<td>\\(" + i + "\\)</td>";
    }
    problem.question += "</tr><tr><td>\\(y\\)</td>";
    problem.answer += "</tr><tr><td>\\(y\\)</td>";
    for (i = min; i <= max; i++) {
        problem.question += "<td></td>";
        problem.answer += "<td>\\(" + (a * i * i + b * i + c) + "\\)</td>";
    }
    problem.question += "</tr></table>";
    problem.answer += "</tr></table>";
    return problem;
}
function tableOfValuesCubic(a, b, c, d, min, max) {
    var problem = {};
    var equation = "y=" + fixTerm(a, "x^3", true) + fixTerm(b, "x^2", false) + fixTerm(c, "x", false) + fixTerm(d, "", false);
    problem.question = "<div>Complete the table of values for \\(" + equation + "\\).</div>";
    problem.question += "<table class='questionTable'><tr><td>\\(x\\)</td>";
    problem.answer = "<table class='questionTable'><tr><td>\\(x\\)</td>";
    for (var i = min; i <= max; i++) {
        problem.question += "<td>\\(" + i + "\\)</td>";
        problem.answer += "<td>\\(" + i + "\\)</td>";
    }
    problem.question += "</tr><tr><td>\\(y\\)</td>";
    problem.answer += "</tr><tr><td>\\(y\\)</td>";
    for (i = min; i <= max; i++) {
        problem.question += "<td></td>";
        problem.answer += "<td>\\(" + (a * i * i * i + b * i * i + c * i + d) + "\\)</td>";
    }
    problem.question += "</tr></table>";
    problem.answer += "</tr></table>";
    return problem;
}
function recurringDecimals(den, pow) {
    var problem = {};
    den *= Math.pow(10, pow);
    do {
        num = getRandom(1, 2 * den);
    } while (HCF(num, den) !== 1);
    console.log(num + "/" + den);
    problem.question = "<div>Write \\(" + (Math.floor(num * 100000000 / den) / 100000000).toFixed(8) + "..\\) as a fraction.</div>";
    problem.question += "<div>Simplify your answer where possible.</div>";
    var hcf = HCF(num, den);
    num /= hcf;
    den /= hcf;
    problem.answer = "\\( \\frac{" + num + "}{" + den + "} \\)";
    return problem;
}
function multiplyingSurds(level) {
    var problem = {};
    var seed = 1 + Math.floor(Math.random() * level);
    var seed2 = 1 + Math.floor(Math.random() * level);
    while (!isPrime(seed)) {
        seed = 1 + Math.floor(Math.random() * level);
    }
    while (!isPrime(seed2) || seed === seed2) {
        seed2 = 1 + Math.floor(Math.random() * level);
    }
    var root1 = 2 + Math.floor(Math.random() * level / 2);
    var root2 = 2 + Math.floor(Math.random() * level / 2);
    while (root1 === root2) {
        root1 += 1;
    }
    var square1 = root1 * root1;
    var square2 = root2 * root2;
    problem.question = "\\(\\sqrt{" + (square1 * seed) + "}\\ &#215;\\ \\sqrt{" + (square2 * seed2) + "}\\)";
    problem.answer = "\\( " + (root1 * root2) + "\\sqrt{" + (seed * seed2) + "} \\)";
    return problem;
}
function simplifyingSurds(totalSquares, totalSurds, maxPrime) {
    var problem = {};
    var primes = [2, 3, 5, 7, 11, 13];
    do {
        var square = 1;
        var surd = 1;
        for (var i = 0; i < totalSquares; i++) {
            square *= primes[getRandom(0, maxPrime % primes.length)];
        }
        square *= square;
        var x = getRandom(0, maxPrime / 2);
        for (var i = 0; i < totalSurds; i++) {
            surd *= primes[(x + i) % primes.length];
        }
    } while ((square * surd) > 6000);
    problem.question = "Simplify \\( \\sqrt{" + (square * surd) + "} \\)";
    problem.answer = "\\( " + Math.sqrt(square) + "\\sqrt{" + surd + "} \\)";
    return problem;
}
function addingSurds(minSeed, maxSeed, subtraction) {
    var problem = {};
    var seed = Math.floor(minSeed + Math.random() * maxSeed);
    while (!isPrime(seed)) {
        seed = Math.floor(minSeed + Math.random() * maxSeed);
    }
    var root1 = Math.floor(minSeed + Math.random() * maxSeed);
    var root2 = Math.floor(minSeed + Math.random() * maxSeed);
    while (root1 === root2) {
        root1 += 1;
    }
    var square1 = root1 * root1;
    var square2 = root2 * root2;
    if (!subtraction) {
        problem.question = "<div>Simplify fully</div><div>\\( \\sqrt{" + (square1 * seed) + "} + \\sqrt{" + (square2 * seed) + "}\\)</div>";
        problem.answer = "\\(" + (root1 + root2) + "\\sqrt{" + seed + "}\\)";
    } else {
        problem.question = "<div>Simplify fully</div><div>\\(\\sqrt{" + (square1 * seed) + "} - \\sqrt{" + (square2 * seed) + "}\\)</div>";
        problem.answer = "\\(" + (root1 - root2) + "\\sqrt{" + seed + "}\\)";
    }
    return problem;
}
function functionMachine(maxInput, ops, showOutput, negatives, decimals) {
    var problem = {};
    var attempts = 0;
    do {
        var input = getRandom(0, maxInput);
        var reroll = false;
        var output = input;
        var operation = [];
        for (var i = 0; i < ops; i++) {
            var x = getRandom(0, 10);
            if (negatives && toss()) {
                x *= -1;
            }
            switch (getRandom(0, 3)) {
                case 0:
                    operation.push("+" + x);
                    output += x;
                    break;
                case 1:
                    operation.push("&times;" + x);
                    output *= x;
                    break;
                case 2:
                    operation.push("&minus;" + x);
                    output -= x;
                    break;
                case 3:
                    operation.push("&divide;" + x);
                    output /= x;
                    break;
            }
            output = roundError(output);
        }
        if (!decimals && output !== Math.round(output)) {
            reroll = true;
        }
        if (!negatives && output < 0) {
            reroll = true;
        }
        if (decimals && output === Math.round(output)) {
            reroll = true;
        }
        if (negatives && output > 0) {
            reroll = true;
        }
        if (output !== Math.round(output * 4) / 4) {
            reroll = true;
        }
        if (Math.abs(output) > 100) {
            reroll = true;
        }
        attempts++;
    } while (reroll === true);
    var data = "<table class='questionTable' style='width: 80%;'>";
    if (showOutput) {
        data += "<tr><td>?</td><td style='border: none;'>&#129034;</td>";
    } else {
        data += "<tr><td>" + input + "</td><td style='border: none;'>&#129034;</td>";
    }

    for (var i = 0; i < ops; i++) {
        data += "<td style='background: #ddd;'>" + operation[i] + "</td><td style='border: none;'>&#129034;</td>";
    }
    if (showOutput) {
        data += "<td>" + output + "</td></tr>";
        problem.answer = input;
    } else {
        data += "<td>?</td></tr>";
        problem.answer = output;
    }

    data += "</table>";
    problem.question = data;
    return problem;
}
function algebraicDivision(x1, y1, c1, x2, y2, c2) {
    var problem = {};
    var firstTerm = true;
    var product = fixTerm(x1 * x2, "x^2", firstTerm);
    if (x1 * x2 !== 0) {
        firstTerm = false;
    }
    product += fixTerm(y1 * y2, "y^2", firstTerm);
    if (y1 * y2 !== 0) {
        firstTerm = false;
    }
    product += fixTerm(x1 * y2 + y1 * x2, "xy", firstTerm);
    if (x1 * y2 + y1 * x2 !== 0) {
        firstTerm = false;
    }
    product += fixTerm(x1 * c2 + x2 * c1, "x", firstTerm);
    if (x1 * c2 + x2 * c1 !== 0) {
        firstTerm = false;
    }
    product += fixTerm(y1 * c2 + y2 * c1, "y", firstTerm);
    product += fixTerm(c1 * c2, "", firstTerm);
    firstTerm = true;
    var divisor = fixTerm(x1, "x", firstTerm);
    if (x1 !== 0) {
        firstTerm = false;
    }
    divisor += fixTerm(y1, "y", firstTerm);
    if (y1 !== 0) {
        firstTerm = false;
    }
    divisor += fixTerm(c1, "", firstTerm);

    firstTerm = true;
    var dividend = fixTerm(x2, "x", firstTerm);
    if (x2 !== 0) {
        firstTerm = false;
    }
    dividend += fixTerm(y2, "y", firstTerm);
    if (y2 !== 0) {
        firstTerm = false;
    }
    dividend += fixTerm(c2, "", firstTerm);
    problem.question = "<div>\\(\\frac{" + product + "}{" + divisor + "}\\)</div>";
    problem.answer = "\\(" + dividend + "\\)";
    return problem;
}
function rationalisingDenominators(maxPrimes, commonFactor, numSurd) {
    var problem = {};
    var primes = [2, 2, 3, 3, 5, 5, 7, 11, 13, 17];
    do {
        var a = primes[getRandom(0, Math.min(maxPrimes, primes.length - 1))];
        var b = primes[getRandom(0, Math.min(maxPrimes, primes.length - 1))];
        var c = primes[getRandom(0, Math.min(maxPrimes, primes.length - 1))];
        if (commonFactor) {
            var h = primes[getRandom(0, primes.length - 1)];
        } else {
            h = 1;
        }
    } while (HCF(a, h) !== 1 || HCF(b, h) !== 1 || HCF(c, h) !== 1);

    if (!numSurd) {
        var original = "\\frac{" + b + "}{\\sqrt{" + c + "}}";
        var hcf = HCF(b, c);
        if (c / hcf !== 1) {
            var simple = "\\frac{" + b / hcf + "\\sqrt{" + c + "}}{" + c / hcf + "}";
        } else {
            simple = "\\sqrt{" + c + "}";
        }
    } else {

        var sign = "\\ &plus;\\ ";
        if (toss()) {
            sign = "\\ &minus;\\ ";
        }
        original = "\\frac{" + a * h + sign + "\\sqrt{" + b * h + "}}{\\sqrt{" + c * h + "}}";

        if (b !== c) {
            simple = "\\frac{" + a + "\\sqrt{" + c * h + "}" + sign + "\\sqrt{" + b * c + "}}{" + c + "}";
        } else {
            if (HCF(a, c) > 1) {
                if ((c / HCF(a, c)) === 1) {
                    simple = "\\sqrt{" + c * h + "}" + sign + (b / HCF(a, c));
                } else {
                    simple = "\\frac{" + (a / HCF(a, c)) + "\\sqrt{" + c * h + "}" + sign + (b / HCF(a, c)) + "}{" + (c / HCF(a, c)) + "}";
                }
            } else {
                simple = "\\frac{" + a + "\\sqrt{" + c * h + "}" + sign + b + "}{" + c + "}";
            }
        }

    }
    problem.question = "<div>Rationalise the denominator and simplify</div><div>\\( " + original + "\\)</div>";
    problem.answer = "\\(" + simple + "\\)";
    return problem;
}
function rewriteAsSum(n, maxSum, maxTerm, mixed, evaluate, addition) {
    var problem = {};
    var terms = [];
    var total = 0;
    do {
        for (var i = 0; i < n; i++) {
            var x = getRandom(1, maxTerm);
            if (toss()) {
                x *= -1;
            }
            terms[i] = x;
            total += x;
        }
    } while (Math.abs(this.total) > maxSum);

    var mixCalc = "\\(" + fix(terms[0]);
    var subCalc = "\\(" + fix(terms[0]);
    var addCalc = "\\(" + fix(terms[0]);
    for (i = 1; i < terms.length; i++) {
        subCalc += "&minus;" + fix(-terms[i]);
        addCalc += "&plus; " + fix(terms[i]);
        if (toss()) {
            mixCalc += "&minus;" + fix(-terms[i]);
        } else {
            mixCalc += "&plus; " + fix(terms[i]);
        }
    }
    subCalc += "\\)";
    addCalc += "\\)";
    mixCalc += "\\)";
    if (evaluate) {
        problem.question = "<div>Calculate:</div>";
    } else {
        problem.question = "<div>Rewrite this calculation as a sum.</div>";
    }
    if (mixed) {
        problem.question += "<div>" + mixCalc + "</div>";
    } else if (addition) {
        problem.question += "<div>" + addCalc + "</div>";
    } else {
        problem.question += "<div>" + subCalc + "</div>";
    }
    if (evaluate) {
        problem.answer = "\\(" + total + "\\)";
    } else {
        problem.answer = addCalc;
    }
    return problem;
    function fix(x) {
        if (x >= 0) {
            return x;
        } else {
            return "(" + x + ")";
        }
    }
}
function areaCircle(r, pi) {
    var problem = {};
    var unit = "cm";
    if (toss()) {
        unit = "mm";
    }
    if (toss()) {
        unit = "m";
    }
    var area = "\\(";
    if (pi) {
        area += r * r + "&pi;";
    } else {
        area += Math.round(10 * r * r * Math.PI) / 10;
    }
    area += " \\text{ " + unit + "}^2 \\)";
    var max = 120;
    var radius = getRandom(max / 2 - 10, max / 2);
    var angle = Math.PI / 2 * getRandom(0, 0);
    var x2 = Math.cos(angle) * radius;
    var y2 = Math.sin(angle) * radius;
    problem.question = "<div>Find the area of this circle.</div>";
    problem.question += "<svg width='" + max + "' height='" + max + "'>";
    problem.question += "<circle cx='" + max / 2 + "' cy='" + max / 2 + "' r='" + radius + "' stroke='black' fill='#ffffff' />";
    problem.question += "<circle cx='" + max / 2 + "' cy='" + max / 2 + "' r='" + 1 + "' stroke='black' fill='#000000' />";
    problem.question += "<line x1='" + max / 2 + "' y1='" + max / 2 + "' x2='" + (max / 2 + x2) + "' y2='" + (max / 2 + y2) + "' stroke='black' />";
    problem.question += "<text x='" + (max / 2) + "' y='" + (max / 2 + y2 / 2 - 5) + "' font-size='0.7em' fill='#000000'>" + r + " " + unit + "</text>";
    problem.question += "</svg>";
    if (pi) {
        problem.question += "<div>Give your answer in terms of \\(\\pi\\).</div>";
    } else {
        problem.question += "<div>Round your answer to 1d.p.</div>";
    }
    problem.answer = area;
    return problem;
}
function circumferenceCircle(r, pi) {
    var problem = {};
    var unit = "cm";
    if (toss()) {
        unit = "mm";
    }
    if (toss()) {
        unit = "m";
    }
    var circumference = "\\(";
    if (pi) {
        circumference += 2 * r + "&pi;";
    } else {
        circumference += Math.round(10 * 2 * r * Math.PI) / 10;
    }
    circumference += " \\text{ " + unit + "} \\)";
    var max = 120;
    var radius = getRandom(max / 2 - 10, max / 2);
    var angle = 0;
    var x2 = Math.cos(angle) * radius;
    var y2 = Math.sin(angle) * radius;
    problem.question = "<div>Find the circumference of this circle.</div>";
    problem.question += "<svg width='" + max + "' height='" + max + "'>";
    problem.question += "<circle cx='" + max / 2 + "' cy='" + max / 2 + "' r='" + radius + "' stroke='black' fill='#ffffff' />";
    problem.question += "<circle cx='" + max / 2 + "' cy='" + max / 2 + "' r='" + 1 + "' stroke='black' fill='#000000' />";
    problem.question += "<line x1='" + max / 2 + "' y1='" + max / 2 + "' x2='" + (max / 2 + x2) + "' y2='" + (max / 2 + y2) + "' stroke='black' />";
    problem.question += "<text x='" + (max / 2) + "' y='" + (max / 2 + y2 / 2 - 5) + "' font-size='0.7em' fill='#000000'>" + r + " " + unit + "</text>";
    problem.question += "</svg>";
    if (pi) {
        problem.question += "<div>Give your answer in terms of \\(\\pi\\).</div>";
    } else {
        problem.question += "<div>Round your answer to 1d.p.</div>";
    }
    problem.answer = circumference;
    return problem;
}
function solvingQuadraticFactorise(a, b, c, d) {
    var problem = {};
    var let = "x";
    var exp = "";
    var co = [];
    co[0] = a * c;
    co[1] = a * d + b * c;
    co[2] = b * d;
    var exp = fixTerm(co[0], let + "^2", true);
    exp += fixTerm(co[1], let, false);
    exp += fixTerm(co[2], "", false);
    problem.question = "<div>Solve:</div><div>\\(" + exp + " = 0\\)</div>";
    problem.answer = "\\(x = " + Math.round(100 * (-b) / a) / 100 + ", x = " + Math.round(100 * (-d) / c) / 100 + "\\)";
    return problem;
}
function calcAcrossZero(start, end) {
    var problem = {};
    problem.question = "Find the difference between " + start + " and " + end + ".";
    problem.answer = Math.abs(end - start);
    return problem;
}
function findHyp(a, b) {
    var problem = {};
    var triangle = new RightTriangle(a, b);
    problem.question = "<div>Calculate the length &#119909;.</div>";
    problem.question += triangle.display(triangle.a, triangle.b, "&#119909;");
    if (triangle.cDec === Math.round(triangle.cDec)) {
        problem.answer = "\\(" + triangle.cSurd + "\\) units";
    } else {
        problem.answer = "\\(" + triangle.cSurd + " \\approx " + Math.round(10 * triangle.cDec) / 10 + "\\) units";
    }
    return problem;
}
function findLeg(a, b) {
    var problem = {};
    var triangle = new RightTriangle(a, b);
    problem.question = "<div>Calculate the length &#119909;.</div>";
    if (toss()) {
        problem.question += triangle.display(triangle.a, "&#119909;", Math.round(10 * triangle.cDec) / 10);
        problem.answer = "\\(" + triangle.b + "\\)";
    } else {
        problem.question += triangle.display("&#119909;", triangle.b, Math.round(10 * triangle.cDec) / 10);
        problem.answer = "\\(" + triangle.a + "\\) units";
    }
    return problem;
}
function perimeterPythag(a, b) {
    var problem = {};
    var triangle = new RightTriangle(a, b);
    problem.question = "<div>Calculate the perimeter of the triangle.</div>";
    if (toss()) {
        problem.question += triangle.display(triangle.a, "&nbsp;", Math.round(10 * triangle.cDec) / 10);
    } else {
        problem.question += triangle.display("&nbsp;", triangle.b, Math.round(10 * triangle.cDec) / 10);
    }
    problem.answer = "\\(" + Math.round(10 * triangle.perimeter) / 10 + "\\) units";
    return problem;
}
function areaPythag(a, b) {
    var problem = {};
    var triangle = new RightTriangle(a, b);
    problem.question = "<div>Calculate the area of the triangle.</div>";
    if (toss()) {
        problem.question += triangle.display(triangle.a, "&nbsp;", Math.round(100 * triangle.cDec) / 100);
    } else {
        problem.question += triangle.display("&nbsp;", triangle.b, Math.round(100 * triangle.cDec) / 100);
    }

    problem.answer = "\\(" + Math.round(100 * triangle.area) / 100 + "\\) square units";
    return problem;
}
function findAngleTrig(a, b) {
    var problem = {};
    var triangle = new RightTriangle(a, b);
    problem.question = "<div>Find the missing angle &#119909;.</div>";
    switch (getRandom(0, 2)) {
        case 0:
            problem.question += triangle.display(triangle.a, triangle.b, "", "&#119909;&deg;");
            break;
        case 1:
            problem.question += triangle.display("", triangle.b, Math.round(10 * triangle.cDec) / 10, "&#119909;&deg;");
            break;
        case 2:
            problem.question += triangle.display(triangle.a, "", Math.round(10 * triangle.cDec) / 10, "&#119909;&deg;");
            break;
    }
    problem.answer = "" + Math.round(triangle.B) + "&deg;";
    return problem;
}
function findLengthTrig(a, b, angle) {
    var problem = {};
    if (angle) {
        var triangle = new RightTriangle(a, b, angle);
    } else {
        var triangle = new RightTriangle(a, b);
    }
    problem.question = "<div>Calculate the missing length &#119909;.</div>";
    switch (getRandom(0, 2)) {
        case 0:
            problem.question += triangle.display("&#119909", Math.round(10 * triangle.b) / 10, "", Math.round(10 * triangle.B) / 10 + "&deg;");
            problem.answer = "" + Math.round(10 * triangle.a) / 10 + " units";
            break;
        case 1:
            problem.question += triangle.display("", "&#119909", Math.round(10 * triangle.cDec) / 10, Math.round(10 * triangle.B) / 10 + "&deg;");
            problem.answer = "" + Math.round(10 * triangle.b) / 10 + " units";
            break;
        case 2:
            problem.question += triangle.display(triangle.a, "", "&#119909", Math.round(10 * triangle.B) / 10 + "&deg;");
            problem.answer = "" + Math.round(10 * triangle.cDec) / 10 + " units";
            break;
    }
    return problem;
}
function findAreaTrig(a, b, angle) {
    var problem = {};
    if (toss()) {
        var triangle = new RightTriangle(a, b, angle);
    } else {
        var triangle = new RightTriangle(a, b);
    }
    problem.question = "<div>Calculate the area of the triangle.</div>";
    switch (getRandom(0, 2)) {
        case 0:
            problem.question += triangle.display("&#119909", Math.round(10 * triangle.b) / 10, "", Math.round(10 * triangle.B) / 10 + "&deg;");
            break;
        case 1:
            problem.question += triangle.display("", "&#119909", Math.round(10 * triangle.cDec) / 10, Math.round(10 * triangle.B) / 10 + "&deg;");
            break;
        case 2:
            problem.question += triangle.display(triangle.a, "", "&#119909", Math.round(10 * triangle.B) / 10 + "&deg;");
            break;
    }
    problem.answer = "\\(" + Math.round(100 * triangle.area) / 100 + "\\) square units";
    return problem;
}
function findPerimeterTrig(a, b, angle) {
    var problem = {};
    if (toss()) {
        var triangle = new RightTriangle(a, b, angle);
    } else {
        var triangle = new RightTriangle(a, b);
    }
    problem.question = "<div>Calculate the perimeter of the triangle.</div>";
    switch (getRandom(0, 2)) {
        case 0:
            problem.question += triangle.display("&#119909", Math.round(10 * triangle.b) / 10, "", Math.round(10 * triangle.B) / 10 + "&deg;");
            break;
        case 1:
            problem.question += triangle.display("", "&#119909", Math.round(10 * triangle.cDec) / 10, Math.round(10 * triangle.B) / 10 + "&deg;");
            break;
        case 2:
            problem.question += triangle.display(triangle.a, "", "&#119909", Math.round(10 * triangle.B) / 10 + "&deg;");
            break;
    }
    problem.answer = "\\(" + Math.round(10 * triangle.perimeter) / 10 + "\\) units";
    return problem;
}
function wordedNumber(num) {
    if (num === 0) return "zero";
    let prefix = "";
    if (num < 0) {
        prefix = "negative ";
        num = Math.abs(num);
    }

    const ones = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
    const teens = ["ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
    const tens = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
    const scales = ["", "thousand", "million", "billion"];

    function convertSection(n) {
        let str = "";
        if (n >= 100) {
            str += ones[Math.floor(n / 100)] + " hundred";
            n %= 100;
            if (n > 0) str += " and ";
        }
        if (n >= 10 && n < 20) {
            str += teens[n - 10];
        } else {
            if (n >= 20) {
                str += tens[Math.floor(n / 10)];
                if (n % 10 > 0) str += "-" + ones[n % 10];
            } else if (n > 0) {
                str += ones[n];
            }
        }
        return str;
    }

    let parts = [];
    let scaleIndex = 0;
    let originalNum = num;

    while (num > 0) {
        let chunk = num % 1000;
        if (chunk !== 0) {
            let chunkStr = convertSection(chunk);
            let scaleLabel = scales[scaleIndex];

            if (scaleIndex === 0 && chunk < 100 && originalNum > 1000) {
                chunkStr = "and " + chunkStr;
            }

            parts.unshift(chunkStr + (scaleLabel ? " " + scaleLabel : ""));
        }
        num = Math.floor(num / 1000);
        scaleIndex++;
    }

    const wordResult = parts.reduce((acc, part, i) => {
        if (i === 0) return part;
        const separator = part.startsWith("and") ? " " : ", ";
        return acc + separator + part;
    }, "");

    return (prefix + wordResult).trim().replace(/\s+/g, ' ');
}
function wordyNumber(n) {
    var digit = new Array("zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine");
    var rem = n;
    var h = Math.round(rem / 100) * 100;
    rem -= (100 * h);
    var t = Math.round(rem / 10) * 10;
    rem -= (10 * t);
    var string = "";
    if (h > 0) {
        string += digit[h] + " hundred ";
    }
}
function numberWithCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}
function townPicker(n) {
    var town = new Array("Appleby", "Barcombe", "Bromwich", "Cullfield", "Faversham", "Gillamoor", "Glossop",
        "Gramsby", "Helmfirth", "Holbeck", "Ironhaven", "Kirkwall", "Langdale", "Monmouth",
        "Murkwell", "Northbury", "Perlshaw", "Westray", "Woodpine");
    if (!n) {
        n = getRandom(0, town.length - 1);
    }
    if (n >= town.length) {
        n %= town.length;
    }
    return town[n];
}
function currencyPicker(n) {
    var mult = (100 + getRandom(-6, 6)) / 100;
    var names = ["British Pound", "Euro", "US dollar"];
    var rates = [1, 1.15, 1.35];
    var signs = ["&pound;", "&#8364;", "$"];
    if (!n) {
        n = getRandom(0, names.length - 1);
    }
    if (n >= names.length) {
        n %= names.length;
    }
    function Currency(name, rate, sign) {
        this.name = name;
        this.rate = rate;
        this.sign = sign;
    }
    var currency = new Currency(names[n], Math.round(rates[n] * mult * 100) / 100, signs[n]);
    return currency;
}
function namePicker(n) {
    var name = new Array("Jonny", "Onene", "Marcia", "Becky", "Nick", "Phoebe", "Aleema", "Raheem", "Noor", "David",
        "Amanda", "Nicola", "Marek", "Maral", "Rajuia", "Donatella", "Annasara", "Sky", "Natalia", "Heben", "Sara",
        "Solomon", "Ebenezer", "Robinder", "Zofia", "Kelly", "Wisal", "Ferial", "Connor", "Dean", "Creflo",
        "Raheem", "Sultan", "Paulina", "Boguslawa", "Michael", "Hanadi", "Fiza", "Arron", "Umar", "Alixe",
        "Musab", "Safia", "Ivanilsa", "Ionut", "Simon", "Shanzah", "Raphael", "Zulqarnain", "Kieren", "Shareen",
        "Mustafa", "Yad", "Rishikesh", "Adeeba", "Frank", "Maria", "Dawid", "Dominik", "Sulaimaan", "Ghadi", "Ayoub",
        "Elera", "Charlotte", "Adam", "Claire", "Kathryn", "Karen", "Nathan", "Atul", "Nikki", "Kirsty", "Lucy", "Sudeep",
        "Alex", "Helen", "Rute", "Jo", "Ashton", "Josh", "Laura", "Heidi", "Detorie", "Salim");
    var gender = new Array("M", "M", "F", "F", "M", "F", "F", "M", "F", "M", "F", "F", "M", "F", "F", "F", "F", "F",
        "F", "F", "F", "M", "M", "M", "F", "F", "F", "F", "M", "M", "M", "M", "M", "F", "F", "M", "F", "F", "M", "M", "F",
        "M", "F", "F", "M", "M", "F", "M", "M", "M", "F", "M", "M", "M", "F", "M", "F", "M", "M", "M", "F", "M",
        "F", "F", "M", "F", "F", "K", "M", "M", "F", "F", "F", "M", "M", "F", "F", "F", "M", "M", "F", "F", "M", "M");
    if (!n) {
        n = getRandom(0, name.length - 1);
    }
    if (n >= name.length) {
        n %= name.length;
    }
    var person = {};
    person.name = name[n];
    person.gender = gender[n];
    if (person.gender === "M") {
        person.subject = "he";
        person.object = "him";
        person.owner = "his";
    } else {
        person.subject = "she";
        person.object = "her";
        person.owner = "her";
    }
    return person;
}
function colourPicker(n) {
    var colour = new Array("red", "blue", "yellow", "green", "orange", "purple", "pink", "black", "white", "brown");
    if (!n) {
        n = getRandom(0, colour.length - 1);
    }
    if (n >= colour.length) {
        n %= colour.length;
    }
    return colour[n];
}
function dayPicker(n) {
    var day = new Array("Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday");
    if (!n) {
        n = getRandom(0, day.length - 1);
    }
    if (n >= day.length) {
        n %= day.length;
    }
    return day[n];
}
function monthPicker(n) {
    var month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    if (!n) {
        n = getRandom(0, month.length - 1);
    }
    if (n >= month.length) {
        n %= month.length;
    }
    return month[n];
}
function fruitPicker(n) {
    var fruit = new Array("apple", "pear", "orange", "lemon", "lime", "nectarine", "banana", "plum");
    if (!n) {
        n = getRandom(0, fruit.length - 1);
    }
    if (n >= fruit.length) {
        n %= fruit.length;
    }
    return fruit[n];
}
function letterPicker(n, capitalLetter) {
    var capital = new Array('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');
    var lowercase = new Array('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z');
    if (n < 0) {
        n = getRandom(0, capital.length - 1);
    }
    if (n >= capital.length) {
        n %= capital.length;
    }
    if (capitalLetter) {
        return capital[n];
    } else {
        return lowercase[n];
    }
}
function itemPicker(cost, n) {
    switch (cost) {
        case "large":
            var item = new Array("cooker", "television", "fridge", "computer", "mobile phone", "laptop", "dishwasher", "washing machine");
            break;
        case "small":
            item = new Array("pencil", "ruler", "pen", "rubber", "chocolate bar", "sweet");
    }
    if (!n) {
        n = getRandom(0, item.length - 1);
    }
    if (n >= item.length) {
        n %= item.length;
    }
    return item[n];
}
function unitPicker(type) {
    switch (type) {
        case "length":
            var unit = new Array("mm", "cm", "m", "km");
            break;
        case "weight":
            unit = new Array("mg", "g", "kg");
            break;
        case "volume":
            unit = new Array("ml", "l");
            break;
    }
    return unit[[getRandom(0, unit.length - 1)]];
}
function polygonPicker(sides) {
    var name = new Array("triangle", "quadrilateral", "pentagon", "hexagon", "heptagon", "octagon", "nonagon", "decagon");
    if (!sides) {
        sides = getRandom(0, name.length - 1);
    }
    if (sides - 3 >= name.length) {
        sides %= name.length;
    }
    var polygon = {};
    polygon.name = name[sides - 3];
    polygon.sides = sides;
    return polygon;
}
function showDate() {
    var weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var date = new Date();
    var text = date.getDate() + ordinal(date.getDate()) + " " + months[date.getMonth()] + " " + date.getFullYear();
    return text;
}
function ordinal(n) {
    var x = "";
    if (n % 10 == 1 && n != 11) {
        x += "st";
    } else if (n % 10 == 2 && n != 12) {
        x += "nd";
    } else if (n % 10 == 3 && n != 13) {
        x += "rd";
    } else {
        x += "th";
    }
    return x;
}
function capitalFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
function toDegrees(angle) {
    return angle * (180 / Math.PI);
}
function toRadians(angle) {
    return angle * (Math.PI / 180);
}
function toFraction(n) {
    var num = Math.round(n * 10000000);
    var den = 10000000;
    var hcf = HCF(num, den);
    if (den / hcf === 1) {
        return num / den;
    } else {
        return "\\frac{" + (num / hcf) + "}{" + (den / hcf) + "}";
    }
}
function toPercentage(n) {
    return roundError(n * 100) + "%";
}
function toPounds(n) {
    var pounds = Math.floor(n / 100);
    var pence = (n % 100);
    if (pence < 10) {
        pence = "0" + pence;
    }
    return "&pound;" + pounds + "." + pence;
}
function toRoman(num) {
    if (isNaN(num) || num < 1)
        return "";
    var digits = String(+num).split(""),
            key = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM",
                "", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC",
                "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"],
            roman = "",
            i = 3;
    while (i--)
        roman = (key[+digits.pop() + (i * 10)] || "") + roman;
    return Array(+digits.join("") + 1).join("M") + roman;
}
function getMedian(numbers) {
    const sorted = Array.from(numbers).sort((a, b) => a - b);
    const middle = Math.floor(sorted.length / 2);
    if (sorted.length % 2 === 0) {
        return (sorted[middle - 1] + sorted[middle]) / 2;
    }
    return sorted[middle];
}
function sfRound(number, acc) {
    var x = number;
    x = x.toString();
    var count = 0;
    for (var i = 0; i < x.length; i++) {
        if (x[i] === "0" || x[i] === ".") {
            count++;
        } else {
            break;
        }
    }
    var y = x.substring(0, count + acc);
    console.log(y);
    x = parseFloat(parseFloat(x).toPrecision(acc));

    var dec = false;
    if (x === Math.round(x)) {
        dec = true;
    }
    x = x.toString();
    while (x.length < y.length) {
        if (dec) {
            x += ".";
            dec = false;
        }
        x += "0";
    }
    return x;
}
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function getRandomMember(array) {
    return array[getRandom(0, array.length - 1)];
}
function jumbleArray(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]
        ];
    }
    return array;
}
function stripAnswer(answer) {
    return answer.replace(/ /g, '').toLowerCase()
}
function roundError(answer) {
    return Math.round(answer * 1000000000) / 1000000000;
}
const rgb2hex = (rgb) => `#${rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1).map(n => parseInt(n, 10).toString(16).padStart(2, '0')).join('')}`;
function fixTerm(coefficient, variable, firstTerm) {
    var term = "+" + coefficient + variable;
    if (coefficient < 0) {
        term = "-" + Math.abs(coefficient) + variable;
    }
    switch (coefficient) {
        case 0:
            term = "";
            break;
        case 1:
            if (variable != "") {
                term = "+" + variable;
            }
            break;
        case - 1:
            if (variable != "") {
                term = "-" + variable;
            }
            break;
    }
    if (firstTerm && coefficient > 0) {
        term = term.substr(1);
    }
    return term;
}
function toStandard(x) {
    if (x < 0) {
        var neg = true;
        x *= -1;
    }
    var co = 0;
    var pow = 0;
    if (x >= 10) {
        while (x >= 10) {
            pow++;
            x /= 10;
        }
    } else if (x < 1) {
        while (x < 1) {
            pow--;
            x *= 10;
        }
    }
    co = roundError(x);
    if (neg) {
        return "-(" + co + " \\times 10^{" + pow + "})";
    }
    else {
        return co + " \\times 10^{" + pow + "}";
    }
}
function HCF(x, y) {
    // Returns the highest common factor of x and y.
    var temp;
    if (x < 0) {
        x *= -1;
    }
    if (y < 0) {
        y *= -1;
    }
    if (x == y) {
        return x;
    }
    while (x != 0) {
        y = y % x;
        temp = x;
        x = y;
        y = temp;
    }
    return y;
}
function simplifySurd(x) {
    var a = 1;
    for (var i = 1; i <= x; i++) {
        if (x % (i * i) === 0) {
            a *= i;
            x /= (i * i);
            i = 1;
        }
    }
    if (x === 1) {
        return a;
    }
    if (a === 1) {
        return "\\sqrt{" + x + "}";
    } else {
        return a + "\\sqrt{" + x + "}";
    }
}
function compose(f1, f2) {
    const a1 = f1.coeffs[2], b1 = f1.coeffs[1], c1 = f1.coeffs[0];
    const a2 = f2.coeffs[2], b2 = f2.coeffs[1], c2 = f2.coeffs[0];

    const x4 = a1 * (a2 ** 2);
    const x3 = 2 * a1 * a2 * b2;
    const x2 = a1 * (b2 ** 2 + 2 * a2 * c2) + b1 * a2;
    const x1 = 2 * a1 * b2 * c2 + b1 * b2;
    const constant = a1 * (c2 ** 2) + b1 * c2 + c1;
    return new Polynomial([constant, x1, x2, x3, x4]);
}
var isSquare = function (n) {
    return n > 0 && Math.sqrt(n) % 1 === 0;
};
function isPrime(n) {
    // Returns true if n is prime.
    var isPrime = true;
    if (n < 2 || Math.round(n) !== n) {
        isPrime = false;
    }
    for (var i = 2; i <= Math.sqrt(n); i++) {
        if ((n % i) == 0) {
            isPrime = false;
        }
    }
    return isPrime;
}
function primeFactors(x, indexForm) {
    var integer = x;
    var primeArray = [];
    for (var i = 2; i <= integer; i++) {
        if (integer % i === 0 && isPrime(i)) {
            integer /= i;
            primeArray.push(i);
            i--;
        }
    }
    var product = "";

    if (indexForm) {
        var index = 0;
        var current = primeArray[0];

        for (var i = 0; i < primeArray.length; i++) {
            if (primeArray[i] === current) {
                index++;
            } else {
                if (index === 1) {
                    product += current + "\\ &times\\ ";
                } else {
                    product += current + "^" + index + "\\ &times\\ ";
                }
                index = 1;
                current = primeArray[i];
            }
        }
        if (index === 1) {
            product += primeArray[i - 1];
        } else {
            product += primeArray[i - 1] + "^" + index;
        }


    } else {
        // None index form
        for (var i = 0; i < primeArray.length - 1; i++) {
            product += primeArray[i] + " &#215; ";
        }
        product += primeArray[i];
    }
    if (x === 1) {
        product = "1";
    }
    return product;
}
function toRecurring(x) {
    var decimal = x.toString();
    if (x === Math.round(x)) {
        return x;
    }
    var parts = decimal.split('.');
    var recurringParts = [];
    recurringParts.push(parts[1][0]);
    var repeat = false;
    let i = 1;
    while (!repeat) {
        for (let j = 0; j < 100; j++) {
            if (parts[j]) {
                if (parts[1][i] === parts[1][j] && i !== j) {
                    repeat = true;
                }
            }
        }
        if (!repeat) {
            recurringParts.push(parts[1][i]);
        }
        i++;
        if (i >= parts[1].length) {
            repeat = true;
        }
    }
    return "\\(" + parts[0] + ".\\overline{" + recurringParts.join('') + "}\\)";
}
function factorial(n) {
    var fact = 1;
    for (var i = 2; i <= n; i++) {
        fact *= i;
    }
    return fact;
}
function getCompliment(universe, setA) {
    var compliment = [];
    for (let i = 0; i < universe.length; i++) {
        var isElement = false;
        for (let j = 0; j < setA.length; j++) {
            if (universe[i] === setA[j]) {
                isElement = true;
            }
        }
        if (!isElement) {
            compliment.push(universe[i]);
        }
    }
    return compliment;
}
function getIntersection(a, b) {
    var intersect = [];
    for (let i = 0; i < a.length; i++) {
        for (let j = 0; j < b.length; j++) {
            if (a[i] === b[j]) {
                intersect.push(a[i]);
            }
        }
    }
    return intersect;
}
function getUnion(a, b) {
    var union = [];
    for (let i = 0; i < a.length; i++) {
        union.push(a[i]);
    }
    for (let i = 0; i < b.length; i++) {
        var unique = true;
        for (let j = 0; j < a.length; j++) {
            if (a[j] === b[i]) {
                unique = false;
            }
        }
        if (unique) {
            union.push(b[i]);
        }
    }
    union.sort(function (a, b) {
        return a - b;
    });
    return union;
}
function combin(n, k) {
    return Math.round((factorial(n) / (factorial(k) * factorial(n - k))));
}
function toss() {
    if (Math.random() < 0.5) {
        return true;
    } else {
        return false;
    }
}
function changeBG(colour) {
    var questions = document.getElementsByClassName('questionBox');
    for (i = 0; i < questions.length; i++) {
        questions[i].style.backgroundColor = colour;
    }
}
function goFull() {
    if (controls.style.display !== "none") {
        controls.style.display = "none";
        content.style.height = "100vh";
        footer.style.display = "none";
    } else {
        controls.style.display = "block";
        content.style.height = "100%";
        footer.style.display = "block";
    }
    try {
        if (theCanvas) {
            context = theCanvas.getContext("2d");
            context.canvas.width = 0.95 * window.innerWidth;
            context.canvas.height = 0.95 * window.innerHeight;
            drawScreen();
        }
    } catch (e) {

    }
}
function getQuestion(currentTopic, level) {
    var totalQuestions = 170;
    if (currentTopic > totalQuestions) {
        currentTopic = "" + (currentTopic % totalQuestions);
    }
    if (currentTopic == 0) {
        currentTopic = "" + getRandom(1, totalQuestions);
    }
    level = Math.round(10 * level) / 10;
    switch (currentTopic) {
        case "1":
            additionLadder(level);
            break;
        case "2":
            additionLadder(level, true);
            break;
        case "3":
            multiplicationLadder(level);
            break;
        case "4":
            multiplicationLadder(level, true);
            break;
        case "5":
            halvingLadder(level);
            break;
        case "6":
            doublingLadder(level);
            break;
        case "7":
            fractionOfAmountLadder(level);
            break;
        case "8":
            percentageOfAmountLadder(level);
            break;
        case "9":
            roundingSigFigLadder(level);
            break;
        case "10":
            negativeLadder(level);
            break;
        case "11":
            powersOfTenLadder(level);
            break;
        case "12":
            ratioShareLadder(level);
            break;
        case "13":
            convertingFDPLadder(level, "random");
            break;
        case "14":
            collectingTermsLadder(level);
            break;
        case "15":
            factorLadder(level);
            break;
        case "16":
            multipleLadder(level);
            break;
        case "17":
            hcfLadder(level);
            break;
        case "18":
            lcmLadder(level);
            break;
        case "19":
            simplifyingRatiosLadder(level);
            break;
        case "20":
            simplifyingFractionsLadder(level);
            break;
        case "21":
            nthTermLinearLadder(level);
            break;
        case "22":
            nthTermGeneratingLadder(level);
            break;
        case "23":
            fourOpsLadder(level);
            break;
        case "24":
            addingCoinsLadder(level);
            break;
        case "25":
            countingCoinsLadder(level);
            break;
        case "26":
            speedDistTimeLadder(level);
            break;
        case "27":
            powersAndRootsLadder(level);
            break;
        case "28":
            orderingLadder(level);
            break;
        case "29":
            oneStepEquationLadder(level);
            break;
        case "30":
            numberBondsLadder(level);
            break;
        case "31":
            addSubtractFractionsLadder(level, 0);
            break;
        case "32":
            multiplyDivideFractionsLadder(level, 0);
            break;
        case "33":
            meanLadder(level);
            break;
        case "34":
            medianLadder(level);
            break;
        case "35":
            rangeLadder(level);
            break;
        case "36":
            modeLadder(level);
            break;
        case "37":
            averagesLadder(level);
            break;
        case "38":
            twoStepEquationLadder(level);
            break;
        case "39":
            multiplyDivideStandardFormLadder(level, "*");
            break;
        case "40":
            addSubtractStandardFormLadder(level, "+");
            break;
        case "41":
            convertingToStandardFormLadder(level);
            break;
        case "42":
            convertingFractionsLadder(level, true);
            break;
        case "43":
            threeStepEquationLadder(level);
            break;
        case "44":
            equationsMixedLadder(level);
            break;
        case "45":
            convertingMeticLengthLadder(level);
            break;
        case "46":
            equationsWithBracketsLadder(level);
            break;
        case "47":
            sequencesNextTermLadder(level);
            break;
        case "48":
            equationsWithBracketsBothLadder(level);
            break;
        case "49":
            percentageIncreaseDecreaseLadder(level);
            break;
        case "50":
            reversePercentageLadder(level);
            break;
        case "51":
            substitutionLadder(level);
            break;
        case "52":
            ratioReverseLadder(level);
            break;
        case "53":
            unitaryMethodLadder(level);
            break;
        case "54":
            fractionsFourOpsLadder(level);
            break;
        case "55":
            convertingMeticWeightLadder(level);
            break;
        case "56":
            convertingMeticVolumeLadder(level);
            break;
        case "57":
            convertingMeticMixedLadder(level);
            break;
        case "58":
            probabilityBasicLadder(level);
            break;
        case "59":
            fractionalChangeLadder(level);
            break;
        case "60":
            differenceLadder(level);
            break;
        case "61":
            changingTemperaturesLadder(level);
            break;
        case "62":
            polygonSidesLadder(level);
            break;
        case "63":
            expectedFrequencyLadder(level);
            break;
        case "64":
            multiplyingTermsLadder(level);
            break;
        case "65":
            factoriseSingleLadder(level, true);
            break;
        case "66":
            expandSimplifySingleBracketsLadder(level);
            break;
        case "67":
            interchangingFDPLadder(level, "random");
            break;
        case "68":
            oneStepEquationLadder(level, true);
            break;
        case "69":
            twoStepEquationLadder(level, true);
            break;
        case "70":
            threeStepEquationLadder(level, true);
            break;
        case "71":
            fibonacciLadder(level);
            break;
        case "72":
            geometricSequenceLadder(level);
            break;
        case "73":
            nthTermQuadraticLadder(level);
            break;
        case "74":
            convertingTimeLadder(level);
            break;
        case "75":
            addSubtractStandardFormLadder(level, "-");
            break;
        case "76":
            multiplyDivideStandardFormLadder(level, "/");
            break;
        case "77":
            interchangingFDPLadder(level, "fraction");
            break;
        case "78":
            interchangingFDPLadder(level, "percentage");
            break;
        case "79":
            convertingFDPLadder(level, "decimal");
            break;
        case "80":
            convertingFDPLadder(level, "fraction");
            break;
        case "81":
            convertingFDPLadder(level, "percentage");
            break;
        case "82":
            gradientTwoPointsLadder(level);
            break;
        case "83":
            midpointTwoPointsLadder(level);
            break;
        case "84":
            completingSquareLadder(level);
            break;
        case "85":
            turningPointToQuadraticLadder(level);
            break;
        case "86":
            factoriseExpandMonicQuadraticsLadder(level, false);
            break;
        case "87":
            factoriseExpandMonicQuadraticsLadder(level, true);
            break;
        case "88":
            indexLawMultiplyLadder(level);
            break;
        case "89":
            indexLawDivideLadder(level);
            break;
        case "90":
            indexLawPowerOfPowerLadder(level);
            break;
        case "91":
            indexLawMixedLadder(level);
            break;
        case "92":
            ratioMixedLadder(level);
            break;
        case "93":
            combiningRatiosLadder(level);
            break;
        case "94":
            ratioDifferenceLadder(level);
            break;
        case "95":
            percentageMultiplierLadder(level);
            break;
        case "96":
            percentageChangeLadder(level);
            break;
        case "97":
            repeatedPercentageChangeLadder(level);
            break;
        case "98":
            addingNegativesLadder(level);
            break;
        case "99":
            subtractingNegativesLadder(level);
            break;
        case "100":
            multiplyingDividingNegativesLadder(level, "*");
            break;
        case "101":
            multiplyingDividingNegativesLadder(level, "/");
            break;
        case "102":
            convertingFromStandardFormLadder(level);
            break;
        case "103":
            stateEquationOfCircleLadder(level);
            break;
        case "104":
            orderOfOpsTimesDivideLadder(level);
            break;
        case "105":
            orderOfOpsAddSubtractLadder(level);
            break;
        case "106":
            givenDecimalFindFractionLadder(level);
            break;
        case "107":
            equationsIfThenLadder(level);
            break;
        case "108":
            productOfPrimesLadder(level);
            break;
        case "109":
            primeConsecutivesLadder(level);
            break;
        case "110":
            tableBondsLadder(level);
            break;
        case "111":
            convertingFractionsLadder(level, false);
            break;
        case "112":
            placeValuePowersLadder(level);
            break;
        case "113":
            factoriseSingleLadder(level, false);
            break;
        case "114":
            multiplyDivideFractionsLadder(level, 1);
            break;
        case "115":
            equationsWithRatioLadder(level);
            break;
        case "116":
            integersBetweenFractionLadder(level);
            break;
        case "117":
            ratioDonatingLadder(level);
            break;
        case "118":
            howManyFactorsLadder(level);
            break;
        case "119":
            closeMultiplesOfTenLadder(level);
            break;
        case "120":
            nthTermSpecificTermLadder(level);
            break;
        case "121":
            linearSimultLadder(level);
            break;
        case "122":
            errorIntervalLadder(level);
            break;
        case "123":
            unitRatioLadder(level);
            break;
        case "124":
            ratioAsFractionLadder(level);
            break;
        case "125":
            recurrOrTerminateLadder(level);
            break;
        case "126":
            tableOfValuesLinearLadder(level);
            break;
        case "127":
            recurringDecimalsLadder(level);
            break;
        case "128":
            multiplyingSurdsLadder(level);
            break;
        case "129":
            simplifyingSurdsLadder(level);
            break;
        case "130":
            addingSurdsLadder(level);
            break;
        case "131":
            functionMachineLadder(level, 0);
            break;
        case "132":
            functionMachineLadder(level, 1);
            break;
        case "133":
            factoriseExpandNonMonicQuadraticsLadder(level, false);
            break;
        case "134":
            factoriseExpandNonMonicQuadraticsLadder(level, true);
            break;
        case "135":
            algebraicDivisionLadder(level, false);
            break;
        case "136":
            algebraicDivisionLadder(level, true);
            break;
        case "137":
            rationalisingDenominatorsLadder(level);
            break;
        case "138":
            rewriteAsSumLadder(level);
            break;
        case "139":
            lengthBetweenTwoPointsLadder(level);
            break;
        case "140":
            tableOfValuesQuadraticLadder(level);
            break;
        case "141":
            tableOfValuesCubicLadder(level);
            break;
        case "142":
            areaCircleLadder(level);
            break;
        case "143":
            solvingQuadraticFactoriseLadder(level, true);
            break;
        case "144":
            solvingQuadraticFactoriseLadder(level, false);
            break;
        case "145":
            circumfereceCircleLadderLadder(level);
            break;
        case "146":
            calcAcrossZeroLadder(level);
            break;
        case "147":
            findHypLadder(level);
            break;
        case "148":
            findLegLadder(level);
            break;
        case "149":
            perimeterPythagLadder(level);
            break;
        case "150":
            areaPythagLadder(level);
            break;
        case "151":
            findAngleTrigLadder(level);
            break;
        case "152":
            findLengthTrigLadder(level);
            break;
        case "153":
            findAreaTrigLadder(level);
            break;
        case "154":
            findPerimeterTrigLadder(level);
            break;
        case "155":
            addSubtractMixedLadder(level, 0);
            break;
        case "156":
            multiplyDivideMixedLadder(level, 0);
            break;
        case "157":
            multiplyDivideMixedLadder(level, 1);
            break;
        case "158":
            addSubtractFractionsLadder(level, 1);
            break;
        case "159":
            addSubtractMixedLadder(level, 1);
            break;
        case "160":
            productOfPrimesLadder(level, true);
            break;
        case "161":
            additionDecimalLadder(level);
            break;
        case "162":
            additionDecimalLadder(level, true);
            break;
        case "163":
            multiplicationDecimalLadder(level);
            break;
        case "164":
            multiplicationDecimalLadder(level, true);
            break;
        case "165":
            fourOpsDecimalLadder(level);
            break;
        case "166":
            addSubtractNegativesLadder(level);
            break;
        case "167":
            roundingPowerOfTen(level);
            break;
        case "168":
            roundingDecimal(level);
            break;
        case "169":
            hcfLadder(level, true);
            break;
        case "170":
            lcmLadder(level, true);
            break;
    }
}
function getGcseQuestion(currentTopic) {
    var totalQuestions = 110;
    if (currentTopic == 0) {
        currentTopic = getRandom(1, totalQuestions);
        while (!document.getElementById('q' + currentTopic)) {
            currentTopic = getRandom(1, totalQuestions);
        }
    }
    var question;
    switch (currentTopic) {
        case 1:
            question = missingValuesUsingTheMean();
            break;
        case 2:
            question = repeatedPercentageChange();
            break;
        case 3:
            question = tangentsToCircles();
            break;
        case 4:
            question = bestValue();
            break;
        case 5:
            question = sumProductDifference();
            break;
        case 6:
            question = factorSumProblem();
            break;
        case 7:
            question = percentageDecrease();
            break;
        case 8:
            question = buyingCheese();
            break;
        case 9:
            question = lengthOfStick();
            break;
        case 10:
            question = squareRectanglePerimeters();
            break;
        case 11:
            question = findOriginalGivenHcfLcm();
            break;
        case 12:
            question = readingFuel();
            break;
        case 13:
            question = gcse13();
            break;
        case 14:
            question = basicPythagoras();
            break;
        case 15:
            question = gcse15();
            break;
        case 16:
            question = directInverseProportion();
            break;
        case 17:
            question = speedDistanceTime();
            break;
        case 18:
            question = sharingRatioWithFDP();
            break;
        case 19:
            question = linearInequalities();
            break;
        case 20:
            question = savingPercentageOfWages();
            break;
        case 21:
            question = circleWithinSemicircle();
            break;
        case 22:
            question = cafeMenuChangeProblem();
            break;
        case 23:
            question = thinkOfANumber();
            break;
        case 24:
            question = holidayLoan();
            break;
        case 25:
            question = equationOfPerpendiculars();
            break;
        case 26:
            question = anglesInTetrahedron();
            break;
        case 27:
            question = angleAndAreaOfTriangles();
            break;
        case 28:
            question = sideLengthOfEquilateral();
            break;
        case 29:
            question = mixingDensities();
            break;
        case 30:
            question = estimatingPopulations();
            break;
        case 31:
            question = expandingCubics();
            break;
        case 32:
            question = nthTermOfQuadratic();
            break;
        case 33:
            question = proofs();
            break;
        case 34:
            question = errorIntervals();
            break;
        case 35:
            question = pressureForceArea();
            break;
        case 36:
            question = boxOfPens();
            break;
        case 37:
            question = convertingSpeeds();
            break;
        case 38:
            question = comparingPuzzleTimes();
            break;
        case 39:
            question = exactTrigValues();
            break;
        case 40:
            question = fruitProblem();
            break;
        case 41:
            question = proportionalDivision();
            break;
        case 42:
            question = quadraticInequalities();
            break;
        case 43:
            question = cardCombinations();
            break;
        case 44:
            question = turningPoints();
            break;
        case 45:
            question = boyGirlCombinations();
            break;
        case 46:
            question = gardenSlugs();
            break;
        case 47:
            question = reverseProbabilityWithRatio();
            break;
        case 48:
            question = railcardDiscounts();
            break;
        case 49:
            question = orderingFDPCalc();
            break;
        case 50:
            question = exchangeRates();
            break;
        case 51:
            question = sowingSeeds();
            break;
        case 52:
            question = fibonacciAlgebra();
            break;
        case 53:
            question = probabilityPercentages();
            break;
        case 54:
            question = concreteRatio();
            break;
        case 55:
            question = sharingRatioWithPercentages();
            break;
        case 56:
            question = proportionalRelationships();
            break;
        case 57:
            question = combiningRatios();
            break;
        case 58:
            question = dimensionalScaleFactors();
            break;
        case 59:
            question = factorisingDiffOfTwoSquares();
            break;
        case 60:
            question = maxItemsSameQuantity();
            break;
        case 61:
            question = algebraPolygonPerimeter();
            break;
        case 62:
            question = oddEvenAlgebra();
            break;
        case 63:
            question = linearSequences();
            break;
        case 64:
            question = isoscelesAlgebra();
            break;
        case 65:
            question = algebraicTaxis();
            break;
        case 66:
            question = numbersFromCards();
            break;
        case 67:
            question = ratioDonatingShares();
            break;
        case 68:
            question = functionSubAndSolve();
            break;
        case 69:
            question = compositeFunctions();
            break;
        case 70:
            question = inverseFunctions();
            break;
        case 71:
            question = missingCardValuesUingMean();
            break;
        case 72:
            question = equationOfPerpendicularsWithRatio();
            break;
        case 73:
            question = findingMidpointsWithRatio();
            break;
        case 74:
            question = repeatedPercentageChangeInReverse();
            break;
        case 75:
            question = deliveringGoods();
            break;
        case 76:
            question = profitOnGoods();
            break;
        case 77:
            question = changingRatios();
            break;
        case 78:
            question = estimatedProfit();
            break;
        case 79:
            question = testingPythagoras();
            break;
        case 80:
            question = multipleRatiosAndPercentages();
            break;
        case 81:
            question = nonCalcReversePercentage();
            break;
        case 82:
            question = productOfPrimes();
            break;
        case 83:
            question = multiplyingDecimals();
            break;
        case 84:
            question = areaOfSquareExpressions();
            break;
        case 85:
            question = framingMetal();
            break;
        case 86:
            question = showingIfParallel();
            break;
        case 87:
            question = vectorsInParallelograms();
            break;
        case 88:
            question = expectedFrequency();
            break;
        case 89:
            question = theatreSeats89();
            break;
        case 90:
            question = combinedAverageSpeed90();
            break;
        case 91:
            question = similarTriangles91();
            break;
        case 92:
            question = squareInACircle92();
            break;
        case 93:
            question = reversePercentages93();
            break;
        case 94:
            question = sandEquations94();
            break;
        case 95:
            question = ratiosOnALine95();
            break;
        case 96:
            question = surfaceAreaVolumeCube96();
            break;
        case 97:
            question = percentageProfit97();
            break;
        case 98:
            question = sameDistanceDifferentTime98();
            break;
        case 99:
            question = proportionalWages99();
            break;
        case 100:
            question = ageEquationsWithRatio100();
            break;
        case 101:
            question = missingConstantsInFunctions101();
            break;
        case 102:
            question = transfromingTrigValues102();
            break;
        case 103:
            question = cuttingWire103();
            break;
        case 104:
            question = evenOddMultiples104();
            break;
        case 105:
            question = countersInABag105();
            break;
        case 106:
            question = wordedProbabilityScale106();
            break;
        case 107:
            question = squaresOnAnAxes107();
            break;
        case 108:
            question = interiorExteriorAngles108();
            break;
        case 109:
            question = percentageWageBonus109();
            break;
        case 110:
            question = estimatingWithSpeedOfPlane110();
            break;
    }
    return question;
}
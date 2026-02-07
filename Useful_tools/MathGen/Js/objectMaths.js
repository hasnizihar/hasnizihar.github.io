function RightTriangle(a, b, angle) {
    this.a = a;
    if (!angle) {
        this.b = b;
    } else {
        this.b = a * Math.tan(toRadians(angle));
    }
    this.cSquared = this.a * this.a + this.b * this.b;
    this.cSurd = simplifySurd(this.cSquared);
    this.cDec = Math.sqrt(this.cSquared);
    this.area = this.a * this.b / 2;
    this.perimeter = this.a + this.b + this.cDec;
    var c = this.cDec;
    this.A = Math.acos((c * c + this.b * this.b - this.a * this.a) / (2 * c * this.b)) * 180 / Math.PI;
    this.B = Math.acos((this.a * this.a + c * c - this.b * this.b) / (2 * this.a * c)) * 180 / Math.PI;
    this.C = Math.acos((this.a * this.a + this.b * this.b - c * c) / (2 * this.a * this.b)) * 180 / Math.PI;
    this.display = function (a, b, c, A, B, C) {
        var size = 200;
        var scale = size * 0.75 / (1.2 * Math.max(this.a, this.b));
        var gap = 12;
        var x1 = size * 0.05;
        var y1 = size * 0.8;
        var x2 = size * 0.05 + this.a * scale;
        var y2 = size * 0.8 - this.b * scale;
        var svgData = "<svg width='" + size + "' height='" + size + "'>";
        svgData += "<line x1='" + x1 + "' y1='" + y1 + "' x2='" + x2 + "' y2='" + y1 + "' stroke='black' />";
        svgData += "<line x1='" + x1 + "' y1='" + y1 + "' x2='" + x2 + "' y2='" + y2 + "' stroke='black' />";
        svgData += "<line x1='" + x2 + "' y1='" + y2 + "' x2='" + x2 + "' y2='" + y1 + "' stroke='black' />";
        svgData += "<line x1='" + (x2 - gap) + "' y1='" + y1 + "' x2='" + (x2 - gap) + "' y2='" + (y1 - gap) + "' stroke='black' />";
        svgData += "<line x1='" + (x2 - gap) + "' y1='" + (y1 - gap) + "' x2='" + x2 + "' y2='" + (y1 - gap) + "' stroke='black' />";
        svgData += "<text x='" + (x2 - (x2 - x1) / 2 - gap / 2) + "' y='" + (y1 + 1.8 * gap) + "' font-size='0.7em' fill='#000000'>" + a + "</text>";
        svgData += "<text x='" + (x2 + 0.5 * gap) + "' y='" + (y1 - (y1 - y2) / 2 + gap / 1.2) + "' font-size='0.7em' fill='#000000'>" + b + "</text>";
        svgData += "<text x='" + ((x2 - x1) / 2 - gap) + "' y='" + (y1 - (y1 - y2) / 2 - gap) + "' font-size='0.7em' fill='#000000'>" + c + "</text>";
        if (A) {
            svgData += "<text x='" + (x1 + gap / 1.2) + "' y='" + (y1 - gap / 4) + "' font-size='0.6em' fill='#000000'>" + A + "</text>";
        }
        svgData += "</svg>";
        return svgData;
    };
}
function Cuboid(l, w, h) {
    this.l = l;
    this.w = w;
    this.h = h;
    this.volume = l * w * h;
    this.a1 = l * w;
    this.a2 = l * h;
    this.a3 = w * h;
    this.sa = 2 * (this.a1 + this.a2 + this.a3);
}
function BarModel(top, bottom, topValues, bottomValues) {
    // top/bottom arrays must sum to 1. e.g [0.2, 0.2, 0.5, 0.1]
    this.top = top;
    this.bottom = bottom;
    this.topValues = topValues;
    this.bottomValues = bottomValues;

    this.display = function () {
        // Internal coordinate system
        var baseWidth = 1000;
        var barWidth = baseWidth * 0.85; // Using 85% of width for the bar
        var barHeight = 80; // Fixed internal height for each bar row

        var startX = (baseWidth - barWidth) / 2;
        var startY = 20; // Top padding

        // Calculate total height: 2 rows of bars + padding
        var totalHeight = (barHeight * 2) + 40;

        var svgData = "<div style='width: 100%; display: flex; justify-content: center;'>";
        svgData += "<svg viewBox='0 0 " + baseWidth + " " + totalHeight + "' preserveAspectRatio='xMidYMid meet' width='100%' style='max-height: 250px; height: auto;' xmlns='http://www.w3.org/2000/svg'>";

        // Draw the main outer rectangle (the container for both bars)
        svgData += "<rect fill='#ffffff' stroke='black' stroke-width='2' width='" + barWidth + "' height='" + (barHeight * 2) + "' x='" + startX + "' y='" + startY + "'/>";

        // Draw the horizontal middle divider
        svgData += "<line x1='" + startX + "' y1='" + (startY + barHeight) + "' x2='" + (startX + barWidth) + "' y2='" + (startY + barHeight) + "' stroke='black' stroke-width='2' />";

        var fontSize = barHeight * 0.5;

        // Process TOP bar segments
        var currentX = startX;
        for (var i = 0; i < this.top.length; i++) {
            var segmentWidth = barWidth * this.top[i];
            currentX += segmentWidth;

            // Vertical divider (skip the last one as the rect border covers it)
            if (i < this.top.length - 1) {
                svgData += "<line x1='" + currentX + "' y1='" + startY + "' x2='" + currentX + "' y2='" + (startY + barHeight) + "' stroke='black' stroke-width='2' />";
            }

            // Text placement
            var centerX = currentX - (segmentWidth / 2);
            var textY = startY + (barHeight / 2) + (fontSize / 3); // Center text vertically
            svgData += "<text x='" + centerX + "' y='" + textY + "' font-size='" + fontSize + "' text-anchor='middle' font-family='Arial, sans-serif' fill='#000000'>" + this.topValues[i] + "</text>";
        }

        // Process BOTTOM bar segments
        currentX = startX;
        for (var j = 0; j < this.bottom.length; j++) {
            var segmentWidth = barWidth * this.bottom[j];
            currentX += segmentWidth;

            // Vertical divider
            if (j < this.bottom.length - 1) {
                svgData += "<line x1='" + currentX + "' y1='" + (startY + barHeight) + "' x2='" + currentX + "' y2='" + (startY + 2 * barHeight) + "' stroke='black' stroke-width='2' />";
            }

            // Text placement
            var centerX = currentX - (segmentWidth / 2);
            var textY = startY + (barHeight * 1.5) + (fontSize / 3);
            svgData += "<text x='" + centerX + "' y='" + textY + "' font-size='" + fontSize + "' text-anchor='middle' font-family='Arial, sans-serif' fill='#000000'>" + this.bottomValues[j] + "</text>";
        }

        svgData += "</svg></div>";
        return svgData;
    };
}
function Pyramid(layers, values) {
    this.layers = layers;
    this.values = values;

    this.display = function () {
        // We use a fixed internal coordinate system (1000 units)
        // This is not pixels, but "units" that scale automatically.
        var baseWidth = 1000;
        var brickWidth = Math.round(0.95 * baseWidth / this.layers);
        var brickHeight = Math.round(brickWidth / 1.6);
        var totalBricks = 0.5 * this.layers * (this.layers + 1);

        var currentRow = 1;
        var rowBrick = 0;

        // Calculate the internal height required based on layers
        var totalHeight = Math.floor(40 + this.layers * brickHeight);

        // Define the viewBox using our internal baseWidth and calculated height
        var svgData = "<div style='width: 75%; margin: 0 auto;'>";
        svgData += "<svg viewBox='0 0 " + baseWidth + " " + totalHeight + "' preserveAspectRatio='xMidYMid meet' width='100%' xmlns='http://www.w3.org/2000/svg'>";

        for (var i = 1; i <= totalBricks; i++) {
            var x = Math.floor((baseWidth / 2) - (currentRow / 2 * brickWidth) + (rowBrick * brickWidth));
            var y = Math.floor(20 + (currentRow - 1) * brickHeight);

            var text = this.values[i - 1].toString();
            var textLength = (this.values[i - 1] !== "&#119909;") ? text.length : 1;

            // Drawing the brick
            svgData += "<rect fill='#ffffff' stroke='black' stroke-width='2' width='" + brickWidth + "' height='" + brickHeight + "' x='" + x + "' y='" + y + "'/>";

            // Drawing the text
            svgData += "<text x='" + (x + brickWidth / 2) + "' y='" + (y + brickHeight * 0.7) + "' font-size='" + (brickHeight * 0.6) + "' text-anchor='middle' fill='#000000' font-family='Arial, sans-serif'>" + text + "</text>";

            rowBrick++;
            if (i === 0.5 * currentRow * (currentRow + 1)) {
                currentRow++;
                rowBrick = 0;
            }
        }
        svgData += "</svg></div>";
        return svgData;
    };
}
function Arithmagon(vertexValues, edgeValues) {
    // vertexValues: [top, bottomLeft, bottomRight]
    // edgeValues: [leftEdge, rightEdge, bottomEdge]
    this.vertices = vertexValues;
    this.edges = edgeValues;

    this.display = function () {
        var baseSize = 1000;
        var centerX = baseSize / 2;
        var centerY = baseSize / 2 + 50;
        var radius = 350; // Radius of the triangle layout
        var circleR = 70; // Radius of the vertex circles
        var boxS = 120;   // Size of the edge squares

        // Coordinates for the 3 vertices (Equilateral Triangle)
        var v = [
            { x: centerX, y: centerY - radius },                   // Top
            { x: centerX - radius * 0.866, y: centerY + radius * 0.5 }, // Bottom Left
            { x: centerX + radius * 0.866, y: centerY + radius * 0.5 }  // Bottom Right
        ];

        // Coordinates for the 3 edge boxes (Midpoints)
        var e = [
            { x: (v[0].x + v[1].x) / 2, y: (v[0].y + v[1].y) / 2 }, // Left Edge
            { x: (v[0].x + v[2].x) / 2, y: (v[0].y + v[2].y) / 2 }, // Right Edge
            { x: (v[1].x + v[2].x) / 2, y: (v[1].y + v[2].y) / 2 }  // Bottom Edge
        ];

        var svgData = "<div style='width: 100%; display: flex; justify-content: center;'>";
        svgData += "<svg viewBox='0 0 " + baseSize + " " + baseSize + "' preserveAspectRatio='xMidYMid meet' width='80%' style='max-height: 500px; height: auto;' xmlns='http://www.w3.org/2000/svg'>";

        // 1. Draw connecting lines
        svgData += "<line x1='" + v[0].x + "' y1='" + v[0].y + "' x2='" + v[1].x + "' y2='" + v[1].y + "' stroke='black' stroke-width='3'/>";
        svgData += "<line x1='" + v[1].x + "' y1='" + v[1].y + "' x2='" + v[2].x + "' y2='" + v[2].y + "' stroke='black' stroke-width='3'/>";
        svgData += "<line x1='" + v[2].x + "' y1='" + v[2].y + "' x2='" + v[0].x + "' y2='" + v[0].y + "' stroke='black' stroke-width='3'/>";

        // 2. Draw Edge Boxes (Rectangles)
        for (var i = 0; i < 3; i++) {
            svgData += "<rect x='" + (e[i].x - boxS / 2) + "' y='" + (e[i].y - boxS / 2) + "' width='" + boxS + "' height='" + boxS + "' fill='white' stroke='black' stroke-width='3'/>";
            svgData += "<text x='" + e[i].x + "' y='" + (e[i].y + 20) + "' font-size='60' text-anchor='middle' font-family='Arial, sans-serif'>" + this.edges[i] + "</text>";
        }

        // 3. Draw Vertex Circles
        for (var j = 0; j < 3; j++) {
            svgData += "<circle cx='" + v[j].x + "' cy='" + v[j].y + "' r='" + circleR + "' fill='white' stroke='black' stroke-width='3'/>";
            svgData += "<text x='" + v[j].x + "' y='" + (v[j].y + 20) + "' font-size='60' text-anchor='middle' font-family='Arial, sans-serif'>" + this.vertices[j] + "</text>";
        }

        svgData += "</svg></div>";
        return svgData;
    };
}
function GridArray(x, y, counters, size) {
    // counters true -> circles, counters false -> squares 
    this.x = x;
    this.y = y;
    this.counters = counters;
    this.size = size;
    this.display = function (shadedProportion) {
        var svgData = "<div>";
        var squareSize = Math.round(0.9 * this.size / Math.max(this.x, this.y));
        svgData += "<svg width='" + Math.round(squareSize * (this.x + 0.5)) + "' height='" + Math.round(squareSize * (this.y + 0.5)) + "'>";
        var gap = Math.floor(squareSize * 0.45);
        var count = 0;
        var total = this.x * this.y;
        for (var i = 0; i < this.x; i++) {
            for (var j = 0; j < this.y; j++) {
                var xPos = gap + Math.round(i * squareSize);
                var yPos = gap + Math.round(j * squareSize);
                if ((count / total) < shadedProportion) {
                    var fill = "#cccccc";
                } else {
                    fill = "#ffffff";
                }
                count++;
                if (this.counters) {
                    svgData += "<circle fill='" + fill + "' stroke='black' r='" + Math.round(squareSize / 2.2) + "' cx='" + (xPos + squareSize / 2) + "' cy='" + (yPos + squareSize / 2) + "'/>";
                } else {
                    svgData += "<rect fill='" + fill + "' stroke='black' width='" + squareSize + "' height='" + squareSize + "' x='" + xPos + "' y='" + yPos + "'/>";
                }
            }
        }
        svgData += "</svg></div>";
        return svgData;
    };
}
function Inequality(a, b, aSign, bSign, mult, constant, blank) {
    this.a = a;
    this.b = b;
    
    // Sign mapping logic
    var signs = {
        1: { symbol: "&lt;", fill: "#ffffff", wordLeft: "greater than", wordRight: "less than" },
        2: { symbol: "&le;", fill: "#000000", wordLeft: "greater than or equal to", wordRight: "less than or equal to" },
        3: { symbol: "&gt;", fill: "#ffffff", wordLeft: "less than", wordRight: "greater than" },
        4: { symbol: "&ge;", fill: "#000000", wordLeft: "less than or equal to", wordRight: "greater than or equal to" }
    };

    this.aSign = signs[aSign].symbol;
    this.aFill = signs[aSign].fill;
    this.bSign = signs[bSign].symbol;
    this.bFill = signs[bSign].fill;
    
    var aWord = wordedNumber(a);
    var bWord = wordedNumber(b)
    this.worded = `\\(x\\) is ${signs[aSign].wordLeft} ${aWord} and ${signs[bSign].wordRight} ${bWord}`;
    
    
    this.elements = [];
    if (this.aSign === "&le;") {
        this.elements.push(this.a);
    }
    for (var i = (1 + this.a); i < this.b; i++) {
        this.elements.push(i);
    }
    if (this.bSign === "&le;") {
        this.elements.push(i);
    }

    this.set = "\\(\\{" + this.elements + "\\}\\)";
    this.simple = "\\(" + this.a + this.aSign + "x" + this.bSign + this.b + "\\)";
    this.algebraic = "\\(" + ((this.a * mult) + constant) + this.aSign + fixTerm(mult, "x", true) + fixTerm(constant, "", false) + this.bSign + ((this.b * mult) + constant) + "\\)";

    // Internal coordinate system
    var baseWidth = 200;
    var baseHeight = 70;
    var startX = 30; // Slightly more margin for labels
    var endX = 170;
    
    this.diagram = "<div style='width: 100%; display: flex; justify-content: center;'>";
    this.diagram += "<svg viewBox='0 0 " + baseWidth + " " + baseHeight + "' preserveAspectRatio='xMidYMid meet' width='100%' style='max-height: 120px; height: auto;' xmlns='http://www.w3.org/2000/svg'>";

    // 1. Draw the top inequality line (connecting the two circles)
    if (!blank) {
        this.diagram += "<line x1='" + startX + "' y1='15' x2='" + endX + "' y2='15' stroke='black' stroke-width='1' />";
        this.diagram += "<circle cx='" + startX + "' cy='15' r='6' stroke='black' stroke-width='1' fill='" + this.aFill + "' />";
        this.diagram += "<circle cx='" + endX + "' cy='15' r='6' stroke='black' stroke-width='1' fill='" + this.bFill + "' />";
    }

    // 2. Main Number Line with arrows
    this.diagram += "<line x1='0' y1='35' x2='" + baseWidth + "' y2='35' stroke='black' stroke-width='1' />";
    this.diagram += "<path d='M 5 30 L 0 35 L 5 40 M 195 30 L 200 35 L 195 40' fill='none' stroke='black' stroke-width='1' />";

    // 3. Draw Ticks
    var range = this.b - this.a;
    var step = (endX - startX) / range;
    
    for (var i = 0; i <= range; i++) {
        var xPos = startX + (step * i);
        this.diagram += "<line x1='" + xPos + "' y1='30' x2='" + xPos + "' y2='40' stroke='black' stroke-width='1' />";
        this.diagram += "<text x='" + xPos + "' y='60' font-family='Arial' font-size='12' text-anchor='middle' fill='#000000'>" + (this.a + i) + "</text>";
    }

    // The 'x' variable label
    this.diagram += "<text x='195' y='60' font-family='Arial' font-size='14' font-style='italic' text-anchor='middle' fill='#000000'>x</text>";

    this.diagram += "</svg></div>";
}
function SingleInequality(criticalValue, inequality, multiplier, constant, blank) {
    var n = criticalValue;
    switch (inequality) {
        case 0:
            this.sign = "&lt;";
            this.fill = "#ffffff";
            this.worded = "\\(x\\) is less than " + wordedNumber(criticalValue);
            this.set = "\\(\\{" + (n - 1) + ", " + (n - 2) + "," + (n - 3) + "," + (n - 4) + ", ...\\}\\)";
            break;
        case 1:
            this.sign = "&le;";
            this.fill = "#000000";
            this.worded = "\\(x\\) is less than or equal to " + wordedNumber(criticalValue);
            this.set = "\\(\\{" + (n) + ", " + (n - 1) + "," + (n - 2) + "," + (n - 3) + ", ...\\}\\)";
            break;
        case 2:
            this.sign = "&gt;";
            this.fill = "#ffffff";
            this.worded = "\\(x\\) is greater than " + wordedNumber(criticalValue);
            this.set = "\\(\\{" + (n + 1) + ", " + (n + 2) + "," + (n + 3) + "," + (n + 4) + ", ...\\}\\)";
            break;
        case 3:
            this.sign = "&ge;";
            this.fill = "#000000";
            this.worded = "\\(x\\) is greater than or equal to " + wordedNumber(criticalValue);
            this.set = "\\(\\{" + n + ", " + (n + 1) + "," + (n + 2) + "," + (n + 3) + ", ...\\}\\)";
            break;
    }
    this.simple = "\\(x" + this.sign + criticalValue + "\\)";
    this.algebraic = "\\(" + fixTerm(multiplier, "x", true) + fixTerm(constant, "", false) + this.sign + ((criticalValue * multiplier) + constant) + "\\)";

    // Internal coordinate system (200 units wide by 70 units high)
    var baseWidth = 200;
    var baseHeight = 70;
    var startX = 25;
    var endX = 175;
    var dashes = 6;
    var step = (endX - startX) / dashes;
    var mid = startX + (step * dashes / 2);

    // Responsive SVG wrapper
    this.diagram = "<div style='width: 100%; display: flex; justify-content: center;'>";
    this.diagram += "<svg viewBox='0 0 " + baseWidth + " " + baseHeight + "' preserveAspectRatio='xMidYMid meet' width='100%' style='max-height: 120px; height: auto;' xmlns='http://www.w3.org/2000/svg'>";

    if (!blank) {
        // Arrow and Circle logic
        if (inequality === 0 || inequality === 1) {
            // Pointing Left
            this.diagram += "<line x1='" + mid + "' y1='15' x2='" + (startX + step / 2) + "' y2='15' stroke='black' stroke-width='1' />";
            this.diagram += "<path d='M " + (startX + step / 2 + 5) + " 10 L " + (startX + step / 2) + " 15 L " + (startX + step / 2 + 5) + " 20' fill='none' stroke='black' stroke-width='1' />";
        } else {
            // Pointing Right
            this.diagram += "<line x1='" + mid + "' y1='15' x2='" + (endX - step / 2) + "' y2='15' stroke='black' stroke-width='1' />";
            this.diagram += "<path d='M " + (endX - step / 2 - 5) + " 10 L " + (endX - step / 2) + " 15 L " + (endX - step / 2 - 5) + " 20' fill='none' stroke='black' stroke-width='1' />";
        }
        this.diagram += "<circle cx='" + mid + "' cy='15' r='6' stroke='black' stroke-width='1' fill='" + this.fill + "' />";
    }

    // Main Number Line
    this.diagram += "<line x1='0' y1='35' x2='" + baseWidth + "' y2='35' stroke='black' stroke-width='1' />";

    // End caps (Arrows on the main line)
    this.diagram += "<path d='M 5 30 L 0 35 L 5 40 M 195 30 L 200 35 L 195 40' fill='none' stroke='black' stroke-width='1' />";

    // Ticks and Labels
    for (var i = 0; i <= dashes; i++) {
        var xPos = startX + (step * i);
        this.diagram += "<line x1='" + xPos + "' y1='30' x2='" + xPos + "' y2='40' stroke='black' stroke-width='1' />";

        var val = (criticalValue + i - dashes / 2);
        this.diagram += "<text x='" + xPos + "' y='60' font-family='Arial' font-size='12' text-anchor='middle' fill='#000000'>" + val + "</text>";
    }
    // The 'x' variable label
    this.diagram += "<text x='195' y='60' font-family='Arial' font-size='14' font-style='italic' text-anchor='middle' fill='#000000'>x</text>";
    this.diagram += "</svg></div>";
}
function PieChart(rows, totalFactors) {
    var factors = [2, 3, 2, 3, 2, 5];
    var totalFactors = totalFactors;
    this.frequencies = [];
    this.angles = [];
    this.rows = rows;
    var colour = ["Red", "Green", "Blue", "Yellow", "Purple"];
    var country = ["England", "France", "Ireland", "Scotland", "Wales"];
    var transport = ["Car", "Bus", "Walk", "Cycle", "Train"];
    var drink = ["Tea", "Coffee", "Juice", "Milk", "Water"];
    var year = ["Y7", "Y8", "Y9", "Y10", "Y11"];
    var genre = ["Action", "Comedy", "Drama", "Horror", "Sci-Fi"];
    switch (getRandom(0, 5)) {
        case 0:
            this.category = colour;
            this.header = "Colour";
            break;
        case 1:
            this.category = country;
            this.header = "Country";
            break;
        case 2:
            this.category = transport;
            this.header = "Transport";
            break;
        case 3:
            this.category = drink;
            this.header = "Drink";
            break;
        case 4:
            this.category = year;
            this.header = "Year";
            break;
        case 5:
            this.category = genre;
            this.header = "Genre";
            break;
    }
    this.total = 1;
    for (var i = 0; i < totalFactors; i++) {
        var x = getRandom(1, factors.length - 1);
        this.total *= factors[x];
        factors.splice(x, 1);
    }
    var tempTotal = this.total;
    for (i = 0; i < this.rows - 1; i++) {
        x = getRandom(tempTotal / 4, tempTotal / 2);
        this.frequencies[i] = x;
        this.angles[i] = roundError(this.frequencies[i] / this.total * 360);
        tempTotal -= x;
    }
    this.frequencies[i] = tempTotal;
    this.angles[i] = roundError(this.frequencies[i] / this.total * 360);
    this.display = function (blank) {
        var svgData = "<div>";
        var size = 300;
        var radius = Math.floor(size / 2.1);
        var centre = size / 2;
        svgData += "<svg width='" + size + "' height='" + size + "'>";
        svgData += "<circle fill='#ffffff' stroke='black' r='" + radius + "' cx='" + centre + "' cy='" + centre + "'/>";
        if (!blank) {
            var totalAngle = -90;
            var textAngle = -90;
            for (var i = 0; i < this.rows; i++) {
                textAngle = totalAngle;
                var opp = radius * Math.sin(toRadians(totalAngle));
                var adj = radius * Math.cos(toRadians(totalAngle));
                totalAngle += this.angles[i];
                textAngle += this.angles[i] / 2;
                var testOpp = 0.6 * radius * Math.sin(toRadians(textAngle));
                var textAdj = 0.6 * radius * Math.cos(toRadians(textAngle));
                var text = this.category[i].toString().substring(0, 3);
                svgData += "<line x1='" + centre + "' y1='" + centre + "' x2='" + (centre + adj) + "' y2='" + (centre + opp) + "' stroke='black' />";
                svgData += "<text x='" + (centre + textAdj - radius / 15) + "' y='" + (centre + testOpp) + "' font-size='" + radius / 12 + "' fill='#000000'>" + text + "</text>";
            }
        } else {
            svgData += "<circle fill='#000000' stroke='black' r='" + 1 + "' cx='" + centre + "' cy='" + centre + "'/>";
        }
        svgData += "</svg></div>";
        return svgData;
    };
}
function Angle(initial, angle, size) {
    this.initial = initial;
    this.angle = angle;
    if (size) {
        this.size = size;
    }
    if (angle < 90) {
        this.type = "acute";
    } else if (angle % 360 === 90) {
        this.type = "right angle";
    } else if (angle % 360 < 180) {
        this.type = "obtuse";
    } else if (angle % 360 === 180) {
        this.type = "straight line";
    } else if (angle % 360 < 360) {
        this.type = "reflex";
    } else if (angle % 360 === 360) {
        this.type = "whole turn";
    }
    this.display = function () {
        var svgData = "<div>";
        if (!this.size) {
            var size = 300;
        } else {
            size = this.size;
        }
        var centre = size / 2;
        var length = size / 2.2;
        var leg1x = length * Math.sin(toRadians(this.initial));
        var leg1y = length * Math.cos(toRadians(this.initial));
        var leg2x = length * Math.sin(toRadians(this.initial + this.angle));
        var leg2y = length * Math.cos(toRadians(this.initial + this.angle));
        svgData += "<svg width='" + size + "' height='" + size + "'>";
        svgData += "<line x1='" + centre + "' y1='" + centre + "' x2='" + (centre + leg1x) + "' y2='" + (centre + leg1y) + "' stroke='black' />";
        svgData += "<line x1='" + centre + "' y1='" + centre + "' x2='" + (centre + leg2x) + "' y2='" + (centre + leg2y) + "' stroke='black' />";
        var sweep = 0;
        var shift = (-centre / 3);
        if (this.angle > 180) {
            sweep = 1;
            shift = (centre / 3.5);
        }
        svgData += "<path d=' M " + (centre + leg1x / 3) + " " + (centre + leg1y / 3) + " A " + shift + " " + shift + " 0 " + sweep + " 0 " + (centre + leg2x / 3) + " " + (centre + leg2y / 3) + "' fill='none' stroke='black' />";
        svgData += "</svg></div>";
        return svgData;
    };
}
function MovingObject() {
    var objects = ["snail", "horse", "car", "sprinter", "aeroplane"];
    var baseSpeeds = [2 * getRandom(5, 20), getRandom(8, 18), 5 * getRandom(8, 12), getRandom(8, 20) / 2, 50 * getRandom(8, 20)];
    var distanceUnits = ["centimetres", "metres", "kilometres", "metres", "kilometres"];
    var distanceSuffix = ["cm", "m", "km", "m", "km"];
    var timeUnits = ["hour", "second", "hour", "second", "hour"];
    var timeSuffix = ["h", "s", "h", "s", "h"];
    var x = getRandom(0, objects.length - 1);
    this.name = objects[x];
    this.baseSpeed = baseSpeeds[x];
    this.distanceUnit = distanceUnits[x];
    this.distanceSuffix = distanceSuffix[x];
    this.timeUnit = timeUnits[x];
    this.timeSuffix = timeSuffix[x];
}
function Circle(radius, size, unit, showingRadius, showingDiameter) {
    this.radius = radius;
    this.diameter = 2 * radius;
    this.area = radius * radius
    this.size = size;
    this.unit = unit;
    this.showingRadius = showingRadius;
    this.showingDiameter = showingDiameter;
    this.areaPi = this.radius * this.radius + "&pi;";
    this.areaDec = Math.round(10 * this.radius * this.radius * Math.PI) / 10;
    this.circumferencePi += 2 * this.radius + "&pi;";
    this.circumferenceDec += Math.round(10 * 2 * this.radius * Math.PI) / 10;

    this.display = function () {
        var svgData = "<div>";
        if (!this.size) {
            var size = 140;
        } else {
            size = this.size;
        }
        var max = size;
        var radius = max / 2.4;
        var x2 = radius;
        var y2 = 0;
        svgData += "<svg width='" + max + "' height='" + max + "'>";
        svgData += "<circle cx='" + max / 2 + "' cy='" + max / 2 + "' r='" + radius + "' stroke='black' fill='#ffffff' />";
        svgData += "<circle cx='" + max / 2 + "' cy='" + max / 2 + "' r='" + 1 + "' stroke='black' fill='#000000' />";
        if (this.showingRadius) {
            svgData += "<line x1='" + max / 2 + "' y1='" + max / 2 + "' x2='" + (max / 2 + x2) + "' y2='" + (max / 2 + y2) + "' stroke='black' />";
            svgData += "<text x='" + (max / 2) + "' y='" + (max / 2 + y2 / 2 - 5) + "' font-size='18px' fill='#000000'>" + this.radius + " " + this.unit + "</text>";
        }
        if (this.showingDiameter) {
            svgData += "<line x1='" + (max / 2 - radius) + "' y1='" + max / 2 + "' x2='" + (max / 2 + x2) + "' y2='" + (max / 2 + y2) + "' stroke='black' />";
            svgData += "<text x='" + (max / 3) + "' y='" + (max / 2 + y2 / 2 - 5) + "' font-size='18px' fill='#000000'>" + this.diameter + " " + this.unit + "</text>";
        }
        svgData += "</svg></div>";
        return svgData;
    }
}
function SquareGridShape(x, y, size, points, showingGrid) {
    this.x = x;
    this.y = y;
    this.size = this.size;
    this.points = points;
    this.showingGrid = showingGrid;
    this.size = size;
    this.display = function () {
        var svgData = "<div>";
        var squareSize = Math.round(0.9 * this.size / Math.max(this.x, this.y));
        svgData += "<svg width='" + Math.round(squareSize * (this.x + 0.5)) + "' height='" + Math.round(squareSize * (this.y + 0.5)) + "'>";
        var gap = Math.floor(squareSize * 0.45);
        if (this.showingGrid) {
            for (var i = 0; i < this.x; i++) {
                for (var j = 0; j < this.y; j++) {
                    var xPos = gap + Math.round(i * squareSize);
                    var yPos = gap + Math.round(j * squareSize);
                    svgData += "<rect fill='#ffffff' stroke='#888888' width='" + squareSize + "' height='" + squareSize + "' x='" + xPos + "' y='" + yPos + "'/>";
                }
            }
        }
        for (i = 0; i < points.length; i++) {
            svgData += "<circle fill='#000000' stroke='black' r='" + points[i].size + "' cx='" + (gap + points[i].x * squareSize) + "' cy='" + (gap + points[i].y * squareSize) + "'/>";
            if (points[i].joined) {
                var init = i - 1;
                if (init < 0) {
                    init += points.length;
                }
                svgData += "<line stroke-width='2' x1='" + (gap + points[init].x * squareSize) + "' y1='" + (gap + points[init].y * squareSize) + "' x2='" + (gap + points[i].x * squareSize) + "' y2='" + (gap + points[i].y * squareSize) + "' stroke='black' />";
            }
        }
        svgData += "</svg></div>";
        return svgData;
    };
}
function TenFrame(height, value) {
    this.height = height;
    this.value = value;
    this.totalItems = Math.max(1, Math.ceil(this.value / 10));
    this.x = this.height * 5;
    this.y = this.height * 2.5;
    this.split = 5;


    this.display = function () {
        var svgData = "<div>";
        svgData += "<svg width='" + this.x * 2 + "' height='" + this.height * 3 * this.totalItems + "'>";
        var radius = this.height / 2;
        var gap = radius * 0.2;
        var rows = 5;
        var xShift = 0;
        var yShift = 0;
        var total = this.value;
        for (var j = 0; j < this.totalItems; j++) {
            for (var i = 0; i <= rows; i++) {
                var x1 = this.x - radius * rows + radius * (2 * i);
                var x2 = this.x - radius * rows + radius * (2 * i);
                var y1 = this.y - radius * 2 + j * (radius + gap) * 4 - radius * this.totalItems;
                var y2 = this.y + radius * 2 + j * (radius + gap) * 4 - radius * this.totalItems;
                svgData += "<line stroke-width='2' x1='" + x1 + "' y1='" + y1 + "' x2='" + x2 + "' y2='" + y2 + "' stroke='black' />";
            }
            for (i = 0; i <= 2; i++) {
                var x1 = this.x - radius * rows;
                var y1 = this.y - radius * 2 + radius * 2 * i + j * (radius + gap) * 4 - radius * this.totalItems;
                var x2 = this.x - radius * rows + radius * (2 * rows);
                var y2 = this.y - radius * 2 + radius * 2 * i + j * (radius + gap) * 4 - radius * this.totalItems;
                svgData += "<line stroke-width='2' x1='" + x1 + "' y1='" + y1 + "' x2='" + x2 + "' y2='" + y2 + "' stroke='black' />";
            }
            yShift = 0;
            xShift = 0;
            if (total > 0) {
                for (i = 0; i < 10; i++) {
                    var cx = this.x - radius * 4 + xShift * radius * 2;
                    var cy = this.y - radius + yShift * radius * 2 + j * (radius + gap) * 4 - radius * this.totalItems;
                    svgData += "<circle fill='#ffaaaa' stroke='black' r='" + radius * 0.8 + "' cx='" + cx + "' cy='" + cy + "'/>";
                    xShift++;
                    if ((i + 1) % this.split === 0 && i > 0) {
                        yShift++;
                        xShift = 0;
                    }
                    total--;
                    if (total === 0) {
                        break;
                    }
                }
            }
        }

        svgData += "</svg></div>";
        return svgData;
    };
}
function NumberSet(min, max, condition, factor) {
    this.elements = [];
    this.description = "";
    for (var i = min; i <= max; i++) {
        switch (condition) {
            case "odd":
                if (i % 2 !== 0) {
                    this.elements.push(i);
                }
                this.description = "odd numbers";
                break;
            case "even":
                if (i % 2 === 0) {
                    this.elements.push(i);
                }
                this.description = "even numbers";
                break;
            case "prime":
                if (isPrime(i)) {
                    this.elements.push(i);
                }
                this.description = "prime numbers";
                break;
            case "square":
                if (isSquare(i)) {
                    this.elements.push(i);
                }
                this.description = "square numbers";
                break;
            case "factor":
                if (factor % i === 0 && i > 0) {
                    this.elements.push(i);
                }
                this.description = "factors of " + factor;
                break;
            case "multiple":
                if (i % factor === 0) {
                    this.elements.push(i);
                }
                this.description = "multiples of " + factor;
                break;
            default: {
                this.elements.push(i);
                this.description = "integers";
                break;
            }
        }
    }
    this.setString = "{" + this.elements.join(', ') + "}";
}
function Investment(principal, rate, years, simple) {
    this.p = principal;
    this.r = rate;
    this.y = years;
    this.m = roundError(1 + (this.r / 100));
    this.calc = this.p + "\\times" + this.m + "^{" + this.y + "}";
    this.final = (this.p * Math.pow(this.m, this.y)).toFixed(2);
    this.interest = (this.final - this.p).toFixed(2);
}
function RatioTable(r1, r2, r3, r4, r5, r6) {
    this.display = function () {
        var tableData = "<table class='ratioTable'>";
        if (r1) {
            tableData += "<tr>";
            for (var i = 0; i < r1.length; i++) {
                tableData += "<td>" + r1[i] + "</td>";
            }
            tableData += "</tr>";
        }
        if (r2) {
            tableData += "<tr>";
            for (var i = 0; i < r2.length; i++) {
                tableData += "<td>" + r2[i] + "</td>";
            }
            tableData += "</tr>";
        }
        if (r3) {
            tableData += "<tr>";
            for (var i = 0; i < r3.length; i++) {
                tableData += "<td>" + r3[i] + "</td>";
            }
            tableData += "</tr>";
        }
        if (r4) {
            tableData += "<tr>";
            for (var i = 0; i < r4.length; i++) {
                tableData += "<td>" + r4[i] + "</td>";
            }
            tableData += "</tr>";
        }
        if (r5) {
            tableData += "<tr>";
            for (var i = 0; i < r5.length; i++) {
                tableData += "<td>" + r5[i] + "</td>";
            }
            tableData += "</tr>";
        }
        if (r6) {
            tableData += "<tr>";
            for (var i = 0; i < r6.length; i++) {
                tableData += "<td>" + r6[i] + "</td>";
            }
            tableData += "</tr>";
        }
        tableData += "</table";
        return tableData;
    }
}
class NumberLine {
    constructor(start, end, steps) {
        if (start >= end || steps <= 0 || !Number.isInteger(steps)) {
            throw new Error("Invalid parameters: start must be less than end, and steps must be a positive integer.");
        }
        this.start = start;
        this.end = end;
        this.steps = steps;
        this.range = end - start;

        // Configuration for the *internal* coordinate system (viewBox)
        this.VIEWBOX_WIDTH = 400;
        this.VIEWBOX_HEIGHT = 100;
        this.LINE_Y = 50; 
        this.PADDING_X = 15;
        this.TICK_HEIGHT_MAJOR = 10;
        this.TICK_HEIGHT_MINOR = 5;
    }
    display() {
        // Use the VIEWBOX_WIDTH for internal scaling calculations
        const lineLength = this.VIEWBOX_WIDTH - 2 * this.PADDING_X; 
        const stepSize = this.range / this.steps;
        const tickIntervalPx = lineLength / this.steps;

        let svgContent = '';
        svgContent += `<line x1="${this.PADDING_X}" y1="${this.LINE_Y}" x2="${this.VIEWBOX_WIDTH - this.PADDING_X}" y2="${this.LINE_Y}" stroke="black" stroke-width="1"/>`;

        for (let i = 0; i <= this.steps; i++) {
            const x = this.PADDING_X + i * tickIntervalPx;
            const value = (this.start + i * stepSize);
            svgContent += `<line x1="${x}" y1="${this.LINE_Y - this.TICK_HEIGHT_MAJOR / 2}" x2="${x}" y2="${this.LINE_Y + this.TICK_HEIGHT_MAJOR / 2}" stroke="black" stroke-width="1"/>`;
            svgContent += `<text x="${x}" y="${this.LINE_Y + this.TICK_HEIGHT_MAJOR / 2 + 15}" text-anchor="middle" font-size="12" fill="black">${value}</text>`;
        }
        
        const svg = `<svg viewBox="0 0 ${this.VIEWBOX_WIDTH} ${this.VIEWBOX_HEIGHT}" xmlns="http://www.w3.org/2000/svg" role="img" style="display: block; width: 100%; height: auto;">
                    ${svgContent}
                </svg>`;
        return svg;
    }
}
class Polynomial {
    constructor(coeffs) {
        // Index represents power: [constant, x, x^2, x^3, x^4]
        this.coeffs = coeffs;
    }
    display() {
        let data = "";
        let firstTerm = true;
        const labels = ["", "x", "x^2", "x^3", "x^4"];

        for (let i = this.coeffs.length - 1; i >= 0; i--) {
            let val = this.coeffs[i];
            if (val !== 0) {
                data += fixTerm(val, labels[i], firstTerm);
                firstTerm = false;
            }
        }
        return data === "" ? "0" : data;
    }
    evaluateFor(x) {
        var total = 0;
        var currentIndex = 0;
        for (let i = 0; i < this.coeffs.length; i++) {
            total += this.coeffs[i] * Math.pow(x, currentIndex);
            currentIndex++;
        }
        return total;
    }
}
class FunctionMachine {
    constructor({ input = "Input", operations = ["Operation"], output = "Output" }) {
        this.input = input;
        this.operations = operations;
        this.output = output;

        // Fixed total canvas size
        this.canvasWidth = 600;
        this.canvasHeight = 100;
        this.padding = 25;
    }

    getScale(text, maxWidth) {
        const estimatedWidth = text.length * 9; // Slightly tighter estimate
        return estimatedWidth > maxWidth ? maxWidth / estimatedWidth : 1;
    }

    display() {
        const totalSteps = this.operations.length + 2; // Input + Ops + Output
        const availableWidth = this.canvasWidth - (this.padding * 2);

        // Each step gets a slot; we use 60% of the slot for the shape, 40% for the arrow gap
        const slotWidth = availableWidth / totalSteps;
        const shapeSize = slotWidth * 0.7;
        const gap = slotWidth * 0.3;
        const centerY = this.canvasHeight / 2;

        let svgContent = "";

        // Helper to get X position for a specific index
        const getX = (index) => this.padding + (index * slotWidth) + (shapeSize / 2);

        // 1. Draw Input (Index 0)
        const inputX = getX(0);
        const circleRadius = (shapeSize) / 2;
        svgContent += `

<g transform="translate(${inputX}, ${centerY}) scale(${this.getScale(this.input, shapeSize - 10)})">
<text text-anchor="middle" dominant-baseline="middle" class="label">${this.input}</text>
</g>
`;
        // 2. Draw Operations
        this.operations.forEach((opText, i) => {
            const opIndex = i + 1;
            const prevX = getX(opIndex - 1);
            const currX = getX(opIndex);

            // Arrow from previous
            const startX = prevX + (i === 0 ? circleRadius : shapeSize / 2);
            const endX = currX - (shapeSize / 2);
            const midX = (startX + endX) / 2;

            svgContent += `
<line x1="${startX}" y1="${centerY}" x2="${endX}" y2="${centerY}" class="stroke" marker-end="url(#arrowhead)" />
`;

            // Box
            const opScale = this.getScale(opText, shapeSize - 10);
            svgContent += `
<rect x="${currX - (shapeSize / 2)}" y="${centerY - (shapeSize * 0.3)}" width="${shapeSize}" height="${shapeSize * 0.6}" class="stroke" />
<g transform="translate(${currX}, ${centerY}) scale(${opScale})">
  <text text-anchor="middle" dominant-baseline="middle" class="label">${opText}</text>
</g>
`;
        });

        // 3. Draw Output (Last Index)
        const outIndex = totalSteps - 1;
        const prevX = getX(outIndex - 1);
        const currX = getX(outIndex);

        const startX = prevX + (shapeSize / 2);
        const endX = currX - circleRadius;
        const midX = (startX + endX) / 2;

        svgContent += `
<line x1="${startX}" y1="${centerY}" x2="${endX}" y2="${centerY}" class="stroke" marker-end="url(#arrowhead)" />


<g transform="translate(${currX}, ${centerY}) scale(${this.getScale(this.output, shapeSize - 10)})">
<text text-anchor="middle" dominant-baseline="middle" class="label">${this.output}</text>
</g>
`;

        return `
<div><svg viewBox="0 0 ${this.canvasWidth} ${this.canvasHeight}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
<style>
  .stroke { fill: none; stroke: black; stroke-width: 1; vector-effect: non-scaling-stroke; }
  .label { font-family: sans-serif; font-size: 36px; fill: black; user-select: none; }
</style>
<defs>
  <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
    <polygon points="0 0, 8 3, 0 6" fill="black" />
  </marker>
</defs>
${svgContent}
</svg></div>
`.trim();
    }
}
class Time {
    constructor(hours, minutes) {
        this.hours = hours;
        this.minutes = minutes;
    }
    display(format) {
        var timeString, hourText;
        var minuteText = this.minutes < 10 ? `0${this.minutes}` : `${this.minutes}`;
        if (format === 12) {
            var meridiem = this.hours < 12 ? `a.m` : `p.m.`;
            hourText = this.hours % 12;
            timeString = `${hourText}:${minuteText} ${meridiem}`;
        } else {
            hourText = this.hours < 10 ? `0${this.hours}` : `${this.hours}`;
            timeString = `${hourText}:${minuteText}`;
        }
        return timeString;
    }
}
class ColumnMethod {
    constructor(numbers, operator = '+', fontSize = 24) {
        this.numbers = numbers;
        this.operator = operator;
        this.fontSize = fontSize;
        this.rowHeight = fontSize * 1.5; // Space rows based on font size
        this.charWidth = fontSize * 0.6; // Average width of a tabular digit
    }

    display() {
        const len = this.numbers?.length;
        if (!len || len < 2) return '';

        const maxChars = Math.max(...this.numbers.map(n => n.toString().length));
        
        // Dynamic padding based on font size
        const horizontalPadding = this.fontSize * 2;
        const svgWidth = (maxChars * this.charWidth) + horizontalPadding;
        const svgHeight = (len * this.rowHeight) + (this.fontSize * 0.5);

        const anchorX = svgWidth - (this.fontSize * 0.5);
        // Operator stays safe by being offset by the character count * width
        const operatorX = anchorX - (maxChars * this.charWidth) - (this.fontSize * 0.3);

        const rows = this.numbers.slice(0, -1).map((num, i) => {
            const y = (i + 1) * this.rowHeight;
            const isLastOperand = i === len - 2;
            return `
                <text x="${anchorX}" y="${y}">${num}</text>
                ${isLastOperand ? `<text x="${operatorX}" y="${y}">${this.operator}</text>` : ''}
            `;
        }).join('');

        const lineY = ((len - 1) * this.rowHeight) + (this.fontSize * 0.4);
        const resultY = lineY + this.rowHeight * 0.8;

        return `
<div><svg viewBox="0 0 ${svgWidth} ${svgHeight}" xmlns="http://www.w3.org/2000/svg" style="width: 100%; max-width: ${svgWidth}px; height: auto;">
  <g font-family="Arial, sans-serif" font-size="${this.fontSize}" text-anchor="end" style="font-variant-numeric: tabular-nums;">
    ${rows}
    <line x1="${operatorX}" y1="${lineY}" x2="${anchorX}" y2="${lineY}" stroke="#000" stroke-width="1.5" />
    <text x="${anchorX}" y="${resultY}">${this.numbers[len - 1]}</text>
  </g>
</svg></div>`.trim();
    }
}
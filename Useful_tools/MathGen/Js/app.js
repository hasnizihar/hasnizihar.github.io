/**
 * MathGen Topic Configuration and Generators
 * This file contains the registry of 170 math topics and their question generation logic.
 */

// --- Math Utilities ---
const MathUtils = {
    randomInt: (min, max) => Math.floor(Math.random() * (max - min + 1)) + min,
    randomFloat: (min, max, decimals = 2) => parseFloat((Math.random() * (max - min) + min).toFixed(decimals)),
    gcd: (a, b) => {
        a = Math.abs(a); b = Math.abs(b);
        while (b) { a %= b;[a, b] = [b, a]; }
        return a;
    },
    lcm: (a, b) => Math.abs(a * b) / MathUtils.gcd(a, b),
    simplifyFraction: (n, d) => {
        const common = MathUtils.gcd(n, d);
        return [n / common, d / common];
    },
    toOrdinal: (n) => {
        const s = ["th", "st", "nd", "rd"], v = n % 100;
        return n + (s[(v - 20) % 10] || s[v] || s[0]);
    }
};

// --- Topic Registry ---
const callLadder = (ladderFunc, lv, ...args) => {
    window.question = []; // Clear global array
    if (typeof window[ladderFunc] === 'function') {
        try {
            window[ladderFunc](lv / 10, ...args); // lv is 1-10, ladders expect 0.1-1.0
            const q = window.question[0];
            if (q) {
                let text = q.question;
                // Translate if current language is Tamil
                if (window.currentLang === 'ta' && typeof translateQuestionText === 'function') {
                    text = translateQuestionText(text);
                }
                return {
                    text: text,
                    answer: q.answer
                };
            }
        } catch (e) {
            console.error(`Error in ladder ${ladderFunc}:`, e);
        }
    }
    return { text: `[Generator ${ladderFunc} not found]`, answer: "N/A" };
};

const TOPIC_CATEGORIES = [
    {
        name: "🎲 Random & Mixed",
        topics: [
            { id: "random_all", name: "🎯 Random (All Topics)", highlight: true },
        ]
    },
    {
        name: "Arithmetic",
        topics: [
            { id: "arith_mixed_all", name: "🔀 Mixed Arithmetic", highlight: true },
            { id: "arith_dec_add", name: "Adding decimals" },
            { id: "arith_whole_add", name: "Adding whole numbers" },
            { id: "arith_dec_div", name: "Dividing decimals" },
            { id: "arith_whole_div", name: "Dividing whole numbers" },
            { id: "arith_dec_mul", name: "Multiplying decimals" },
            { id: "arith_whole_mul", name: "Multiplying whole numbers" },
            { id: "arith_dec_sub", name: "Subtracting decimals" },
            { id: "arith_whole_sub", name: "Subtracting whole numbers" },
            { id: "arith_dec_mixed", name: "Four operations with decimals" },
            { id: "arith_whole_mixed", name: "Four operations with whole numbers" },
            { id: "arith_halving", name: "Halving" },
            { id: "arith_doubling", name: "Doubling" }
        ]
    },
    {
        name: "Circles",
        topics: [
            { id: "circle_mixed_all", name: "🔀 Mixed Circles", highlight: true },
            { id: "circle_area", name: "Area" },
            { id: "circle_circum", name: "Circumference" },
            { id: "circle_eqn", name: "Stating the equation" }
        ]
    },
    {
        name: "Coordinate Geometry",
        topics: [
            { id: "coord_mixed_all", name: "🔀 Mixed Coordinate Geometry", highlight: true },
            { id: "coord_gradient", name: "Gradient between two points" },
            { id: "coord_midpoint", name: "Midpoint of a line segment" },
            { id: "coord_dist", name: "Distance between two points" }
        ]
    },
    {
        name: "Directed Number",
        topics: [
            { id: "dir_mixed_all", name: "🔀 Mixed Directed Numbers", highlight: true },
            { id: "dir_addsub_neg", name: "Addition and subtraction with negatives" },
            { id: "dir_add_neg", name: "Addition with negatives" },
            { id: "dir_across_zero", name: "Calculating across zero" },
            { id: "dir_div_neg", name: "Division with negatives" },
            { id: "dir_mixed_neg", name: "Mixed operations with negatives" },
            { id: "dir_mul_neg", name: "Multiplication with negatives" },
            { id: "dir_temp_neg", name: "Negative temperatures" },
            { id: "dir_sub_neg", name: "Subtraction with negatives" }
        ]
    },
    {
        name: "Equations",
        topics: [
            { id: "eqn_mixed_all", name: "🔀 Mixed Equations", highlight: true },
            { id: "eqn_if_then", name: "If ... then ..." },
            { id: "eqn_mixed", name: "Mixed" },
            { id: "eqn_ratio", name: "Solving equations involving ratio" },
            { id: "eqn_simultaneous", name: "Solving linear simultaneous" },
            { id: "eqn_quad_monic", name: "Solving monic quadratics by factorising" },
            { id: "eqn_quad_nonmonic", name: "Solving non-monic quadratics by factorising" },
            { id: "eqn_1step", name: "Solving one-step equations" },
            { id: "eqn_2step", name: "Solving two-step equations" },
            { id: "eqn_brackets_both", name: "Solving with brackets both sides" },
            { id: "eqn_brackets_one", name: "Solving with brackets one side" },
            { id: "eqn_unknowns_both", name: "Solving with unknowns on both sides" }
        ]
    },
    {
        name: "Expressions",
        topics: [
            { id: "expr_mixed_all", name: "🔀 Mixed Expressions", highlight: true },
            { id: "expr_div_1var", name: "Algebraic division in one variable" },
            { id: "expr_div_2var", name: "Algebraic division in two variables" },
            { id: "expr_collect_like", name: "Collecting like terms" },
            { id: "expr_comp_square", name: "Completing the square" },
            { id: "expr_expand_binom_monic", name: "Expanding binomials to monic quadratics" },
            { id: "expr_expand_binom_nonmonic", name: "Expanding binomials to non-monic quadratics" },
            { id: "expr_expand_simplify", name: "Expanding brackets and simplifying" },
            { id: "expr_expand_single", name: "Expanding single brackets" },
            { id: "expr_fact_single", name: "Factorising into single brackets" },
            { id: "expr_fact_monic", name: "Factorising monic quadratics" },
            { id: "expr_fact_nonmonic", name: "Factorising non-monic quadratics" },
            { id: "expr_mul_terms", name: "Multiplying terms" },
            { id: "expr_sub", name: "Substitution" }
        ]
    },
    {
        name: "FDP (Fraction, Decimal, Percentage)",
        topics: [
            { id: "fdp_mixed_all", name: "🔀 Mixed FDP", highlight: true },
            { id: "fdp_to_dec", name: "Converting from decimals" },
            { id: "fdp_to_frac", name: "Converting from fractions" },
            { id: "fdp_to_perc", name: "Converting from percentages" },
            { id: "fdp_mixed", name: "Converting mixed" },
            { id: "fdp_recurring", name: "Converting recurring decimals to fractions" },
            { id: "fdp_of_amount", name: "Of one amount to another" },
            { id: "fdp_dec_to_frac", name: "Using decimals to find fractions" }
        ]
    },
    {
        name: "Fractions",
        topics: [
            { id: "frac_mixed_all", name: "🔀 Mixed Fractions", highlight: true },
            { id: "frac_add_mixed", name: "Adding mixed numbers" },
            { id: "frac_add", name: "Addition" },
            { id: "frac_imp_to_mix", name: "Converting improper to mixed" },
            { id: "frac_mix_to_imp", name: "Converting mixed to improper" },
            { id: "frac_div_mixed", name: "Dividing mixed numbers" },
            { id: "frac_div", name: "Division" },
            { id: "frac_4ops", name: "Four operations" },
            { id: "frac_inc_dec", name: "Increase and decrease" },
            { id: "frac_between", name: "Integers between improper fractions" },
            { id: "frac_mul", name: "Multiplication" },
            { id: "frac_mul_mixed", name: "Multiplying mixed numbers" },
            { id: "frac_of_amount", name: "Of amounts" },
            { id: "frac_simplify", name: "Simplifying" },
            { id: "frac_sub_mixed", name: "Subtracting mixed numbers" },
            { id: "frac_sub", name: "Subtraction" }
        ]
    },
    {
        name: "Geometry",
        topics: [
            { id: "geom_polygon_sides", name: "Properties of polygons" }
        ]
    },
    {
        name: "Indices and Powers",
        topics: [
            { id: "indices_mixed_all", name: "🔀 Mixed Indices & Powers", highlight: true },
            { id: "indices_div", name: "Division law" },
            { id: "indices_mixed", name: "Mixed Laws" },
            { id: "indices_mul", name: "Multiplication law" },
            { id: "indices_power", name: "Power law" },
            { id: "powers_roots", name: "Powers and roots" }
        ]
    },
    {
        name: "Money",
        topics: [
            { id: "money_adding", name: "Adding coins" },
            { id: "money_counting", name: "Counting coins" }
        ]
    },
    {
        name: "Order of Operations",
        topics: [
            { id: "ops_mul_div", name: "Multiplication and division" },
            { id: "ops_add_sub", name: "Addition and subtraction" }
        ]
    },
    {
        name: "Percentages",
        topics: [
            { id: "perc_mixed_all", name: "🔀 Mixed Percentages", highlight: true },
            { id: "perc_change", name: "Change" },
            { id: "perc_inc_dec", name: "Increase and decrease" },
            { id: "perc_multipliers", name: "Multipliers" },
            { id: "perc_amount", name: "Of amounts" },
            { id: "perc_repeated", name: "Repeated change" },
            { id: "perc_reverse", name: "Reverse" }
        ]
    },
    {
        name: "Probability",
        topics: [
            { id: "prob_basic", name: "Basic probability" },
            { id: "prob_expected", name: "Expected frequency" }
        ]
    },
    {
        name: "Prime Factors and Surds",
        topics: [
            { id: "prime_mixed_all", name: "🔀 Mixed Prime Factors & Surds", highlight: true },
            { id: "surds_addsub", name: "Adding and subtracting surds" },
            { id: "prime_prod_calc", name: "Calculating the product of primes" },
            { id: "prime_cons_prod", name: "Consecutive integer product" },
            { id: "prime_decomp", name: "Expressing as a product" },
            { id: "prime_hcf_decomp", name: "HCF given decomposition" },
            { id: "prime_hcf", name: "Highest common factors (HCF)" },
            { id: "prime_fact_count", name: "How many factors" },
            { id: "prime_lcm_decomp", name: "LCM given decomposition" },
            { id: "prime_lcm", name: "Lowest common multiples (LCM)" },
            { id: "prime_missing", name: "Missing products" },
            { id: "surds_mul", name: "Multiplying surds" },
            { id: "surds_rationalise", name: "Rationalising the denominator" },
            { id: "prime_decimal_type", name: "Recurring or terminating decimals" },
            { id: "surds_simplify", name: "Simplifying surds" },
            { id: "num_factors", name: "Factors" },
            { id: "num_multiples", name: "Multiples" }
        ]
    },
    {
        name: "Pythagoras and Trig",
        topics: [
            { id: "pythag_mixed_all", name: "🔀 Mixed Pythagoras & Trig", highlight: true },
            { id: "pythag_short", name: "Finding a short side" },
            { id: "pythag_area", name: "Finding the area (RT)" },
            { id: "pythag_hyp", name: "Finding the hypotenuse" },
            { id: "pythag_perim", name: "Finding the perimeter" },
            { id: "trig_angle", name: "Finding a missing angle (RT)" },
            { id: "trig_length", name: "Finding a missing length (RT)" },
            { id: "trig_area", name: "Finding the area (RT)" },
            { id: "trig_perim", name: "Finding the perimeter (RT)" }
        ]
    },
    {
        name: "Ratio and Proportion",
        topics: [
            { id: "ratio_mixed_all", name: "🔀 Mixed Ratio & Proportion", highlight: true },
            { id: "ratio_change", name: "Changing" },
            { id: "ratio_combine", name: "Combining two ratios" },
            { id: "ratio_share_other", name: "Find a share given another" },
            { id: "ratio_share_diff", name: "Find a share given difference" },
            { id: "ratio_mixed", name: "Mixed" },
            { id: "ratio_total", name: "Sharing a given total" },
            { id: "ratio_simplify", name: "Simplifying" },
            { id: "ratio_to_frac", name: "Writing as a fraction" },
            { id: "ratio_1n", name: "Writing in form 1:n or n:1" },
            { id: "prop_unitary", name: "Unitary method" }
        ]
    },
    {
        name: "Rounding and Units",
        topics: [
            { id: "round_mixed_all", name: "🔀 Mixed Rounding & Units", highlight: true },
            { id: "round_ten", name: "Rounding to powers of ten" },
            { id: "round_sigfig", name: "Rounding to significant figures" },
            { id: "round_dp", name: "Rounding to whole numbers/DP" },
            { id: "round_error_interval", name: "Error intervals" },
            { id: "units_len", name: "Converting lengths" },
            { id: "units_vol", name: "Converting volume" },
            { id: "units_weight", name: "Converting weights" },
            { id: "units_time", name: "Converting time" }
        ]
    },
    {
        name: "Sequences",
        topics: [
            { id: "seq_mixed_all", name: "🔀 Mixed Sequences", highlight: true },
            { id: "seq_nth_linear", name: "n-th term (Linear)" },
            { id: "seq_nth_quad", name: "n-th term (Quadratic)" },
            { id: "seq_next", name: "Next term" },
            { id: "seq_gen", name: "Generating terms" },
            { id: "seq_fibonacci", name: "Fibonacci sequences" },
            { id: "seq_geometric", name: "Geometric sequences" }
        ]
    },
    {
        name: "Standard Form",
        topics: [
            { id: "sf_mixed_all", name: "🔀 Mixed Standard Form", highlight: true },
            { id: "sf_add", name: "Addition" },
            { id: "sf_from", name: "Converting from" },
            { id: "sf_to", name: "Converting to" },
            { id: "sf_div", name: "Division" },
            { id: "sf_mul", name: "Multiplication" },
            { id: "sf_sub", name: "Subtraction" }
        ]
    },
    {
        name: "Statistics",
        topics: [
            { id: "stats_mixed_all", name: "🔀 Mixed Statistics", highlight: true },
            { id: "stats_mean", name: "Mean" },
            { id: "stats_median", name: "Median" },
            { id: "stats_mode", name: "Mode" },
            { id: "stats_range", name: "Range" },
            { id: "stats_mixed", name: "Averages and range" }
        ]
    }
];

// Helper function to create mixed generators
const createMixedGenerator = (topicIds) => {
    return (lv) => {
        const randomTopic = topicIds[Math.floor(Math.random() * topicIds.length)];
        const genFunc = Generators[randomTopic];
        return genFunc ? genFunc(lv) : { text: "Mixed question", answer: "N/A" };
    };
};

// --- Generators Implementation ---
const Generators = {
    // Arithmetic
    arith_whole_add: (lv) => callLadder('additionLadder', lv, false),
    arith_whole_sub: (lv) => callLadder('additionLadder', lv, true),
    arith_whole_mul: (lv) => callLadder('multiplicationLadder', lv, false),
    arith_whole_div: (lv) => callLadder('multiplicationLadder', lv, true),
    arith_whole_mixed: (lv) => callLadder('fourOpsLadder', lv),
    arith_dec_add: (lv) => callLadder('additionDecimalLadder', lv, false),
    arith_dec_sub: (lv) => callLadder('additionDecimalLadder', lv, true),
    arith_dec_mul: (lv) => callLadder('multiplicationDecimalLadder', lv, false),
    arith_dec_div: (lv) => callLadder('multiplicationDecimalLadder', lv, true),
    arith_dec_mixed: (lv) => callLadder('fourOpsDecimalLadder', lv),
    arith_halving: (lv) => callLadder('halvingLadder', lv),
    arith_doubling: (lv) => callLadder('doublingLadder', lv),

    // Circles
    circle_area: (lv) => callLadder('areaCircleLadder', lv),
    circle_circum: (lv) => callLadder('circumfereceCircleLadderLadder', lv),
    circle_eqn: (lv) => callLadder('stateEquationOfCircleLadder', lv),

    // Coordinate Geometry
    coord_gradient: (lv) => callLadder('gradientTwoPointsLadder', lv),
    coord_midpoint: (lv) => callLadder('midpointTwoPointsLadder', lv),
    coord_dist: (lv) => callLadder('lengthBetweenTwoPointsLadder', lv),

    // Directed Number
    dir_addsub_neg: (lv) => callLadder('addSubtractNegativesLadder', lv),
    dir_add_neg: (lv) => callLadder('addingNegativesLadder', lv),
    dir_across_zero: (lv) => callLadder('calcAcrossZeroLadder', lv),
    dir_div_neg: (lv) => callLadder('multiplyingDividingNegativesLadder', lv, "/"),
    dir_mixed_neg: (lv) => callLadder('negativeLadder', lv),
    dir_mul_neg: (lv) => callLadder('multiplyingDividingNegativesLadder', lv, "*"),
    dir_temp_neg: (lv) => callLadder('changingTemperaturesLadder', lv),
    dir_sub_neg: (lv) => callLadder('subtractingNegativesLadder', lv),

    // Equations
    eqn_if_then: (lv) => callLadder('equationsIfThenLadder', lv),
    eqn_mixed: (lv) => callLadder('equationsMixedLadder', lv),
    eqn_ratio: (lv) => callLadder('equationsWithRatioLadder', lv),
    eqn_simultaneous: (lv) => callLadder('linearSimultLadder', lv),
    eqn_quad_monic: (lv) => callLadder('solvingQuadraticFactoriseLadder', lv, true),
    eqn_quad_nonmonic: (lv) => callLadder('solvingQuadraticFactoriseLadder', lv, false),
    eqn_1step: (lv) => callLadder('oneStepEquationLadder', lv, false),
    eqn_2step: (lv) => callLadder('twoStepEquationLadder', lv, false),
    eqn_brackets_both: (lv) => callLadder('equationsWithBracketsBothLadder', lv),
    eqn_brackets_one: (lv) => callLadder('equationsWithBracketsLadder', lv),
    eqn_unknowns_both: (lv) => callLadder('threeStepEquationLadder', lv, false),

    // Expressions
    expr_div_1var: (lv) => callLadder('algebraicDivisionLadder', lv, false),
    expr_div_2var: (lv) => callLadder('algebraicDivisionLadder', lv, true),
    expr_collect_like: (lv) => callLadder('collectingTermsLadder', lv),
    expr_comp_square: (lv) => callLadder('completingSquareLadder', lv),
    expr_expand_binom_monic: (lv) => callLadder('factoriseExpandMonicQuadraticsLadder', lv, true),
    expr_expand_binom_nonmonic: (lv) => callLadder('factoriseExpandNonMonicQuadraticsLadder', lv, true),
    expr_expand_simplify: (lv) => callLadder('expandSimplifySingleBracketsLadder', lv),
    expr_expand_single: (lv) => callLadder('factoriseSingleLadder', lv, true),
    expr_fact_single: (lv) => callLadder('factoriseSingleLadder', lv, false),
    expr_fact_monic: (lv) => callLadder('factoriseExpandMonicQuadraticsLadder', lv, false),
    expr_fact_nonmonic: (lv) => callLadder('factoriseExpandNonMonicQuadraticsLadder', lv, false),
    expr_mul_terms: (lv) => callLadder('multiplyingTermsLadder', lv),
    expr_sub: (lv) => callLadder('substitutionLadder', lv),

    // FDP
    fdp_to_dec: (lv) => callLadder('convertingFDPLadder', lv, "decimal"),
    fdp_to_frac: (lv) => callLadder('convertingFDPLadder', lv, "fraction"),
    fdp_to_perc: (lv) => callLadder('convertingFDPLadder', lv, "percentage"),
    fdp_mixed: (lv) => callLadder('convertingFDPLadder', lv, "random"),
    fdp_recurring: (lv) => callLadder('recurringDecimalsLadder', lv),
    fdp_of_amount: (lv) => callLadder('interchangingFDPLadder', lv, "random"),
    fdp_dec_to_frac: (lv) => callLadder('givenDecimalFindFractionLadder', lv),

    // Fractions
    frac_add_mixed: (lv) => callLadder('addSubtractMixedLadder', lv, 0),
    frac_add: (lv) => callLadder('addSubtractFractionsLadder', lv, 0),
    frac_imp_to_mix: (lv) => callLadder('convertingFractionsLadder', lv, true),
    frac_mix_to_imp: (lv) => callLadder('convertingFractionsLadder', lv, false),
    frac_div_mixed: (lv) => callLadder('multiplyDivideMixedLadder', lv, 1),
    frac_div: (lv) => callLadder('multiplyDivideFractionsLadder', lv, 1),
    frac_4ops: (lv) => callLadder('fractionsFourOpsLadder', lv),
    frac_inc_dec: (lv) => callLadder('fractionalChangeLadder', lv),
    frac_between: (lv) => callLadder('integersBetweenFractionLadder', lv),
    frac_mul: (lv) => callLadder('multiplyDivideFractionsLadder', lv, 0),
    frac_mul_mixed: (lv) => callLadder('multiplyDivideMixedLadder', lv, 0),
    frac_of_amount: (lv) => callLadder('fractionOfAmountLadder', lv),
    frac_simplify: (lv) => callLadder('simplifyingFractionsLadder', lv),
    frac_sub_mixed: (lv) => callLadder('addSubtractMixedLadder', lv, 1),
    frac_sub: (lv) => callLadder('addSubtractFractionsLadder', lv, 1),

    // Geometry
    geom_polygon_sides: (lv) => callLadder('polygonSidesLadder', lv),

    // Indices
    indices_div: (lv) => callLadder('indexLawDivideLadder', lv),
    indices_mixed: (lv) => callLadder('indexLawMixedLadder', lv),
    indices_mul: (lv) => callLadder('indexLawMultiplyLadder', lv),
    indices_power: (lv) => callLadder('indexLawPowerOfPowerLadder', lv),
    powers_roots: (lv) => callLadder('powersAndRootsLadder', lv),

    // Money
    money_adding: (lv) => callLadder('addingCoinsLadder', lv),
    money_counting: (lv) => callLadder('countingCoinsLadder', lv),

    // Order of Operations
    ops_mul_div: (lv) => callLadder('orderOfOpsTimesDivideLadder', lv),
    ops_add_sub: (lv) => callLadder('orderOfOpsAddSubtractLadder', lv),

    // Percentages
    perc_change: (lv) => callLadder('percentageChangeLadder', lv),
    perc_inc_dec: (lv) => callLadder('percentageIncreaseDecreaseLadder', lv),
    perc_multipliers: (lv) => callLadder('percentageMultiplierLadder', lv),
    perc_amount: (lv) => callLadder('percentageOfAmountLadder', lv),
    perc_repeated: (lv) => callLadder('repeatedPercentageChangeLadder', lv),
    perc_reverse: (lv) => callLadder('reversePercentageLadder', lv),

    // Probability
    prob_basic: (lv) => callLadder('probabilityBasicLadder', lv),
    prob_expected: (lv) => callLadder('expectedFrequencyLadder', lv),

    // Prime Factors & Surds
    prime_decomp: (lv) => callLadder('productOfPrimesLadder', lv, false),
    prime_hcf: (lv) => callLadder('hcfLadder', lv, false),
    prime_lcm: (lv) => callLadder('lcmLadder', lv, false),
    prime_hcf_decomp: (lv) => callLadder('hcfLadder', lv, true),
    prime_lcm_decomp: (lv) => callLadder('lcmLadder', lv, true),
    prime_fact_count: (lv) => callLadder('howManyFactorsLadder', lv),
    prime_cons_prod: (lv) => callLadder('primeConsecutivesLadder', lv),
    prime_missing: (lv) => callLadder('placeValuePowersLadder', lv),
    prime_decimal_type: (lv) => callLadder('recurrOrTerminateLadder', lv),
    prime_prod_calc: (lv) => callLadder('productOfPrimesLadder', lv, true),
    surds_addsub: (lv) => callLadder('addingSurdsLadder', lv),
    surds_mul: (lv) => callLadder('multiplyingSurdsLadder', lv),
    surds_simplify: (lv) => callLadder('simplifyingSurdsLadder', lv),
    surds_rationalise: (lv) => callLadder('rationalisingDenominatorsLadder', lv),
    num_factors: (lv) => callLadder('factorLadder', lv),
    num_multiples: (lv) => callLadder('multipleLadder', lv),

    // Pythagoras & Trig
    pythag_short: (lv) => callLadder('findLegLadder', lv),
    pythag_area: (lv) => callLadder('areaPythagLadder', lv),
    pythag_hyp: (lv) => callLadder('findHypLadder', lv),
    pythag_perim: (lv) => callLadder('perimeterPythagLadder', lv),
    trig_angle: (lv) => callLadder('findAngleTrigLadder', lv),
    trig_length: (lv) => callLadder('findLengthTrigLadder', lv),
    trig_area: (lv) => callLadder('findAreaTrigLadder', lv),
    trig_perim: (lv) => callLadder('findPerimeterTrigLadder', lv),

    // Ratio & Proportion
    ratio_change: (lv) => callLadder('ratioDonatingLadder', lv),
    ratio_combine: (lv) => callLadder('combiningRatiosLadder', lv),
    ratio_share_other: (lv) => callLadder('ratioReverseLadder', lv),
    ratio_share_diff: (lv) => callLadder('ratioDifferenceLadder', lv),
    ratio_mixed: (lv) => callLadder('ratioMixedLadder', lv),
    ratio_total: (lv) => callLadder('ratioShareLadder', lv),
    ratio_simplify: (lv) => callLadder('simplifyingRatiosLadder', lv),
    ratio_to_frac: (lv) => callLadder('ratioAsFractionLadder', lv),
    ratio_1n: (lv) => callLadder('unitRatioLadder', lv),
    prop_unitary: (lv) => callLadder('unitaryMethodLadder', lv),

    // Rounding & Units
    round_ten: (lv) => callLadder('roundingPowerOfTen', lv),
    round_sigfig: (lv) => callLadder('roundingSigFigLadder', lv),
    round_dp: (lv) => callLadder('roundingDecimal', lv),
    round_error_interval: (lv) => callLadder('errorIntervalLadder', lv),
    units_len: (lv) => callLadder('convertingMeticLengthLadder', lv),
    units_vol: (lv) => callLadder('convertingMeticVolumeLadder', lv),
    units_weight: (lv) => callLadder('convertingMeticWeightLadder', lv),
    units_time: (lv) => callLadder('convertingTimeLadder', lv),

    // Sequences
    seq_nth_linear: (lv) => callLadder('nthTermLinearLadder', lv),
    seq_nth_quad: (lv) => callLadder('nthTermQuadraticLadder', lv),
    seq_next: (lv) => callLadder('sequencesNextTermLadder', lv),
    seq_gen: (lv) => callLadder('nthTermGeneratingLadder', lv),
    seq_fibonacci: (lv) => callLadder('fibonacciLadder', lv),
    seq_geometric: (lv) => callLadder('geometricSequenceLadder', lv),

    // Standard Form
    sf_add: (lv) => callLadder('addSubtractStandardFormLadder', lv, "+"),
    sf_from: (lv) => callLadder('convertingFromStandardFormLadder', lv),
    sf_to: (lv) => callLadder('convertingToStandardFormLadder', lv),
    sf_div: (lv) => callLadder('multiplyDivideStandardFormLadder', lv, "/"),
    sf_mul: (lv) => callLadder('multiplyDivideStandardFormLadder', lv, "*"),
    sf_sub: (lv) => callLadder('addSubtractStandardFormLadder', lv, "-"),

    // Statistics
    stats_mean: (lv) => callLadder('meanLadder', lv),
    stats_median: (lv) => callLadder('medianLadder', lv),
    stats_mode: (lv) => callLadder('modeLadder', lv),
    stats_range: (lv) => callLadder('rangeLadder', lv),
    stats_mixed: (lv) => callLadder('averagesLadder', lv),

    // Fallback
    fallback: (id) => {
        return { text: `[Generator for ${id} coming soon]`, answer: "Stay tuned!" };
    }
};

// Add mixed generators dynamically
Generators.random_all = (lv) => {
    const allTopics = Object.keys(Generators).filter(k => !k.includes('_mixed_all') && k !== 'random_all' && k !== 'fallback');
    const randomTopic = allTopics[Math.floor(Math.random() * allTopics.length)];
    return Generators[randomTopic](lv);
};

Generators.arith_mixed_all = createMixedGenerator(['arith_dec_add', 'arith_whole_add', 'arith_dec_div', 'arith_whole_div', 'arith_dec_mul', 'arith_whole_mul', 'arith_dec_sub', 'arith_whole_sub', 'arith_halving', 'arith_doubling']);
Generators.circle_mixed_all = createMixedGenerator(['circle_area', 'circle_circum', 'circle_eqn']);
Generators.coord_mixed_all = createMixedGenerator(['coord_gradient', 'coord_midpoint', 'coord_dist']);
Generators.dir_mixed_all = createMixedGenerator(['dir_addsub_neg', 'dir_add_neg', 'dir_across_zero', 'dir_div_neg', 'dir_mul_neg', 'dir_temp_neg', 'dir_sub_neg']);
Generators.eqn_mixed_all = createMixedGenerator(['eqn_if_then', 'eqn_mixed', 'eqn_ratio', 'eqn_1step', 'eqn_2step', 'eqn_brackets_both', 'eqn_brackets_one', 'eqn_unknowns_both']);
Generators.expr_mixed_all = createMixedGenerator(['expr_div_1var', 'expr_collect_like', 'expr_expand_simplify', 'expr_expand_single', 'expr_fact_single', 'expr_mul_terms', 'expr_sub']);
Generators.fdp_mixed_all = createMixedGenerator(['fdp_to_dec', 'fdp_to_frac', 'fdp_to_perc', 'fdp_mixed', 'fdp_of_amount', 'fdp_dec_to_frac']);
Generators.frac_mixed_all = createMixedGenerator(['frac_add_mixed', 'frac_add', 'frac_div_mixed', 'frac_div', 'frac_mul', 'frac_mul_mixed', 'frac_of_amount', 'frac_simplify', 'frac_sub_mixed', 'frac_sub']);
Generators.indices_mixed_all = createMixedGenerator(['indices_div', 'indices_mixed', 'indices_mul', 'indices_power', 'powers_roots']);
Generators.perc_mixed_all = createMixedGenerator(['perc_change', 'perc_inc_dec', 'perc_multipliers', 'perc_amount', 'perc_repeated', 'perc_reverse']);
Generators.prime_mixed_all = createMixedGenerator(['prime_decomp', 'prime_hcf', 'prime_lcm', 'prime_fact_count', 'surds_addsub', 'surds_mul', 'surds_simplify', 'surds_rationalise']);
Generators.pythag_mixed_all = createMixedGenerator(['pythag_short', 'pythag_area', 'pythag_hyp', 'pythag_perim', 'trig_angle', 'trig_length', 'trig_area', 'trig_perim']);
Generators.ratio_mixed_all = createMixedGenerator(['ratio_change', 'ratio_combine', 'ratio_share_other', 'ratio_share_diff', 'ratio_total', 'ratio_simplify', 'ratio_to_frac', 'ratio_1n', 'prop_unitary']);
Generators.round_mixed_all = createMixedGenerator(['round_ten', 'round_sigfig', 'round_dp', 'round_error_interval', 'units_len', 'units_vol', 'units_weight', 'units_time']);
Generators.seq_mixed_all = createMixedGenerator(['seq_nth_linear', 'seq_nth_quad', 'seq_next', 'seq_gen', 'seq_fibonacci', 'seq_geometric']);
Generators.sf_mixed_all = createMixedGenerator(['sf_add', 'sf_from', 'sf_to', 'sf_div', 'sf_mul', 'sf_sub']);
Generators.stats_mixed_all = createMixedGenerator(['stats_mean', 'stats_median', 'stats_mode', 'stats_range', 'stats_mixed']);

// --- App Logic ---
class MathGenApp {
    constructor() {
        this.selectedTopics = new Set(["arith_whole_add"]);
        this.selectedLevels = new Set([3]); // Default level 3
        this.questions = [];
        this.showAnswers = false;
        this.currentLang = 'en';
        window.currentLang = 'en';

        // DOM Elements
        this.topicSearch = document.getElementById('topic-search');
        this.topicList = document.getElementById('topic-list');
        this.countInput = document.getElementById('question-count');
        this.questionsGrid = document.getElementById('questions-grid');
        this.generateBtn = document.getElementById('generate-btn');
        this.toggleAnswersBtn = document.getElementById('toggle-answers');
        this.printBtn = document.getElementById('print-btn');
        this.clearBtn = document.getElementById('clear-topics-btn');
        this.topicTitle = document.getElementById('current-topic-title');
        this.qCountBadge = document.getElementById('q-count-badge');
        this.diffBadge = document.getElementById('difficulty-badge');
        this.langToggleBtn = document.getElementById('lang-toggle');

        // Level Controls
        this.levelSelector = document.getElementById('level-selector');
        this.levelBtns = document.querySelectorAll('.level-btn');
        this.selectAllLevelsBtn = document.getElementById('select-all-levels');
        this.clearLevelsBtn = document.getElementById('clear-levels');

        this.init();
    }

    init() {
        this.renderTopicList();

        this.topicSearch.addEventListener('input', (e) => this.filterTopics(e.target.value));
        this.generateBtn.addEventListener('click', () => this.generate());
        this.toggleAnswersBtn.addEventListener('click', () => this.toggleAnswers());
        this.printBtn.addEventListener('click', () => window.print());
        this.clearBtn.addEventListener('click', () => this.clearSelection());
        this.langToggleBtn.addEventListener('click', () => this.toggleLanguage());

        // Level Event Listeners
        this.levelBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const level = parseInt(e.target.dataset.level);
                // Toggle level
                if (this.selectedLevels.has(level)) {
                    this.selectedLevels.delete(level);
                } else {
                    this.selectedLevels.add(level);
                }
                this.updateLevelUI();
            });
        });

        this.selectAllLevelsBtn.addEventListener('click', () => {
            for (let i = 1; i <= 10; i++) this.selectedLevels.add(i);
            this.updateLevelUI();
        });

        this.clearLevelsBtn.addEventListener('click', () => {
            this.selectedLevels.clear();
            this.updateLevelUI();
        });

        // Default selection
        this.selectTopic("arith_whole_add");
        this.updateLevelUI();
    }

    updateLevelUI() {
        this.levelBtns.forEach(btn => {
            const level = parseInt(btn.dataset.level);
            if (this.selectedLevels.has(level)) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    renderTopicList() {
        this.topicList.innerHTML = '';
        TOPIC_CATEGORIES.forEach(cat => {
            const catEl = document.createElement('div');
            catEl.className = 'topic-category';
            catEl.textContent = cat.name;
            this.topicList.appendChild(catEl);

            cat.topics.forEach(topic => {
                const item = document.createElement('div');
                item.className = 'topic-item';
                item.dataset.id = topic.id;
                item.dataset.name = topic.name.toLowerCase();

                item.innerHTML = `
                    <div class="topic-checkbox"></div>
                    <span>${topic.name}</span>
                `;

                if (topic.highlight) {
                    item.dataset.highlight = "true";
                }

                item.addEventListener('click', (e) => {
                    const isMulti = e.ctrlKey || e.metaKey || e.target.closest('.topic-checkbox');
                    this.selectTopic(topic.id, !!isMulti);
                });

                this.topicList.appendChild(item);
            });
        });
        this.updateSelectionUI();
    }

    filterTopics(query) {
        const q = query.toLowerCase();
        const items = this.topicList.querySelectorAll('.topic-item');

        items.forEach(item => {
            const visibleText = item.textContent.toLowerCase();
            const visible = item.dataset.name.includes(q) || visibleText.includes(q);
            item.style.display = visible ? 'block' : 'none';
        });

        let currentCat = null;
        let hasVisible = false;

        const allChildren = Array.from(this.topicList.childNodes);
        allChildren.forEach(node => {
            if (node.classList.contains('topic-category')) {
                if (currentCat && !hasVisible) currentCat.style.display = 'none';
                currentCat = node;
                hasVisible = false;
            } else if (node.classList.contains('topic-item')) {
                if (node.style.display !== 'none') hasVisible = true;
            }
        });
        if (currentCat && !hasVisible) currentCat.style.display = 'none';
        else if (currentCat) currentCat.style.display = 'block';
    }

    selectTopic(id, isMulti = false) {
        if (isMulti) {
            if (this.selectedTopics.has(id)) {
                this.selectedTopics.delete(id);
            } else {
                this.selectedTopics.add(id);
            }
        } else {
            this.selectedTopics.clear();
            this.selectedTopics.add(id);
        }

        this.updateSelectionUI();
        this.generate();
    }

    clearSelection() {
        this.selectedTopics.clear();
        this.updateSelectionUI();
        this.generate();
    }

    updateSelectionUI() {
        const items = this.topicList.querySelectorAll('.topic-item');
        let selectedLabel = "";

        items.forEach(item => {
            const id = item.dataset.id;
            if (this.selectedTopics.has(id)) {
                item.classList.add('active');
                if (this.selectedTopics.size === 1) selectedLabel = item.querySelector('span').textContent;
            } else {
                item.classList.remove('active');
            }
        });

        if (this.selectedTopics.size > 0) {
            this.clearBtn.classList.add('visible');
        } else {
            this.clearBtn.classList.remove('visible');
        }

        if (this.selectedTopics.size > 1) {
            this.topicTitle.textContent = `Mixed Selection (${this.selectedTopics.size} Topics)`;
        } else if (this.selectedTopics.size === 1) {
            this.topicTitle.textContent = selectedLabel;
        } else {
            this.topicTitle.textContent = "No Topic Selected";
        }
    }

    toggleLanguage() {
        this.currentLang = this.currentLang === 'en' ? 'ta' : 'en';
        window.currentLang = this.currentLang;
        this.langToggleBtn.textContent = this.currentLang === 'en' ? 'தமிழ்' : 'English';
        this.generate();
    }

    generate() {
        // Validation
        if (this.selectedTopics.size === 0) {
            this.questions = [];
            this.render();
            return;
        }

        const levels = Array.from(this.selectedLevels);
        if (levels.length === 0) {
            // If no level selected, maybe default to 3 or warn?
            // Let's default to [3] just for generation, but not update UI
            levels.push(3);
        }

        const count = parseInt(this.countInput.value);
        this.questions = [];

        const topicArray = Array.from(this.selectedTopics);

        for (let i = 0; i < count; i++) {
            // Pick random topic
            const randomTopicId = topicArray[Math.floor(Math.random() * topicArray.length)];
            const genFunc = Generators[randomTopicId] || (() => Generators.fallback(randomTopicId));

            // Pick random level from selected levels
            const randomLevel = levels[Math.floor(Math.random() * levels.length)];

            this.questions.push(genFunc(randomLevel));
        }

        this.qCountBadge.textContent = `${count} Questions`;

        // Update difficulty badge
        if (levels.length === 1) {
            this.diffBadge.textContent = `Level ${levels[0]}`;
        } else if (this.selectedLevels.size === 0) {
            this.diffBadge.textContent = `Level 3 (Default)`;
        } else {
            // specific levels like 1, 3, 5 or "Mixed Levels"
            this.diffBadge.textContent = `Mixed Levels`;
        }

        this.render();
    }

    toggleAnswers() {
        this.showAnswers = !this.showAnswers;
        const answers = document.querySelectorAll('.answer-text');
        answers.forEach(el => {
            if (this.showAnswers) el.classList.add('visible');
            else el.classList.remove('visible');
        });

        this.toggleAnswersBtn.innerHTML = this.showAnswers
            ? `<span class="icon">🙈</span> Hide Answers`
            : `<span class="icon">👁️</span> Show Answers`;
    }

    render() {
        this.questionsGrid.innerHTML = '';
        this.showAnswers = false;
        this.toggleAnswersBtn.innerHTML = `<span class="icon">👁️</span> Show Answers`;

        if (this.questions.length === 0) {
            this.questionsGrid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 2rem;">Please select at least one topic.</div>';
            return;
        }

        const avgLength = this.questions.reduce((sum, q) => sum + (q.text ? q.text.length : 0), 0) / this.questions.length;
        const isShortQuestions = avgLength < 80;

        if (isShortQuestions && this.questions.length > 5) {
            this.questionsGrid.classList.remove('single-column');
        } else {
            this.questionsGrid.classList.add('single-column');
        }

        this.questions.forEach((q, index) => {
            const card = document.createElement('div');
            card.className = 'question-card';
            card.style.animationDelay = `${index * 0.05}s`;

            card.innerHTML = `
                <div class="q-left">
                    <div class="question-num">${index + 1}</div>
                    <div class="question-text">${q.text}</div>
                </div>
                <div class="q-right">
                    <div class="answer-area">
                        <div class="answer-text">${q.answer}</div>
                    </div>
                    <button class="copy-btn" title="Copy Question">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 4v12a2 2 0 002 2h8a2 2 0 002-2V7.242a2 2 0 00-.602-1.43L16.083 2.57A2 2 0 0014.653 2H10a2 2 0 00-2 2z"></path><path d="M16 18v2a2 2 0 01-2 2H6a2 2 0 01-2-2V9a2 2 0 012-2h2"></path></svg>
                    </button>
                </div>
            `;

            card.querySelector('.copy-btn').addEventListener('click', (e) => {
                e.stopPropagation();
                // Strip LaTeX delimiters for copy
                const cleanText = q.text ? q.text.replace(/\\\(|\\\)/g, '').replace(/<[^>]*>/g, '') : '';
                navigator.clipboard.writeText(cleanText);
                card.classList.add('copied');
                setTimeout(() => card.classList.remove('copied'), 1000);
            });

            this.questionsGrid.appendChild(card);
        });

        if (window.MathJax && window.MathJax.typesetPromise) {
            window.MathJax.typesetPromise().catch((err) => console.log('MathJax error:', err));
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new MathGenApp();
});

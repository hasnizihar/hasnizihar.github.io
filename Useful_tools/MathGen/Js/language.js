const TRANSLATIONS = {
    en: {
        search: "Search Topics",
        searchPlaceholder: "Type to filter...",
        clear: "Clear All",
        difficulty: "Difficulty Level (1-10)",
        count: "Number of Questions",
        newQuestions: "New Questions",
        showAnswers: "Show Answers",
        hideAnswers: "Hide Answers",
        print: "Print PDF",
        footer: "Inspired by MathsBot",
        noTopic: "No Topic Selected",
        mixedSelection: "Mixed Selection"
    },
    ta: {
        search: "தலைப்புகளைத் தேடு",
        searchPlaceholder: "வடிகட்ட தட்டச்சு செய்க...",
        clear: "அனைத்தையும் அழி",
        difficulty: "கடின நிலை (1-10)",
        count: "கேள்விகளின் எண்ணிக்கை",
        newQuestions: "புதிய கேள்விகள்",
        showAnswers: "விடைகளைக் காட்டு",
        hideAnswers: "விடைகளை மறை",
        print: "PDF அச்சிடு",
        footer: "MathsBot மூலம் ஈர்க்கப்பட்டது",
        noTopic: "தலைப்பு தேர்ந்தெடுக்கப்படவில்லை",
        mixedSelection: "கலப்பு தேர்வு"
    }
};

const CATEGORY_TRANSLATIONS = {
    "Arithmetic": "எண்கணிதம்",
    "Circles": "வட்டங்கள்",
    "Coordinate Geometry": "ஆயத்தொலை வடிவியல்",
    "Directed Number": "திசைச்சார் எண்கள்",
    "Equations": "சமன்பாடுகள்",
    "Expressions": "கோவைகள்",
    "FDP (Fraction, Decimal, Percentage)": "பின்னம், தசமம், சதவீதம்",
    "Fractions": "பின்னங்கள்",
    "Geometry": "வடிவியல்",
    "Indices and Powers": "சுட்டிகள் மற்றும் அடுக்குகள்",
    "Money": "பணம்",
    "Order of Operations": "கணிதச் செயல்களின் வரிசை",
    "Percentages": "சதவீதங்கள்",
    "Probability": "நிகழ்தகவு",
    "Prime Factors and Surds": "பகா காரணிகள் மற்றும் முரணிகள்",
    "Pythagoras and Trig": "பிதாகரஸ் மற்றும் திரிகோணமிதி",
    "Ratio and Proportion": "விகிதம் மற்றும் விகிதாசாரம்",
    "Rounding and Units": "முழுமையாக்கல் மற்றும் அலகுகள்",
    "Sequences": "தொடர்கள்",
    "Standard Form": "திட்ட வடிவம்",
    "Statistics": "புள்ளிவிவரம்",
    "🎲 Random & Mixed": "🎲 சீரற்ற & கலப்பு"
};

// Helper to get translated name
function getCategoryName(originalName, lang) {
    if (lang === 'ta' && CATEGORY_TRANSLATIONS[originalName]) {
        return CATEGORY_TRANSLATIONS[originalName];
    }
    return originalName;
}

const QUESTION_TRANSLATIONS = {
    // Common Verbs/Actions
    "Find the": "கண்டுபிடிக்கவும்",
    "Calculate": "கணக்கிடுக",
    "Simplify fully": "முழுமையாக எளிதாக்குக",
    "Simplify": "எளிதாக்குக",
    "Solve": "தீர்க்க",
    "Work out": "கணக்கிடுக",
    "Evaluate": "மதிப்பிடுக",
    "Round": "முழுமையாக்குக",
    "Write": "எழுதுக",
    "Increase": "அதிகரிக்கவும்",
    "Decrease": "குறைக்கவும்",
    "Expand": "விரிவாக்கவும்",
    "Factorise": "காரணிப்படுத்துக",
    "estimate": "மதிப்பிடுக",
    "List all the factors of": "அனைத்து காரணிகளையும் பட்டியலிடுக",
    "Find the highest common factor of": "மீப்பெரு பொது காரணியைக் காண்க",
    "Find the lowest common multiple of": "மீச்சிறு பொது மடங்கை காண்க",

    // Nouns/Objects
    "area": "பரப்பளவு",
    "circumference": "சுற்றளவு",
    "perimeter": "சுற்றளவு",
    "volume": "கனஅளவு",
    "surface area": "மேற்பரப்பு பரப்பளவு",
    "radius": "ஆரம்",
    "diameter": "விட்டம்",
    "gradient": "சாய்வு",
    "midpoint": "நடுப்புள்ளி",
    "equation": "சமன்பாடு",
    "fraction": "பின்னம்",
    "decimal": "தசமம்",
    "percentage": "சதவீதம்",
    "ratio": "விகிதம்",
    "mean": "சராசரி",
    "median": "இடைநிலை",
    "mode": "முகடு",
    "range": "வீச்சு",
    "term": "உறுப்பு",
    "sequence": "தொடர்",
    "n-th term": "n-ஆம் உறுப்பு",
    "rule": "விதி",

    // Prepositions/Connectors
    "of": "இன்",
    "and": "மற்றும்",
    "to": "க்கு",
    "from": "இருந்து",
    "by": "ஆல்",
    "as a": "ஆக",
    "nearest": "அருகிலுள்ள",
    "significant figure": "முக்கிய இலக்கம்",
    "decimal place": "தசம இடம்",

    // Specific Phrases
    "What is the": "என்ன",
    "How many": "எத்தனை",
    "Find the value of": "மதிப்பை காண்க",
    "Write down": "எழுதுக",
    "Stating the equation": "சமன்பாட்டை கூறுதல்",
    "Adding": "கூட்டல்",
    "Subtracting": "கழித்தல்",
    "Multiplying": "பெருக்கல்",
    "Dividing": "வகுத்தல்"
};

function translateQuestionText(text) {
    if (!text) return text;
    let translated = text;

    // Naive replacement - improvements needed for complex grammar
    // Ordering by length to match specific phrases first
    const keys = Object.keys(QUESTION_TRANSLATIONS).sort((a, b) => b.length - a.length);

    keys.forEach(key => {
        // Case insensitive regex replacement, but careful not to replace parts of html tags
        // Simple string replacement for now
        const regex = new RegExp(`\\b${key}\\b`, 'gi');
        translated = translated.replace(regex, QUESTION_TRANSLATIONS[key]);
    });

    return translated;
}

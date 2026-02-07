# MathGen - Ultimate Math Question Generator

MathGen is a powerful, client-side web application designed to generate custom math practice questions instantly. Built with pure HTML, CSS, and JavaScript, it offers a seamless experience for teachers, students, and parents to create worksheets with answers on the fly.

## 🚀 Features

-   **Dynamic Question Generation**: Instantly generate random questions based on selected topics.
-   **Topic Search**: Easily find specific math concepts using the search bar.
-   **Difficulty Control**: Choose from 10 distinct difficulty levels.
-   **Custom Quantity**: Generate anywhere from 1 to 100 questions at a time.
-   **Multi-Language Support**: Switch between **English** and **Tamil** with a single click.
-   **Answer Toggle**: specific Show or hide answers for self-assessment or teaching.
-   **Print Ready**: Optimized layout for printing or saving as PDF.
-   **Mathematical Typesetting**: Uses [MathJax](https://www.mathjax.org/) for beautiful, textbook-quality equation rendering.

## 🧮 Supported Topics

MathGen covers a wide range of mathematical topics, including but not limited to:

-   **Arithmetic**: Addition, Subtraction, Multiplication, Division, Rounding, Significant Figures.
-   **Fractions, Decimals, & Percentages**: Conversions, Percentage of Amounts, Percentage Change, Reverse Percentages.
-   **Ratio**: Sharing in a ratio, Reverse ratio problems, Difference problems.
-   **Algebra**: Collecting like terms, Multiplying terms, Sequences, Nth term rules.
-   **Number Theory**: Factors, Multiples, HCF, LCM, Prime Factorization.
-   **Applied Math**: Money problems, Speed-Distance-Time calculations.

## 🛠️ How to Use

1.  **Open the Application**: Simply open `index.html` in any modern web browser. No server or installation required.
2.  **Select Topics**: Use the sidebar to search for and select one or more math topics.
3.  **Choose Difficulty**: Select difficulty levels (1-10) to tailor the complexity.
4.  **Set Quantity**: Enter the number of questions you want.
5.  **Generate**: Click the **New Questions** button.
6.  **Print/Export**: Use the **Print PDF** button to generate a clean worksheet.

## 📂 Project Structure

```text
MathGen/
├── css/
│   └── style.css          # Main stylesheet for the application
├── Js/
│   ├── app.js             # Main application logic
│   ├── questionBank.js    # Logic for generating specific math questions
│   ├── objectMaths.js     # Mathematical utility objects
│   ├── differentiator.js  # Logic for differentiating question types
│   ├── language.js        # Translation handling (English/Tamil)
│   └── utilities.js       # Helper functions
└── index.html             # Main entry point using MathJax and Google Fonts
```

## 🌐 Credits

-   Inspired by resources like **MathsBot**.
-   Fonts provided by **Google Fonts** (Inter, Outfit).
-   Math rendering powered by **MathJax**.

## 📜 License

This project is open for educational use.

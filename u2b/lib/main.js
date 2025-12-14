document.addEventListener('DOMContentLoaded', () => {
    const sourceText = document.getElementById('sourceText');
    const targetText = document.getElementById('targetText');
    const convertBtn = document.getElementById('convertBtn');
    const clearBtn = document.getElementById('clearBtn');

    // Convert Function
    const doConvert = () => {
        const input = sourceText.value;
        if (!input) return;

        try {
            const output = window.convertUnicodeToBamini(input);
            targetText.value = output;
        } catch (e) {
            console.error("Conversion failed", e);
        }
    };

    // Event Listeners
    convertBtn.addEventListener('click', doConvert);

    // Auto-convert on typing (debounced slightly for performance if needed, but simple keyup is fine for text)
    sourceText.addEventListener('input', doConvert);

    clearBtn.addEventListener('click', () => {
        sourceText.value = '';
        targetText.value = '';
    });

    // Copy Utils
    const setupCopy = (btnId, inputId) => {
        const btn = document.getElementById(btnId);
        const input = document.getElementById(inputId);

        btn.addEventListener('click', async () => {
            const text = input.value;
            if (!text) return;

            try {
                await navigator.clipboard.writeText(text);
                const originalText = btn.textContent;
                btn.textContent = 'Copied!';
                btn.classList.add('copied');

                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.classList.remove('copied');
                }, 2000);
            } catch (err) {
                console.error('Failed to copy!', err);
            }
        });
    };

    setupCopy('copySource', 'sourceText');
    setupCopy('copyTarget', 'targetText');

    // Paste Logic
    const pasteBtn = document.getElementById('pasteSource');
    pasteBtn.addEventListener('click', async () => {
        try {
            const text = await navigator.clipboard.readText();
            if (text) {
                sourceText.value = text;
                doConvert(); // Auto-convert after paste
            }
        } catch (err) {
            console.error('Failed to read clipboard', err);
            alert("Unable to paste automatically. Please paste manually (Ctrl+V).");
        }
    });
});
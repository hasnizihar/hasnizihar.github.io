const urlInput = document.getElementById('urltxt');
const qrImage = document.getElementById('qrimg');
const qrBox = document.getElementById('imgbox');
const qrContainer = qrBox.querySelector('.qr-container');
const downloadBtn = document.getElementById('dow');
const copyBtn = document.getElementById('copy-btn');
const generateBtn = document.getElementById('gen-btn');
const clearBtn = document.getElementById('clear-btn');
const loader = document.getElementById('loader');
const errorMsg = document.getElementById('qr-error');

// Options
const colorInput = document.getElementById('qr-color');
const bgInput = document.getElementById('qr-bg');
const sizeInput = document.getElementById('qr-size');

let timeout = null;

function generateQR() {
    const data = urlInput.value.trim();

    // Toggle Clear Button
    clearBtn.style.display = data ? 'flex' : 'none';

    if (!data) {
        resetDisplay();
        return;
    }

    // Validation & Size management
    let size = parseInt(sizeInput.value) || 300;
    let clamped = false;
    if (size < 100) { size = 100; clamped = true; }
    if (size > 1000) { size = 1000; clamped = true; }

    if (clamped) {
        sizeInput.value = size;
        sizeInput.classList.add('input-error');
        setTimeout(() => sizeInput.classList.remove('input-error'), 500);
    }

    const color = colorInput.value.replace('#', '');
    const bgColor = bgInput.value.replace('#', '');

    // UI State: Loading
    showLoading();

    const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(data)}&size=${size}x${size}&color=${color}&bgcolor=${bgColor}&margin=20&format=png`;

    qrImage.src = apiUrl;
}

function showLoading() {
    loader.style.display = 'block';
    qrImage.style.opacity = '0.4';
    errorMsg.style.display = 'none';
    qrContainer.classList.add('active');
}

function hideLoading() {
    loader.style.display = 'none';
    qrImage.style.opacity = '1';
    qrImage.style.display = 'block';

    // Hide placeholder
    const placeholder = qrContainer.querySelector('.placeholder-icon');
    if (placeholder) placeholder.style.display = 'none';

    // Smoothly show action buttons
    downloadBtn.style.display = 'flex';
    copyBtn.style.display = 'flex';
    setTimeout(() => {
        downloadBtn.style.opacity = '1';
        copyBtn.style.opacity = '1';
    }, 10);
}

function resetDisplay() {
    const placeholder = qrContainer.querySelector('.placeholder-icon');
    if (placeholder) placeholder.style.display = 'block';

    qrContainer.classList.remove('active');
    qrImage.style.display = 'none';
    downloadBtn.style.display = 'none';
    copyBtn.style.display = 'none';
    downloadBtn.style.opacity = '0';
    copyBtn.style.opacity = '0';
    errorMsg.style.display = 'none';
    loader.style.display = 'none';
}

// Image Load Listeners
qrImage.onload = hideLoading;
qrImage.onerror = () => {
    loader.style.display = 'none';
    qrImage.style.display = 'none';
    errorMsg.style.display = 'block';
};

// Debounce function for live preview
function debounceGenerate() {
    clearTimeout(timeout);
    timeout = setTimeout(generateQR, 500);
}

// Event Listeners
urlInput.addEventListener('input', debounceGenerate);
colorInput.addEventListener('change', generateQR);
bgInput.addEventListener('change', generateQR);
sizeInput.addEventListener('change', generateQR);
generateBtn.addEventListener('click', generateQR);

clearBtn.addEventListener('click', () => {
    urlInput.value = '';
    urlInput.focus();
    generateQR();
});

downloadBtn.addEventListener('click', async () => {
    try {
        const response = await fetch(qrImage.src);
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `hzgpd-qr-${Date.now()}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    } catch (e) {
        console.error('Download failed', e);
        // Fallback: Open in new tab
        window.open(qrImage.src, '_blank');
        alert('Download failed due to browser restrictions. Opened image in new tab.');
    }
});

copyBtn.addEventListener('click', async () => {
    try {
        const response = await fetch(qrImage.src);
        const blob = await response.blob();
        await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob })
        ]);

        // Visual feedback
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<span>Copied!</span>';
        copyBtn.classList.add('success');
        setTimeout(() => {
            copyBtn.innerHTML = originalText;
            copyBtn.classList.remove('success');
        }, 2000);
    } catch (e) {
        console.error('Copy failed', e);
        alert('Copy failed. Your browser might not support clipboard image pasting.');
    }
});

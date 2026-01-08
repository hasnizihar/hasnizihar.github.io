var currentPptx = null;
var originalFileName = "Converted_Presentation";

async function convertPDF() {
    const fileInput = document.getElementById("pdfInput");
    const status = document.getElementById("status");
    const downloadBtn = document.getElementById("downloadBtn");
    const convertBtn = document.getElementById("convertBtn");
    const progressBar = document.getElementById("progressBar");
    const progressContainer = document.getElementById("progressContainer");

    if (!fileInput.files.length) {
        alert("Please select a PDF file");
        return;
    }

    const file = fileInput.files[0];

    // Capture original filename without extension
    originalFileName = file.name.split('.').slice(0, -1).join('.') || "Converted_Presentation";

    // Reset UI
    status.innerText = "Initializing...";
    progressBar.style.width = "0%";
    progressContainer.style.display = "block";
    downloadBtn.style.display = "none";
    convertBtn.disabled = true;

    try {
        const file = fileInput.files[0];
        const arrayBuffer = await file.arrayBuffer();

        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        currentPptx = new PptxGenJS();

        const totalPages = pdf.numPages;

        for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
            const progress = Math.round((pageNum / totalPages) * 100);
            status.innerText = `Processing page ${pageNum} of ${totalPages} (${progress}%)`;
            progressBar.style.width = `${progress}%`;

            const page = await pdf.getPage(pageNum);
            const viewport = page.getViewport({ scale: 2 });

            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            canvas.width = viewport.width;
            canvas.height = viewport.height;

            await page.render({ canvasContext: ctx, viewport }).promise;

            const imgData = canvas.toDataURL("image/png");

            const slide = currentPptx.addSlide();
            slide.addImage({
                data: imgData,
                x: 0,
                y: 0,
                w: "100%",
                h: "100%"
            });
        }

        status.innerText = "✅ Conversion complete!";
        progressBar.style.width = "100%";
        downloadBtn.style.display = "block";
        convertBtn.disabled = false;
    } catch (error) {
        console.error("Conversion error:", error);
        status.innerText = "❌ Error during conversion. Check console.";
        convertBtn.disabled = false;
    }
}

function downloadPPTX() {
    if (!currentPptx) {
        alert("No presentation to download. Please convert a PDF first.");
        return;
    }

    console.log("Downloading PPTX...");

    currentPptx.write("blob")
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = originalFileName + ".pptx";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
            console.log("Download triggered successfully.");
        })
        .catch(err => {
            console.error("Download error:", err);
            alert("Failed to generate download. Check console for details.");
        });
}

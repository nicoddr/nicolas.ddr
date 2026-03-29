const fs = require('fs');
const PDFParser = require("pdf2json");

function parsePDF(filePath, outPath) {
    return new Promise((resolve, reject) => {
        const pdfParser = new PDFParser(this, 1);
        pdfParser.on("pdfParser_dataError", errData => reject(errData.parserError));
        pdfParser.on("pdfParser_dataReady", pdfData => {
            fs.writeFileSync(outPath, pdfParser.getRawTextContent());
            resolve(outPath);
        });
        pdfParser.loadPDF(filePath);
    });
}

async function run() {
    try {
        await parsePDF('./Profile (1).pdf', 'profile_text.txt');
        console.log("Profile extracted.");
        await parsePDF('./Portfolio.pdf', 'portfolio_text.txt');
        console.log("Portfolio extracted.");
    } catch (e) {
        console.error(e);
    }
}
run();

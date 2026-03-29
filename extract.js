const fs = require('fs');
const pdf = require('pdf-parse');

async function extract() {
    try {
        const profileBuffer = fs.readFileSync('./Profile (1).pdf');
        const parseFunc = typeof pdf === 'function' ? pdf : (pdf.PDFParse || pdf.default || pdf.parse);
        // Sometimes PDFParse signature is different, let's just use the default export
        const profileData = await parseFunc(profileBuffer);
        fs.writeFileSync('profile_text.txt', profileData.text);
        console.log("Profile extracted.");
    } catch (e) { console.error("Error reading profile", e); }

    try {
        const portfolioBuffer = fs.readFileSync('./Portfolio.pdf');
        const parseFunc = typeof pdf === 'function' ? pdf : (pdf.PDFParse || pdf.default || pdf.parse);
        const portfolioData = await parseFunc(portfolioBuffer);
        fs.writeFileSync('portfolio_text.txt', portfolioData.text);
        console.log("Portfolio extracted.");
    } catch (e) { console.error("Error reading portfolio", e); }
}

extract();

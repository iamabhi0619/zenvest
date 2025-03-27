const { createCanvas, loadImage } = require('canvas');
const PDFDocument = require('pdfkit');
const path = require('path');

async function generateCertificatePDF(name) {
    console.log(`Generating PDF for ${name}`);
    
    // Path to the template image
    const templateImagePath = path.join(__dirname, "./certificate.png");
    
    // Load the template image
    const image = await loadImage(templateImagePath);
    console.log('Image loaded successfully.');

    // Landscape A4 size at 300 DPI (3508 x 2480 pixels)
    const canvasWidth = 3508;
    const canvasHeight = 2480;

    // Create canvas with the landscape A4 dimensions
    const canvas = createCanvas(canvasWidth, canvasHeight);
    const ctx = canvas.getContext('2d');

    // Draw the template image (scaled to fit the canvas)
    ctx.drawImage(image, 0, 0, canvasWidth, canvasHeight);

    // Set font and style for the name text
    ctx.font = '30px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText(`Name: ${name}`, 500, 1200); // Adjusted for landscape layout

    // Get the image buffer from the canvas
    const imgBuffer = canvas.toBuffer();

    // Create a new PDF document
    const doc = new PDFDocument({ size: [canvasWidth, canvasHeight] });
    let pdfBuffer = [];
    doc.on('data', chunk => pdfBuffer.push(chunk));
    
    // Embed the image buffer into the PDF
    doc.image(imgBuffer, 0, 0, { width: canvasWidth });
    doc.end();

    // Return the generated PDF buffer
    return new Promise((resolve, reject) => {
        doc.on('end', () => {
            const finalPdf = Buffer.concat(pdfBuffer);
            resolve(finalPdf);
        });

        doc.on('error', (err) => {
            reject(err);
        });
    });
}

module.exports = generateCertificatePDF;

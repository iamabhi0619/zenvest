const { Finathone } = require('../model/finathoneUser');
const generateCertificatePDF = require('../service/GenrateCirtificate');
const fs = require('fs');
const path = require('path');


const checkEligibility = async (attendance) => {
    const daysPresent = [...new Set(attendance.map(record => record.day))];
    const attended13 = daysPresent.includes('2024-11-13');
    const attended14 = daysPresent.includes('2024-11-14');
    let eligible = attended13 && attended14;
    let message = "";
    
    if (eligible) {
        message = "Eligible for the certificate.";
    } else if (!attended13 && !attended14) {
        message = "You are not eligible because you didn't attend on either November 13 or 14.";
    } else if (!attended13) {
        message = "You are not eligible because you didn't attend on November 13.";
    } else if (!attended14) {
        message = "You are not eligible because you didn't attend on November 14.";
    }
    
    return {
        eligible,
        message,
    };
};

exports.getUserData = async (req, res) => {
    const { id } = req.params;
    console.log(req.params);
    const user = await Finathone.findOne({ regNumber: id });
    if (!user) {
        return res.json({ status: "error", message: "You are not part of our event." });
    }
    const userResponse = { ...user.toObject() };
    const check = await checkEligibility(userResponse.attendance);
    delete userResponse.payment;
    delete userResponse.__id;
    delete userResponse.__v;
    delete userResponse.attendance;
    return res.json({
        status: "ok",
        user: userResponse,
        eligibility: check,
    });
};
exports.certificate = async(req, res) => {
    const { name } = req.query;

    try {
        const pdfBuffer = await generateCertificatePDF(name);
        // const filePath = path.join(__dirname, 'certificate.pdf');
        // fs.writeFileSync(filePath, pdfBuffer);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="certificate.pdf"');
        res.send(pdfBuffer);
    } catch (error) {
        console.error('Error generating certificate:', error);
        res.status(500).send('Error generating certificate');
    }
}

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const dotenv = require("dotenv");
dotenv.config();
const testController = require('./controller/tesing')
const app = express();
const port = process.env.PORT || 5000;

// Body parser middleware to parse incoming JSON requests
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));


// API route to trigger the WhatsApp message using the controller
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
app.post('/test', testController.test);
app.get('/qr/:data', testController.QRCode);
app.post('/api/payment', testController.payment);
app.get('/api/payment/webhook', testController.details)
// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

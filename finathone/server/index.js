const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const testController = require('./controller/tesing')

// Create an instance of Express
const app = express();
const port = 3000;

// Body parser middleware to parse incoming JSON requests
app.use(bodyParser.json());
app.use(cors());

// API route to trigger the WhatsApp message using the controller
app.post('/test', testController.test);
app.get('/qr/:data', testController.QRCode)

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

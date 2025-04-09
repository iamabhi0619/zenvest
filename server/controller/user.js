const Razorpay = require("razorpay");
const { Workshop } = require("../model/tradeARithm");
const ApiError = require("../utils/ApiError");
const razorpay = new Razorpay({
    key_id: process.env.RAZER_ID,
    key_secret: process.env.RAZER_SECRET,
});


const requiredFields = {
    name: "Full Name",
    email: "Email Address",
    gender: "Gender",
    number: "Phone Number",
    regNumber: "Registration Number",
};

exports.createUser = async (req, res, next) => {
    try {
        const { name, email, gender, number, regNumber, course, year } = req.body;

        // Check if the user already exists
        const existingUser = await Workshop.findOne({ regNumber });
        if (existingUser) {
            return res.status(200).json({
                success: true,
                message: "User already exists.",
                user: existingUser,
            });
        }

        const missingFields = Object.keys(requiredFields).filter(key => !req.body[key]);

        if (missingFields.length > 0) {
            return next(new ApiError(
                400,
                `Missing required fields: ${missingFields.map(field => requiredFields[field]).join(", ")}`,
                "validation",
                `Please provide ${missingFields.map(field => requiredFields[field]).join(", ")} to proceed.`
            ));
        }

        // Validate phone number format (assuming a simple 10-digit validation)
        if (!/^\d{10}$/.test(number)) {
            throw new ApiError(400, "Invalid phone number format.", "validation", "invalid phone number");
        }

        // Create Razorpay order
        const options = {
            amount: process.env.AMOUNT * 100, // Amount in paise (e.g., 50000 paise = 500 INR)
            currency: "INR",
            receipt: `receipt_order_${Date.now()}`,
            payment_capture: 1,
        };
        let order;
        try {
            order = await razorpay.orders.create(options);
        } catch (error) {
            console.error("Error creating Razorpay order:", error);
            throw new ApiError(500, "Failed to create payment order. Please try again later.", "payment", "razorpay error");
        }

        // Save user registration details
        const newUser = new Workshop({
            name,
            email,
            gender,
            number,
            regNumber,
            course,
            year,
            payment: {
                orderId: order.id,
                amount: options.amount,
                status: "Pending",
            },
        });

        try {
            await newUser.save();
        } catch (error) {
            console.error("Database error while saving user:", error);
            throw new ApiError(500, "Failed to register user. Please try again later.", "database", "database error");
        }

        res.status(201).json({
            success: true,
            message: "Registration successful. Complete payment to confirm registration.",
            user: newUser,
        });

    } catch (error) {
        next(error);
    }
};

exports.getUser = async (req, res, next) => {
    try {
        const { regNumber, email, number, orderId, paymentId } = req.query;

        if (!regNumber && !email && !number && !orderId && !paymentId) {
            return next(new ApiError(400, "At least one search parameter (regNumber, email, number, orderId, or paymentId) is required.", "validation"));
        }

        const query = {};
        if (regNumber) query.regNumber = regNumber;
        if (email) query.email = email;
        if (number) query.number = number;
        if (orderId) query["payment.orderId"] = orderId;
        if (paymentId) query["payment.paymentId"] = paymentId;
        const user = await Workshop.findOne(query);
        if (!user) {
            return next(new ApiError(404, "User not found.", "not_found"));
        }
        res.status(200).json({
            success: true,
            message: "User retrieved successfully.",
            user,
        });
    } catch (error) {
        next(error);
    }
};

exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await Workshop.find();

        if (!users || users.length === 0) {
            return next(new ApiError(404, "No users found.", "not_found"));
        }

        res.status(200).json({
            success: true,
            message: "Users retrieved successfully.",
            users,
        });
    } catch (error) {
        next(error);
    }
};

exports.verifyTicket = async (req, res, next) => {
    try {
        const { regNumber, email, phoneNumber } = req.query;
        console.log("Query Parameters:", req.query);

        // Validate input: At least one search parameter is required
        if (!regNumber && !email && !phoneNumber) {
            return next(new ApiError(400, "At least one search parameter (regNumber, email, or phoneNumber) is required.", "validation"));
        }

        // Build the query dynamically based on provided parameters
        const searchCriteria = {};
        if (regNumber) searchCriteria.regNumber = String(regNumber);
        if (email) searchCriteria.email = String(email);
        if (phoneNumber) searchCriteria.number = String(phoneNumber);

        console.log("Search Criteria:", searchCriteria);

        // Find the user in the database
        const user = await Workshop.findOne(searchCriteria);
        console.log("User Found:", user);

        if (!user) {
            return next(new ApiError(404, "User not found.", "not_found"));
        }

        // Check if the payment status is "Success"
        if (user.payment.status !== "Completed") {
            return next(new ApiError(400, "Ticket not verified. Payment is pending.", "validation"));
        }

        // Check if the ticket was already verified within the last hour
        const currentTime = new Date();
        const lastVerification = user.attendance?.slice(-1)[0]; // Get the last verification record
        if (lastVerification && (currentTime - new Date(lastVerification.timestamp)) < 60 * 60 * 1000) {
            return next(new ApiError(400, "Ticket already verified within the last hour.", "validation", "ticket_already_verified"));
        }

        // Add a new verification record to the attendance history
        const newAttendanceRecord = {
            timestamp: currentTime,
        };
        user.attendance = user.attendance || [];
        user.attendance.push(newAttendanceRecord);

        // Save the updated user
        await user.save();

        res.status(200).json({
            success: true,
            message: "Ticket verified successfully.",
            user,
        });
    } catch (error) {
        console.error("Error verifying ticket:", error);
        next(error);
    }
};
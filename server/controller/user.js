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
        const { name, email, gender, number, regNumber, courses, year } = req.body;

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
            amount: process.env.AMOUNT * 100, // Amount in paise
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
            courses,
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

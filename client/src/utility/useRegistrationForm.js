import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export function useRegistrationForm() {
    const navigate = useNavigate(); // Initialize navigate

    useEffect(() => {
        document.title = "Register | Trade-A-Rithm";
    }, []);

    const [formData, setFormData] = useState({
        name: "",
        whatsapp: "",
        email: "",
        course: "",
        year: "",
        gender: "",
        registrationNumber: "", // Added registrationNumber field
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!formData.name.trim()) return setError("Name is required.");
        if (!formData.whatsapp.trim().match(/^\d{10}$/))
            return setError("Enter a valid 10-digit WhatsApp number.");
        if (!formData.email.trim().match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
            return setError("Enter a valid email address.");
        if (!formData.registrationNumber.trim())
            return setError("Registration number is required."); // Added validation for registrationNumber
        if (!formData.course.trim()) return setError("Course is required.");
        if (!formData.year.trim()) return setError("Please select your year of study.");
        if (!formData.gender) return setError("Please select your gender.");

        setLoading(true);
        const payload = {
            name: formData.name,
            email: formData.email,
            whatsapp: formData.whatsapp,
            course: formData.course,
            number: formData.whatsapp,
            gender: formData.gender,
            year: formData.year,
            regNumber: formData.registrationNumber, // Included in payload
        };

        try {
            const response = await axios.post(`http://localhost:5000/api/event/register`, payload);
            const { data } = response;
            console.log(data);

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY,
                amount: data.user.payment.amount,
                currency: data.user.payment.currency,
                name: "ZENVEST",
                description: "Payment for Event Registration",
                image: "https://res.cloudinary.com/dd4m8j8um/image/upload/v1743147410/atpkrbfjeij0pvmf9dly.png",
                order_id: data.user.payment.orderId,
                handler: function (response) {
                    console.log("Payment successful:", response);
                    alert("Payment Done");
                    setFormData({
                        name: "",
                        whatsapp: "",
                        email: "",
                        course: "",
                        year: "",
                        gender: "",
                        registrationNumber: "", // Added registrationNumber field
                    })
                    navigate("/success"); // Redirect to Successfull page
                },
                prefill: {
                    name: data.user.name,
                    email: data.user.email,
                    contact: data.user.number,
                },
                theme: {
                    color: "#005246",
                },
            };
            console.log(options);

            const razorpay = new window.Razorpay(options);
            razorpay.open();
        } catch (err) {
            console.log(err);
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return {
        formData,
        loading,
        error,
        handleChange,
        handleSubmit,
    };
}

import axios from "axios";
import { useState, useEffect } from "react";

export function useRegistrationForm() {
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
        if (!formData.course.trim()) return setError("Course is required.");
        if (!formData.year.trim()) return setError("Please select your year of study.");
        if (!formData.gender) return setError("Please select your gender.");

        setLoading(true);
        const paylode = {
            name: formData.name,
            email: formData.email,
            whatsapp: formData.whatsapp,
            course: formData.course,
            number: formData.whatsapp,
            gender: formData.gender,
            year: formData.year,
            regNumber: 12303842
        };

        try {
            const response = await axios.post("http://localhost:5000/api/event/register", paylode);
            const { data } = response;
            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY,
                amount: data.user.payment.amount,
                currency: data.user.payment.currency,
                name: "ZENVEST",
                description: "Payment for the event",
                image: "https://res.cloudinary.com/dd4m8j8um/image/upload/v1742995648/assets/p0fsklxltgmjxj27vvcl.jpg",
                order_id: data.user.payment.orderId,
                handler: function (response) {
                    const res = axios.post("http://localhost:5000/api/event/verify", response);
                    console.log(res);
                    console.log("Payment successful:", response);
                    alert("payment Done");
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

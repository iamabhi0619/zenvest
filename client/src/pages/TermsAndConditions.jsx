import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6 md:px-20">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Terms and Conditions for Trade-A-Rythm
        </h1>

        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-gray-800">1. Introduction</h2>
            <p className="text-gray-600 mt-2">
              Welcome to <strong>Trade-A-Rythm</strong>, an exclusive finance and trading event
              organized by Zenvest. By participating in this event, you agree to abide by these
              terms and conditions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800">2. Eligibility</h2>
            <ul className="list-disc list-inside text-gray-600 mt-2">
              <li>Participants must be students or professionals interested in finance.</li>
              <li>A valid ID may be required for verification.</li>
              <li>Open to individuals or teams per registration guidelines.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800">3. Registration</h2>
            <ul className="list-disc list-inside text-gray-600 mt-2">
              <li>Register through the official event portal before the deadline.</li>
              <li>Registration fees, if applicable, are non-refundable.</li>
              <li>False information may result in disqualification.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800">4. Payment Terms</h2>
            <ul className="list-disc list-inside text-gray-600 mt-2">
              <li>Fees must be paid in full before the deadline.</li>
              <li>Payments must be made through approved gateways.(razorpay)</li>
              <li>No refunds unless the event is canceled.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800">12. Contact Information</h2>
            <p className="text-gray-600 mt-2">For any queries, please reach out to us at:</p>
            <ul className="list-disc list-inside text-gray-600 mt-2">
              <li>
                <strong>Email:</strong> zenvst.official@gmail.com
              </li>
              <li>
                <strong>Phone:</strong> +91 99155 75999
              </li>
              <li>
                <strong>Website:</strong> www./zenvest-drab.vercel.app
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;

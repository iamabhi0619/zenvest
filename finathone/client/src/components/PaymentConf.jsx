import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import greenData from "./style/green-tick.lottie";
import redData from "./style/red-cross.lottie";

function PaymentConf({status}) {
  return (
    <div className="flex flex-col items-center p-5 gap-4">
      <div>
        {status ? (
          <DotLottieReact
            src={greenData}
            loop
            autoplay
            style={{ width: 250, height: 250 }}
          />
        ) : (
          <DotLottieReact
            src={redData}
            loop
            autoplay
            style={{ width: 180, height: 180 }}
          />
        )}
      </div>
      <div>
        {status ?
        <p className="text-center text-[#000435] font-normal">
          <span className="text-xl">Your payment was successful! 🎉</span>
          <br />
          Event details and your ticket have been sent to your email and
          WhatsApp.
          <br />
          We look forward to seeing you there!
        </p> :
        <p className="text-center text-[#000435] font-normal">
          <span className="text-xl">Unfortunately, your payment did not go through.</span>
          <br />
          Please try again or contact support for assistance.
          <br />
          No charges have been made.
        </p>}
      </div>
    </div>
  );
}

export default PaymentConf;

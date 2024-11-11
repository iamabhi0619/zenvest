import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import greenTickAnimation from "../assets/green-tick-animation.lottie";
import redCrossAnimation from "../assets/red-cross-animation.lottie";
import yellowExcAnimation from "../assets/yellow-exc-animation.lottie";
function AttendanceStatus({ data }) {
  const status = data.status;
  return (
    <div className="bg-themColor-blue h-full w-full flex flex-col items-center my-auto justify-center rounded-2xl">
      <p></p>
      <DotLottieReact
        src={
          status === "1"
            ? greenTickAnimation
            : status === "2"
            ? yellowExcAnimation
            : redCrossAnimation
        } 
        loop={false}
        autoplay
        style={{ width: 180, height: 180 }}
      />
      <p className="text-2xl font-suse text-white font-semibold tracking-wider w-44">{data.message}</p>
    </div>
  );
}
export default AttendanceStatus;

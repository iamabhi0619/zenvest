"use client";
import { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Webcam from "react-webcam";
import jsQR from "jsqr";

const QRScanner = ({ onScanSuccess, scanInterval = 500, facingMode = "environment" }) => {
  const webcamRef = useRef(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      capture();
    }, scanInterval);

    return () => clearInterval(interval);
  }, [scanInterval]);

  const capture = () => {
    const canvas = document.createElement("canvas");
    const video = webcamRef.current?.video;

    if (video?.readyState === 4) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height);

      if (code) {
        setLoading(true);
        if (onScanSuccess) onScanSuccess(code.data);
        setLoading(false);
      }
    }
  };

  return (
    <div className="relative flex items-center justify-center">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/png"
        videoConstraints={{ facingMode }}
        className="w-72 h-72 object-cover rounded-lg border-2 border-dotted"
      />
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="w-64 h-64 border-4 border-red animate-pulse"></div>
      </div>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-10 h-10 border-4 border-green border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

QRScanner.propTypes = {
  onScanSuccess: PropTypes.func,
  scanInterval: PropTypes.number,
  facingMode: PropTypes.string,
};

export default QRScanner;

import React, { useState, useEffect } from "react";
import QrReader from "react-qr-scanner";
const QrScanner = () => {
  const delay = 100;
  const [result, setResult] = useState("No result");
  const [scanning, setScanning] = useState(false);
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);
  useEffect(() => {
    navigator.mediaDevices
      .enumerateDevices()
      .then((deviceInfos) => {
        const videoDevices = deviceInfos.filter(
          (device) => device.kind === "videoinput"
        );
        setDevices(videoDevices);
        const backCamera = videoDevices.find(
          (device) =>
            device.label.toLowerCase().includes("back") ||
            device.label.toLowerCase().includes("environment")
        );
        setSelectedDevice(
          backCamera ? backCamera.deviceId : videoDevices[0]?.deviceId
        );
      })
      .catch((error) => console.error("Error fetching devices:", error));
  }, []);
  const handleScan = (data) => {
    if (data && data.text) {
      setResult(data.text);
      setScanning(false);
    }
  };
  const handleError = (err) => {
    console.error(err);
  };
  const previewStyle = {
    height: 300,
    width: 300,
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="relative flex items-center justify-center mb-4 w-80 h-80">
        {scanning && selectedDevice ? (
          <QrReader
            delay={delay}
            style={previewStyle}
            onError={handleError}
            onScan={handleScan}
            constraints={{
              video: {
                deviceId: selectedDevice
                  ? { exact: selectedDevice }
                  : undefined,
              },
            }}
            className="border-4 border-blue-500 rounded-md shadow-lg"
          />
        ) : (
          <div className="flex items-center justify-center border-4 border-dashed border-gray-400 rounded-md p-5 w-full flex-col">
            <div className="w-full max-w-xs mb-4">
              <select
                onChange={(e) => setSelectedDevice(e.target.value)}
                value={selectedDevice}
                className="max-w-full p-2 border border-gray-300 rounded-md bg-white text-gray-700"
              >
                {devices.map((device, index) => (
                  <option key={device.deviceId} value={device.deviceId}>
                    Camera {index + 1} - {device.label || `Device ${index + 1}`}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={() => setScanning(!scanning)}
              className={`px-4 py-2 mb-4 rounded-md font-semibold text-white ${
                scanning ? "bg-red-500" : "bg-blue-500"
              }`}
            >
              {scanning ? "Stop Scanning" : "Start Scanning"}
            </button>
          </div>
        )}
      </div>
      <div className="w-full max-w-xs p-4 bg-white border border-gray-300 rounded-md shadow-md">
        <p className="text-gray-700 text-center">Scan Result:</p>
        <p className="text-lg font-semibold text-center text-gray-900 mt-2 break-words">
          {result}
        </p>
      </div>
    </div>
  );
};
export default QrScanner;

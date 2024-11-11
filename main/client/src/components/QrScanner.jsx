import React, { useState, useEffect } from "react";
import QrReader from "react-qr-scanner";
import AttendanceStatus from "./AttendanceStatus";

const QrScanner = ({ open, setCamera }) => {
  const [result, setResult] = useState(null);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [videoDevices, setVideoDevices] = useState([]);

  useEffect(() => {
    navigator.mediaDevices
      .enumerateDevices()
      .then((deviceInfos) => {
        const videoInputs = deviceInfos.filter(
          (device) => device.kind === "videoinput"
        );
        setVideoDevices(videoInputs);

        // Automatically select the back camera if available
        const backCamera = videoInputs.find((device) =>
          device.label.toLowerCase().includes("back")
        );
        setSelectedDevice(backCamera ? backCamera.deviceId : videoInputs[0]?.deviceId);
      })
      .catch((error) => console.error("Error fetching devices:", error));
  }, []);

  const handleScan = async (data) => {
    if (data && data.text) {
      setCamera(false);
      try {
        const qrData = JSON.parse(data.text);
        if (!qrData.regNumber) {
          setResult({ status: "3", message: "Invalid QR code" });
          return;
        }
        const token = localStorage.getItem("token");
        const response = await fetch("/api/finathone/attend", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ uniqueId: qrData.regNumber }),
        });
        const result = await response.json();
        setResult(result);
      } catch (error) {
        console.error("Error processing QR data:", error);
        setResult({ status: 2, message: "Invalid QR code" });
      }
    }
  };

  const handleError = (err) => {
    console.error("Error scanning QR code:", err);
  };

  const handleDeviceChange = (event) => {
    setSelectedDevice(event.target.value);
  };

  const previewStyle = { height: 300, width: 300 };

  return (
    <div className="flex flex-col items-center justify-center">
      {videoDevices.length > 1 && (
        <select onChange={handleDeviceChange} value={selectedDevice} className="mt-4 p-2 border rounded">
          {videoDevices.map((device) => (
            <option key={device.deviceId} value={device.deviceId}>
              {device.label || `Camera ${device.deviceId}`}
            </option>
          ))}
        </select>
      )}
      <div className="relative flex items-center justify-center mb-4 w-80 h-80 rounded-2xl">
        {open ? (
          <QrReader
            delay={100}
            style={previewStyle}
            onError={handleError}
            onScan={handleScan}
            constraints={{
              video: {
                deviceId: selectedDevice ? { exact: selectedDevice } : undefined,
              },
            }}
            className="border-4 border-blue-500 rounded-md shadow-lg"
          />
        ) : result ? (
          <AttendanceStatus data={result} />
        ) : (
          <img
            src="https://firebasestorage.googleapis.com/v0/b/zenvest-8f417.appspot.com/o/Designer%20(7).png?alt=media&token=1902f931-1d5f-4319-8a94-1348094d756f"
            alt="Fallback"
            className="rounded-2xl"
          />
        )}
      </div>
      
    </div>
  );
};

export default QrScanner;

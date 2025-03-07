import React, { useState, useEffect } from "react";
import QrReader from "react-qr-scanner";
import AttendanceStatus from "./AttendanceStatus";

const QrScanner = ({ slot }) => {
  const [result, setResult] = useState(null);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [videoDevices, setVideoDevices] = useState([]);
  const [data, setData] = useState();
  const [open, setOpen] = useState(false);

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
        setSelectedDevice(
          backCamera ? backCamera.deviceId : videoInputs[0]?.deviceId
        );
      })
      .catch((error) => console.error("Error fetching devices:", error));
  }, []);

  const handleScan = async (data) => {
    if (data && data.text) {
      setOpen(false);
      setResult(null);
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
          body: JSON.stringify({ uniqueId: qrData.regNumber, slot }),
        });
        const result = await response.json();
        setResult(result);
        if (result.status === "1" || result.status === "2") {
          setData(result.data);
        }
      } catch (error) {
        console.error("Error processing QR data:", error);
        setResult({ status: "2", message: "Invalid QR code" });
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
    <div className="flex flex-col items-center justify-center w-full">
      {videoDevices.length > 1 && (
        <select
          onChange={handleDeviceChange}
          value={selectedDevice}
          className="mt-4 p-2 border rounded"
        >
          {videoDevices.map((device) => (
            <option key={device.deviceId} value={device.deviceId}>
              {device.label || `Camera ${device.deviceId}`}
            </option>
          ))}
        </select>
      )}
      <div className="flex items-center justify-center mb-4 w-80 h-80 rounded-2xl bg-themColor-blue">
        {open ? (
          <QrReader
            delay={100}
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
      {data && (
        <div className="w-full text-xl font-Poppins flex items-center gap-4">
          <img src={data.dp} className="h-24" alt="" />
          <p>{data.name}</p>
        </div>
      )}
      <button
        onClick={() => {
          setOpen(!open);
          setData(null);
        }}
        className="bg-themColor-green py-1 px-3 rounded-2xl text-2xl font-bold font-suse tracking-wide text-themColor-white "
      >
        {!open ? "NEXT" : "SCAN"}
      </button>
    </div>
  );
};

export default QrScanner;

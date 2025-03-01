import React, { useState } from "react";
import axios from "axios";
import { Document, Page, pdfjs } from "react-pdf";

// Explicitly set the workerSrc for PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export const CheckOut = ({ allData }) => {
  const [loading, setLoading] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [error, setError] = useState('');
  const data = allData.user;

  const handleGenerateCertificate = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get('/api/finathone/ap/certificate', {
        params: { name: data.name },
        responseType: 'arraybuffer',
      });

      const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
      const pdfUrl = URL.createObjectURL(pdfBlob);
      setPdfUrl(pdfUrl);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError('Error generating certificate. Please try again.');
      console.error('Error generating certificate:', error);
    }
  };

  const handleDownload = () => {
    if (!pdfUrl) return;
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'certificate.pdf';
    link.click();
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div className="flex justify-center bg-white items-center my-auto py-10 rounded-3xl w-full max-w-lg md:max-w-md">
      {!pdfUrl ? (
        <div className="font-normal p-8 flex flex-col gap-5">
          <div className="flex items-center w-full justify-center">
            <img src={data.dp} alt="" className="rounded-full h-24" />
            <p className="text-3xl text-center">{data.name}</p>
          </div>
          <div className="gap-2">
            <div className="flex items-center justify-center gap-2">
              <p>Registration Number: </p>
              <p className="text-center text-xl">{data.regNumber}</p>
            </div>
          </div>

          <button
            className="w-full py-3 mt-4 bg-blue hover:bg-green text-white font-semibold rounded-lg shadow-md transition duration-200"
            disabled={loading}
            onClick={handleGenerateCertificate}
          >
            {loading ? 'Generating...' : 'Generate Certificate'}
          </button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
      ) : (
        <div className="w-full">
          <h3 className="text-center text-lg mb-4">Certificate Preview</h3>
          <div className="border border-gray-300 rounded-lg">
            <Document
              file={pdfUrl}
              onLoadSuccess={onDocumentLoadSuccess}
              loading="Loading PDF..."
            >
              {Array.from(new Array(numPages), (el, index) => (
                <Page key={`page_${index + 1}`} pageNumber={index + 1} />
              ))}
            </Document>
          </div>
          <button
            onClick={handleDownload}
            className="mt-4 py-2 px-6 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
          >
            Download Certificate
          </button>
        </div>
      )}
    </div>
  );
};

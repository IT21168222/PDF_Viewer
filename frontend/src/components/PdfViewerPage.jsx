import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import axios from "axios";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import Footer from "./Footer";

const PdfViewerPage = () => {
  const { id } = useParams();
  const [pdfData, setPdfData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPdf = async () => {
      try {
        const response = await axios.get(
          `https://pdf-viewer-backend-sepia.vercel.app/pdf/get/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            responseType: "arraybuffer",
          }
        );
        const pdfBlob = new Blob([response.data], {
          type: response.headers["content-type"],
        });
        const pdfUrl = URL.createObjectURL(pdfBlob);
        setPdfData(pdfUrl);
      } catch (error) {
        setError("Error fetching PDF");
      }
    };

    fetchPdf();
  }, [id]);

  const layoutPluginInstance = defaultLayoutPlugin();

  return (
    <>
      <div className="container mt-5">
        <h1 className="mb-4">Viewing PDF</h1>
        {pdfData ? (
          <div className="pdf-viewer">
            <Worker
              workerUrl={`//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`}
            >
              <Viewer fileUrl={pdfData} plugins={[layoutPluginInstance]} />
            </Worker>
          </div>
        ) : error ? (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        ) : (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "100vh" }}
          >
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default PdfViewerPage;

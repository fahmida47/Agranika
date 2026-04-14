import React, { useState, useEffect } from "react";

const CarbonFootprintDisplay = () => {
  const [data, setData] = useState({ gCO2: 0, bytes: 0 });

  useEffect(() => {
    const calculateFootprint = () => {
    
      const resources = window.performance.getEntriesByType("resource");
      const totalBytes = resources.reduce(
        (acc, res) => acc + (res.transferSize || 0),
        0
      );

      
      const carbonEmitted = (totalBytes / (1024 * 1024 * 1024)) * 442;

      setData({
        gCO2: carbonEmitted,
        bytes: totalBytes,
      });
    };

   
    calculateFootprint();
    const interval = setInterval(calculateFootprint, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        bottom: 20,
        right: 20,
        background: "rgba(255, 255, 255, 0.95)",
        padding: "15px",
        borderRadius: "12px",
        zIndex: 9999,
        boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
        border: "1px solid #4CAF50",
        fontFamily: "Arial, sans-serif",
        minWidth: "200px"
      }}
    >
      <h4 style={{ margin: "0 0 10px 0", color: "#2E7D32", display: "flex", alignItems: "center" }}>
        🌿 Carbon Monitor
      </h4>
      <div style={{ fontSize: "14px", color: "#333" }}>
        <p style={{ margin: "5px 0" }}>
          <strong>Data used:</strong> {(data.bytes / 1024).toFixed(2)} KB
        </p>
        <p style={{ margin: "5px 0" }}>
          <strong>Emissions:</strong> {data.gCO2.toFixed(4)} g CO2
        </p>
      </div>
      <div style={{ height: "4px", background: "#e0e0e0", borderRadius: "2px", marginTop: "10px" }}>
        <div style={{ width: "40%", height: "100%", background: "#4CAF50", borderRadius: "2px" }}></div>
      </div>
    </div>
  );
};

export default CarbonFootprintDisplay;
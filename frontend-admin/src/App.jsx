import React from "react";
import RoutesRoot from "./routes/index.jsx";
import { useAuth } from "./hooks/useAuth.js";
import "./App.css";

export default function App() {
  const { isInitializing } = useAuth();

  if (isInitializing) {
    return (
      <div className="loading-spinner">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <div className="spinner"></div>
          <p style={{ color: "#4b5563", fontWeight: 500 }}>
            Loading application...
          </p>
        </div>
      </div>
    );
  }

  return <RoutesRoot />;
}

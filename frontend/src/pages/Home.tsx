import React from "react";

export const Home: React.FC = () => {
  return (
    <div
      style={{
        padding: "20px",
        background: "#f4f4f4",
        minHeight: "100vh",
        textAlign: "center",
      }}
    >
      <h1>Welcome to My App</h1>
      <p>This is a test page for Playwright screenshot testing.</p>
      <button style={{ padding: "10px 20px", fontSize: "16px" }}>
        Click Me
      </button>
    </div>
  );
};

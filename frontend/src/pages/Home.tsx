import React, { useState } from "react";

export const Home: React.FC = () => {
  const [count, setCount] = useState(0);

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
      <p>This is a test page for Playwright testing.</p>
      <button
        onClick={() => setCount(count + 1)}
        style={{ padding: "10px 20px", fontSize: "16px" }}
      >
        Click Me
      </button>
      <p data-testid="counter">Counter: {count}</p>
    </div>
  );
};

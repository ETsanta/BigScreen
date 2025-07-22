import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "@ant-design/v5-patch-for-react-19";
import App from "./App.jsx";

window.addEventListener("error", (e) => {
  console.error("Global error:", e);
});

// 初始化代码添加 try-catch
try {
  ReactDOM.createRoot(document.getElementById("root")).render(<App />);
} catch (e) {
  console.error("Render error:", e);
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);

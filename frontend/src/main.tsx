import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import { App } from "./App";
import "./styles.css";

const CLERK_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const hasClerk = CLERK_KEY && !CLERK_KEY.includes("REPLACE_ME");

function Root() {
  const inner = (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  if (hasClerk) {
    return <ClerkProvider publishableKey={CLERK_KEY}>{inner}</ClerkProvider>;
  }

  return inner;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Root />
  </StrictMode>
);

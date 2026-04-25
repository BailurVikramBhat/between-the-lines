import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource/newsreader/500.css";
import "@fontsource/newsreader/600.css";
import "@fontsource/public-sans/400.css";
import "@fontsource/public-sans/500.css";
import "@fontsource/public-sans/600.css";
import App from "./App";
import "@/styles/globals.css";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from "./theme/theme";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>,
);

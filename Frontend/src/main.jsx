import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { queryClient } from "./queryClient.js";
import { QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import { store } from "./Store/store.js";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <StrictMode>
        <App />
      </StrictMode>
    </QueryClientProvider>
  </Provider>
);

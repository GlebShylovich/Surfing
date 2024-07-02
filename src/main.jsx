import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App/App.jsx";
import { initializeApp } from "firebase/app";
import appConfig from "../config.js";
import { BrowserRouter } from "react-router-dom";
import { store } from "./Services/store.js";
import { Provider } from "react-redux";
import "./Styles/index.scss";
import { QueryClient, QueryClientProvider } from "react-query";

initializeApp(appConfig);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={new QueryClient()}>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);

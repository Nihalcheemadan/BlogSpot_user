import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { DarkModeContextProvider } from "./context/darkModeContext";
import { Provider } from "react-redux";
import store  from "./redux/store";
import './tailwind.css';


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <DarkModeContextProvider>
        <App />
    </DarkModeContextProvider>
  </Provider>
);
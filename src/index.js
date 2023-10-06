import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider } from "@chakra-ui/react";
import customTheme from "theme";
import { WalletProvider } from "contexts/useWallet";
import { GameProvider } from "contexts/useGame";
import { BrowserRouter } from "react-router-dom";
import {
  Provider as ReduxProvider,
} from "react-redux";
import "@fontsource/space-grotesk"; // Defaults to weight 400
import "@fontsource/space-grotesk/500.css"; // Specify weight
import { Toaster } from "react-hot-toast";
import store from "store/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={customTheme}>
        <ReduxProvider store={store}>
          <WalletProvider>
            <GameProvider>
              <Toaster
                position="bottom-right"
                reverseOrder={true}
                toastOptions={{
                  style: {
                    padding: "8px",
                    fontSize: "16px",
                    color: "#57527E",
                    borderRadius: "5px",
                    background: "#E8FDFF",
                  },
                }}
              />
              <App />
            </GameProvider>
          </WalletProvider>
        </ReduxProvider>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

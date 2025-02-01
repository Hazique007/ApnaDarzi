import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import SearchContextProvider from "./Context Api/searchContext.jsx";
import App from "./App.jsx";
import { ProductProvider } from "./Context Api/trackProduct.jsx";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
//
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ProductProvider>
      <SearchContextProvider>
        <App />
      </SearchContextProvider>
    </ProductProvider>
  </StrictMode>
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register({
  onUpdate: (registration) => {
    if (registration && registration.waiting) {
      console.log("New content is available; please refresh.");
    }
  },
});

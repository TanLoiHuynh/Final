import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { PhotoProvider } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <PhotoProvider>
            <App/>
        </PhotoProvider>
    </React.StrictMode>
);

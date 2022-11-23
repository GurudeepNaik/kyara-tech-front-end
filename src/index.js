import React from "react";
import ReactDOM from "react-dom/client";
import { APIContextProvider } from "./context/context";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import Uploads from "./components/Uploads";
import Users from "./components/Users";
import EditPage from "./components/EditPage";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <APIContextProvider>
        <Routes>
          <Route element={<Uploads />} path="/" />
          <Route element={<Users />} path="/users" />
          <Route element={<EditPage />} path="/edit" />
        </Routes>
      </APIContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
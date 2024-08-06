import "./App.css";
import React, { Fragment } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Employee from "./Components/Employee";
import Signup from "./Components/Signup";
import { Tables } from "./pages/Table";
import { Hero404 } from "./pages/Hero404";
import { Profile } from "./pages/Profile";

function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/tables" element={<Tables />} />
          <Route path="/hero404" element={<Hero404 />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/employee" element={<Employee />} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;

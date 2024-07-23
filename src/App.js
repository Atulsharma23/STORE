import React, { useState } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ApiIntegration from "./components/Home";
import Adduser from "./components/Adduser";
import Newuser from "./components/Newuser";
import Restraunt from "./components/Restraunt";
import Products from "./components/Products";
import Eventlisting from "./components/Eventlisting";
import Youtube from "./components/Youtube";
import Events from "./components/Events";
import Payment from "./components/Payment";
import School from "./components/School";
import History from "./components/History";
import Login from "./components/Login";
import Signup from "./components/Signup";
import "./App.css";
import "./responsive.css";

function App() {

  const [userIsRegistered, setUserIsRegistered] = useState(false);



  return (
    <div className="App">
      <Router>

        {userIsRegistered && <Navbar setUserIsRegistered={setUserIsRegistered} />}
        <Routes>
          {!userIsRegistered ? (
            <>
              <Route path="/" element={<Login setUserIsRegistered={setUserIsRegistered} />} />
              <Route path="/signup" element={<Signup setUserIsRegistered={setUserIsRegistered} />} />
            </>
          ) : (
            <>
              <Route path="/Newuser" element={<Newuser />} />
              <Route path="/Home" element={<ApiIntegration />} />
              <Route path="/Adduser" element={<Adduser />} />
              <Route path="/Restraunt" element={<Restraunt />} />
              <Route path="/" element={<ApiIntegration />} />
              <Route path="/Products" element={<Products />} />
              <Route path="/Youtube" element={<Youtube />} />
              <Route path="/Events" element={<Events />} />
              <Route path="/Eventlisting" element={<Eventlisting />} />
              <Route path="/Payment" element={<Payment />} />
              <Route path="/School" element={<School />} />
              <Route path="/History" element={<History />} />
            </>
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;

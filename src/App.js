import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import PaymentButton from "./components/Home"
import Adduser from "./components/Adduser";
import Newuser from "./components/Newuser";
import Restraunt from "./components/Restraunt";
import Products from "./components/Products";
import Eventlisting from "./components/Eventlisting";
import Youtube from "./components/Youtube";
import Events from "./components/Events";
import Payment from "./components/Payment";
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />

        {/* <Adduser /> */}
        <Routes>
          <Route path="/Newuser" element={<Newuser />} />
          <Route path="/Home" element={<PaymentButton />} />
          <Route path="/Adduser" element={<Adduser />} />
          <Route path="/Restraunt" element={<Restraunt />} />
          <Route path="/Products" element={<Products />} />
          <Route path="/Youtube" element={<Youtube />} />
          <Route path="Events"  element={<Events/>}/>
          <Route path="Eventlisting"  element={<Eventlisting/>}/>
          <Route path="Payment"  element={<Payment/>}/>

        </Routes>
      </Router>
    </div>
  );
}

export default App;

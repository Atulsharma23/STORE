import React from "react";
import { Link, useNavigate } from "react-router-dom";
const Navbar = ({ setUserIsRegistered }) => {
  const navigate = useNavigate();

  const handleLogout = () => {

    setUserIsRegistered(false);
    localStorage.removeItem("userIsRegistered");

    sessionStorage.setItem("auth", "false");
    sessionStorage.setItem("email", null);
    navigate("/"); // Redirect to the "/" route

  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">

          <Link className="navbar-brand" to="/">
            STORE
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/Home">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/Adduser"
                >
                  Add User
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/Newuser"
                >
                  New User
                </Link>
              </li>
              <Link
                className="nav-link active"
                aria-current="page"
                to="/Restraunt"
              >
                Restraunt List
              </Link>
              <Link
                className="nav-link active"
                aria-current="page"
                to="/Products"
              >
                Product List
              </Link>
              <Link
                className="nav-link active"
                aria-current="page"
                to="/Youtube"
              >
                Youtube Form
              </Link>

              <Link
                className="nav-link active"
                aria-current="page"
                to="/Events"
              >
                Events
              </Link>
              <Link
                className="nav-link active"
                aria-current="page"
                to="/Eventlisting"
              >
                Event Listing
              </Link>
              <Link
                className="nav-link active"
                aria-current="page"
                to="/Payment"
              >
                Payment Listing
              </Link>

              <Link
                className="nav-link active"
                aria-current="page"
                to="/school"
              >
                School Form              </Link>
                <Link
                className="nav-link active"
                aria-current="page"
                to="/Gender"
              >
                Gender list             </Link>
            </ul>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <button className="btn btn-danger" onClick={handleLogout} >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Signup = ({ setUserIsRegistered }) => {
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const notify = () => toast.success("You are successfully registered!");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword && name && email && password) {
      try {
        const response = await axios.post("http://localhost:3000/users", {
          name,
          email,
          password,
        });
        if (response.status === 201) {
          // Handle successful registration
          setUserIsRegistered(true);
          notify();
          navigate("/"); // Redirect to the "/" route
        } else {
          // Handle registration failure
          alert("Registration failed. Please try again.");
        }
      } catch (error) {
        console.error("Error registering:", error);
        if (error.response) {
          alert(
            `Error: ${error.response.data.message || "Registration failed"}`
          );
        } else {
          alert("An error occurred while registering. Please try again.");
        }
      }
    } else {
      // Handle password mismatch or empty fields
      alert("Passwords do not match or fields are empty.");
    }
    // Reset form fields
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };
  return (
    <div className="Loginpage">
      <div className="container1">
        <div className="left-section">
          <img src="images/payken 1.png" alt="Payken Logo" />
          <div className="left-des">
            <h2>Don't swap just Payken</h2>
            <h4>Welcome to Payken</h4>
          </div>
        </div>
        <div className="right-section">
          <h3>Create Account</h3>
          <form onSubmit={handleSubmit} className="divoisionkabaap">
            <div className="divisonof">
              <label htmlFor="username"></label>
              <img src="images/User.png" alt="Username Icon" />
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Username"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <br />
            <div className="divisonof">
              <label htmlFor="Email"></label>
              <img src="images/Email.png" alt="Email Icon" />
              <input
                type="email"
                id="Email"
                name="Email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <br />
            <div className="divisonof">
              <label htmlFor="Password"></label>
              <img src="images/Password.png" alt="Password Icon" />
              <input
                type={showPass ? "text" : "password"}
                id="Password"
                name="Password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <img
                className="eye-image"
                src="images/Eye.png"
                alt="Show Password"
                onClick={() => setShowPass(!showPass)}
              />
            </div>
            <br />
            <div className="divisonof">
              <label htmlFor="Confirm Password"></label>
              <img src="images/Password.png" alt="Confirm Password Icon" />
              <input
                type={showConfirmPass ? "text" : "password"}
                id="Confirm Password"
                name="Confirm Password"
                placeholder="Confirm Password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <img
                className="eye-image"
                src="images/Eye.png"
                alt="Show Password"
                onClick={() => setShowConfirmPass(!showConfirmPass)}
              />
            </div>
            <br />
            <button type="submit" className="log">
              Sign Up
            </button>
            <br />
            <div className="Newtopaypal">
              <h6>Already Registered?</h6>
              <Link to="/">Log In</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Signup;

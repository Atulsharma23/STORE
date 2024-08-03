import React, { useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const Login = ({ setUserIsRegistered }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const showPassfn = (e) => {
    e.preventDefault();
    console.log("show password");
    setShowPass(!showPass);
  };

  const notify = () => toast.success("You are successfully Logging in!");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    if (isSigningUp) {
      // Perform registration
      if (password === confirmPassword && email && password) {
        try {
          const response = await axios.post("http://localhost:3000/users", {
            email,
            password,
          });

          if (response.status === 201) {
            // Handle successful registration
            notify();
            localStorage.setItem("userIsRegistered", "true");
            sessionStorage.setItem("auth", "true");
            sessionStorage.setItem("email", email);
            setTimeout(() => {
              setUserIsRegistered(true);


            }, 7000); // 1-second delay
          } else {
            // Handle registration failure
            alert("Registration failed. Please try again.");
          }
        } catch (error) {
          console.error("Error registering:", error);
          if (error.response) {
            alert(`Error: ${error.response.data.message || "Registration failed"}`);
          } else {
            alert("An error occurred while registering. Please try again.");
          }
        }
      } else {
        // Handle password mismatch or empty fields
        alert("Passwords do not match or fields are empty.");
      }
    } else {
      // Perform login
      if (email && password) {
        try {
          const response = await axios.get(`http://localhost:3000/users?email=${email}`);

          if (response.data.length > 0) {
            // User exists, proceed with login
            const user = response.data[0];
            if (user.password === password) {
              notify("Login successful!");
              localStorage.setItem("userIsRegistered", "true");
              sessionStorage.setItem("auth", "true");
              sessionStorage.setItem("email", email);
              setTimeout(() => {
                setUserIsRegistered(true);
              }, 2000); // 2-second delay
            } else {
              alert("Login failed. Please check your credentials.");
            }
          } else {
            alert("User does not exist. Please register.");
          }
        } catch (error) {
          console.error("Error logging in:", error);
          if (error.response) {
            alert(`Error: ${error.response.data.message || "Login failed"}`);
          } else if (error.request) {
            alert("No response received from the server.");
          } else {
            alert("An error occurred while logging in. Please try again.");
          }
        }
      } else {
        alert("Please fill in both fields.");
      }
    }

    // Reset form fields
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="container">
      <Toaster position="top-right" reverseOrder={false} />

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
            <form className="advance-div" onSubmit={handleSubmit}>
              <h3>Sign In</h3>
              <div className="divisonof">
                <label htmlFor="Email"></label>
                <img src="images/Email.png" alt="Email Icon" />
                <input
                  type="text"
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
                  onClick={showPassfn}
                />
              </div>
              <div className="Forgot-link">
                <Link to="">Forgot Password?</Link>
              </div>
              <button type="submit" className="log">
                Log in
              </button>
              <div className="Newtopaypal">
                <h6>Need Help?</h6> <Link to="/Signup">Create account</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

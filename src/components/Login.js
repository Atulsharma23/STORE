import React, { useState } from "react";
import axios from "axios";

const Login = ({ setUserIsRegistered }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSigningUp, setIsSigningUp] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmail("")
    setPassword("")
    setConfirmPassword("")
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
            setUserIsRegistered(true);
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
              setUserIsRegistered(true);
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
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {isSigningUp && (
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        )}
        <button type="submit">
          {isSigningUp ? "Register" : "Login"}
        </button>
        {!isSigningUp && (
          <button type="button" onClick={() => setIsSigningUp(true)}>Sign Up</button>
        )}
        {isSigningUp && (
          <button type="button" onClick={() => setIsSigningUp(false)}>Already a user?</button>
        )}
      </form>
    </div>
  );
};

export default Login;

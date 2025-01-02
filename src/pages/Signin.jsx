import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = ({ authenticateUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignIn = () => {
    if (authenticateUser(email, password)) {
      navigate("/"); // Redirect to Home after successful sign-in
    } else {
      setError("Invalid credentials! Please try again.");
    }
  };

  return (
    <div className="sign-in-container ">
      <h1>Sign Up</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSignIn();
        }}
      >
        <div>
          <label>Email:</label>
          <input
            placeholder="Enter your email address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            placeholder="Enter Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignIn;

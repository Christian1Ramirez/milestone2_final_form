import React, { useState } from "react";
import { Link } from "react-router-dom";
import supabase from "./Services/supabaseClient";
import Navbar from "./Navbar";

function SignUp() {
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [signUpError, setSignUpError] = useState("");

 const handleSignUp = async (e) => {
  e.preventDefault();

  if (email === "" || password === "") {
   setSignUpError("Email and Password fields cannot be empty.");
   return;
  }

  const { error } = await supabase.auth.signUp({
   email: email,
   password: password,
  });

  if (error) {
   setSignUpError(processSupabaseError(error));
  } else {
   window.alert(
    "Signup successful. Check your email for the verification link."
   );
  }
 };

 const processSupabaseError = (error) => {
  switch (error.message) {
   case "A user with this email already exists.":
    return "The email you entered is already in use. Please use a different email.";
   case "Password must be at least 6 characters.":
    return "Your password needs to be at least 6 characters long.";
   default:
    return error.message;
  }
 };

 const loginContainerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  // backgroundColor: "#0B1B3D", // Set the background color (RGB: 255, 159, 3)
 };

 const loginFormStyle = {
  backgroundColor: "#f2f2f2",
  padding: "30px",
  border: "1px solid #ccc",
  borderRadius: "5px",
  width: "350px",
 };

 const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  border: "1px solid #ccc",
  borderRadius: "5px",
  fontSize: "16px",
 };

 const buttonStyle = {
  width: "100%",
  padding: "10px",
  border: "none",
  borderRadius: "5px",
  fontSize: "16px",
  fontWeight: "bold",
  backgroundColor: "#0B1B3D",
  color: "#fff",
  cursor: "pointer",
 };

 return (
  <div>
   <Navbar />

   <div style={loginContainerStyle}>
    <div style={loginFormStyle}>
     <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Sign Up</h1>
     <form onSubmit={handleSignUp}>
      <div style={{ marginBottom: "10px" }}>
       <label htmlFor="emailInput"></label>
       <input
        type="email"
        placeholder="Enter an Email"
        id="emailInput"
        value={email}
        style={inputStyle}
        onChange={(e) => setEmail(e.target.value)}
       />
      </div>
      <div style={{ marginBottom: "10px" }}>
       <label htmlFor="passwordInput"></label>
       <input
        type="password"
        placeholder="Create a Password"
        id="passwordInput"
        value={password}
        style={inputStyle}
        onChange={(e) => setPassword(e.target.value)}
       />
      </div>
      <button style={buttonStyle} type="submit">
       Sign Up
      </button>
      <p style={{ textAlign: "center", marginTop: "10px" }}>
       Already a member? <Link to="/login">Login!</Link>
      </p>
      {signUpError && <div>{signUpError}</div>}
     </form>
    </div>
   </div>
  </div>
 );
}

export default SignUp;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import supabase from "./Services/supabaseClient";
const Login = () => {
 const [state, setState] = useState({ email: "", password: "" });
 const navigate = useNavigate();

 const handleLogin = async () => {
  try {
   const { email, password } = state;
   if (!email || !password) {
    return;
   }

   const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
   });

   if (error) {
    console.error("Login failed:", error.message);
    alert("Login failed! Please check your credentials and try again.");
    return;
   }

   localStorage.setItem("token", data.access_token);
   alert("Login successful!");
   navigate("/");
  } catch (error) {
   console.error("Login error:", error);
  }
 };

 const loginContainerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
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
  <>
   <style>{`
        body {
          margin: 0;
          // background-color: rgb(255, 159, 3);
        }
      `}</style>
   <Navbar />
   <div style={loginContainerStyle}>
    <div style={loginFormStyle}>
     <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Login</h1>
     <form>
      <div style={{ marginBottom: "10px" }}>
       <input
        type="email"
        placeholder="Email"
        id="email"
        value={state.email}
        onChange={(e) => setState({ ...state, email: e.target.value })}
        style={inputStyle}
       />
      </div>
      <div style={{ marginBottom: "10px" }}>
       <input
        type="password"
        placeholder="Password"
        id="password"
        value={state.password}
        onChange={(e) => setState({ ...state, password: e.target.value })}
        style={inputStyle}
       />
      </div>
      <button type="button" onClick={handleLogin} style={buttonStyle}>
       Login
      </button>
      <p style={{ textAlign: "center", marginTop: "10px" }}>
       Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
     </form>
    </div>
   </div>
  </>
 );
};

export default Login;

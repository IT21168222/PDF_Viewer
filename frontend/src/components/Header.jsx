import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";


function Header() {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    window.location.reload(true);
  };
  const handleSignIn = () => {
    navigate("/SignIn");
  };


  return (
    <>
      <style>{styles}</style>
      <div class="header">
        <a href="/" class="logo">PDF Viewer</a>
        <div class="header-right">
          {/* <a class="active" href="/SignIn">Sign In</a> */}

          {localStorage.getItem('token') ? (
            <button className="btnStyle" onClick={handleSignOut}>Sign Out</button>
          ) : (
            <button className="btnStyle" onClick={handleSignIn}>Sign In</button>
          )}
        </div>
      </div>

    </>
  );
}


const styles = `
.header {
  overflow: hidden;
  background-color: #f1f1f1;
  padding: 20px 10px;
}

.header a {
  float: left;
  color: black;
  text-align: center;
  padding: 5px 12px 5px 12px;
  text-decoration: none;
  font-size: 18px; 
  line-height: 25px;
  border-radius: 4px;
}

.header a.logo {
  font-size: 25px;
  font-weight: bold;
}

.header a:hover {
  background-color: #ddd;
  color: black;
}

.header a.active {
  background-color: dodgerblue;
  color: white;
}

.header-right {
  float: right;
}

@media screen and (max-width: 500px) {
  .header a {
    float: none;
    display: block;
    text-align: left;
  }
  
  .header-right {
    float: none;
  }

  
}
.btnStyle{
  background-color: dodgerblue;
  color: black;
  padding: 5px 12px 5px 12px;
  border-radius:5px;
  font-size: 17px; 
  border: none;
    `

export default Header;

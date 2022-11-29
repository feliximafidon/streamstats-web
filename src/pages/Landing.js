import logo from '../assets/images/logo.svg';
import '../App.css';
import React, { useState, useEffect } from "react";

function Landing({ alert }) {

  return (                      
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        StreamStats... You, on top, every time...
      </p>
      <span>Just a minute... </span>
    </header>
  );
}

export default Landing;

import logo from '../assets/images/logo.svg';
import React from "react";

function Landing() {

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

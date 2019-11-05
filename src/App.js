import React from "react";

import Balance from "./Components/Balance/Balance.js";
import Footer from "./Components/Layouts/Footer.js";
import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="HeaderInfo">
          <img src={logo} className="App-logo" alt="logo" />
          <span className="AppName">Personal Wallet!</span>
        </div>
      </header>
      <body>
        <div className="BodyContainer">
          <Balance />
        </div>
      </body>
      <Footer />
    </div>
  );
}

export default App;

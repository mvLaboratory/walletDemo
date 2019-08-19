import React from "react";
import Balance from "./components/Balance/Balance.js";
import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="HeaderInfo">
          <img src={logo} className="App-logo" alt="logo" />
          <span className="AppName">Personal Wallet</span>
        </div>
      </header>
      <body>
        <div className="BodyContainer">
          <Balance />
        </div>
      </body>
      <footer className="Footer">2019 wallet</footer>
    </div>
  );
}

export default App;

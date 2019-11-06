import React from "react";

import Balance from "./Components/Balance/Balance.js";
import Footer from "./Components/Layouts/Footer.js";
import Header from "./Components/Layouts/Header.js";

import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
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

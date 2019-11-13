import React from "react";

import Balance from "./Components/Balance/Balance.js";
import {Footer, Header} from "./Components/Layouts";

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

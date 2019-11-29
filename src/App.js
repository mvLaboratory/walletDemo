import React from "react";

import BalancePage from "./Components/Balance/BalancePage.js";
import {Footer, Header} from "./Components/Layouts";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="BodyContainer">
        <BalancePage />
      </div>
      <Footer />
    </div>
  );
}

export default App;

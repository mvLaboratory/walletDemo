import React from "react";

import BalanceSummary from "./Components/Balance/BalanceSummary.js";
import {Footer, Header} from "./Components/Layouts";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="BodyContainer">
        <BalanceSummary />
      </div>
      <Footer />
    </div>
  );
}

export default App;

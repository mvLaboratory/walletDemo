import React from "react";

import BalancePage from "./Components/Balance/BalancePage.js";
import {Footer, Header} from "./Components/Layouts";

import "./App.css";

function App() {
  const appPages = {
    balance: {id: 0, component: <BalancePage />},
    currency: {id: 1, component: <div>currency</div>}
  }
  const defaultPage = appPages.balance;
  
  const [activeTabId, setActiveTabId] = React.useState(defaultPage.id);

  const getPageComponent = () => {
    const pagesNames = Object.keys(appPages);
    return (
      (appPages[pagesNames[activeTabId]] || defaultPage).component
    );
  }

  return (
    <div className="App">
      <Header />
      <div className="BodyContainer">
        {getPageComponent()}
      </div>
      <Footer activeTabId={activeTabId} setActiveTabId={setActiveTabId}/>
    </div>
  );
}

export default App;

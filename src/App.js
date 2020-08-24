import React from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';

import BalancePage from "./Components/Balance/BalancePage.js";
import CurrencyPage from "./Components/Currency/CurrencyPage.js"
import {Footer, Header} from "./Components/Layouts";

import "./App.css";

const CALLBACK_PATH = '/login/callback';

function App() {
  const appPages = {
    balance: {id: 0, component: <BalancePage />},
    currency: {id: 1, component: <CurrencyPage />}
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
    <Router>
      <Route path="/">
        <div className="App">
          <Header />
          <div className="BodyContainer">
            {getPageComponent()}
          </div>
          <Footer activeTabId={activeTabId} setActiveTabId={setActiveTabId}/>
        </div>
      </Route>
      <Route path={CALLBACK_PATH} />
    </Router>
  );
}

export default App;

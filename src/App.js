import React from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import BalancePage from "./Components/Balance/BalancePage.js";
import CurrencyPage from "./Components/Currency/CurrencyPage.js"
import {Footer, Header} from "./Components/Layouts";
import Auth from "./auth/auth"

import "./App.css";

const CALLBACK_PATH = '/login/callback';

function App(props)  {
  const auth = new Auth(props.history);
  const appPages = {
    balance: {id: 0, component: <BalancePage auth={auth}/>},
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
      <Route path="/" exact >
        <div className="App">
          <Header auth={auth}/>
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

import React from "react";
import { Route } from 'react-router-dom';
import BalancePage from "./Components/Balance/BalancePage.js";
import CurrencyPage from "./Components/Currency/CurrencyPage.js"
import Callback from "./auth/Callback"
import {Footer, Header} from "./Components/Layouts";
import Auth from "./auth/auth"

import "./App.css";

function App(props)  {
  const auth = new Auth();
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

  const renderAppComponents = () => {
    return (        
      <div className="App">
        <Header auth={auth}/>
        <div className="BodyContainer">
          {getPageComponent()}
        </div>
        <Footer activeTabId={activeTabId} setActiveTabId={setActiveTabId}/>
      </div>
      );
  }

  return (
    <>
      <Route path="/" exact >
        { !auth.isAuthenticated() && !auth.isCallbackPage() ? auth.login() : renderAppComponents() }
      </Route>
      <Route path="/login/callback" render={props => <Callback auth={auth} {...props} />} />
    </>
  );
}

export default App;

import React from "react";
import { Route } from "react-router-dom";
import BalancePage from "./components/balance/BalancePage.js";
import CurrencyPage from "./components/currency/CurrencyPage.js";
import OperationCategoryPage from "./components/operationCategory/OperationCategoryPage.js";
import Callback from "./auth/Callback";
import { Footer, Header } from "./components/layouts";
import Auth from "./auth/auth";

import "./App.css";

function App(props) {
  const auth = new Auth();
  const appPages = {
    balance: { id: 0, component: <BalancePage auth={auth} /> },
    operationCategory: {
      id: 1,
      component: <OperationCategoryPage auth={auth} />,
    },
    currency: { id: 2, component: <CurrencyPage /> },
  };
  const defaultPage = appPages.balance;
  const [activeTabId, setActiveTabId] = React.useState(defaultPage.id);

  const getPageComponent = () => {
    const pagesNames = Object.keys(appPages);
    return (appPages[pagesNames[activeTabId]] || defaultPage).component;
  };

  const renderAppComponents = () => {
    return (
      <div className="App">
        <Header auth={auth} />
        <div className="BodyContainer">{getPageComponent()}</div>
        <Footer activeTabId={activeTabId} setActiveTabId={setActiveTabId} />
      </div>
    );
  };

  return (
    <>
      <Route path="/" exact>
        {!auth.isAuthenticated() && !auth.isCallbackPage()
          ? auth.login()
          : renderAppComponents()}
      </Route>
      <Route
        path="/login/callback"
        render={(props) => <Callback auth={auth} {...props} />}
      />
    </>
  );
}

export default App;

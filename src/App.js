import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import BalancePage from "./components/balance/BalancePage";
import CurrencyPage from "./components/currency/CurrencyPage";
import OperationCategoryPage from "./components/operationCategory/OperationCategoryPage";
import Callback from "./auth/Callback";
import { Footer, Header } from "./components/layouts";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Auth from "./auth/auth";

import "./App.css";

function App(props) {
  const themeStyle = "dark";
  const theme = createMuiTheme({
    palette: {
      type: themeStyle,
      primary: {
        main: "#989898",
      },
      secondary: {
        main: "#2c5150",
      },
    },
  });

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
  const [activeTabId, setActiveTabId] = useState(defaultPage.id);

  const getPageComponent = () => {
    const pagesNames = Object.keys(appPages);
    return (appPages[pagesNames[activeTabId]] || defaultPage).component;
  };

  const renderAppComponents = () => {
    return (
      <div className={"App " + themeStyle}>
        <Header auth={auth} />
        <div className={"BodyContainer " + themeStyle}>
          {getPageComponent()}
        </div>
        <Footer activeTabId={activeTabId} setActiveTabId={setActiveTabId} />
      </div>
    );
  };

  return (
    <MuiThemeProvider theme={theme}>
      <Route path="/" exact>
        {!auth.isAuthenticated() && !auth.isCallbackPage()
          ? auth.login()
          : renderAppComponents()}
      </Route>
      <Route
        path="/login/callback"
        render={(props) => <Callback auth={auth} {...props} />}
      />
    </MuiThemeProvider>
  );
}

export default App;

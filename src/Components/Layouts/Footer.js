import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import ExposureIcon from "@material-ui/icons/Exposure";

const useStyles = makeStyles({
  root: {
    width: "100%",
    flexShrink: 0,
    maxHeight: "53px",
  },
});

export default function Footer({ activeTabId, setActiveTabId }) {
  const classes = useStyles();

  return (
    <BottomNavigation
      value={activeTabId}
      onChange={(event, newValue) => {
        setActiveTabId(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction
        label="Balance"
        icon={<AccountBalanceWalletIcon color="primary" />}
      />
      <BottomNavigationAction
        label="Categories"
        icon={<ExposureIcon color="primary" />}
      />
      {false ? (
        <BottomNavigationAction
          label="Currency"
          icon={<AttachMoneyIcon color="primary" />}
        />
      ) : null}
    </BottomNavigation>
  );
}

import React, { useState } from "react";
import clsx from "clsx";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { makeStyles } from "@material-ui/core/styles";
import {
  TableCell,
  TableRow,
} from "@material-ui/core";

function WalletsTableRow ({ wallet, currencyList, setSelected, isSelected})  {

  wallet = wallet || {};
  currencyList = currencyList || [];
  const [isHover, setHover] = useState(false);

  const useStyles = makeStyles((theme) => ({
    tableSummary: {
      tableBody: {  },
      tableRow: {  },
      operationsListButton: { }
    },
    operationDetailsIcon: {
      display: "inline-flex",
      float: "right",
      width: "20px",
      height: "20px",
      opacity: "60%"
    },
    selected: {
      opacity: "100%"
    }
  }));
  const classes = useStyles();

  const getCurrencyReminder = (currency, wallet) => {
    if (!currency || !wallet || !wallet.remainders) return 0;

    var reminder = wallet.remainders.find(
      (x) => x.currency === currency.id
    ) || { value: 0 };
    return reminder.value;
  }

  return (    
    <TableRow
      className={classes.tableRow}
      key={wallet.id}
      hover
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      selected={isSelected}
    >
      <TableCell align="left">
        <span>
          {wallet.name}
          {isHover || isSelected ? <ExitToAppIcon 
            className={clsx(classes.operationDetailsIcon, isSelected ? classes.selected : "")} 
            onClick={() => setSelected(isSelected ? 0 : wallet.id)}
          /> : null }
        </span>
      </TableCell>
      {currencyList.map((currency) => (
        <TableCell
          key={"currencyTableRow" + currency.id}
          align="center"
        >
          {getCurrencyReminder(currency, wallet)}
        </TableCell>
      ))}
    </TableRow>
  );
}

export default WalletsTableRow;

import React from "react";
import clsx from "clsx";
import { TableCell, TableHead, TableRow } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

function BalanceTableHeader({ currencyList }) {
  const useStyles = makeStyles((theme) => ({
    tableHeader: {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.secondary.contrastText,
      fontWeight: 900,
      padding: 0,
    },
  }));
  const classes = useStyles();

  const currencyCollumns = () => {
    if (!currencyList) return <div />;
    return currencyList.map((currency) => (
      <TableCell
        key={"currencyTableHead" + currency.id}
        align="center"
        className={clsx(classes.tableHeader)}
      >
        {currency.name}
      </TableCell>
    ));
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell
          align="center"
          rowSpan={2}
          className={clsx(classes.tableHeader)}
        >
          Wallet
        </TableCell>
        <TableCell
          align="center"
          colSpan={3}
          className={clsx(classes.tableHeader)}
        >
          Balance
        </TableCell>
      </TableRow>
      <TableRow>{currencyCollumns()}</TableRow>
    </TableHead>
  );
}

export default BalanceTableHeader;

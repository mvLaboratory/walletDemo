import React from "react";
import clsx from 'clsx';
import { TableCell, TableRow} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

function BalanceTableSummary( {currencyList, balanceSummary} ) {
  const useStyles = makeStyles(theme => ({
    tableSummary: {
      backgroundColor: '#3f51b5',
      color: '#ffffff',
      fontWeight: 900,
      padding: 0
    }
  }));
  const classes = useStyles();

  const BalanceTableCell = (text, align = "center", colSpan = 1, rowSpan = 1) => {
    return(
      <TableCell
        align={align}
        colSpan={colSpan}
        rowSpan={rowSpan}
        className={clsx(classes.tableSummary)}>
          { text }
      </TableCell>
    );
  }

  const renderCurrencyTotalCollumns = () => {
    if (!currencyList) return (<div/>);
    console.log("Table Summary", balanceSummary);
    return(
      currencyList.map(currency => (
        BalanceTableCell(currency.value)
    )));
  }

  return(
    <>
      <TableRow>
        { BalanceTableCell("Total", "center", 2) }
        { renderCurrencyTotalCollumns() }
        {/* { BalanceTableCell("100") }
        { BalanceTableCell("100") }
        { BalanceTableCell("100") } */}
      </TableRow>
      <TableRow className={clsx(classes.tableSummaty)}>
        { BalanceTableCell("Main currency total", "center", 1, 3) }
        { BalanceTableCell("UAH", "right") }
        { BalanceTableCell("") }
        { BalanceTableCell("100") }
        { BalanceTableCell("") }
      </TableRow>
      <TableRow className={clsx(classes.tableSummaty)}>
        { BalanceTableCell("USD", "right") }
        { BalanceTableCell("") }
        { BalanceTableCell("100") }
        { BalanceTableCell("") }
      </TableRow>
      <TableRow className={clsx(classes.tableSummaty)}>
        { BalanceTableCell("EUR", "right") }
        { BalanceTableCell("") }
        { BalanceTableCell("100") }
        { BalanceTableCell("") }
      </TableRow>
      <TableRow>
        { BalanceTableCell("Consolidated balance", "center", 2) }
        { BalanceTableCell("100") }
        { BalanceTableCell("100") }
        { BalanceTableCell("100") }
      </TableRow>
    </>
  );
}

export default BalanceTableSummary;
import React from "react";
import clsx from 'clsx';
import { TableCell, TableRow} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { getCurrencyValue, getCurrencyInfo } from "./../../../shared/utils"

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

  const renderBalanceTableCell = (text, align = "center", colSpan = 1, rowSpan = 1) => {
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

  const renderCurrencyTotalCollumns = (currencyCollection) => {
    if (!currencyList) {
      return (<div/>);
    }
    return(
      currencyList.map(currency => (
        renderBalanceTableCell(getCurrencyValue(currencyCollection, currency))
    )));
  }

  const renderMainCurrencySummary = () => {
    if (!balanceSummary || !balanceSummary.mainCurrencyBalance) 
      return <></>

    return(
      <>
        {balanceSummary.mainCurrencyBalance.map((data, index) => 
          renderMainCurrencySummaryRow(data, index === 0)
        )}
      </>
    );
  }

  const renderMainCurrencySummaryRow = (rowData, shouldRenderTitle) => {
    return (
      <TableRow>
        { shouldRenderTitle && renderBalanceTableCell("Main currency total", "center", 1, 3) }
        { renderBalanceTableCell(getCurrencyInfo(rowData.rootCurrency, currencyList).name, "right") }
        {currencyList.map(currency => 
          renderBalanceTableCell(currency.isMain ? rowData.value : "")
        )}
      </TableRow>
    )
  }

  return(
    <>
      <TableRow>
        { renderBalanceTableCell("Total", "center", 2) }
        { renderCurrencyTotalCollumns(balanceSummary.currencyBalance || []) }
      </TableRow>
      {renderMainCurrencySummary()}
      <TableRow>
        { renderBalanceTableCell("Consolidated balance", "center", 2) }
        { renderCurrencyTotalCollumns(balanceSummary.consolidatedBalance || []) }
      </TableRow>
    </>
  );
}

export default BalanceTableSummary;
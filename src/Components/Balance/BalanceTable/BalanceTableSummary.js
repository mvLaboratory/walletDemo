import React from "react";
import clsx from "clsx";
import { TableCell, TableRow } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { getCurrencyValue, getCurrencyInfo } from "../../../shared/utils";

function BalanceTableSummary({ currencyList, balanceSummary }) {
  const useStyles = makeStyles((theme) => ({
    tableSummary: {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.secondary.contrastText,
      fontWeight: 900,
      padding: 0,
    },
  }));
  const classes = useStyles();
  let totalCellsCount = 1;

  const renderBalanceTableCell = (
    text,
    align = "center",
    colSpan = 1,
    rowSpan = 1
  ) => {
    return (
      <TableCell
        key={++totalCellsCount}
        align={align}
        colSpan={colSpan}
        rowSpan={rowSpan}
        className={clsx(classes.tableSummary)}
      >
        {text}
      </TableCell>
    );
  };

  const renderCurrencyTotalCollumns = (currencyCollection) => {
    if (!currencyList) {
      return <div />;
    }
    return currencyList.map((currency) =>
      renderBalanceTableCell(getCurrencyValue(currencyCollection, currency))
    );
  };

  const renderMainCurrencySummary = () => {
    if (!balanceSummary || !balanceSummary.mainCurrencyBalance) return <></>;

    return (
      <>
        {balanceSummary.mainCurrencyBalance.map((data, index) =>
          renderMainCurrencySummaryRow(data, index === 0)
        )}
      </>
    );
  };

  const renderMainCurrencySummaryRow = (rowData, shouldRenderTitle) => {
    return (
      <TableRow key={++totalCellsCount}>
        {shouldRenderTitle &&
          renderBalanceTableCell("Σ", "center", 1, currencyList.length - 1)}
        {renderBalanceTableCell(
          getCurrencyInfo(rowData.rootCurrency, currencyList).name,
          "right"
        )}
        {currencyList.map((currency) =>
          renderBalanceTableCell(currency.isMain ? rowData.value : "")
        )}
      </TableRow>
    );
  };

  return (
    <>
      <TableRow>
        {renderBalanceTableCell("Total", "center", 1)}
        {renderCurrencyTotalCollumns(balanceSummary.currencyBalance || [])}
      </TableRow>
      {renderMainCurrencySummary()}
      <TableRow>
        {renderBalanceTableCell("Consolidated balance", "center", 1)}
        {renderCurrencyTotalCollumns(balanceSummary.consolidatedBalance || [])}
      </TableRow>
    </>
  );
}

export default BalanceTableSummary;

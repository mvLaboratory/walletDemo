import React from "react";
import clsx from 'clsx';
import { TableCell, TableHead, TableRow} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

function BalanceTableSummary( {currencyList} ) {
  // const currencyCollumns = () => {
  //   if (!currencyList) return (<div/>);
  //   return(
  //     currencyList.map(currency => (
  //     <TableCell key={"currencyTableHead"+currency.id} align="center">{currency.name}</TableCell>
  //   )));
  // }

  return(
    <TableRow>
    <TableCell align="right" colSpan={2}>Total:</TableCell>
    <TableCell align="center">100</TableCell>
    <TableCell align="center">100</TableCell>
    <TableCell align="center">100</TableCell>
  </TableRow>
  );
}

export default BalanceTableSummary;
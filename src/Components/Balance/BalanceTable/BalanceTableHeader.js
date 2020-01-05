import React from "react";
import clsx from 'clsx';
import { TableCell, TableHead, TableRow} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

function BalanceTableHeader( {currencyList} ) {
  const currencyCollumns = () => {
    if (!currencyList) return (<div/>);
    return(
      currencyList.map(currency => (
      <TableCell key={"currencyTableHead"+currency.id} align="center">{currency.name}</TableCell>
    )));
  }

  return(
    <TableHead>
      <TableRow>
        <TableCell align="center" size="small" rowSpan={2}>#</TableCell>
        <TableCell align="center" rowSpan={2}>Wallet</TableCell>
        <TableCell align="center" colSpan={3}>Balance</TableCell>
      </TableRow>
      <TableRow>{ currencyCollumns() }</TableRow>
    </TableHead>
  );
}

export default BalanceTableHeader;
import React from "react";
import { Paper, Table, TableBody, TableCell, TableHead, TableRow} from '@material-ui/core'

class WalletsList extends React.Component {
  getCurrencyReminder(currency, wallet) {
    var reminder = wallet.remainders.find(x => x.currency === currency.id) || {value: 0}             
    return reminder.value;
  }

  render() {
    const { styles, selectWalletHandler, wallets, currencyList, selectedWalletId } = this.props;
    return (
      <Paper style={styles.Paper}>
          <div className="Balance">
            <div>Wallets:</div>
            <div className="WalletsList">
              <Table aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" size="small" rowSpan={2}>#</TableCell>
                    <TableCell align="center" rowSpan={2}>Wallet</TableCell>
                    <TableCell align="center" colSpan={3}>Balance</TableCell>
                  </TableRow>
                  <TableRow>
                    {currencyList.map(currency => (
                      <TableCell key={"currencyTableHead"+currency.id} align="center">{currency.name}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {wallets.map(wallet => (
                    <TableRow 
                      key={wallet.id} 
                      hover onClick={() => {selectWalletHandler(wallet.id);}}
                      selected={selectedWalletId === wallet.id}
                    >
                      <TableCell align="center" size="small">{wallet.id}</TableCell>
                      <TableCell align="left">{wallet.name}</TableCell>
                      { 
                        currencyList.map(currency => 
                          <TableCell key={"currencyTableRow"+currency.id} align="center">{this.getCurrencyReminder(currency, wallet)}</TableCell>)
                      }                     
                    </TableRow>
                  ))}
                  </TableBody>
              </Table>
            </div>
          </div>
      </Paper>
    );
  }
}

export default (WalletsList);

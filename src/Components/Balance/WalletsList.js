import React from "react";
import NewWalletDialog from "./NewWalletDialog.js"
import BalanceTableHeader from "./BalanceTable/BalanceTableHeader.js"
import BalanceTableSummary from "./BalanceTable/BalanceTableSummary.js"
import { withStyles } from '@material-ui/styles';
import { Paper, Table, TableBody, TableCell, TableRow} from '@material-ui/core'

const styles = theme => ({
  tableActions: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }
  });


class WalletsList extends React.Component {
  getCurrencyReminder(currency, wallet) {
    if (!currency || !wallet || !wallet.remainders)
      return 0;
      
    var reminder = wallet.remainders.find(x => x.currency === currency.id) || {value: 0}             
    return reminder.value;
  }

  render() {
    const { styles, classes, selectWalletHandler, wallets, balanceSummary, currencyList, selectedWalletId, addWalletHandler } = this.props;
    
    return (
      <Paper style={styles.Paper}>
          <div className="Balance">
            <div className={classes.tableActions}>
              <span><h3>Wallets:</h3></span>
              <NewWalletDialog addWalletHandler={addWalletHandler}/>
            </div>
            <div className="WalletsList">
              <Table aria-label="a dense table">
                <BalanceTableHeader currencyList = {currencyList}></BalanceTableHeader>
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
                  <BalanceTableSummary currencyList = {currencyList} balanceSummary = { balanceSummary }/>
                </TableBody>
              </Table>
            </div>
          </div>
      </Paper>
    );
  }
}

export default withStyles(styles)(WalletsList);

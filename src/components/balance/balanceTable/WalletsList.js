import React from "react";
import NewWalletDialog from "../NewWalletDialog";
import BalanceTableHeader from "./BalanceTableHeader";
import WalletsTableRow from "./WalletsTableRow";
import BalanceTableSummary from "./BalanceTableSummary";
import { withStyles } from "@material-ui/styles";
import {
  Paper,
  Table,
  TableBody,
} from "@material-ui/core";

const styles = (theme) => ({
  tableActions: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  }
});

class WalletsList extends React.Component {
  getCurrencyReminder(currency, wallet) {
    if (!currency || !wallet || !wallet.remainders) return 0;

    var reminder = wallet.remainders.find(
      (x) => x.currency === currency.id
    ) || { value: 0 };
    return reminder.value;
  }

  render() {
    const {
      styles,
      classes,
      selectWalletHandler,
      selectedWalletId,
      wallets,
      balanceSummary,
      currencyList,
      addWalletHandler,
    } = this.props;

    return (
      <Paper style={styles.Paper}>
        <div className="Balance">
          <div className={classes.tableActions}>
            <span>
              <h3>Wallets:</h3>
            </span>
            <NewWalletDialog addWalletHandler={addWalletHandler} />
          </div>
          <div className="WalletsList">
            <Table aria-label="a dense table">
              <BalanceTableHeader
                currencyList={currencyList}
              ></BalanceTableHeader>
              <TableBody className={classes.tableBody}>
                {wallets.map((wallet) => (
                  <WalletsTableRow key={wallet.id} wallet={wallet} currencyList={currencyList} setSelected={selectWalletHandler} isSelected={selectedWalletId === wallet.id} />
                ))}
                <BalanceTableSummary
                  currencyList={currencyList}
                  balanceSummary={balanceSummary}
                />
              </TableBody>
            </Table>
          </div>
        </div>
      </Paper>
    );
  }
}

export default withStyles(styles)(WalletsList);

import React from "react";
import { Paper, Table, TableBody, TableCell, TableHead, TableRow} from '@material-ui/core'

class WalletsList extends React.Component {
  render() {
    const { styles, selectWalletHandler, wallets } = this.props;
    return (
      <Paper style={styles.Paper}>
          <div className="Balance">
            <div>Wallets:</div>
            <div className="WalletsList">
              <Table aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell size="small">#</TableCell>
                    <TableCell>Wallet</TableCell>
                    <TableCell align="center">Balance</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                    {wallets.map(wallet => (
                      <TableRow key={wallet.id} hover onClick={() => {selectWalletHandler(wallet.id);}}>
                        <TableCell size="small">{wallet.id}</TableCell>
                        <TableCell>test{wallet.name}</TableCell>
                        <TableCell align="right">{wallet.value}</TableCell>
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

import React from "react";
import { connect } from "react-redux";
import { loadWaletsBalance, addWalet } from "../../actions/waletActions.js";
import { Paper, Table, TableBody, TableCell, TableHead, TableRow} from '@material-ui/core'

class WalletsList extends React.Component {
  componentDidMount() {
    this.props.dispatch(loadWaletsBalance());
  }

  handleSubmit = async event => {
    event.preventDefault();
    addWalet(this.state.newWaletName, 0);
    this.setState({ newWaletName: "" });
  };

  render() {
    const { styles } = this.props;
    const wallets = this.props.balance || [];
    return (
      <Paper style={styles.Paper}>
          <div className="Balance">
            <div>Wallets:</div>
            <div className="WalletsList">
              <Table size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell>Wallet</TableCell>
                    <TableCell align="center">Balance</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                    {wallets.map(wallet => (
                      <TableRow hover>
                        <TableCell>{wallet.name}</TableCell>
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

const mapStateToProps = function(state) {
  return {
    balance: state.items,
    newWaletName: "",
    loading: state.loading,
    error: state.error
  };
};

export default connect(mapStateToProps)(WalletsList);

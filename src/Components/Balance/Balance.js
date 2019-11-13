import React from "react";
import "./Balance.css";
import { connect } from "react-redux";
import { loadWaletsBalance, addWalet } from "../../actions/waletActions.js";
import { Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow} from '@material-ui/core'

class Balance extends React.Component {
  state = { newWaletName: "" };

  componentDidMount() {
    this.props.dispatch(loadWaletsBalance());
  }

  handleSubmit = async event => {
    event.preventDefault();
    addWalet(this.state.newWaletName, 0);
    this.setState({ newWaletName: "" });
  };

  render() {
    const styles = {
      Paper: {
        padding: 20,
        marginTop: 10,
        marginBottom: 10,
        height: 500,
        overflowY: 'auto'
      }
    }

    const wallets = this.props.balance || [];

    return (
      <>  
        <Grid container>
          <Grid item sm>
            <Paper style={styles.Paper}>
            <div className="Balance">
              <div>Wallets:</div>
              <div className="WalletsList">
                <Table size="small" aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Wallet</TableCell>
                      <TableCell align="right">Balance</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {wallets.map(wallet => (
                      <TableRow>
                        <TableCell>{wallet.name}</TableCell>
                        <TableCell>{wallet.value}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
            </Paper>
          </Grid>
          <Grid item sm>
            <Paper style={styles.Paper}>
              <form onSubmit={this.handleSubmit}>
                <input
                  type="text"
                  value={this.state.newWaletName || ""}
                  placeholder="Walet Name"
                  onChange={event =>
                    this.setState({ newWaletName: event.target.value })
                  }
                  required
                />
                <button>Add card</button>
              </form>
              </Paper>
          </Grid>
        </Grid>
      </>
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

export default connect(mapStateToProps)(Balance);

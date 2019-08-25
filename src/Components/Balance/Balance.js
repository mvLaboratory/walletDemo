import React from "react";
import "./Balance.css";
import { connect } from "react-redux";
import { loadWaletsBalance, addWalet } from "../../actions/waletActions.js";

class Balance extends React.Component {
  state = { newWaletName: "" };

  componentDidMount() {
    this.props.dispatch(loadWaletsBalance());
  }

  handleSubmit = async event => {
    event.preventDefault();
    debugger;
    addWalet(this.state.newWaletName, 0);
    this.setState({ newWaletName: "" });
  };

  render() {
    const wallets = this.props.balance || [];

    return (
      <>
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
        <div className="Balance">
          <div>Wallets:</div>
          <div className="WalletsList">
            {wallets.map(wallet => (
              <div>
                {wallet.name}: <span>{wallet.value}</span>
              </div>
            ))}
          </div>
        </div>
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

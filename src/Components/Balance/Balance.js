import React from "react";
import "./Balance.css";
import { connect } from "react-redux";
import { loadWaletsBalance, addWalet } from "../../actions/waletActions.js";

class Balance extends React.Component {
  componentDidMount() {
    this.props.dispatch(loadWaletsBalance());
  }

  render() {
    const wallets = this.props.balance || [];
    return (
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
    );
  }
}

const mapStateToProps = function(state) {
  console.log("state", state);
  return {
    balance: state.items,
    loading: state.loading,
    error: state.error
  };
};

export default connect(mapStateToProps)(Balance);

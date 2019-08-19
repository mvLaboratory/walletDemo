import React from "react";
import "./Balance.css";
import { connect } from "react-redux";
import * as actionCreators from "../../actions/balanceActions.js";

class Balance extends React.Component {
  setBalance = balance => {
    this.setState({ Balance: balance });
  };

  componentDidMount() {
    this.props.loadWaletsBalance(this.setBalance);
  }

  render() {
    const wallets = this.state.Balance ? this.props.Balance : [];
    console.log("balance", this.props.Balance);
    return (
      <div className="Balance">
        <div>Wallets:</div>
        <div className="WalletsList">
          {wallets.map(wallet => (
            <div>
              {wallet.Name}: <span>{wallet.Value}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(
  mapStateToProps,
  actionCreators
)(Balance);

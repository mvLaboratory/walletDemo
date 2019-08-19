import React from "react";
import "./Balance.css";
import { connect } from "react-redux";
import { loadWaletsBalance } from "../../actions/balanceActions.js";

class Balance extends React.Component {
  componentDidMount() {
    this.props.dispatch(loadWaletsBalance());
  }

  render() {
    const wallets = this.props.balance;
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

const mapStateToProps = state => ({
  balance: state.items.balance,
  loading: state.loading,
  error: state.error
});

export default connect(mapStateToProps)(Balance);

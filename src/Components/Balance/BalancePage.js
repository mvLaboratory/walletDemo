import React from "react";
import { connect } from "react-redux";
import WalletsList from "./WalletsList.js"
import WalletInfo from "./WalletInfo.js"
import { addWallet, saveWallet, loadWaletsBalance } from "../../actions/BalanceActions.js";
import { loadCurrency } from "../../actions/CurrencyActions.js";
import { Grid } from '@material-ui/core';

class BalancePage extends React.Component {
  constructor(props){
    super(props);
    this.state = {activeWallet: null};
  }

  componentDidMount() {
    this.props.dispatch(loadCurrency());
    this.props.dispatch(loadWaletsBalance());
  }
  
  componentDidUpdate() {
    const { balance } = this.props;
    if (!this.state.activeWallet && balance && balance.length > 0) {
      this.handleWalletSelect(balance[0].id);
    }
  }

  handleWalletSelect = (walletId) => {
    const { balance } = this.props;
    const selectedWallet = balance.find(x => x.id === walletId);
    const walletCopy = JSON.parse(JSON.stringify(selectedWallet));
    this.setState({activeWallet: walletCopy});
  }

  handleActiveWalletNameChange = (walletName) => {
    const { activeWallet } = this.state;
    activeWallet.name = walletName;
    this.setState({activeWallet: activeWallet });
  }

  handleActiveWalletBalanceChange = (currencyId, walletBalance) => {
    const { activeWallet } = this.state;
    if (!activeWallet) return;

    let activeWalletReminder = activeWallet.remainders.find(x => x.currency === currencyId);
    if (activeWalletReminder) {
      activeWalletReminder.value = walletBalance;
    }
    else {
      activeWallet.remainders.push({"currency": currencyId, "value": walletBalance});
    }
    this.setState({ activeWallet: activeWallet });
  }

  saveWalletHandler = () => {
    const { activeWallet } = this.state; 
    this.props.dispatch(saveWallet(activeWallet));
  }

  addWalletHandler = (walletName) => {
    const wallet = {'name': walletName, remainders: []}
    this.props.dispatch(addWallet(wallet));
  }

  render() {
    const styles = {
      Paper: {
        padding: 20,
        marginTop: 10,
        marginBottom: 10,
        overflowY: 'auto'
      }
    }
    const { balance, currency } = this.props;
    const { activeWallet } = this.state;
    
    return (     
      <Grid container>
        <Grid item sm>
          <WalletsList 
            styles={styles} 
            selectWalletHandler={this.handleWalletSelect}
            selectedWalletId={activeWallet ? activeWallet.id : 0}
            wallets={balance}
            currencyList={currency}
            addWalletHandler={this.addWalletHandler}
          />
        </Grid>
        <Grid item sm>
          <WalletInfo  
            styles={styles}
            activeWallet={activeWallet}
            currencyList={currency}
            saveHandler={this.saveWalletHandler}
            handleWalletNameChange={this.handleActiveWalletNameChange}
            handleWalletBalanceChange={this.handleActiveWalletBalanceChange}
          />
        </Grid>
      </Grid>    
    );
  }
}

const mapStateToProps = function(state) {
   return {
     balance: state.BalanceReducer.items,
     currency: state.CurrencyReducer.currency,
     loading: state.BalanceReducer.loading,
     error: state.BalanceReducer.error
   };
};

export default connect(mapStateToProps)(BalancePage);
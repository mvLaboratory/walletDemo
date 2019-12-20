import React from "react";
import { connect } from "react-redux";
import WalletsList from "./WalletsList.js"
import WalletInfo from "./WalletInfo.js"
import { saveWallet } from "../../actions/waletActions.js";
import { loadWaletsBalance, loadCurrency } from "../../actions/waletActions.js";

import { Grid } from '@material-ui/core'

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
    var selectedWallet = balance.find(x => x.id === walletId);
    this.setState({activeWallet: Object.assign({}, selectedWallet)});
  }

  handleActiveWalletNameChange = (walletName) => {
    const { activeWallet } = this.state;
    activeWallet.name = walletName;
    this.setState({activeWallet: activeWallet });
  }

  handleActiveWalletBalanceChange = (walletBalance) => {
    const { activeWallet } = this.state;
    activeWallet.value = walletBalance;
    this.setState({activeWallet: activeWallet });
  }

  saveWalletHandler = () => {
    const { activeWallet } = this.state; 
    this.props.dispatch(saveWallet(activeWallet));
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
            selectedWallet={activeWallet}
            wallets={balance}
            currencyList={currency}
          />
        </Grid>
        <Grid item sm>
          <WalletInfo  
            styles={styles}
            activeWallet={activeWallet}
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
     balance: state.items,
     currency: state.currency,
     loading: state.loading,
     error: state.error
   };
};

export default connect(mapStateToProps)(BalancePage);
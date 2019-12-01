import React from "react";
import { connect } from "react-redux";
import WalletsList from "./WalletsList.js"
import WalletInfo from "./WalletInfo.js"
import { loadWaletsBalance } from "../../actions/waletActions.js";
//import { addWalet } from "../../actions/waletActions.js";

import { Grid } from '@material-ui/core'

class BalancePage extends React.Component {
  componentDidMount() {
    this.props.dispatch(loadWaletsBalance());
  }

  handleWalletSelect(walletId) {
    alert('selected' + walletId);
  }

  // handleSubmit = async event => {
  //   event.preventDefault();
  //   addWalet(this.state.newWaletName, 0);
  //   this.setState({ newWaletName: "" });
  // };

  render() {
    const styles = {
      Paper: {
        padding: 20,
        marginTop: 10,
        marginBottom: 10,
        overflowY: 'auto'
      }
    }
    const { balance } = this.props;
    
    return (     
      <Grid container>
        <Grid item sm>
          <WalletsList 
            styles={styles} 
            selectWalletHandler={this.handleWalletSelect}
            wallets={balance}
          />
        </Grid>
        <Grid item sm>
          <WalletInfo  styles={styles}/>
        </Grid>
      </Grid>    
    );
  }
}

const formatBalanceViewModel = function(balance) {
  //balance.map(bal => {isSelected: false, {...bal}});
  const balanceViewModel = balance.map(bal => {let nobj = {isSelected: false, ...bal}; return nobj;});
  debugger;
  console.log(balanceViewModel);
  return balanceViewModel;
}

const mapStateToProps = function(state) {
   return {
     balanceVM: formatBalanceViewModel(state.items),
     balance: state.items,
     loading: state.loading,
     error: state.error
   };
};

export default connect(mapStateToProps)(BalancePage);
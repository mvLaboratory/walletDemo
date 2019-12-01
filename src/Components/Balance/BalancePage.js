import React from "react";
import { connect } from "react-redux";
import WalletsList from "./WalletsList.js"
import WalletInfo from "./WalletInfo.js"
import { loadWaletsBalance } from "../../actions/waletActions.js";
//import { addWalet } from "../../actions/waletActions.js";

import { Grid } from '@material-ui/core'

class BalancePage extends React.Component {
  constructor(props){
    super(props);
    this.state = {activeWallet: null};
  }

  componentDidMount() {
    this.props.dispatch(loadWaletsBalance());
  }
  
  componentDidUpdate() {
    const { balance } = this.props;
    if (!this.state.activeWallet && balance && balance.length > 0) {
      this.setState({activeWallet: balance[0]})
    }
  }

  handleWalletSelect = (walletId) => {
    const { balance } = this.props;
    var activeWallet = balance.find(x => x.id === walletId);
    this.setState({activeWallet: activeWallet})
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
    const {activeWallet} = this.state;
    
    return (     
      <Grid container>
        <Grid item sm>
          <WalletsList 
            styles={styles} 
            selectWalletHandler={this.handleWalletSelect}
            selectedWallet={activeWallet}
            wallets={balance}
          />
        </Grid>
        <Grid item sm>
          <WalletInfo  
            styles={styles}
            activeWallet={activeWallet}
          />
        </Grid>
      </Grid>    
    );
  }
}

const mapStateToProps = function(state) {
   return {
     balance: state.items,
     loading: state.loading,
     error: state.error
   };
};

export default connect(mapStateToProps)(BalancePage);
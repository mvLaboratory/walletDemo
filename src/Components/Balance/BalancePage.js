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
      this.handleWalletSelect(balance[0].id);
    }
  }

  handleWalletSelect = (walletId) => {
    const { balance } = this.props;
    var selectedWallet = balance.find(x => x.id === walletId);
    this.setState({activeWallet: Object.assign({}, selectedWallet)});
  }

  handleWalletNameChange = (walletName) => {
    const { activeWallet } = this.state;
    activeWallet.name = walletName;
    this.setState({activeWallet: activeWallet
    });
  }

  saveWalletHandler = () => {
    const { activeWallet } = this.state; 
    alert(activeWallet.name);
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
            saveHandler={this.saveWalletHandler}
            handleWalletNameChange={this.handleWalletNameChange}
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
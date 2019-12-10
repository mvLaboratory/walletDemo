import React, { useState } from "react";
import { Paper} from '@material-ui/core'
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import SaveIcon from '@material-ui/icons/Save';

class WalletInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {walletName: "", walletValue: 0} ;
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { activeWallet } = nextProps;
    if (!activeWallet) return {walletName: "", walletValue: 0};
    return { walletName: activeWallet.name, walletValue: activeWallet.value};
   }

  renderWalletInfo() {
    
    const { walletName, walletValue } = this.state;
    const { handleWalletNameChange } = this.props; 
    //this.setState({walletName: wallet.Name, value: wallet.value});
    return(       
    <div>
      <FormControl fullWidth >
          <InputLabel>Name</InputLabel>
          <Input
            value={walletName}  
            onChange={event => handleWalletNameChange(event.target.value)}
          />
      </FormControl> 
      <FormControl fullWidth >
          <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
          <Input
            id="standard-adornment-amount"
            value={walletValue}  
            //onChange={handleChange('amount')}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />
        </FormControl> 
    </div>); 
  }

  renderEmptyWalletWarning() {
    return(       
      <div><h3>Please add some wallet to the list</h3></div>
    ); 
  }

  render() {
    const { styles, activeWallet, saveHandler } = this.props; 
    return (     
      <Paper style={styles.Paper}>
        <h1>Wallet Edit:</h1>
        {activeWallet ? this.renderWalletInfo() : this.renderEmptyWalletWarning()}
        {/* <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.newWaletName || ""}
            placeholder="Walet Name"
            onChange={event =>
              this.setState({ newWaletName: event.target.value })
            }
            required
          />
          <button>Save</button>
        </form> */}
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<SaveIcon />}
          onClick={() => saveHandler()}
        >
          Save
        </Button>
      </Paper>
    );
  }
}


// function WalletInfo( { activeWallet, handleWalletNameChange }) {
//   const walletName = activeWallet ? activeWallet.name : '';
//   return <div>
//     <h1>
//       {walletName}
//     </h1>
//     <input type='text' value={walletName} onChange={event => {handleWalletNameChange(event.target.value)}}>
//     </input>
//   </div>
// }
export default WalletInfo;
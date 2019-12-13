import React, { useState } from "react";
import { Paper} from '@material-ui/core'
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import SaveIcon from '@material-ui/icons/Save';

function WalletInfo( {styles, activeWallet, handleWalletNameChange, handleWalletBalanceChange, saveHandler }) {
  const walletName = activeWallet ? activeWallet.name : '';
  const walletBalance = activeWallet ? activeWallet.value : 0;

  const renderEmptyWalletWarning = () => {
    return(       
      <div><h3>Please add some wallet to the list</h3></div>
    ); 
  }

  const renderWalletInfo = () => {
    return(       
      <div>
        <FormControl fullWidth >
          <InputLabel>Name</InputLabel>
          <Input value={walletName}  
            onChange={event => handleWalletNameChange(event.target.value)}
          />
        </FormControl> 
        <FormControl fullWidth >
          <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
            <Input
              id="standard-adornment-amount"
              value={walletBalance}  
              onChange={event => handleWalletBalanceChange(event.target.value)}
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
            />
        </FormControl> 
      </div>
    ); 
  }

  return (
    <Paper style={styles.Paper}>
      <h1>Wallet Edit:</h1>
      {activeWallet ? renderWalletInfo() : renderEmptyWalletWarning()}
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
  )
}
export default WalletInfo;
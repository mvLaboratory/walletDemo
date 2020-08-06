import React from "react";
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Paper} from '@material-ui/core'
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import SaveIcon from '@material-ui/icons/Save';

function WalletInfo( {styles, activeWallet, currencyList, handleWalletNameChange, handleWalletBalanceChange, saveHandler }) {
  const walletName = activeWallet ? activeWallet.name : '';

  const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    margin: {
      margin: theme.spacing(1),
    },
    withoutLabel: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(2)
    },
    withlabel: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(2)
    },
    textField: {
      width: 175,
    },
  }));
  const classes = useStyles();

  const renderEmptyWalletWarning = () => {
    return(       
      <div><h3>Please add some wallet to the list</h3></div>
    ); 
  }

  const getWalletBalance = (currencyId) => {
    if (!currencyId || !activeWallet || !activeWallet.remainders)
    return 0;
    var balance = activeWallet.remainders.find(x => x.currency === currencyId) || { value: 0 };
    return balance.value;
  }

  const renderWalletInfo = () => {
    return(       
      <div>
        <FormControl fullWidth className={clsx(classes.margin)}>
          <InputLabel>Name</InputLabel>
          <Input value={walletName}  
            onChange={event => handleWalletNameChange(event.target.value)}
          />
        </FormControl> 
        <InputLabel className={clsx(classes.margin)} htmlFor="standard-adornment-amount">Amount</InputLabel>  
        {currencyList.map(currency => (    
        <FormControl fullWidth key={"amountFormControl" + currency.id} className={clsx(classes.margin, classes.withlabel, classes.textField)}>
              <Input
                id={"standard-adornment-amount" + currency.id}
                key={"amountInput" + currency.id}
                value={getWalletBalance(currency.id)}  
                onChange={event => handleWalletBalanceChange(currency.id, event.target.value)}
                startAdornment={<InputAdornment position="start">{currency.symb}</InputAdornment>}
              />
          </FormControl> 
        ))
      }
      </div>
    ); 
  }

  return (
    <Paper style={styles.Paper}>
      <h1>Wallet Edit:</h1>
      {activeWallet ? renderWalletInfo() : renderEmptyWalletWarning()}
        <Button
          className={clsx(classes.margin)}
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
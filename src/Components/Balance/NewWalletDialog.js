import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';  
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import DialogActions from '@material-ui/core/DialogActions';
import Input from '@material-ui/core/Input';

const useStyles = makeStyles(theme => ({
  form: {
      display: 'flex',
      flexDirection: 'column',
      margin: 'auto',
      width: 'fit-content',
  },
  formControl: {
      marginTop: theme.spacing(2),
      minWidth: 120,
  },
  formControlLabel: {
      marginTop: theme.spacing(1),
  },
  })
);

export default function NewWalletDialog({ addWalletHandler }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [walletName, setwalletName] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
    setwalletName("");
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    addWalletHandler(walletName);
    setOpen(false);
  };

  const handleWalletNameChange = event => {
    setwalletName(event.target.value);
  };

  return (
    <>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        New wallet
      </Button>
      <Dialog
      fullWidth={true}
      maxWidth={"sm"}
      open={open}
      onClose={handleClose}
      aria-labelledby="addWallet-dialog-title"
      >
        <DialogTitle id="addWallet-dialog-title">New Wallet</DialogTitle>
        <DialogContent>
          <form className={classes.form} noValidate>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="max-width">Name</InputLabel>
                <Input value={walletName} onChange={handleWalletNameChange}/>
              </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
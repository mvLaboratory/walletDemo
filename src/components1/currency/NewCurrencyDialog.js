import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'; 
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add'; 
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
  addButton: {
    marginBottom: "0px"
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

export default function NewCurrencyDialog({ addCurrencyHandler }) {
  const classes = useStyles();
  const emptyCurrency = {
    name: "",
    symbol: "",
    isMain: false
  }
  const [open, setOpen] = React.useState(false);
  const [currencyInfo, setCurrencyInfo] = React.useState(emptyCurrency);

  const handleClickOpen = () => {
    setOpen(true);
    setCurrencyInfo(emptyCurrency);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    addCurrencyHandler(currencyInfo);
    setOpen(false);
  };

  const handleCurrencyNameChange = event => {
    currencyInfo.name = currencyInfo.name + event.target.value;
    console.log(`new currency name = ${currencyInfo.name}`)
    setCurrencyInfo(currencyInfo);
  };

  const getNewCurrencyName = () => {
    console.log(`returning currency name = ${currencyInfo.name}`)
    return currencyInfo.name;
  }

  return (
    <>
      <Fab size="small" color="primary" aria-label="add" onClick={handleClickOpen} className={classes.addButton}>
          <AddIcon />
        </Fab>
      <Dialog
      fullWidth={true}
      maxWidth={"xs"}
      open={open}
      onClose={handleClose}
      aria-labelledby="addWallet-dialog-title"
      >
        <DialogTitle id="addWallet-dialog-title">New Currecny</DialogTitle>
        <DialogContent>
          <form className={classes.form} noValidate>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="max-width">Name</InputLabel>
                <Input value={currencyInfo.name} onChange={handleCurrencyNameChange}/>
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
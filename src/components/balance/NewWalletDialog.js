import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import DialogActions from "@material-ui/core/DialogActions";
import Input from "@material-ui/core/Input";
import ModalDialogActions from "../atoms/ModalDialogActions";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    width: "fit-content",
  },
  addButton: {
    marginBottom: "0px",
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120,
  },
  formControlLabel: {
    marginTop: theme.spacing(1),
  },
  saveButton: {
    backgroundColor: theme.palette.secondary.main,
    order: 2,
  },
  cancelButton: {
    order: 1,
  },
}));

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

  const handleWalletNameChange = (event) => {
    setwalletName(event.target.value);
  };

  const buttons = [
    {
      name: "Save",
      order: 1,
      handler: handleSave,
      className: classes.saveButton,
    },
    {
      name: "Cancel",
      order: 2,
      handler: handleClose,
      className: classes.cancelButton,
    },
  ];

  return (
    <>
      <Fab
        size="small"
        color="primary"
        aria-label="add"
        onClick={handleClickOpen}
        className={classes.addButton}
      >
        <AddIcon />
      </Fab>
      <Dialog
        fullWidth={true}
        maxWidth={"xs"}
        open={open}
        onClose={handleClose}
        aria-labelledby="addWallet-dialog-title"
      >
        <DialogTitle id="addWallet-dialog-title">New Wallet</DialogTitle>
        <DialogContent>
          <form className={classes.form} noValidate>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="max-width">Name</InputLabel>
              <Input
                value={walletName}
                autoFocus
                onChange={handleWalletNameChange}
              />
            </FormControl>
          </form>
        </DialogContent>
        <ModalDialogActions buttons={buttons} />
      </Dialog>
    </>
  );
}

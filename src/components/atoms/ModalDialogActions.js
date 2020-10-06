import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";

const useStyles = makeStyles((theme) => ({
  actionButtonContainer: {
    display: "flex",
  },
}));

export default function ModalDialogActions({ buttons }) {
  const classes = useStyles();

  return (
    <DialogActions className={classes.actionButtonContainer}>
      {buttons.map((button) => (
        <Button
          key={button.order}
          onClick={button.handler}
          className={button.className}
          color="primary"
        >
          {button.name}
        </Button>
      ))}
    </DialogActions>
  );
}

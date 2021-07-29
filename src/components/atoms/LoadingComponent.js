import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    margin: "20px",
    display: "flex",
    flexDirection: "column",
  },
  iconContainer: {
    display: "flex",
    color: theme.palette.primary.main,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    display: "flex",
    color: theme.palette.primary.main,
    fontSize: "500%;",
  },
  text: {
    display: "flex",
    color: theme.palette.primary.main,
    alignItems: "center",
    justifyContent: "center",
  },
}));

export default function LoadingComponent() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.iconContainer}>
        <HourglassEmptyIcon className={classes.icon} />
      </div>
      <div>
        <Typography variant="h3" color="inherit" className={classes.text}>
          Loading...
        </Typography>
      </div>
    </div>
  );
}

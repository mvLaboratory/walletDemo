import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import UserProfile from "../UserProfile";
import { makeStyles } from "@material-ui/core/styles";

function Header({ auth }) {
  const useStyles = makeStyles((theme) => ({
    header: {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.secondary.contrastText,
      display: "inline-flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
  }));
  const classes = useStyles();

  const [userProfile, setUserProfile] = useState({ name: "" });
  useEffect(() => {
    auth.getProfile((profile, error) => {
      setUserProfile(profile);
    });
  }, [auth, userProfile.name]);

  return (
    <AppBar position="static">
      <Toolbar className={clsx(classes.header)}>
        <Typography variant="h3" color="inherit">
          Personal Wallet!
        </Typography>
        <UserProfile auth={auth} profile={userProfile} />
      </Toolbar>
    </AppBar>
  );
}

export default Header;

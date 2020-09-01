import React from 'react'
import clsx from 'clsx';
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

function Header(props) {
  const useStyles = makeStyles(theme => ({
    header: {
      display: 'inline-flex', 
      flexDirection: 'row',
      alignItems: "center",
      justifyContent: "space-between"
    }
  }));
  const classes = useStyles();

  return (  
    <AppBar position="static">
      <Toolbar className={clsx(classes.header)}>
        <Typography variant="h3" color="inherit">
          Personal Wallet!
        </Typography>
        <button onClick={props.auth.logout}>Log out</button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
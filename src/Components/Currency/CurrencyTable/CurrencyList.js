import React from "react";
import { withStyles } from '@material-ui/styles';
import CheckIcon from '@material-ui/icons/Check';
import { Paper, Table, TableHead, TableBody, TableCell, TableRow} from '@material-ui/core'

const styles = theme => ({
  tableActions: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  Paper: {
    paddingLeft:20,
    paddingRight:20,
    paddingBottom:10,
    marginTop: 1,
    marginBottom: 1,
    overflowY: 'auto'
  },
  tableHeader: {
    backgroundColor: '#3f51b5',
    color: '#ffffff',
    fontWeight: 900,
    padding: 0
  }
});

class CurrencyList extends React.Component {
  render() {
    const { classes, currencyList, selectedCurrencyId, handleCurrencySelect } = this.props;
    
    return (
      <Paper style={styles.Paper}>
          <div className="Currency">
            <div className={classes.tableActions}>
              <span><h3>Currency:</h3></span>
            </div>
            <div>
              <Table aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" size="small" className={classes.tableHeader}>#</TableCell>
                    <TableCell align="center" className={classes.tableHeader}>Name</TableCell>
                    <TableCell align="center" className={classes.tableHeader}>Symbol</TableCell>
                    <TableCell align="center" className={classes.tableHeader}>Is main</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currencyList.map(currency => (
                    <TableRow 
                      key={currency.id}
                      selected={currency.id === selectedCurrencyId } 
                      hover onClick={() => {handleCurrencySelect(currency.id);}}
                    >
                      <TableCell align="center" size="small">{currency.id}</TableCell>
                      <TableCell align="center">{currency.name}</TableCell>
                      <TableCell align="center">{currency.symb}</TableCell>       
                      <TableCell align="center">{currency.isMain ? <CheckIcon></CheckIcon> : ""}</TableCell>                     
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
      </Paper>
    );
  }
}

export default withStyles(styles)(CurrencyList);

import React from "react";
import WalletsList from "./WalletsList.js"
import { Grid, Paper} from '@material-ui/core'

class BalancePage extends React.Component {
  state = { newWaletName: "" };

  render() {
    const styles = {
      Paper: {
        padding: 20,
        marginTop: 10,
        marginBottom: 10,
        overflowY: 'auto'
      }
    }
    
    return (     
      <Grid container>
        <Grid item sm>
          <WalletsList styles={styles}/>
        </Grid>
        <Grid item sm>
          <Paper style={styles.Paper}>
            <form onSubmit={this.handleSubmit}>
              <input
                type="text"
                value={this.state.newWaletName || ""}
                placeholder="Walet Name"
                onChange={event =>
                  this.setState({ newWaletName: event.target.value })
                }
                required
              />
              <button>Add card</button>
            </form>
            </Paper>
        </Grid>
      </Grid>    
    );
  }
}

export default BalancePage;
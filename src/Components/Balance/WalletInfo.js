import React from "react";
import { Paper} from '@material-ui/core'

class WalletInfo extends React.Component {
  state = { newWaletName: "" };

  renderWalletInfo(wallet) {
    return(       
    <div>
      <p>   Walet: {wallet.name}      </p>
      <p>   Balance: {wallet.value}      </p>
    </div>); 
  }

  renderEmptyWalletWarning() {
    return(       
      <div><h3>Please select wallet wrom the list</h3></div>
    ); 
  }

  render() {
    const { styles, wallet  } = this.props;  
    return (     
      <Paper style={styles.Paper}>
        <h1>Wallet Edit:</h1>
        {wallet ? this.renderWalletInfo(wallet) : this.renderEmptyWalletWarning()}
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
          <button>Save</button>
        </form>
      </Paper>
    );
  }
}

export default WalletInfo;
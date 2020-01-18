import React from "react";
import { connect } from "react-redux";
import { loadCurrency } from "../../actions/CurrencyActions.js";
import { Grid } from '@material-ui/core';
import CurrencyList from './CurrencyTable/CurrencyList.js'

class CurrencyPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {selectedCurrency: null};
  }

  componentDidMount() {
    this.props.dispatch(loadCurrency());
  }

  componentDidUpdate() {
    const { currency } = this.props;
    if (!this.state.selectedCurrency && currency && currency.length > 0) {
      this.handleCurrencySelect(currency[0].id);
    }
  }

  handleCurrencySelect = (elementId) => {
    const { currency } = this.props;
    const selectedElement = currency.find(x => x.id === elementId);
    const elementCopy = JSON.parse(JSON.stringify(selectedElement));
    this.setState({selectedCurrency: elementCopy});
  }

  render() {
    const { currency } = this.props;
    const { selectedCurrency } = this.state;

    return (     
      <Grid container>
        <Grid item sm>
          <CurrencyList 
            currencyList={ currency} 
            selectedCurrencyId = {selectedCurrency ? selectedCurrency.id : 0} 
            handleCurrencySelect = { this.handleCurrencySelect }
          />
        </Grid>
        <Grid item sm>
 
        </Grid>
      </Grid>    
    );
  }
}

const mapStateToProps = function(state) {
   return {
     currency: state.CurrencyReducer.currency,
     loading: state.CurrencyReducer.currencyLoading,
     error: state.CurrencyReducer.error
   };
};

export default connect(mapStateToProps)(CurrencyPage);
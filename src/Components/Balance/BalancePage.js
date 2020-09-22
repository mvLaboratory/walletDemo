import React from "react";
import { connect } from "react-redux";
import WalletsList from "./BalanceTable/WalletsList.js";
import CreateQuickOperationDialog from "./CreateQuickOperationDialog.js";
import {
  addWallet,
  loadWaletsBalance,
  loadBalanceSummary,
} from "../../actions/BalanceActions.js";
import { saveOperation } from "../../actions/OperationsActions.js";
import { loadCurrency } from "../../actions/CurrencyActions.js";
import { loadWallets } from "../../actions/WalletsActions.js";
import { loadOperationCategories } from "../../actions/OperationCategoriesActions.js";
import { Grid } from "@material-ui/core";

//TODO::rename
class BalancePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeWallet: null };
  }

  componentDidMount() {
    this.props.dispatch(loadCurrency(this.props.auth));
    this.props.dispatch(loadWallets(this.props.auth));
    this.props.dispatch(loadOperationCategories(this.props.auth));
    this.props.dispatch(loadWaletsBalance(this.props.auth));
    //this.props.dispatch(loadBalanceSummary(this.props.auth));
  }

  componentDidUpdate(oldProps) {
    const { balance, operationSavingInProgres, auth } = this.props;
    if (!this.state.activeWallet && balance && balance.length > 0) {
      this.handleWalletSelect(balance[0].id);
    }

    if (oldProps.operationSavingInProgres && !operationSavingInProgres) {
      this.props.dispatch(loadWaletsBalance(auth));
    }
  }

  handleWalletSelect = (walletId) => {
    const { balance } = this.props;
    const selectedWallet = balance.find((x) => x.id === walletId);
    const walletCopy = JSON.parse(JSON.stringify(selectedWallet));
    this.setState({ activeWallet: walletCopy });
  };

  handleActiveWalletBalanceChange = (currencyId, walletBalance) => {
    const { activeWallet } = this.state;
    if (!activeWallet) return;

    let activeWalletReminder = activeWallet.remainders.find(
      (x) => x.currency === currencyId
    );
    if (activeWalletReminder) {
      activeWalletReminder.value = walletBalance;
    } else {
      activeWallet.remainders.push({
        currency: currencyId,
        value: walletBalance,
      });
    }
    this.setState({ activeWallet: activeWallet });
  };

  saveOperationHandler = (
    operationType,
    operationCategory,
    wallet,
    currency,
    summ
  ) => {
    let categoriesList = this.props.operationCategoriesList;
    let operation = {
      date: new Date().toJSON(),
      operationType: operationType,
      operationCategory: { id: operationCategory },
      wallet: { id: wallet },
      currency: { id: currency },
      description:
        categoriesList.find((x) => x.id === operationCategory).name ||
        "quick operation",
      sum: parseFloat(summ),
    };
    this.props.dispatch(saveOperation(operation, this.props.auth));
  };

  addWalletHandler = (walletName) => {
    const wallet = { name: walletName, remainders: [] };
    this.props.dispatch(addWallet(wallet));
  };

  render() {
    const styles = {
      Paper: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 10,
        marginTop: 1,
        marginBottom: 1,
        overflowY: "auto",
      },
    };
    const {
      balance,
      balanceSummary,
      currency,
      wallets,
      operationCategoriesList,
      operationSavingInProgres,
    } = this.props;
    const { activeWallet } = this.state;

    return (
      <Grid container>
        <Grid item sm>
          <WalletsList
            styles={styles}
            selectWalletHandler={this.handleWalletSelect}
            selectedWalletId={activeWallet ? activeWallet.id : 0}
            wallets={balance}
            balanceSummary={balanceSummary}
            currencyList={currency}
            addWalletHandler={this.addWalletHandler}
          />
        </Grid>
        <Grid item sm>
          {operationSavingInProgres ? (
            <div>
              <h1>Loading...</h1>
            </div>
          ) : (
            <CreateQuickOperationDialog
              styles={styles}
              operationCategoriesList={operationCategoriesList}
              currencyList={currency}
              walletsList={wallets}
              saveHandler={this.saveOperationHandler}
            />
          )}
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = function (state) {
  return {
    balance: state.BalanceReducer.items,
    balanceSummary: state.BalanceReducer.balanceSummary,
    currency: state.CurrencyReducer.currency,
    wallets: state.WalletsReducer.wallets,
    operationCategoriesList: state.OperationCategoryReducer.operationCategories,

    operationSavingInProgres: state.OperationsReducer.operationSavingLoading,

    loading: state.BalanceReducer.loading,
    error: state.BalanceReducer.error,
  };
};

export default connect(mapStateToProps)(BalancePage);

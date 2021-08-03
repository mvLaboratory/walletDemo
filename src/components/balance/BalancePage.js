import React from "react";
import { connect } from "react-redux";
import WalletsList from "./balanceTable/WalletsList";
import OperationsList from "../operations/OperationsList";
import CreateQuickOperationDialog from "./CreateQuickOperationDialog";
import {
  loadWaletsBalance,
  loadBalanceSummary,
} from "../../actions/BalanceActions.js";
import { saveOperation } from "../../actions/OperationsActions";
import { loadCurrency } from "../../actions/CurrencyActions";
import { loadWallets, addWallet } from "../../actions/WalletsActions";
import { loadOperationCategories } from "../../actions/OperationCategoriesActions";
import { Grid } from "@material-ui/core";
import LoadingComponent from "../atoms/LoadingComponent";

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
    const {
      //balance,
      operationSavingInProgres,
      walletSaveInProgress,
      auth,
    } = this.props;
    //if (!this.state.activeWallet && balance && balance.length > 0) {
    //  this.handleWalletSelect(balance[0].id);
    //}

    if (oldProps.operationSavingInProgres && !operationSavingInProgres) {
      this.props.dispatch(loadWaletsBalance(auth));
    }

    if (oldProps.walletSaveInProgress && !walletSaveInProgress) {
      this.props.dispatch(loadWaletsBalance(auth));
      this.props.dispatch(loadWallets(this.props.auth));
    }
  }

  handleWalletSelect = (walletId) => {
    const { balance } = this.props;
    let _activeWallet = {};
    if (walletId > 0) {
      const selectedWallet = balance.find((x) => x.id === walletId);
      const walletCopy = JSON.parse(JSON.stringify(selectedWallet));
      _activeWallet = walletCopy;
    }

    this.setState({ activeWallet: _activeWallet });
    this.setState({ activeOperation: {} });
  };

  handleOperationSelect = (selectedOperation) => {
    this.setState({ activeOperation: selectedOperation && selectedOperation.id ? selectedOperation : {} });
  }

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
    //this.setState({ activeWallet: activeWallet });
  };

  handleBackToOperationsList = () => {
    this.setState({ activeOperation: {} });
  }

  saveOperationHandler = (
    id,
    date,
    operationType,
    operationCategory,
    wallet,
    currency,
    summ
  ) => {
    let categoriesList = this.props.operationCategoriesList;
    let operation = {
      date: id ? date : new Date().toJSON(),
      operationType: operationType,
      operationCategory: { id: operationCategory },
      wallet: { id: wallet },
      currency: { id: currency },
      description:
        categoriesList.find((x) => x.id === operationCategory).name ||
        "quick operation",
      sum: parseFloat(summ),
    };
    if (id)
      operation.id = id;

    this.props.dispatch(saveOperation(operation, this.props.auth));
  };

  addWalletHandler = (walletName) => {
    const wallet = { name: walletName, remainders: [] };
    this.props.dispatch(addWallet(wallet, this.props.auth));
  };

  renderRightPanel = (styles) => {
    const { savedOperation } = this.props;
    const { activeWallet, activeOperation } = this.state;

    const operationToShow = savedOperation && savedOperation.id ? savedOperation : activeOperation;

    return activeWallet && activeWallet.id && !(activeOperation && activeOperation.id)
      ? (<OperationsList auth={this.props.auth} wallet={activeWallet} balanceOperationSelectHandler={this.handleOperationSelect}/>)
      : this.renderQuickOperationDialog(styles, operationToShow)
  }

  renderQuickOperationDialog = (styles, activeOperation) => {
    const {
      currency,
      wallets,
      operationCategoriesList,
      operationSavingInProgres,
    } = this.props;
    return operationSavingInProgres ? (
      <LoadingComponent />
    ) : (
      <CreateQuickOperationDialog
        styles={styles}
        operationCategoriesList={operationCategoriesList}
        currencyList={currency}
        walletsList={wallets}
        activeOperation={activeOperation}
        handleBackToOperationsList={this.handleBackToOperationsList}
        saveHandler={this.saveOperationHandler}
      />
    )
  }

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
      grid: {
        backgroundColor: " #ffffff",
      },
    };
    const {
      balance,
      balanceSummary,
      currency
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
          {this.renderRightPanel(styles)}
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
    operations: state.OperationsReducer.operations,

    operationSavingInProgres: state.OperationsReducer.operationSavingLoading,
    savedOperation: state.OperationsReducer.savedOperation,
    walletSaveInProgress: state.WalletsReducer.walletSaveInProgress,

    loading: state.BalanceReducer.loading,
    operationsLoading: state.OperationsReducer.loading,
    error: state.BalanceReducer.error,
  };
};

export default connect(mapStateToProps)(BalancePage);

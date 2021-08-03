import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import SaveIcon from "@material-ui/icons/Save";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import Select from "@material-ui/core/Select";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import FormattedNumberInput from "../atoms/FormattedNumberInput";
import OperationTypeSelector from "../operationCategory/OperationTypeSelector";
import { formatDateString } from "../../shared/utils";


function CreateQuickOperationDialog({
  styles,
  currencyList,
  walletsList,
  operationCategoriesList,
  activeOperation,
  handleBackToOperationsList,
  saveHandler,
}) {
  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      flexWrap: "wrap",
    },
    inline: {
      width: "100%",
      display: "inline-flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    margin: {
      margin: theme.spacing(1),
    },
    withoutLabel: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(2),
    },
    withlabel: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(2),
    },
    textField: {
      width: 175,
    },
    backButton: {
      marginRight: theme.spacing(1),
      color: theme.palette.action.active,
      "&:hover": {
        color: theme.palette.text.disabled,
      }
    },
  }));
  const classes = useStyles();

  const editMode = activeOperation && activeOperation.id ? true : false;
  const id = editMode ? activeOperation.id : 0;
  const date = editMode ? activeOperation.date : 0;
  const [summ, setSumm] = useState(editMode ? activeOperation.sum : "0.00");

  const [operationType, setOperationType] = useState(editMode ? activeOperation.operationType : 2);
  const operationCategoriesListFiltered = operationCategoriesList.filter(
    (x) => x.operationType === operationType
  );
  const defaultOperationCategory =
    (operationCategoriesListFiltered &&
      operationCategoriesListFiltered[0] &&
      operationCategoriesListFiltered[0].id) ||
    0;
  const [operationCategory, setOperationCategory] = useState(
    editMode ? activeOperation.operationCategory.id : defaultOperationCategory
  );

  const defaultWallet =
    (walletsList && walletsList[0] && walletsList[0].id) || 1;
  const [wallet, setWallet] = useState(editMode ? activeOperation.wallet.id : defaultWallet);

  let defaultCurrecny =
    (currencyList && currencyList[0] && currencyList[0].id) || 1;
  const [currency, setCurrency] = useState(editMode ? activeOperation.currency.id : defaultCurrecny);

  useEffect(() => {
    setWallet(activeOperation && activeOperation.id ? activeOperation.wallet.id : defaultWallet);
  }, [defaultWallet, activeOperation]);

  useEffect(() => {
    setCurrency(activeOperation && activeOperation.id ? activeOperation.currency.id : defaultCurrecny);
  }, [defaultCurrecny, activeOperation]);

  useEffect(() => {
    setOperationCategory(activeOperation && activeOperation.id ? activeOperation.operationCategory.id : defaultOperationCategory);
  }, [defaultOperationCategory, activeOperation]);

  const selectOperationType = (value) => {
    let avaialbleCategories = operationCategoriesList.filter(
      (x) => x.operationType === value
    );

    let newOperationCategory =
      (avaialbleCategories &&
        avaialbleCategories[0] &&
        avaialbleCategories[0].id) ||
      1;
    setOperationCategory(newOperationCategory);

    setOperationType(value);
  };

  const renderSummInput = () => {
    return (
      <div>
        <FormControl
          fullWidth
          key={"operationValue"}
          className={clsx(classes.margin, classes.withlabel, classes.textField)}
        >
          <FormattedNumberInput value={summ} setValue={setSumm} />
        </FormControl>
      </div>
    );
  };

  const renderSelect = (id, labelText, value, valueSetter, items) => {
    return (
      <FormControl
        className={clsx(classes.margin, classes.withlabel, classes.textField)}
      >
        <InputLabel htmlFor={`${id}-native-simple`}>{labelText}</InputLabel>
        <Select
          displayEmpty
          value={value}
          onChange={(event) => valueSetter(event.target.value)}
          inputProps={{ name: id, id: id + "-native-simple" }}
        >
          {items.map((x) => (
            <option key={x.id} value={x.id}>
              {x.name}
            </option>
          ))}
        </Select>
      </FormControl>
    );
  };

  return (
    <Paper style={styles.Paper}>
      <h1>
        { editMode ? 
          <IconButton 
            color="primary" 
            aria-label="Back" 
            component="span" 
            className={clsx(classes.backButton)} 
            onClick={handleBackToOperationsList}>
              <ArrowBackIcon /> 
          </IconButton>
        : null }
        { editMode ? `Operation #${id} from ${formatDateString(date)}` : "New Operation"}
      </h1>
      <div className={clsx(classes.inline)}>
        <div>{renderSummInput()}</div>
        <OperationTypeSelector
          operationType={operationType}
          setOperationType={selectOperationType}
        />
      </div>
      <div>
        {renderSelect(
          "operationCategory",
          "Operation Category:",
          operationCategory,
          setOperationCategory,
          operationCategoriesListFiltered
        )}
      </div>
      <div>
        {renderSelect("wallet", "Wallet:", wallet, setWallet, walletsList)}
      </div>
      <div>
        {renderSelect(
          "currency",
          "Currency:",
          currency,
          setCurrency,
          currencyList
        )}
      </div>
      <Button
        className={clsx(classes.margin)}
        variant="contained"
        color="primary"
        size="large"
        startIcon={<SaveIcon />}
        onClick={() =>
          saveHandler(id, date, operationType, operationCategory, wallet, currency, summ)
        }
      >
        Save
      </Button>
    </Paper>
  );
}
export default CreateQuickOperationDialog;

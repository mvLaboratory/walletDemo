import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import SaveIcon from "@material-ui/icons/Save";
import Select from "@material-ui/core/Select";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import FormattedNumberInput from "../atoms/FormattedNumberInput";
import OperationTypeSelector from "../operationCategory/OperationTypeSelector";

function CreateQuickOperationDialog({
  styles,
  currencyList,
  walletsList,
  operationCategoriesList,
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
  }));
  const classes = useStyles();

  const [summ, setSumm] = useState("0.00");

  const [operationType, setOperationType] = useState(2);
  const operationCategoriesListFiltered = operationCategoriesList.filter(
    (x) => x.operationType === operationType
  );
  const defaultOperationCategory =
    (operationCategoriesListFiltered &&
      operationCategoriesListFiltered[0] &&
      operationCategoriesListFiltered[0].id) ||
    0;
  const [operationCategory, setOperationCategory] = useState(
    defaultOperationCategory
  );

  const defaultWallet =
    (walletsList && walletsList[0] && walletsList[0].id) || 1;
  const [wallet, setWallet] = useState(defaultWallet);

  let defaultCurrecny =
    (currencyList && currencyList[0] && currencyList[0].id) || 1;
  const [currency, setCurrency] = useState(defaultCurrecny);

  useEffect(() => {
    setWallet(defaultWallet);
  }, [defaultWallet]);

  useEffect(() => {
    setCurrency(defaultCurrecny);
  }, [defaultCurrecny]);

  useEffect(() => {
    setOperationCategory(defaultOperationCategory);
  }, [defaultOperationCategory]);

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
      <h1>Quick Operation:</h1>
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
          saveHandler(operationType, operationCategory, wallet, currency, summ)
        }
      >
        Save
      </Button>
    </Paper>
  );
}
export default CreateQuickOperationDialog;

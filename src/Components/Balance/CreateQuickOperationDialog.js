import React, {useState } from "react";
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Paper} from '@material-ui/core'
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import SaveIcon from '@material-ui/icons/Save';
import Select from '@material-ui/core/Select';
import ButtonGroup from '@material-ui/core/ButtonGroup';

function CreateQuickOperationDialog( {styles, currencyList, walletsList, saveHandler }) {
  const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    inline: {
      width: "100%",
      display: 'inline-flex', 
      flexDirection: 'row',
      alignItems: "center",
      justifyContent: "space-between"
    },
    margin: {
      margin: theme.spacing(1),
    },
    withoutLabel: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(2)
    },
    withlabel: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(2)
    },
    textField: {
      width: 175,
    },
  }));
  const classes = useStyles();

  const [summ, setSumm] = useState(0.00);
  const [operationCategory, setOperationCategory] = useState(0);

  const defaultWallet = (walletsList && walletsList[0] && walletsList[0].id) || 1;
  const [wallet, setWallet] = useState(defaultWallet);

  let defaultCurrecny = (currencyList && currencyList[0] && currencyList[0].id) || 1;
  const [currency, setCurrency] = useState(defaultCurrecny);

  const [operationType, setOperationType] = useState(1);


  const selectOperationType = (value) => {
    setOperationType(value);
  }

  const renderOperationTypeSelector = () => {
    return (
      <ButtonGroup color="primary" aria-label="outlined primary button group">
        <Button variant={operationType === 1 ? "contained" : ""} onClick={() => selectOperationType(1)}>-</Button>
        <Button variant={operationType === 2 ? "contained" : ""} onClick={() => selectOperationType(2)}>+</Button>
        <Button variant={operationType === 3 ? "contained" : ""} onClick={() => selectOperationType(3)}>+/-</Button>
      </ButtonGroup>
    )
  }

  const renderSummInput = () => {
    return (       
      <div>
        <InputLabel className={clsx(classes.margin)} htmlFor="standard-adornment-amount">Summ:</InputLabel>     
        <FormControl fullWidth key={"operationValue"} className={clsx(classes.margin, classes.withlabel, classes.textField)}>
          <Input
            id={"standard-adornment-amount"}
            key={"amountInput"}
            value={summ}  
            onChange={event => setSumm(event.target.value)}
            startAdornment={<InputAdornment position="start">{"Y"}</InputAdornment>}
          />
        </FormControl> 
      </div>
    ); 
  }

  const renderSelect = (id, labelText, value, valueSetter, items) => {
    return (
      <FormControl className={clsx(classes.margin, classes.withlabel, classes.textField)}>
        <InputLabel htmlFor={`${id}-native-simple`}>{labelText}</InputLabel>
        <Select
          displayEmpty
          value={value}
          onChange={event => valueSetter(event.target.value)}
          inputProps={{ name: id, id: id + '-native-simple' }}
        >
          {items.map(x => (
            <option key={x.id} value={x.id}>{x.name}</option>
          ))}
        </Select>
      </FormControl>
    )
  }

  return (
    <Paper style={styles.Paper}>
      <h1>Quick Operation:</h1>
      <div className={clsx(classes.inline)}>
        <div>{renderSummInput()}</div>
        <div>{renderOperationTypeSelector()}</div>
      </div>
      <div>{renderSelect('operationCategory', 'Operation Category:', operationCategory, setOperationCategory, [{id: 1, name: "Food"}, {id: 2, name: "Internet" }, {id: 3, name: "Clothers" }])}</div>
      <div>{renderSelect('wallet', 'Wallet:', wallet, setWallet, walletsList)}</div>
      <div>{renderSelect('currency', 'Currency:', currency, setCurrency, currencyList)}</div>
      <Button
        className={clsx(classes.margin)}
        variant="contained"
        color="primary"
        size="large"
        startIcon={<SaveIcon />}
        onClick={() => saveHandler()}
      >
        Save
      </Button>
    </Paper>
  )
}
export default CreateQuickOperationDialog;
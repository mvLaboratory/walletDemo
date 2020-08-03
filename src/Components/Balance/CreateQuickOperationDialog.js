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

function CreateQuickOperationDialog( {styles, saveHandler }) {
  const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
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

  const renderOperationTypeSelect = () => {
    return (
      <FormControl className={clsx(classes.margin, classes.withlabel, classes.textField)}>
        <InputLabel className={clsx(classes.margin)} htmlFor="opCategory-native-simple">Operation Category</InputLabel>
        <Select
          native
          value={operationCategory}
          onChange={event => setOperationCategory(event.target.value)}
          inputProps={{
            name: 'opCategory',
            id: 'opCategory-native-simple',
          }}
        >
          <option value={1}>Food</option>
          <option value={2}>Internet</option>
          <option value={3}>Clothes</option>
        </Select>
      </FormControl>
    )
  }

  return (
    <Paper style={styles.Paper}>
      <h1>Quick Operation:</h1>
      <div>{renderSummInput()}</div>
      <div>{renderOperationTypeSelect()}</div>
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
import React from "react";
import PropTypes from "prop-types";
import NumberFormat from "react-number-format";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({}));

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix="$"
    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default function FormattedNumberInput(props) {
  const classes = useStyles();

  const handleChange = (event) => {
    let value = event.target.value;
    if (value !== "") value = parseFloat(value).toFixed(2);

    props.setValue(value);
  };

  const handleClick = (event) => {
    // eslint-disable-next-line eqeqeq
    if (!props.value || props.value == 0) {
      props.setValue("");
    }
  };

  const handleFocus = (event) => {
    // eslint-disable-next-line eqeqeq
    if (!props.value || props.value == 0) {
      props.setValue("");
    }
  };

  return (
    <div className={classes.root}>
      <TextField
        label="Summ"
        value={props.value}
        onChange={handleChange}
        onClick={handleClick}
        onFocus={handleFocus}
        autoFocus
        name="numberformat"
        id="formatted-numberformat-input"
        InputProps={{
          inputComponent: NumberFormatCustom,
        }}
      />
    </div>
  );
}

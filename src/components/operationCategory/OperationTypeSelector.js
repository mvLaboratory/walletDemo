import React from "react";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";

export default function OperationCategoryList({
  operationType,
  setOperationType,
}) {
  return (
    <ButtonGroup color="primary" aria-label="outlined primary button group">
      <Button
        variant={operationType === 2 ? "contained" : ""}
        onClick={() => setOperationType(2)}
      >
        -
      </Button>
      <Button
        variant={operationType === 1 ? "contained" : ""}
        onClick={() => setOperationType(1)}
      >
        +
      </Button>
      {false ? (
        <Button
          variant={operationType === 3 ? "contained" : ""}
          onClick={() => setOperationType(3)}
        >
          +/-
        </Button>
      ) : null}
    </ButtonGroup>
  );
}

import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { loadOperationCategories } from "../../actions/OperationCategoriesActions.js";
import OperationTypeSelector from "./OperationTypeSelector";
import NewWalletDialog from "../balance/NewWalletDialog";
import {
  Paper,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
} from "@material-ui/core";

const useStyles = makeStyles({
  paper: {
    paddingLeft: "20px",
    paddingRight: "20px",
    paddingBottom: "10px",
    marginTop: "5px",
    marginBottom: "1px",
    overflowY: "auto",
  },
  headerMenu: {
    display: "flex",
    marginTop: "5px",
    justifyContent: "space-between",
  },
});

export default function OperationCategoryList(props) {
  const classes = useStyles();
  const [operationType, setOperationType] = useState(2);
  const dispatch = useDispatch();
  const operationCategories = useSelector(
    (state) => state.OperationCategoryReducer.operationCategories
  );
  let operationCategoriesFiltered = operationCategories.filter(
    (x) => x.operationType === operationType
  );

  useEffect(() => {
    dispatch(loadOperationCategories(props.auth));
  });

  const handleTypeChange = (typeValue) => {
    setOperationType(typeValue);

    operationCategoriesFiltered = operationCategories.filter(
      (x) => x.operationType === typeValue
    );
  };

  return (
    <Paper className={classes.paper}>
      <div className={classes.headerMenu}>
        <OperationTypeSelector
          operationType={operationType}
          setOperationType={handleTypeChange}
        />
        <NewWalletDialog />
      </div>
      <Table aria-label="a dense table">
        <TableBody>
          {operationCategoriesFiltered.map((x) => (
            <TableRow key={x.id}>
              <TableCell key={x.id} align="center">
                {x.name}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

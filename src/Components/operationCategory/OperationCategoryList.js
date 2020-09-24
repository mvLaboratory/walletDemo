import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { loadOperationCategories } from "../../actions/OperationCategoriesActions.js";
import OperationTypeSelector from "./OperationTypeSelector";
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
    marginTop: "1px",
    marginBottom: "1px",
    overflowY: "auto",
  },
});

export default function OperationCategoryList(props) {
  const classes = useStyles();

  const operationCategories = useSelector(
    (state) => state.OperationCategoryReducer.operationCategories
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadOperationCategories(props.auth));
  });

  const [operationType, setOperationType] = useState(2);

  return (
    <Paper className={classes.paper}>
      <div>
        <h3>Filter:</h3>
        <OperationTypeSelector
          operationType={operationType}
          setOperationType={setOperationType}
        />
      </div>
      <Table aria-label="a dense table">
        <TableBody>
          {operationCategories.map((x) => (
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

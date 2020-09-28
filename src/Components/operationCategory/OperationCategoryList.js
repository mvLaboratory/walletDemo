import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  loadOperationCategories,
  addOperationCategory,
} from "../../actions/OperationCategoriesActions.js";
import OperationTypeSelector from "./OperationTypeSelector";
import NewOperationCategoryDialog from "./NewOperationCategoryDialog";
import {
  Paper,
  Table,
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
  const operationCategoryAddInProgres = useSelector(
    (state) => state.OperationCategoryReducer.addInProgres
  );

  let operationCategoriesFiltered = operationCategories.filter(
    (x) => x.operationType === operationType
  );
  useEffect(() => {
    dispatch(loadOperationCategories(props.auth));
  }, [dispatch, props.auth, operationCategoryAddInProgres]);

  const handleTypeChange = (typeValue) => {
    setOperationType(typeValue);

    operationCategoriesFiltered = operationCategories.filter(
      (x) => x.operationType === typeValue
    );
  };

  const handleNewCategory = (categoryName) => {
    let category = { name: categoryName, operationType: operationType };
    dispatch(addOperationCategory(category, props.auth));
  };

  return (
    <Paper className={classes.paper}>
      <div className={classes.headerMenu}>
        <OperationTypeSelector
          operationType={operationType}
          setOperationType={handleTypeChange}
        />
        <NewOperationCategoryDialog addCategoryHandler={handleNewCategory} />
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

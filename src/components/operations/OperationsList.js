import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { saveOperation, loadOperations } from "../../actions/OperationsActions";
import LoadingComponent from "../atoms/LoadingComponent";
//import OperationTypeSelector from "./OperationTypeSelector";
//import NewOperationCategoryDialog from "./NewOperationCategoryDialog";
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

  //const [operationType, setOperationType] = useState(2);
  const dispatch = useDispatch();

  const operationsList = useSelector(
    (state) => state.OperationsReducer.operations
  );
  const operationListLoadingInProgres = useSelector(
    (state) => state.OperationsReducer.operationsLoading
  );

 // let operationCategoriesFiltered = operationCategories.filter(
 //   (x) => x.operationType === operationType
 // );

  useEffect(() => {
    dispatch(loadOperations(props.auth));
  }, [dispatch, props.auth]);

  const handleTypeChange = (typeValue) => {
 //   setOperationType(typeValue);

 //   operationCategoriesFiltered = operationCategories.filter(
 //     (x) => x.operationType === typeValue
 //   );
  };

 // const handleNewCategory = (categoryName) => {
  //  let category = { name: categoryName, operationType: operationType };
  //  dispatch(addOperationCategory(category, props.auth));
 // };

  return (
    operationListLoadingInProgres
    ? <LoadingComponent />
    : <Paper className={classes.paper}>
      <div className={classes.headerMenu}>

      </div>
      <Table aria-label="a dense table">
        <TableBody>
          {operationsList.map((x) => (
              <TableRow key={x.id}>
                <TableCell align="center">
                  {x.id}
                </TableCell>
                <TableCell align="center">
                  {x.date}
                </TableCell>
                <TableCell align="center">
                  {x.description}
                </TableCell>
                <TableCell align="center">
                  {x.sum}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

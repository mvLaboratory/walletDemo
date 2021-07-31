import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { loadOperations } from "../../actions/OperationsActions";
import LoadingComponent from "../atoms/LoadingComponent";
import OperationTableRow from "./OperationTableRow";

import {
  Paper,
  Table,
  TableBody
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

export default function OperationCategoryList({auth, wallet}) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const operationsList = useSelector(
    (state) => state.OperationsReducer.operations
  );
  const operationListLoadingInProgres = useSelector(
    (state) => state.OperationsReducer.operationsLoading
  );

  useEffect(() => {
    dispatch(loadOperations(auth, [{name: "wallet.id", value: wallet.id}]));
  }, [dispatch, auth, wallet]);

  const [activeOperation, setActiveOperation] = useState({});

  //TODO:: move to utils
  const handleOperationSelect = (operationId) => {
    if (operationId > 0) {
      const selectedOperation = operationsList.find((op) => op.id === operationId);
      const opCopy = JSON.parse(JSON.stringify(selectedOperation));
      setActiveOperation(opCopy);
    }
    else {
      setActiveOperation({});
    }
  };

  return (
    operationListLoadingInProgres
    ? <LoadingComponent />
    : <Paper className={classes.paper}>
      <div className={classes.headerMenu}>

      </div>
      <Table aria-label="a dense table">
        <TableBody>
          {operationsList.map((operation) => (
            <OperationTableRow operation={operation} setSelected={handleOperationSelect} selectedObjId={activeOperation ? activeOperation.id : 0}/>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

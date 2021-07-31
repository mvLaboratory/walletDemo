import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import {
  TableCell,
  TableRow,
} from "@material-ui/core";
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import RemoveOutlinedIcon from '@material-ui/icons/RemoveOutlined';
import AddIcon from '@material-ui/icons/Add';

function OperationTableRow ({ operation, setSelected, selectedObjId})  {
  operation = operation || {};
  const [isHover, setHover] = useState(false);

  const useStyles = makeStyles((theme) => ({
    tableSummary: {
      tableBody: {  },
      tableRow: {  },
      operationsListButton: { }
    },
    operationDetailsIcon: {
      display: "inline-flex",
      float: "right",
      width: "20px",
      height: "20px",
      opacity: "60%"
    },
    operationActionsContainer: {
      width: "23px",
    },
    selected: {
      opacity: "100%"
    }
  }));
  const classes = useStyles();

  const isSelected = selectedObjId === operation.id;

  const renderOperationTypeIcon = (operationType) => {
    if (operationType === 1) {
      return ( <AddIcon /> );
    }
    else if (operationType === 2) {
      return ( <RemoveOutlinedIcon /> );
    }
    return "N/A";
  }

  return (    
    <TableRow
      className={classes.tableRow}
      key={operation.id}
      hover
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      selected={isSelected}
      onClick={() => setSelected(isSelected ? 0 : operation.id)}
    >
      <TableCell align="center">
        { renderOperationTypeIcon(operation.operationType) }
      </TableCell>
      <TableCell align="right">
        <div className={clsx(classes.operationActionsContainer)}>
          {isHover || isSelected
            ? ( <SearchOutlinedIcon 
                  className={clsx(classes.operationDetailsIcon, isSelected ? classes.selected : "")} 
                  //onClick={() => setSelected(isSelected ? 0 : operation.id)}
                /> ) 
            : "" }
        </div>
      </TableCell>
      <TableCell align="center">
          {operation.sum }
      </TableCell>
      <TableCell align="center">
        { operation.description }
      </TableCell>
      <TableCell align="left">
        { (operation && operation.date && operation.date.slice(0, 19).replace('T', ' ')) || ""  }
      </TableCell>
    </TableRow>
  );
}

export default OperationTableRow;

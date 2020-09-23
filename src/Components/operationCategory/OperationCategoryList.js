import React from "react";
import { makeStyles } from "@material-ui/core/styles";
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

export default function OperationCategoryList() {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Table aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="center" className={classes.tableHeader}>
              Name
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell align="center" size="small">
              Food
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <h1>ListSD here</h1>
    </Paper>
  );
}

import React from "react";
import { Grid } from "@material-ui/core";
import OperationCategoryList from "./OperationCategoryList";

export default function OperationCategoryPage() {
  return (
    <Grid container>
      <Grid item sm>
        <OperationCategoryList />
      </Grid>
      <Grid item sm>
        <h1>diagrams here</h1>
      </Grid>
    </Grid>
  );
}

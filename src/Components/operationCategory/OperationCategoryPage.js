import React from "react";
import { Grid } from "@material-ui/core";
import OperationCategoryList from "./OperationCategoryList";

export default function OperationCategoryPage({ auth }) {
  return (
    <Grid container>
      <Grid item sm>
        <OperationCategoryList auth={auth} />
      </Grid>
      <Grid item sm>
        <h1>diagrams here</h1>
      </Grid>
    </Grid>
  );
}

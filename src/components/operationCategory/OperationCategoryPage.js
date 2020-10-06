import React from "react";
import { Grid } from "@material-ui/core";
import OperationCategoryList from "./OperationCategoryList";
import ComponentUnderConstruction from "../atoms/ComponentUnderConstruction";

export default function OperationCategoryPage({ auth }) {
  return (
    <Grid container>
      <Grid item sm>
        <OperationCategoryList auth={auth} />
      </Grid>
      <Grid item sm>
        <ComponentUnderConstruction />
      </Grid>
    </Grid>
  );
}

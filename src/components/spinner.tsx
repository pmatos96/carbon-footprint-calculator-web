import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid2";
import React from "react";

const Spinner = (): React.ReactElement => {
    return (
        <Grid data-testid="loading-spinner" container height="100%" width="100%" alignItems="center" justifyContent="center">
            <CircularProgress />
        </Grid>
    )
}

export default Spinner;
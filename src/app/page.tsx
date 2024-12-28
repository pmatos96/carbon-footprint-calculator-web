import { Box,Button,Paper, Typography } from "@mui/material"
import Grid from "@mui/material/Grid2";
import Link from "next/link";

export default function Home() {
  return (
    <div >
      <main>
        <Grid width="100%" height="100%" container justifyContent="center" alignItems="center">
          <Paper sx={{ padding: 2, width: "50%"}}>
            <Typography variant="h5" mb={2}>
              Welcome to the Carbon Footprint Calculator
            </Typography>
            <Typography variant="body1">
              Calculate your carbon footprint effortlessly! Input your <strong>housing</strong> and <strong>transportation</strong> data, 
              such as electricity use, water consumption, waste, and travel habits, to discover your 
              total CO2 emissions and take a step toward sustainability.

              To start calculating, <Link href="/calculator">
                <Button>Click here</Button>
              </Link>.
            </Typography>
          </Paper>
        </Grid>
      </main>
    </div>
  );
}

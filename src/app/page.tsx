import { Box,Button,Paper, Typography } from "@mui/material"
import Grid from "@mui/material/Grid2";
import Link from "next/link";

export default function Home() {
  return (
    <div >
      <main>
        <Grid container spacing={12} justifyContent="center">
          <Grid height="100%" size={{ sm: 12, md:8, lg: 8 }}>
            <Paper sx={{ padding: 2 }}>
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
        </Grid>
      </main>
    </div>
  );
}

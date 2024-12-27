import { useCalculateEmission } from '@/contexts/EmissionCalculationContext';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import React from 'react';
import HousingComsumptionForm from './housingConsumptionForm';
import TransportationConsumptionForm from './transportationConsumptionForm';

const EmissionCalculator = (): React.ReactElement => {
    
    const { loading, housingEmission, calculateHousingEmission, transportationEmission, calculateTransportationEmission } = useCalculateEmission();
    
    return (
        <Box>
            My Emission: {housingEmission}
            My Transportation emission: {transportationEmission}
            <Grid container>
                <HousingComsumptionForm onSubmit={calculateHousingEmission} />
                <TransportationConsumptionForm onSubmit={calculateTransportationEmission}/>
            </Grid>
        </Box>
    )
}

export default EmissionCalculator;
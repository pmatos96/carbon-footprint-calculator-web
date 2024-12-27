import { useCalculateEmission } from '@/contexts/EmissionCalculationContext';
import { Box } from '@mui/material';
import React from 'react';
import HousingComsumptionForm from './housingConsumptionForm';

const EmissionCalculator = (): React.ReactElement => {
    
    const { loading, housingEmission, calculateHousingEmission } = useCalculateEmission();
    
    return (
        <Box>
            My Emission: {housingEmission}
            <HousingComsumptionForm onSubmit={calculateHousingEmission} />
        </Box>
    )
}

export default EmissionCalculator;
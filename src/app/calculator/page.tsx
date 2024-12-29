'use client'

import EmissionCalculator from './emissionCalculator';
import { EmissionCalculationProvider } from '@/contexts/EmissionCalculationContext';
import Box from '@mui/material/Box';
import React from 'react';

const CalculatorPage = (): React.ReactElement => {
    return (
        <main>
            <Box>
                <EmissionCalculationProvider>
                    <EmissionCalculator />
                </EmissionCalculationProvider>
            </Box>
        </main>
    );
}

export default CalculatorPage;
'use client'

import EmissionCalculator from './emissionCalculator';
import { EmissionCalculationProvider } from '@/contexts/EmissionCalculationContext';
import Box from '@mui/material/Box';
import React from 'react';

export default function CalculatorPage() {
    return (
        <div>
            <Box>
                <EmissionCalculationProvider>
                    <EmissionCalculator />
                </EmissionCalculationProvider>
            </Box>
        </div>
    );
  }
  
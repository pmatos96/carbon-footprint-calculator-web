'use client'

import { Button, Step, StepLabel, Stepper, Typography } from '@mui/material';
import EmissionCalculator from './emissionCalculator';
import { EmissionCalculationProvider } from '@/contexts/EmissionCalculationContext';
import React from 'react';

export default function CalculatorPage() {
    return (
        <div>
            <main>
                <EmissionCalculationProvider>
                    <EmissionCalculator />
                </EmissionCalculationProvider>
            </main>
        </div>
    );
  }
  
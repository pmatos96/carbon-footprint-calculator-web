'use client'

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
  
'use client'

import EmissionCalculator from './emissionCalculator';
import { EmissionCalculationProvider } from '@/contexts/EmissionCalculationContext';

export default function CalculatorPage() {
    return (
        <div>
            <main>
                <h1>Calculate your Carbon Footprint</h1>
                <EmissionCalculationProvider>
                    <EmissionCalculator />
                </EmissionCalculationProvider>
            </main>
        </div>
    );
  }
  
'use client'

import React from 'react';
import { useCalculateEmission } from '@/contexts/EmissionCalculationContext';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import HousingComsumptionForm, { IHousingConsumptionInputs } from './housingConsumptionForm';
import TransportationConsumptionForm, { ITransportationConsumptionInputs } from './transportationConsumptionForm';

import EmissionExhibition from './emissionExhibition';
import CalculationSteps from './calculationSteps';

const steps = ['Calculate Housing emissions', 'Calculate transportation emission', 'See the results'];

const housingInputsInitialState: IHousingConsumptionInputs = {
    electricityConsumption: '',
    naturalGasConsumption: '',
    fuelOilConsumption: '',
    lpgConsumption: '',
    wasteAmount: '',
    waterConsumption: '',
}

const transportationInputsInitialState = {
    vehiclesAmount: 1,
    milesDistanceTraveled: 0,
    averageGallonGasMileage: 100,
    periodInDays: 365,
}

const EmissionCalculator = (): React.ReactElement => {
    
    const [ activeStep, setActiveStep ] = React.useState<number>(0);
    const [ housingInputs, setHousingInputs ] = React.useState<IHousingConsumptionInputs>(housingInputsInitialState);
    const [ transportationInputs, setTransportationInputs ] = React.useState<ITransportationConsumptionInputs>(transportationInputsInitialState);
    const { 
        loading, 
        housingEmission, 
        calculateHousingEmission, 
        clearCalculations, 
        transportationEmission, 
        calculateTransportationEmission 
    } = useCalculateEmission();
    
    const handleClearCalculations = () => {
        clearCalculations();
        setHousingInputs(housingInputsInitialState);
        setTransportationInputs(transportationInputsInitialState);
    }

    const ViewByStep: { [step: number]: React.ReactNode } = {
        0: <>
            <Grid size={{sm: 12, md: 4}}>
                <HousingComsumptionForm consumptions={housingInputs} onSubmit={calculateHousingEmission} setConsumptions={setHousingInputs} />
            </Grid>
            <Grid size={{sm: 12, md: 4}}>
                <EmissionExhibition housingEmission={housingEmission || 0} loading={loading} transportationEmission={transportationEmission || 0} />
            </Grid>
        </>,
        1: <>
            <Grid size={{sm: 12, md: 4}}>
                <TransportationConsumptionForm consumptions={transportationInputs} onSubmit={calculateTransportationEmission} setConsumptions={setTransportationInputs}/>
            </Grid>
            <Grid size={{sm: 12, md: 4}}>
                <EmissionExhibition housingEmission={housingEmission || 0} loading={loading} transportationEmission={transportationEmission || 0} />
            </Grid>
        </>,
        2: <EmissionExhibition housingEmission={housingEmission || 0} loading={loading} showDetails transportationEmission={transportationEmission || 0} />
    }

    return (
        <Box>
            <CalculationSteps steps={steps} activeStep={activeStep} />
            <Button disabled={activeStep <= 0} onClick={() => setActiveStep(activeStep - 1)}>
                Back
            </Button>
            <Button disabled={activeStep >= 2} onClick={() => setActiveStep(activeStep + 1)}>
                Next
            </Button>
            <Button onClick={handleClearCalculations}>
                Clear
            </Button>
            <Grid spacing={2} container justifyContent="center" gap={4}>
                {ViewByStep[activeStep]}
            </Grid>
        </Box>
    )
}

export default EmissionCalculator;
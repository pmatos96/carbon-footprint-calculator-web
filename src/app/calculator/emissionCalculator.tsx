'use client'

import { useCalculateEmission } from '@/contexts/EmissionCalculationContext';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import React from 'react';
import HousingComsumptionForm, { IHousingConsumptionInputs } from './housingConsumptionForm';
import TransportationConsumptionForm, { ITransportationConsumptionInputs } from './transportationConsumptionForm';
import { Button, Step, StepLabel, Stepper } from '@mui/material';
import EmissionExhibition from './emissionExhibition';

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

    const { loading, housingEmission, calculateHousingEmission, clearCalculations, transportationEmission, calculateTransportationEmission } = useCalculateEmission();
    
    const handleClearCalculations = () => {
        clearCalculations();
        setHousingInputs(housingInputsInitialState);
        setTransportationInputs(transportationInputsInitialState);
    }

    const ViewByStep: { [step: number]: React.ReactNode } = {
        0: <HousingComsumptionForm consumptions={housingInputs} onSubmit={calculateHousingEmission} setConsumptions={setHousingInputs} />,
        1: <TransportationConsumptionForm consumptions={transportationInputs} onSubmit={calculateTransportationEmission} setConsumptions={setTransportationInputs}/>,
        2: null
    }

    return (
        <Box>
            <Stepper activeStep={activeStep}>
                {steps.map(label => {
                    return (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    )
                })}
            </Stepper>
            <Button disabled={activeStep <= 0} onClick={() => setActiveStep(activeStep - 1)}>
                Back
            </Button>
            <Button disabled={activeStep >= 2} onClick={() => setActiveStep(activeStep + 1)}>
                Next
            </Button>
            <Button onClick={handleClearCalculations}>
                Clear
            </Button>
            <Grid width="100%" container justifyContent="center" gap={4}>
                {ViewByStep[activeStep]}
                <EmissionExhibition housingEmission={housingEmission || 0} loading={loading} showDetails={activeStep === 2} transportationEmission={transportationEmission || 0} />
            </Grid>
        </Box>
    )
}

export default EmissionCalculator;
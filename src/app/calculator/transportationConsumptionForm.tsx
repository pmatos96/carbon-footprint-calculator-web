'use client'

import { Button, Paper, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

interface ITransportationConsumptionInputs {
    vehiclesAmount: number;
    milesDistanceTraveled: number;
    averageGallonGasMileage: number;
    periodInDays: number;
}

interface IHousingConsumptionForm {
    onSubmit: (transportationData: ITransportationConsumptionInputs) => void;
    submitButtonName?: string;
}

const TransportationConsumptionForm = ({ onSubmit, submitButtonName }: IHousingConsumptionForm): React.ReactElement => {

    const [ consumptions, setConsumptions ] = useState<ITransportationConsumptionInputs>({
        vehiclesAmount: 1,
        milesDistanceTraveled: 1000,
        averageGallonGasMileage: 1,
        periodInDays: 365,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setConsumptions((prevValues) => ({
            ...prevValues,
            [name]: Number(value),
        }));
    };

    return (
        <Paper sx={{ width: "40%", padding: 2 }}>
            <Typography variant="h6">
                Transportation consumptions:
            </Typography>
            <Stack 
                component="form" 
                onSubmit={(e) => { 
                    e.preventDefault(); 
                    if(consumptions)
                        onSubmit(consumptions);
                }}
            >
                <TextField name="vehiclesAmount" value={consumptions?.vehiclesAmount} onChange={handleInputChange} id="vehicles-amount-input" label="Number of vehicles" type="number"/>
                <TextField name="milesDistanceTraveled" value={consumptions?.milesDistanceTraveled} onChange={handleInputChange} id="natural-gas-consumption-input" label="Natural Gas (therms)" type="number"/>
                <TextField name="averageGallonGasMileage" value={consumptions?.averageGallonGasMileage} onChange={handleInputChange} id="fuel-oil-consumption-input" label="Fuel Oil (gallons)" type="number"/>
                <TextField name="periodInDays" value={consumptions?.periodInDays} onChange={handleInputChange} id="lpg-consumption-input" label="LPG (gallons)" type="number"/>
                <Button type="submit">
                    {submitButtonName || "Submit"}
                </Button>
            </Stack>
        </Paper>
    )
}

export default TransportationConsumptionForm;
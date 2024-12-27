'use client'

import { Button, Paper, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

interface IConsumptionInputs {
    electricityConsumption: number;
    naturalGasConsumption: number;
    fuelOilConsumption: number;
    lpgConsumption: number;
    wasteAmount: number;
    waterConsumption: number;
}

interface IHousingConsumptionForm {
    onSubmit: (consumptions: Partial<IConsumptionInputs>) => void;
    submitButtonName?: string;
}

const HousingComsumptionForm = ({ onSubmit, submitButtonName }: IHousingConsumptionForm): React.ReactElement => {

    const [ consumptions, setConsumptions ] = useState<Partial<IConsumptionInputs>>({
        electricityConsumption: 0,
        naturalGasConsumption: 0,
        fuelOilConsumption: 0,
        lpgConsumption: 0,
        wasteAmount: 0,
        waterConsumption: 0,
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
                Housing consumptions:
            </Typography>
            <Stack 
                component="form" 
                onSubmit={(e) => { 
                    e.preventDefault(); 
                    if(consumptions)
                        onSubmit(consumptions);
                }}
            >
                <TextField name="electricityConsumption" value={consumptions?.electricityConsumption} onChange={handleInputChange} id="electricity-consumption-input" label="Electricity (kWh)" type="number"/>
                <TextField name="naturalGasConsumption" value={consumptions?.naturalGasConsumption} onChange={handleInputChange} id="natural-gas-consumption-input" label="Natural Gas (therms)" type="number"/>
                <TextField name="fuelOilConsumption" value={consumptions?.fuelOilConsumption} onChange={handleInputChange} id="fuel-oil-consumption-input" label="Fuel Oil (gallons)" type="number"/>
                <TextField name="lpgConsumption" value={consumptions?.lpgConsumption} onChange={handleInputChange} id="lpg-consumption-input" label="LPG (gallons)" type="number"/>
                <TextField name="wasteAmount" value={consumptions?.wasteAmount} onChange={handleInputChange} id="waste-amount-input" label="Waste (kg)" type="number"/>
                <TextField name="waterConsumption" value={consumptions?.waterConsumption} onChange={handleInputChange} id="water-consumption-input" label="Water (l)" type="number"/>
                <Button type="submit">
                    {submitButtonName || "Submit"}
                </Button>
            </Stack>
        </Paper>
    )
}

export default HousingComsumptionForm;
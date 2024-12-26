'use client'

import { Button, Paper, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

interface IConsumptionInputs {
    electricity: number;
    naturalGas: number;
    fuelOil: number;
    lpg: number;
    waste: number;
    water: number;
}

interface IHousingConsumptionForm {
    onSubmit: (consumptions: Partial<IConsumptionInputs>) => void;
    submitButtonName?: string;
}

const HousingComsumptionForm = ({ onSubmit, submitButtonName }: IHousingConsumptionForm): React.ReactElement => {

    const [ consumptions, setConsumptions ] = useState<Partial<IConsumptionInputs>>({
        electricity: 0,
        naturalGas: 0,
        fuelOil: 0,
        lpg: 0,
        waste: 0,
        water: 0,
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
                <TextField name="electricity" value={consumptions?.electricity} onChange={handleInputChange} id="electricity-consumption-input" label="Electricity (kWh)" type="number"/>
                <TextField name="naturalGas" value={consumptions?.naturalGas} onChange={handleInputChange} id="natural-gas-consumption-input" label="Natural Gas (therms)" type="number"/>
                <TextField name="fuelOil" value={consumptions?.fuelOil} onChange={handleInputChange} id="fuel-oil-consumption-input" label="Fuel Oil (gallons)" type="number"/>
                <TextField name="lpg" value={consumptions?.lpg} onChange={handleInputChange} id="lpg-consumption-input" label="LPG (gallons)" type="number"/>
                <TextField name="waste" value={consumptions?.waste} onChange={handleInputChange} id="waste-amount-input" label="Waste (kg)" type="number"/>
                <TextField name="water" value={consumptions?.water} onChange={handleInputChange} id="water-consumption-input" label="Water (l)" type="number"/>
                <Button type="submit">
                    {submitButtonName || "Submit"}
                </Button>
            </Stack>
        </Paper>
    )
}

export default HousingComsumptionForm;
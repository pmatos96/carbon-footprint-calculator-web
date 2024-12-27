'use client'

import { Button, Paper, Stack, TextField, Typography } from "@mui/material";
import React from "react";

export interface IHousingConsumptionInputs {
    electricityConsumption: number | '';
    naturalGasConsumption: number | '';
    fuelOilConsumption: number | '';
    lpgConsumption: number | '';
    wasteAmount: number | '';
    waterConsumption: number | '';
}

interface IHousingConsumptionForm {
    consumptions: IHousingConsumptionInputs;
    onSubmit: (consumptions: Partial<IHousingConsumptionInputs>) => void;
    setConsumptions: React.Dispatch<React.SetStateAction<IHousingConsumptionInputs>>;
    submitButtonName?: string;
}

const HousingComsumptionForm = ({ consumptions, onSubmit, setConsumptions, submitButtonName }: IHousingConsumptionForm): React.ReactElement => {

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        const onlyNumbersValue = value.replace(/[^0-9.]/g, "");
        setConsumptions((prevValues) => ({
            ...prevValues,
            [name]: onlyNumbersValue,
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
                <TextField name="electricityConsumption" value={consumptions?.electricityConsumption} onChange={handleInputChange} id="electricity-consumption-input" label="Electricity (kWh)" type="text"/>
                <TextField name="naturalGasConsumption" value={consumptions?.naturalGasConsumption} onChange={handleInputChange} id="natural-gas-consumption-input" label="Natural Gas (therms)" type="text"/>
                <TextField name="fuelOilConsumption" value={consumptions?.fuelOilConsumption} onChange={handleInputChange} id="fuel-oil-consumption-input" label="Fuel Oil (gallons)" type="text"/>
                <TextField name="lpgConsumption" value={consumptions?.lpgConsumption} onChange={handleInputChange} id="lpg-consumption-input" label="LPG (gallons)" type="text"/>
                <TextField name="wasteAmount" value={consumptions?.wasteAmount} onChange={handleInputChange} id="waste-amount-input" label="Waste (kg)" type="text"/>
                <TextField name="waterConsumption" value={consumptions?.waterConsumption} onChange={handleInputChange} id="water-consumption-input" label="Water (l)" type="text"/>
                <Button type="submit">
                    {submitButtonName || "Submit"}
                </Button>
            </Stack>
        </Paper>
    )
}

export default HousingComsumptionForm;
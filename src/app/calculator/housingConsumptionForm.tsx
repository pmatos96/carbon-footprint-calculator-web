'use client'

import React from "react";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

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

    const fieldsCommonProps = {
        type: 'text',
        size: 'small' as 'small' | 'medium',
        onChange: handleInputChange
    }

    return (
        <Paper sx={{ padding: 2 }}>
            <Typography variant="h6" mb={2}>
                Housing consumptions:
            </Typography>
            <Stack 
                component="form"
                gap={2}
                onSubmit={(e) => { 
                    e.preventDefault(); 
                    if(consumptions)
                        onSubmit(consumptions);
                }}
            >
                <TextField 
                    name="electricityConsumption" 
                    value={consumptions?.electricityConsumption} 
                    id="electricity-consumption-input" 
                    label="Electricity (kWh)" 
                    {...fieldsCommonProps}
                />
                <TextField 
                    name="naturalGasConsumption" 
                    value={consumptions?.naturalGasConsumption} 
                    id="natural-gas-consumption-input" 
                    label="Natural Gas (therms)" 
                    {...fieldsCommonProps}
                />
                <TextField 
                    name="fuelOilConsumption" 
                    value={consumptions?.fuelOilConsumption} 
                    id="fuel-oil-consumption-input" 
                    label="Fuel Oil (gallons)" 
                    {...fieldsCommonProps}
                />
                <TextField 
                    name="lpgConsumption" 
                    value={consumptions?.lpgConsumption} 
                    id="lpg-consumption-input" 
                    label="LPG (gallons)" 
                    {...fieldsCommonProps}
                />
                <TextField 
                    name="wasteAmount" 
                    value={consumptions?.wasteAmount} 
                    id="waste-amount-input" 
                    label="Waste (kg)" 
                    {...fieldsCommonProps}
                />
                <TextField 
                    name="waterConsumption" 
                    value={consumptions?.waterConsumption} 
                    id="water-consumption-input" 
                    label="Water (l)" 
                    {...fieldsCommonProps}
                />
                <Button type="submit" size="small">
                    {submitButtonName || "Submit"}
                </Button>
            </Stack>
        </Paper>
    )
}

export default HousingComsumptionForm;
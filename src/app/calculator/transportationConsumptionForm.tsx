'use client'

import { Button, Paper, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

export interface ITransportationConsumptionInputs {
    vehiclesAmount: number;
    milesDistanceTraveled: number;
    averageGallonGasMileage: number;
    periodInDays: number;
}

interface IHousingConsumptionForm {
    onSubmit: (transportationData: ITransportationConsumptionInputs) => void;
    consumptions: ITransportationConsumptionInputs;
    setConsumptions: React.Dispatch<React.SetStateAction<ITransportationConsumptionInputs>>;
    submitButtonName?: string;
}

const TransportationConsumptionForm = ({ consumptions, onSubmit, setConsumptions, submitButtonName }: IHousingConsumptionForm): React.ReactElement => {

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
                <TextField name="milesDistanceTraveled" value={consumptions?.milesDistanceTraveled} onChange={handleInputChange} id="miles-traveled-distance-input" label="Traveled distance (miles)" type="number"/>
                <TextField name="averageGallonGasMileage" value={consumptions?.averageGallonGasMileage} onChange={handleInputChange} id="average-gas-mileage-input" label="Average Gas Mileage (gallons per mile)" type="number"/>
                <TextField name="periodInDays" value={consumptions?.periodInDays} onChange={handleInputChange} id="days-period-input" label="Period (days)" type="number"/>
                <Button type="submit">
                    {submitButtonName || "Submit"}
                </Button>
            </Stack>
        </Paper>
    )
}

export default TransportationConsumptionForm;
'use client'

import { isNonNegativeInteger, isNonNegativeNumber, isPositiveInteger, isPositiveNumber } from "@/helpers/valueValidations";
import { Button, Paper, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

export interface ITransportationConsumptionInputs {
    vehiclesAmount: number;
    milesDistanceTraveled: number;
    averageGallonGasMileage: number;
    periodInDays: number;
}

interface ITransportationConsumptionForm {
    onSubmit: (transportationData: ITransportationConsumptionInputs) => void;
    consumptions: ITransportationConsumptionInputs;
    setConsumptions: React.Dispatch<React.SetStateAction<ITransportationConsumptionInputs>>;
    submitButtonName?: string;
}

const isValidRulePerField: { [field: string]: (value: number | '') => boolean} = {
    vehiclesAmount: (value?: number | '') => !!value && isNonNegativeInteger(Number(value)),
    milesDistanceTraveled: (value?: number | '') => value !== '' && isNonNegativeNumber(Number(value)),
    averageGallonGasMileage: (value?: number | '') => !!value && isPositiveNumber(Number(value)),
    periodInDays: (value?: number | '') => !!value && isPositiveInteger(Number(value)),
}

const TransportationConsumptionForm = ({ consumptions, onSubmit, setConsumptions, submitButtonName }: ITransportationConsumptionForm): React.ReactElement => {

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        const onlyNumbersValue = value.replace(/[^0-9.]/g, "");
        
        setConsumptions((prevValues) => ({
            ...prevValues,
            [name]: onlyNumbersValue,
        }));
    };

    const fieldsWithError = Object.entries(consumptions).filter(([key, value]) => !isValidRulePerField[key](value)).map(([key, _]) => key);

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
                <TextField 
                    error={fieldsWithError.includes('vehiclesAmount')}
                    helperText={fieldsWithError.includes('vehiclesAmount') ? 'Value must be an integer' : null}
                    name="vehiclesAmount" 
                    value={consumptions?.vehiclesAmount} 
                    onChange={handleInputChange} 
                    id="vehicles-amount-input" 
                    label="Number of vehicles" 
                    required 
                    type="text"
                />
                <TextField 
                    error={fieldsWithError.includes('milesDistanceTraveled')} 
                    helperText={fieldsWithError.includes('milesDistanceTraveled') ? 'Required field': null}
                    name="milesDistanceTraveled" 
                    value={consumptions?.milesDistanceTraveled} 
                    onChange={handleInputChange} 
                    id="miles-traveled-distance-input" 
                    label="Traveled distance (miles)" 
                    required 
                    type="text"
                />
                <TextField 
                    error={fieldsWithError.includes('averageGallonGasMileage')}
                    helperText={fieldsWithError.includes('averageGallonGasMileage') ? 'Value must be positive': null}
                    name="averageGallonGasMileage" 
                    value={consumptions?.averageGallonGasMileage} 
                    onChange={handleInputChange} 
                    id="average-gas-mileage-input" 
                    label="Average Gas Mileage (gallons per mile)" 
                    required 
                    type="text"
                />
                <TextField 
                    error={fieldsWithError.includes('periodInDays')}
                    helperText={fieldsWithError.includes('periodInDays') ? 'Value must be a positive integer': null}
                    name="periodInDays" 
                    value={consumptions?.periodInDays} 
                    onChange={handleInputChange} 
                    id="days-period-input" 
                    label="Period (days)" 
                    required 
                    type="text"
                />
                <Button type="submit" disabled={fieldsWithError.length > 0}>
                    {submitButtonName || "Submit"}
                </Button>
            </Stack>
        </Paper>
    )
}

export default TransportationConsumptionForm;
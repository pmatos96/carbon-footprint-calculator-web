'use client'

import React from "react";
import { isNonNegativeInteger, isNonNegativeNumber, isPositiveInteger, isPositiveNumber } from "@/helpers/valueValidations";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

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

    const fieldsCommonProps = {
        required: true,
        size:"small" as "small" | "medium",
        type:"text",
        onChange: handleInputChange
    }

    const fieldsWithError = Object.entries(consumptions)
        .filter(([fieldName, value]) => !isValidRulePerField[fieldName](value))
        .map(([fieldName, _]) => fieldName);

    return (
        <Paper sx={{ padding: 2 }}>
            <Typography variant="h6" mb={2}>
                Transportation consumptions:
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
                    error={fieldsWithError.includes('vehiclesAmount')}
                    helperText={fieldsWithError.includes('vehiclesAmount') ? 'Value must be an integer' : null}
                    name="vehiclesAmount" 
                    value={consumptions?.vehiclesAmount} 
                    id="vehicles-amount-input" 
                    label="Number of vehicles" 
                    {...fieldsCommonProps}
                />
                <TextField 
                    error={fieldsWithError.includes('milesDistanceTraveled')} 
                    helperText={fieldsWithError.includes('milesDistanceTraveled') ? 'Required field': null}
                    name="milesDistanceTraveled" 
                    value={consumptions?.milesDistanceTraveled} 
                    id="miles-traveled-distance-input" 
                    label="Traveled distance (miles)" 
                    {...fieldsCommonProps}
                />
                <TextField 
                    error={fieldsWithError.includes('averageGallonGasMileage')}
                    helperText={fieldsWithError.includes('averageGallonGasMileage') ? 'Value must be positive': null}
                    name="averageGallonGasMileage" 
                    value={consumptions?.averageGallonGasMileage} 
                    id="average-gas-mileage-input" 
                    label="Average Gas Mileage (gallons per mile)" 
                    {...fieldsCommonProps}
                />
                <TextField 
                    error={fieldsWithError.includes('periodInDays')}
                    helperText={fieldsWithError.includes('periodInDays') ? 'Value must be a positive integer': null}
                    name="periodInDays" 
                    value={consumptions?.periodInDays} 
                    id="days-period-input" 
                    label="Period (days)" 
                    {...fieldsCommonProps}
                />
                <Button type="submit" disabled={fieldsWithError.length > 0}>
                    {submitButtonName || "Submit"}
                </Button>
            </Stack>
        </Paper>
    )
}

export default TransportationConsumptionForm;
import StepLabel from "@mui/material/StepLabel";
import Step from "@mui/material/Step";
import Stepper from "@mui/material/Stepper";
import React from "react";

interface ICalculationStepsProps {
    activeStep: number;
    steps: string[];
}

const CalculationSteps = ({ activeStep, steps }: ICalculationStepsProps): React.ReactElement => {

    return (
        <Stepper activeStep={activeStep}>
            {steps.map(label => {
                return (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                )
            })}
        </Stepper>
    )
}

export default CalculationSteps;
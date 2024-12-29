import TransportationConsumptionForm, { ITransportationConsumptionInputs } from "@/app/calculator/transportationConsumptionForm";
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';

describe("TransportationConsumptionForm", () => {
    const initialValues: ITransportationConsumptionInputs = {
        vehiclesAmount: 1,
        milesDistanceTraveled: 100,
        averageGallonGasMileage: 20,
        periodInDays: 30,
    };

    const mockSetConsumptions = jest.fn();
    const mockOnSubmit = jest.fn();

    it("renders correctly with initial values", () => {
        render(
            <TransportationConsumptionForm
                consumptions={initialValues}
                setConsumptions={mockSetConsumptions}
                onSubmit={mockOnSubmit}
            />
        );

        expect(screen.getByLabelText(/Number of vehicles/i)).toHaveValue("1");
        expect(screen.getByLabelText(/Traveled distance \(miles\)/i)).toHaveValue("100");
        expect(screen.getByLabelText(/Average Gas Mileage \(gallons per mile\)/i)).toHaveValue("20");
        expect(screen.getByLabelText(/Period \(days\)/i)).toHaveValue("30");
    });

    it("updates input values on change", () => {
        render(
            <TransportationConsumptionForm
                consumptions={initialValues}
                setConsumptions={mockSetConsumptions}
                onSubmit={mockOnSubmit}
            />
        );

        const vehiclesInput = screen.getByLabelText(/Number of vehicles/i);
        fireEvent.change(vehiclesInput, { target: { value: "2" } });

        expect(mockSetConsumptions).toHaveBeenCalledTimes(1);
        const updateFunction = mockSetConsumptions.mock.calls[0][0];
        const updatedState = updateFunction(initialValues);
        expect(updatedState).toEqual(
            expect.objectContaining({ vehiclesAmount: "2" })
        );
    });

    it("handles error when validation fails", () => {
        const invalidValues = { ...initialValues, averageGallonGasMileage: 0 };
        render(
            <TransportationConsumptionForm
                consumptions={invalidValues}
                setConsumptions={mockSetConsumptions}
                onSubmit={mockOnSubmit}
            />
        );

        const errorMessage = screen.getByText("Value must be positive");
        const submitButton = screen.getByRole("button", { name: /submit/i });

        expect(errorMessage).toBeInTheDocument();
        expect(submitButton).toBeDisabled();
    });

    it("calls onSubmit with the correct values when valid data is present and submit button is hit", () => {
        render(
            <TransportationConsumptionForm
                consumptions={initialValues}
                setConsumptions={mockSetConsumptions}
                onSubmit={mockOnSubmit}
            />
        );

        const submitButton = screen.getByRole("button", { name: /submit/i });
        fireEvent.click(submitButton);

        expect(mockOnSubmit).toHaveBeenCalledWith(initialValues);
    });
});

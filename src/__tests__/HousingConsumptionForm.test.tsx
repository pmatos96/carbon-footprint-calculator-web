import HousingComsumptionForm, { IHousingConsumptionInputs } from "@/app/calculator/housingConsumptionForm";
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';

describe("HousingConsumptionForm Component", () => {
    const mockOnSubmit = jest.fn();
    const mockSetConsumptions = jest.fn();

    const mockConsumptions: IHousingConsumptionInputs = {
        electricityConsumption: "",
        naturalGasConsumption: "",
        fuelOilConsumption: "",
        lpgConsumption: "",
        wasteAmount: "",
        waterConsumption: "",
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders the form fields correctly", () => {
        render(
            <HousingComsumptionForm
                consumptions={mockConsumptions}
                onSubmit={mockOnSubmit}
                setConsumptions={mockSetConsumptions}
            />
        );

        const electricityInput = screen.getByLabelText(/electricity \(kWh\)/i);
        const naturalGasInput = screen.getByLabelText(/natural gas \(therms\)/i);
        const fuelOilInput = screen.getByLabelText(/fuel oil \(gallons\)/i);
        const lpgInput = screen.getByLabelText(/lpg \(gallons\)/i);
        const wasteInput = screen.getByLabelText(/waste \(kg\)/i);
        const waterInput = screen.getByLabelText(/water \(l\)/i);
        const submitButton = screen.getByRole("button", { name: /submit/i });

        expect(electricityInput).toBeInTheDocument()
        expect(naturalGasInput).toBeInTheDocument();
        expect(fuelOilInput).toBeInTheDocument();
        expect(lpgInput).toBeInTheDocument();
        expect(wasteInput).toBeInTheDocument();
        expect(waterInput).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();
    });

    it("calls setConsumptions with updated value on input change", () => {
        render(
            <HousingComsumptionForm
                consumptions={mockConsumptions}
                onSubmit={mockOnSubmit}
                setConsumptions={mockSetConsumptions}
            />
        );

        const electricityInput = screen.getByLabelText(/electricity \(kWh\)/i);
        fireEvent.change(electricityInput, { target: { value: "100" } });
        expect(mockSetConsumptions).toHaveBeenCalledTimes(1);

        const updateFunction = mockSetConsumptions.mock.calls[0][0];
        const updatedState = updateFunction(mockConsumptions);
        expect(updatedState).toEqual(
            expect.objectContaining({ electricityConsumption: "100" })
        );
    });

    it("prevents non-numeric characters in inputs", () => {
        render(
            <HousingComsumptionForm
                consumptions={mockConsumptions}
                onSubmit={mockOnSubmit}
                setConsumptions={mockSetConsumptions}
            />
        );

        const waterInput = screen.getByLabelText(/water \(l\)/i);
        fireEvent.change(waterInput, { target: { value: "abc123" } });
        expect(mockSetConsumptions).toHaveBeenCalledTimes(1);

        const updateFunction = mockSetConsumptions.mock.calls[0][0];
        const updatedState = updateFunction(mockConsumptions);
        expect(updatedState).toEqual(
            expect.objectContaining({ waterConsumption: "123" })
        );
    });

    it("calls onSubmit with the correct data when the form is submitted", () => {
        render(
            <HousingComsumptionForm
                consumptions={{
                    ...mockConsumptions,
                    electricityConsumption: 100,
                }}
                onSubmit={mockOnSubmit}
                setConsumptions={mockSetConsumptions}
            />
        );

        const submitButton = screen.getByRole("button", { name: /submit/i });
        fireEvent.click(submitButton);

        expect(mockOnSubmit).toHaveBeenCalledWith(
            expect.objectContaining({ electricityConsumption: 100 })
        );
    });

    it("displays the custom submit button name when provided", () => {
        const customButtonName = "Calculate Emissions";

        render(
            <HousingComsumptionForm
                consumptions={mockConsumptions}
                onSubmit={mockOnSubmit}
                setConsumptions={mockSetConsumptions}
                submitButtonName={customButtonName}
            />
        );

        const customButton = screen.getByRole("button", {
            name: customButtonName,
        });

        expect(customButton).toBeInTheDocument();
    });
});

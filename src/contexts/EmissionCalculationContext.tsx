import { EmissionCalculationService, IHousingConsumptions, ITransportationParams } from "@/services/EmissionCalculationService";
import React from "react";

interface IHousingEmissionCalculationInput {
    electricityConsumption: number | '';
    naturalGasConsumption: number | '';
    fuelOilConsumption: number | '';
    lpgConsumption: number | '';
    wasteAmount: number | '';
    waterConsumption: number | '';
}

interface ITransportationEmissionCalculationInput {
    vehiclesAmount: number | '';
    milesDistanceTraveled: number | '';
    averageGallonGasMileage: number | '';
    periodInDays: number | '';
}

interface IEmissionCalculationContext {
    housingEmission: number | null;
    transportationEmission: number | null;
    loading: boolean;
    calculateHousingEmission: (data: Partial<IHousingEmissionCalculationInput>, zipcode?: string) => Promise<void>;
    calculateTransportationEmission: (data: ITransportationEmissionCalculationInput) => Promise<void>;
    clearCalculations: () => Promise<void>;
};

const EmissionCalculationContext = React.createContext<IEmissionCalculationContext | undefined>(undefined);

export const EmissionCalculationProvider = ({ children }: { children: React.ReactNode }): React.ReactElement => {

    const [ housingEmission, setHousingEmission ] = React.useState<number | null>(null);
    const [ transportationEmission, setTransportationEmission ] = React.useState<number | null>(null);
    const [ loading, setLoading ] = React.useState<boolean>(false);

    const calculateHousingEmission = React.useCallback(async (data: Partial<IHousingEmissionCalculationInput>, zipcode?: string): Promise<void> => {
        setLoading(true);

        const parsedData: Partial<IHousingConsumptions> = Object.fromEntries(
            Object.entries(data).map(([key, value]) => [key, Number(value)])
        );
        try {
            const emission = await EmissionCalculationService.calculateHousingEmission(parsedData, zipcode || '');
            setHousingEmission(emission);
        } catch (error) {
            console.error('Error calculating housing emission:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    const calculateTransportationEmission = React.useCallback(async (data: ITransportationEmissionCalculationInput): Promise<void> => {
        setLoading(true);

        const parsedData: ITransportationParams = {
            vehiclesAmount: Number(data.vehiclesAmount),
            averageGallonGasMileage: Number(data.averageGallonGasMileage),
            milesDistanceTraveled: Number(data.milesDistanceTraveled),
            periodInDays: Number(data.periodInDays),
        }
        try {
            const result = await EmissionCalculationService.calculateTransportationEmission(parsedData);
            setTransportationEmission(result);
        }
        catch (error) {
            console.error('Error calculating transportation emission:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    const clearCalculations = React.useCallback(async (): Promise<void> => {
        setLoading(true);
        try {
            await calculateHousingEmission({
                electricityConsumption: 0, // Values to get zero emission
                naturalGasConsumption: 0,
                fuelOilConsumption: 0,
                lpgConsumption: 0,
                wasteAmount: 0,
                waterConsumption: 0
            });
            await calculateTransportationEmission({
                vehiclesAmount: 0, // Values to get zero emission
                milesDistanceTraveled: 0,
                averageGallonGasMileage: 100,
                periodInDays: 365
            })
        }
        catch (error) {
            console.error('Error clearing emissions:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    return (
        <EmissionCalculationContext.Provider value={{
            housingEmission,
            transportationEmission,
            calculateHousingEmission,
            calculateTransportationEmission,
            clearCalculations,
            loading
        }}>
            {children}
        </EmissionCalculationContext.Provider>
    )
}

export const useCalculateEmission = () => {
    const context = React.useContext(EmissionCalculationContext);

    if(!context) {
        throw new Error('useCalculateEmission hook must be wrapped by EmissionCalculationProvider');
    }

    return context;
}
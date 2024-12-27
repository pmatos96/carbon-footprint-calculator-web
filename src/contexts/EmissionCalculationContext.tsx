import { EmissionCalculationService, IHousingConsumptions, ITransportationEmission } from "@/services/EmissionCalculationService";
import React, { createContext, useContext } from "react";

interface IEmissionCalculationContext {
    housingEmission: number | null;
    transportationEmission: number | null;
    loading: boolean;
    calculateHousingEmission: (data: Partial<IHousingConsumptions>, zipcode?: string) => Promise<void>;
    calculateTransportationEmission: (data: ITransportationEmission) => Promise<void>;
    clearCalculations: () => Promise<void>;
};

const EmissionCalculationContext = createContext<IEmissionCalculationContext | undefined>(undefined);

export const EmissionCalculationProvider: React.FC<{ children: React.ReactNode }> = ({ children }): React.ReactElement => {

    const [ housingEmission, setHousingEmission ] = React.useState<number | null>(null);
    const [ transportationEmission, setTransportationEmission ] = React.useState<number | null>(null);
    const [ loading, setLoading ] = React.useState<boolean>(false);

    const calculateHousingEmission = async (data: Partial<IHousingConsumptions>, zipcode?: string): Promise<void> => {
        setLoading(true);
        try {
            const result = await EmissionCalculationService.calculateHousingEmission(data, zipcode);
            setHousingEmission(result);
        } catch (error) {
            console.error('Error calculating housing emission:', error);
        } finally {
            setLoading(false);
        }
    };

    const calculateTransportationEmission = async (data: ITransportationEmission): Promise<void> => {
        setLoading(true);
        try {
            const result = await EmissionCalculationService.calculateTransportationEmission(data);
            setTransportationEmission(result);
        }
        catch (error) {
            console.error('Error calculating transportation emission:', error);
        } finally {
            setLoading(false);
        }
    }

    const clearCalculations = async (): Promise<void> => {
        setLoading(true);
        try {
            await calculateHousingEmission({
                electricityConsumption: 0,
                naturalGasConsumption: 0,
                fuelOilConsumption: 0,
                lpgConsumption: 0,
                wasteAmount: 0,
                waterConsumption: 0
            });
            await calculateTransportationEmission({
                vehiclesAmount: 1,
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
        

    }

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
    const context = useContext(EmissionCalculationContext);

    if(!context) {
        throw new Error('useCalculateEmission hook must be wrapped by EmissionCalculationProvider');
    }

    return context;
}
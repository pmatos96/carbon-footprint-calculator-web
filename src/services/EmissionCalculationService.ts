import apiClient from './apiClient';

export interface IHousingConsumptions {
    electricityConsumption: number | '';
    naturalGasConsumption: number | '';
    fuelOilConsumption: number | '';
    lpgConsumption: number | '';
    wasteAmount: number | '';
    waterConsumption: number | '';
}

export interface ITransportationEmission {
    vehiclesAmount: number;
    milesDistanceTraveled: number;
    averageGallonGasMileage: number;
    periodInDays: number;
}

export class EmissionCalculationService {

    static calculateHousingEmission = async (data: Partial<IHousingConsumptions>, zipcode?: string): Promise<number> => {
        const response = await apiClient.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/housing/calculate-emission${zipcode || ''}`,
            data
        );
        return response.data?.emission;
    }

    static calculateTransportationEmission = async (data: ITransportationEmission): Promise<number> => {
        const response = await apiClient.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/transportation/calculate-emission`,
            data
        );
        return response.data?.emission;
    }
}
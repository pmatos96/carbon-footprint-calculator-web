import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import EmissionExhibition from '@/app/calculator/emissionExhibition';

describe('EmissionExhibition Component', () => {
    it('renders the total emission correctly', () => {
        render(<EmissionExhibition housingEmission={50} transportationEmission={100} />);
        const totalEmission = screen.getByText('150.00');
        expect(totalEmission).toBeInTheDocument();
    });

    it('renders the spinner when loading is true', () => {
        render(<EmissionExhibition loading={true} />);
        const spinner = screen.getByTestId('loading-spinner');
        expect(spinner).toBeInTheDocument();
    });

    it('does not render details when showDetails is false', () => {
        render(<EmissionExhibition housingEmission={50} transportationEmission={100} showDetails={false} />);
        expect(screen.queryByText(/Housing emission:/)).not.toBeInTheDocument();
        expect(screen.queryByText(/Transportation emission:/)).not.toBeInTheDocument();
    });

    it('renders details when showDetails is true', () => {
        render(<EmissionExhibition housingEmission={60} transportationEmission={40} showDetails={true} />);
        
        const HousingLabel = screen.getByText('Housing emission:');
        const HousingValue = screen.getByText('60 %');

        const TransportationLabel = screen.getByText('Transportation emission:');
        const TransportationValue = screen.getByText('40 %');

        expect(HousingLabel).toBeInTheDocument();
        expect(HousingValue).toBeInTheDocument();

        expect(TransportationLabel).toBeInTheDocument();
        expect(TransportationValue).toBeInTheDocument();

        // Check that they are rendered together
        expect(HousingLabel.closest('div')).toContainElement(HousingValue);
        expect(TransportationLabel.closest('div')).toContainElement(TransportationValue);
    });

    it('renders zero emission values correctly', () => {
        render(<EmissionExhibition housingEmission={0} transportationEmission={0} />);
        const totalEmission = screen.getByText('0.00');
        expect(totalEmission).toBeInTheDocument();
    });
});

'use client'

import HousingComsumptionForm from "./housingConsumptionForm";

export default function CalculatorPage() {
    return (
      <div >
        <main>
          <h1>Calculate your Carbon Footprint:</h1>
          <HousingComsumptionForm onSubmit={(consumptions) => console.log(consumptions)} />
        </main>
      </div>
    );
  }
  
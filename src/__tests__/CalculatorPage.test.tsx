import { render } from "@testing-library/react";
import CalculatorPage from "@/app/calculator/page";

describe("Home Page Component Snapshot", () => {
  it("matches the snapshot", () => {
    const { asFragment } = render(<CalculatorPage />);
    expect(asFragment()).toMatchSnapshot();
  });
});

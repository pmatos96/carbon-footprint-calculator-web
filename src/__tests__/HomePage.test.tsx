import { render } from "@testing-library/react";
import Home from "@/app/page";

describe("Home Page Component Snapshot", () => {
  it("matches the snapshot", () => {
    const { asFragment } = render(<Home />);
    expect(asFragment()).toMatchSnapshot();
  });
});

import AppNavBar from "@/app/appNavBar";
import { render } from "@testing-library/react";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
    useRouter: jest.fn(),
}));

describe("App Navbar Component Snapshot", () => {

  const mockPageItems = [{ name: 'HOME', route: '/' }, { name: 'CALCULATOR', route: '/calculator' }];
  const mockPush = jest.fn();
  (useRouter as jest.Mock).mockReturnValue({
    push: mockPush,
  });

  it("matches the snapshot", () => {

    const { asFragment } = render(
      <AppNavBar pageItems={mockPageItems} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

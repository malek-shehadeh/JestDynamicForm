import { render, screen } from "@testing-library/react";
import HelloWorld from "./HelloWorld";

test("renders the HelloWorld component with a name", () => {
  render(<HelloWorld name="Vite" />);
  expect(screen.getByText("Hello, Vite!")).toBeInTheDocument();
});

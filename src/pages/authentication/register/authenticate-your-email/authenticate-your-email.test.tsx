import { fireEvent, render, screen } from "@testing-library/react";
import { TestingContainer } from "../../testing-container";
import { AuthenticateYourEmail } from "./authenticate-your-email";

describe(`AuthenticateYourEmail`, () => {
  beforeAll(() => {
    HTMLFormElement.prototype.submit = jest.fn();
  });

  it(`should open the log-in page if the user clicks the 'Ok' button`, async () => {
    const { wrapper } = TestingContainer();
    render(<AuthenticateYourEmail />, { wrapper });

    fireEvent.click(screen.getAllByText('Ok')[0]);

    expect(await screen.findByText('Log in page')).toBeInTheDocument();
  })
})
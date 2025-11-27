import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";
import Login from "./Login";

vi.mock('react-router-dom', () => ({
    useNavigate: () => vi.fn()
}));

describe('Login', () => {
    let emailInput: HTMLInputElement, passwordInput: HTMLInputElement, button: HTMLButtonElement;

    beforeEach(() => {
        render(<Login />);

        emailInput = screen.getByTestId("email");
        passwordInput = screen.getByTestId("password");
        button = screen.getByRole("button");
    });
    
    it('should render email-password inputs along log in button', () => {
        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(button).toBeInTheDocument();
    });

    it('should return error message for empty inputs', async () => {
        const user = userEvent.setup();
        
        await user.click(button);
        expect(screen.getByTestId("error")).toBeInTheDocument();
    });
    
    it('should return error for wrong email format', async () => {
        const user = userEvent.setup();
         
        await user.type(emailInput, "opemipo@");
        await user.click(button);
       
        expect(screen.getByTestId("error")).toBeInTheDocument();
    });

    it('should redirect user to /dashboard/users if inputs are verified', async () => {
        const user = userEvent.setup();
         
        await user.type(emailInput, "opemipoopemipo6@gmail.com");
        await user.type(passwordInput, "opemipoomoniyi");
        await user.click(button);
       
        expect(screen.queryByTestId("error")).not.toBeInTheDocument();
        expect(screen.queryByText(/loading/i)).toBeInTheDocument();
    });
})
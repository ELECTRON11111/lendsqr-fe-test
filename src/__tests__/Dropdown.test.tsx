import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Dropdown from "../components/Dropdown/Dropdown";

describe('Dropdown', () => {
    const toggleDropdown = {
        activeId: 1,
        setActiveId: vi.fn()
    }

    it('should render view, blacklist and activate buttons', () => {
        render(<Dropdown id="1" toggleDropdown={toggleDropdown} />);

        const viewButton = screen.getByText(/view/i);
        const blacklistButton = screen.getByText(/blacklist/i);
        const activateButton = screen.getByText(/activate/i);

        expect(viewButton).toBeInTheDocument();
        expect(blacklistButton).toBeInTheDocument();
        expect(activateButton).toBeInTheDocument();
    });

    it('should not show when activeId and id are different', () => {
        render(<Dropdown id="3" toggleDropdown={toggleDropdown} />);
        const dropdown = screen.getByTestId("dropdown");

        expect(dropdown).not.toHaveAttribute("class", "show dropdown");
    });
    
    it('should show when activeId and id are the same', () => {
        render(<Dropdown id="1" toggleDropdown={toggleDropdown} />);
        const dropdown = screen.getByTestId("dropdown");
    
        expect(dropdown).toHaveAttribute("class", "show dropdown");
    });

    it('should redirect to /dashboard/users/${id} when view details link is pressed', async () => {
        render(<Dropdown id="1" toggleDropdown={toggleDropdown} />);
        const link = screen.getByRole("link");

        expect(link).toHaveAttribute("href", "/dashboard/users/1");
        expect(link.lastChild).toHaveTextContent(/view/i);
    });
})
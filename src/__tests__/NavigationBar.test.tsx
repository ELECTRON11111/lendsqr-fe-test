import { render, screen } from "@testing-library/react";
import { describe, expect, vi, it } from "vitest";
import userEvent from "@testing-library/user-event";
import NavigationBar from "../components/NavigationBar/NavigationBar";


vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
  })),
  usePathname: vi.fn(() => ({
    includes: vi.fn()
  }))
}));

describe('Navigation Bar', () => {
    const handleLogOut = vi.fn();

    beforeEach(() => {
        let push = vi.fn();
        handleLogOut.mockClear();
        window.sessionStorage.clear();
    });

    afterEach(() => {
        window.dispatchEvent(new Event('resize'));
    });

    it('should render all required nav items', () => {
        render(<NavigationBar show />);
        const allNavItems = screen.getAllByRole("listitem");
        const link = screen.getByRole("link");

        expect(allNavItems).toHaveLength(24);
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute("href", "/dashboard/users");
    });

    it('should not show / collapse for mobile screens', () => {
        render(<NavigationBar show={false} />);
        const navContainer = screen.getByTestId("nav-container");
        
        expect(navContainer.className).not.toContain('show');
    });

    it('should show for tablets and desktops', () => {
        render(<NavigationBar show={true} />);
        const navContainer = screen.getByTestId("nav-container");
        
        expect(navContainer.className).toContain('show');
    });

    it('should log out and navigate to home on logout button click', async () => {
        render(<NavigationBar show />);
        const logoutButton = screen.getByTestId("logout");

        const user = userEvent.setup();
        await user.click(logoutButton);

        expect(window.sessionStorage.getItem("auth")).toBeNull();
    });
})
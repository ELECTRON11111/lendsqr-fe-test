import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom';
import Header from '../components/Header/Header';

// Mock next/navigation useRouter
const push = vi.fn();
vi.mock('next/navigation', () => ({
    useRouter: () => ({
        push,
    }),
}));

describe('Header', () => {
    let handleClick: ReturnType<typeof vi.fn>;

    beforeEach(() => {
        handleClick = vi.fn();
        push.mockClear();
    });

    it('renders Docs link', () => {
        render(<Header handleClick={handleClick} />);
        expect(screen.getByText('Docs')).toBeInTheDocument();
    });

    it('renders the notifications icon', () => {
        render(<Header handleClick={handleClick} />);
        expect(screen.getByTestId('notifications')).toBeInTheDocument();
    });

    it('renders the logo image with correct src', () => {
        render(<Header handleClick={handleClick} />);
        const logo = screen.getByTestId('logo');
        expect(logo).toHaveAttribute('src', '/login/lendsqr-logo.svg');
    });

    it('renders user avatar and username', () => {
        render(<Header handleClick={handleClick} />);
        expect(screen.getByRole('img', { name: /User profile/i })).toBeInTheDocument();
        expect(screen.getByText('Adedeji')).toBeInTheDocument();
    });

    it("add search query to URL on search button click", async () => {
        render(<Header handleClick={handleClick} />);

        const searchButton = screen.getByTestId("search");
        const input = screen.getByTestId("search-input");
       
        await userEvent.click(searchButton);

        expect(global.window.location.href).toContain((input as HTMLInputElement).value);
    });
});



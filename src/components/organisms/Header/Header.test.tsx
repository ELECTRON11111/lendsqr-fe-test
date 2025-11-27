import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom';
import Header from './Header';

// Mock next/navigation useRouter
const push = vi.fn();
vi.mock('react-router-dom', () => ({
    useNavigate: vi.fn(),
    Link: vi.fn(() => <a />)
}));

describe('Header', () => {
    let handleClick: ReturnType<typeof vi.fn>;

    beforeEach(() => {
        handleClick = vi.fn();
        push.mockClear();
    });

    it('renders the notifications icon', () => {
        render(<Header handleClick={() => handleClick} />);
        expect(screen.getByTestId('notifications')).toBeInTheDocument();
    });

    it('renders user avatar and username', () => {
        render(<Header handleClick={() => handleClick} />);
        expect(screen.getByRole('img', { name: /User profile/i })).toBeInTheDocument();
        expect(screen.getByText('Adedeji')).toBeInTheDocument();
    });

    it("add search query to URL on search button click", async () => {
        render(<Header handleClick={() => handleClick} />);

        const searchButton = screen.getByTestId("search");
        const input = screen.getByTestId("search-input");
       
        await userEvent.click(searchButton);

        expect(globalThis.window.location.href).toContain((input as HTMLInputElement).value);
    });
});



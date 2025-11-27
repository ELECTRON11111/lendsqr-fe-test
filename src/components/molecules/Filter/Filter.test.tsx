import { render, screen } from "@testing-library/react";
import { describe, it, vi, beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";
import Filter from "./Filter";

let push: ReturnType<typeof vi.fn>;
let closeFilter: () => void;

vi.mock('react-router-dom', () => ({
    useNavigate: () => push,
    useSearchParams: () => ({
        get: vi.fn(),
    }),
}));

describe('Filter', () => {
    beforeEach(() => {
        push = vi.fn();
        closeFilter = vi.fn();
    });

    it('should remove all search params on Reset button click', async () => {
        render(<Filter show={true} closeFilter={closeFilter} />);
        const input = screen.getByPlaceholderText(/user/i);
        await userEvent.type(input, "test");
        expect(input).toHaveValue("test");

        // Click Reset
        const resetBtn = screen.getByRole('button', { name: /reset/i });
        await userEvent.click(resetBtn);

        expect(closeFilter).toHaveBeenCalled();
    });

    it('should call router.push with filters when Filter button is clicked', async () => {
        render(<Filter show={true} closeFilter={closeFilter} />);
        const userInput = screen.getByPlaceholderText(/user/i);
        await userEvent.type(userInput, "user123");

        const filterBtn = screen.getByRole('button', { name: /filter/i });
        await userEvent.click(filterBtn);

        expect(push).toHaveBeenCalled();
        expect(closeFilter).toHaveBeenCalled();
    });

    it('should not crash when Reset is clicked with empty fields', async () => {
        render(<Filter show={true} closeFilter={closeFilter} />);
        const resetBtn = screen.getByRole('button', { name: /reset/i });
        await userEvent.click(resetBtn);

        expect(closeFilter).toHaveBeenCalled();
    });
});
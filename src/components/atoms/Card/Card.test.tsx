import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Card from "./Card";

describe("Card", () => {
    it('should render icon, title and numbers', () => {
        render(<Card 
            imgSrc="/user-images/users-icon.svg"
            title="USERS"
            numbers={500}
        />);
        
        const icon = screen.getByRole("img");
        const title = screen.getByRole("paragraph");
        const numbers = screen.getByRole("heading");

        expect(numbers).toHaveTextContent("500");
        expect(title).toHaveTextContent("USERS");
        expect(icon).toHaveAttribute("src", "/user-images/users-icon.svg");
    });
});
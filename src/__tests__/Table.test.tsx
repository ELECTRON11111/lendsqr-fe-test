import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Table from "../components/Table/Table";
import { User } from "../types/userTypes";

vi.mock("next/navigation", () => ({
    useRouter: vi.fn(() => {
        push: vi.fn()
    }),
    useSearchParams: vi.fn()
}));

describe('Table', () => {
    it('should not show table if user list is empty', () => {
       render(<Table users={[]} />);

       const table = screen.queryByRole("table");
       expect(table).not.toBeInTheDocument();
    });

    it('should show table when users list is not empty and be the same length as tr elements', () => {
        const users: User[] = [{
            id: 1,
            orgName: "Lendsqr",
            userName: "johndoe",
            email: "johndoe@example.com",
            phoneNumber: "+2348012345678",
            createdAt: "2023-01-01T12:00:00Z",
            status: "active",
            user_details: {
                id: "u-12345",
                tier: "2",
                account_balance: "150000.00",
                bvn: "12345678901",
                bank: "Lendsqr Bank",
                personal_info: {
                full_name: "John Doe",
                phone_number: "+2348012345678",
                email_address: "johndoe@example.com",
                marital_status: "Single",
                children: 0,
                type_of_residence: "Apartment"
            },
            education_and_employment: {
                level_of_education: "B.Sc",
                employment_status: "Employed",
                sector_of_employment: "Technology",
                duration_of_employment: "3 years",
                office_email: "john.doe@lendsqr.com",
                monthly_income: "250000",
                loan_repayment: "50000"
            },
            socials: {
                twitter: "@johndoe",
                facebook: "facebook.com/johndoe",
                instagram: "@johndoe"
            },
            guarantor: {
                full_name: "Jane Doe",
                phone_number: "+2348098765432",
                email_address: "janedoe@example.com",
                relationship: "Sister"
            }
        }}];
        render(<Table users={users} />);

        const table = screen.queryByRole("table");
        const tr = screen.getAllByTestId("tr");
       
        expect(table).toBeInTheDocument();
        expect(tr.length).toBe(users.length);
    });
})
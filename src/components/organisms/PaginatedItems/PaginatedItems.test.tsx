import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";
import PaginatedItems from "./PaginatedItems";
import { type User } from "../../../types/userTypes";

const createMockUser = (id: number): User => ({
  id,
  orgName: "Lendsqr",
  userName: "johndoe",
  email: "johndoe@example.com",
  phoneNumber: "+2348012345678",
  createdAt: "2023-01-01T12:00:00Z",
  status: "active",
  user_details: {
    id: `u-${id}`,
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
  }
});

vi.mock("react-router-dom", () => ({
    useNavigate: vi.fn(),
    Link: () => { return <a /> },
    useSearchParams: vi.fn(() => [
        {
            get: vi.fn()
        },
        vi.fn()
    ])
}));

describe("PaginatedItems Component", () => {
  const ITEMS_PER_PAGE = 20;
  let users: User[];

  beforeEach(() => {
    users = [createMockUser(1)];
  });

  it("displays table when loading is complete and users exist", () => {
    render(<PaginatedItems loading={false} userList={users} />);
    expect(screen.getByRole("table")).toBeInTheDocument();
  });

  it("updates displayed users based on selected items per page", async () => {
    users = Array.from({ length: 24 }, (_, index) => createMockUser(index + 1));
    render(<PaginatedItems loading={false} userList={users} />);
    
    const selectInput = screen.getByTestId("users_count");
    await userEvent.selectOptions(selectInput, ITEMS_PER_PAGE.toString());

    const tableRows = screen.getByRole("table").lastChild?.childNodes;
    expect(tableRows).toHaveLength(ITEMS_PER_PAGE);
  });

  it("changes active page when a different page is selected", async () => {
    users = [createMockUser(1), createMockUser(2)];
    render(<PaginatedItems loading={false} userList={users} />);
    
    const pages = screen.getByTestId("pages_listing");
    const lastPage = pages.lastChild as HTMLElement;

    await userEvent.click(lastPage);
    expect(lastPage).toHaveAttribute("id", "active");
  });
});
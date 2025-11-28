import { render, screen } from "@testing-library/react";
import { describe, it, beforeEach, afterEach, vi } from "vitest";

vi.mock("react-router-dom", () => ({
    useParams: vi.fn(),
    useNavigate: vi.fn(),
    useLocation: () => ({
        pathname: "/dashboard/users/1"
    }),
    Link: () => <a />,
}));

import UserDetails from "./UserDetails";

describe("User Details Page", () => {
  const user = {
    id: 1,
    orgName: "Lendsqr",
    userName: "johndoe",
    email: "johndoe@example.com",
    phoneNumber: "+2348012345678",
    createdAt: "2023-01-01T12:00:00Z",
    status: "active",
    user_details: {
      id: "u-1",
      tier: "2",
      account_balance: "₦150000.00",
      bvn: "12345678901",
      bank: "Lendsqr Bank",
      personal_info: {
        full_name: "John Doe",
        phone_number: "+2348012345678",
        email_address: "johndoe@example.com",
        marital_status: "Single",
        children: 0,
        type_of_residence: "Apartment",
      },
      education_and_employment: {
        level_of_education: "B.Sc",
        employment_status: "Employed",
        sector_of_employment: "Technology",
        duration_of_employment: "3 years",
        office_email: "john.doe@lendsqr.com",
        monthly_income: "₦250000 - ₦300000",
        loan_repayment: "₦50000",
      },
      socials: {
        twitter: "@johndoe",
        facebook: "facebook.com/johndoe",
        instagram: "@johndoe",
      },
      guarantor: {
        full_name: "Jane Doe",
        phone_number: "+2348098765432",
        email_address: "janedoe@example.com",
        relationship: "Sister",
      },
    },
  };

  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    localStorage.setItem("users", JSON.stringify([user]));
  });

  afterEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it("renders user details when user is found", () => {
    render(<UserDetails />);
    expect(screen.getByText("User Details")).toBeInTheDocument();
    expect(screen.getAllByText(user.userName)[0]).toBeInTheDocument();
    expect(screen.getAllByText(user.email)[0]).toBeInTheDocument();
    expect(screen.getAllByText(user.phoneNumber)[0]).toBeInTheDocument();
    expect(screen.queryByText("User not available")).not.toBeInTheDocument();
  });
  
  it("shows 'User not available' when there are no users in localStorage backup", () => {
    localStorage.removeItem("users");
    render(<UserDetails />);
    expect(screen.getByText("User not available")).toBeInTheDocument();
  });
});
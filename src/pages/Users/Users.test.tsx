import { render, screen, waitFor } from "@testing-library/react";
import { expect, it, describe, beforeEach, vi, afterEach } from "vitest";
import Users from "./Users";
import { type User } from "../../types/userTypes";

vi.mock("../hooks/useIsScreenSmall", () => ({
  useIsScreenSmall: () => false,
}));

vi.mock("react-router-dom", () => ({
  useSearchParams: () => new URLSearchParams(),
  useRouter: vi.fn(() => {
    push: vi.fn()
  }),
  usePathname: vi.fn(() => ({
    includes: vi.fn()
  }))
}));

const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

const mockUsers: User[] = [
  {
    id: 1,
    orgName: "Test Org 1",
    userName: "testuser1",
    email: "test1@example.com",
    phoneNumber: "1234567890",
    createdAt: "2023-01-01",
    status: "active",
    user_details: {
      id: "1",
      tier: "1",
      account_balance: "1000",
      bvn: "12345678901",
      bank: "Test Bank",
      personal_info: {
        full_name: "Test User 1",
        phone_number: "1234567890",
        email_address: "test1@example.com",
        marital_status: "single",
        children: 0,
        type_of_residence: "apartment",
      },
      education_and_employment: {
        level_of_education: "bachelor",
        employment_status: "employed",
        sector_of_employment: "tech",
        duration_of_employment: "2 years",
        office_email: "test1@company.com",
        monthly_income: "50000",
        loan_repayment: "10000",
      },
      socials: {
        twitter: "@testuser1",
        facebook: "testuser1",
        instagram: "testuser1",
      },
      guarantor: {
        full_name: "Guarantor 1",
        phone_number: "0987654321",
        email_address: "guarantor1@example.com",
        relationship: "friend",
      },
    },
  },
  {
    id: 2,
    orgName: "Test Org 2",
    userName: "testuser2",
    email: "test2@example.com",
    phoneNumber: "0987654321",
    createdAt: "2023-01-02",
    status: "inactive",
    user_details: {
      id: "2",
      tier: "2",
      account_balance: "2000",
      bvn: "09876543210",
      bank: "Test Bank 2",
      personal_info: {
        full_name: "Test User 2",
        phone_number: "0987654321",
        email_address: "test2@example.com",
        marital_status: "married",
        children: 2,
        type_of_residence: "house",
      },
      education_and_employment: {
        level_of_education: "master",
        employment_status: "employed",
        sector_of_employment: "finance",
        duration_of_employment: "5 years",
        office_email: "test2@company.com",
        monthly_income: "80000",
        loan_repayment: "15000",
      },
      socials: {
        twitter: "@testuser2",
        facebook: "testuser2",
        instagram: "testuser2",
      },
      guarantor: {
        full_name: "Guarantor 2",
        phone_number: "1234567890",
        email_address: "guarantor2@example.com",
        relationship: "family",
      },
    },
  },
];

describe("UsersUsers", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    globalThis.fetch = vi.fn();
    localStorageMock.getItem.mockReturnValue(null);
    localStorageMock.setItem.mockImplementation(() => {});
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("Positive Cases", () => {
    it("should render all four cards with correct titles", () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      globalThis.fetch.mockResolvedValueOnce({
        json: async () => [mockUsers[0]]
      })
      render(<Users />);
      
      expect(screen.queryByText("USERS")).toBeInTheDocument();
      expect(screen.queryByText("ACTIVE USERS")).toBeInTheDocument();
      expect(screen.queryByText("USERS WITH LOANS")).toBeInTheDocument();
      expect(screen.queryByText("USERS WITH SAVINGS")).toBeInTheDocument();
    });

    it("should load users from localStorage when available", async () => {
      localStorageMock.getItem.mockReturnValue(JSON.stringify(mockUsers));
      
      render(<Users />);
      
      await waitFor(() => {
        expect(localStorageMock.getItem).toHaveBeenCalledWith("users");
      });
    });

    it("should fetch users from API when localStorage is empty", async () => {
      const mockFetch = vi.fn().mockResolvedValue({
        json: () => Promise.resolve(mockUsers),
      });
      globalThis.fetch = mockFetch;

      render(<Users />);

      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith(
          "https://opemipoomoniyi.free.beeceptor.com/users",
          expect.objectContaining({
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          })
        );
      });
    });

    it("should store fetched users in localStorage", async () => {
      const mockFetch = vi.fn().mockResolvedValue({
        json: () => Promise.resolve(mockUsers),
      });
      globalThis.fetch = mockFetch;

      render(<Users />);

      await waitFor(() => {
        expect(localStorageMock.setItem).toHaveBeenCalledWith(
          "users",
          JSON.stringify(mockUsers)
        );
      });
    });

    it("should display correct user count in USERS card", async () => {
      localStorageMock.getItem.mockReturnValue(JSON.stringify(mockUsers));
      
      render(<Users />);
      
      await waitFor(() => {
        const userCards = screen.getAllByText("USERS");
        const userCard = userCards[0].closest(".card");
        expect(userCard).toHaveTextContent("2");
      });
    });

    it("should display correct active users count", async () => {
      localStorageMock.getItem.mockReturnValue(JSON.stringify(mockUsers));
      
      render(<Users />);
      
      await waitFor(() => {
        const activeUserCards = screen.getAllByText("ACTIVE USERS");
        const activeUserCard = activeUserCards[0].closest(".card");
        expect(activeUserCard).toHaveTextContent("1");
      });
    });

    it("should display correct users with loans count when users exist", async () => {
      localStorageMock.getItem.mockReturnValue(JSON.stringify(mockUsers));
      
      render(<Users />);
      
      await waitFor(() => {
        const loanUserCards = screen.getAllByText("USERS WITH LOANS");
        const loanUserCard = loanUserCards[0].closest(".card");
        expect(loanUserCard).toHaveTextContent("342");
      });
    });

    it("should display correct users with savings count when users exist", async () => {
      localStorageMock.getItem.mockReturnValue(JSON.stringify(mockUsers));
      
      render(<Users />);
      
      await waitFor(() => {
        const savingsUserCards = screen.getAllByText("USERS WITH SAVINGS");
        const savingsUserCard = savingsUserCards[0].closest(".card");
        expect(savingsUserCard).toHaveTextContent("158");
      });
    });

    it("should render PaginatedItems component", async () => {
      localStorageMock.getItem.mockReturnValue(JSON.stringify(mockUsers));
      
      render(<Users />);
      
      await waitFor(() => {
        expect(screen.getByTestId("Userss")).toBeInTheDocument();
      });
    });
  });

  describe("Negative Cases", () => {
    it("should handle API fetch error gracefully", async () => {
      const mockFetch = vi.fn().mockRejectedValue(new Error("Network error"));
      globalThis.fetch = mockFetch;
      const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

      render(<Users />);

      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalled();
        expect(consoleSpy).toHaveBeenCalledWith(expect.any(Error));
      });

      consoleSpy.mockRestore();
    });

    it("should handle empty user list", async () => {
      localStorageMock.getItem.mockReturnValue(JSON.stringify([]));
      
      render(<Users />);
      
      await waitFor(() => {
        const userCards = screen.getAllByText("USERS");
        const userCard = userCards[0].closest(".card");
        expect(userCard).toHaveTextContent("0");
      });
    });

    it("should display zero for all cards when no users exist", async () => {
      localStorageMock.getItem.mockReturnValue(JSON.stringify([]));
      
      render(<Users />);
      
      await waitFor(() => {
        // Check USERS card
        const userCards = screen.getAllByText("USERS");
        const userCard = userCards[0].closest(".card");
        expect(userCard).toHaveTextContent("0");

        // Check ACTIVE USERS card
        const activeUserCards = screen.getAllByText("ACTIVE USERS");
        const activeUserCard = activeUserCards[0].closest(".card");
        expect(activeUserCard).toHaveTextContent("0");

        // Check USERS WITH LOANS card
        const loanUserCards = screen.getAllByText("USERS WITH LOANS");
        const loanUserCard = loanUserCards[0].closest(".card");
        expect(loanUserCard).toHaveTextContent("0");

        // Check USERS WITH SAVINGS card
        const savingsUserCards = screen.getAllByText("USERS WITH SAVINGS");
        const savingsUserCard = savingsUserCards[0].closest(".card");
        expect(savingsUserCard).toHaveTextContent("0");
      });
    });

    it("should handle API response with non-array data", async () => {
      const mockFetch = vi.fn().mockResolvedValue({
        json: () => Promise.resolve({ error: "Invalid response" }),
      });
      globalThis.fetch = mockFetch;

      render(<Users />);

      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalled();
      });
    });

    it("should handle network timeout", async () => {
      const mockFetch = vi.fn().mockImplementation(() => 
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error("Timeout")), 100)
        )
      );
      globalThis.fetch = mockFetch;

      render(<Users />);

      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalled();
      }, { timeout: 200 });
    });
  });
});

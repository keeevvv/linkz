/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginForm from "@/components/LoginForm";
import { signIn } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

// 🧩 Mock Next.js router
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// 🧩 Mock Better Auth client
jest.mock("@/lib/auth-client", () => ({
  signIn: {
    email: jest.fn(),
    social: jest.fn(),
  },
  useSession: jest.fn(() => ({})),
}));

describe("LoginForm Component", () => {
  const pushMock = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
    jest.clearAllMocks();
  });

  // render basic
  it("renders login form with email and password fields", () => {
    render(<LoginForm />);
    expect(screen.getByPlaceholderText("you@example.com")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("••••••••")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  // validasi form
  it("shows validation errors when fields are empty", async () => {
    render(<LoginForm />);
    fireEvent.click(screen.getByText("Login"));
    await waitFor(() => {
      expect(screen.getByText("Invalid Email")).toBeInTheDocument();
      expect(
        screen.getByText("Password require more than 6 character")
      ).toBeInTheDocument();
    });
  });

  // sukses login
  it("logs in successfully and redirects to home", async () => {
    (signIn.email as jest.Mock).mockResolvedValueOnce({ error: null });

    render(<LoginForm />);
    fireEvent.change(screen.getByPlaceholderText("you@example.com"), {
      target: { value: "user@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("••••••••"), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByText("Login"));

    await waitFor(() => {
      expect(signIn.email).toHaveBeenCalledWith({
        email: "user@example.com",
        password: "password123",
      });
      expect(pushMock).toHaveBeenCalledWith("/");
    });
  });

  // login gagal
  it("shows error when login fails", async () => {
    (signIn.email as jest.Mock).mockResolvedValueOnce({
      error: { message: "Invalid credentials" },
    });

    render(<LoginForm />);
    fireEvent.change(screen.getByPlaceholderText("you@example.com"), {
      target: { value: "wrong@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("••••••••"), {
      target: { value: "wrongpass" },
    });
    fireEvent.click(screen.getByText("Login"));

    await waitFor(() => {
      expect(screen.getByText("Invalid credentials")).toBeInTheDocument();
    });
  });

  // login google gagal
  it("shows error when google login fails", async () => {
    (signIn.social as jest.Mock).mockImplementation(() => {
      throw new Error("Cannot log in with google account");
    });

    render(<LoginForm />);
    fireEvent.click(screen.getByText("Continue with Google"));

    await waitFor(() => {
      expect(
        screen.getByText("Cannot log in with google account")
      ).toBeInTheDocument();
    });
  });
});

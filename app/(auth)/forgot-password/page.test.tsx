import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ForgotPasswordForm from "@/components/ForgotPasswordForm";
import { requestPasswordReset } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

// 🧩 Mock Next.js router
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/lib/auth-client", () => ({
  requestPasswordReset: jest.fn(),
  useSession: jest.fn(() => ({})),
}));

describe("ForgotPasswordForm Component", () => {
  const pushMock = jest.fn();
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
    jest.clearAllMocks();
  });

  it("renders ForgotPasswordForm form with email fields", () => {
    render(<ForgotPasswordForm />);
    expect(screen.getByPlaceholderText("you@example.com")).toBeInTheDocument();

    expect(screen.getByText("Reset password")).toBeInTheDocument();
  });

  it("shows validation errors when fields are empty", async () => {
    render(<ForgotPasswordForm />);
    fireEvent.click(screen.getByText("Reset password"));
    await waitFor(() => {
      expect(screen.getByText("Invalid Email")).toBeInTheDocument();
    });
  });

  it("marks input as invalid when not a valid email", () => {
    render(<ForgotPasswordForm />);

    const emailInput = screen.getByPlaceholderText(
      "you@example.com"
    ) as HTMLInputElement;
    const submitButton = screen.getByText("Reset password");

    fireEvent.change(emailInput, { target: { value: "notEmail" } });
    fireEvent.click(submitButton);

    expect(emailInput.validity.valid).toBe(false);

    expect(emailInput.validity.typeMismatch).toBe(true);
  });

  it("redirects to login after 1.5 seconds when reset success", async () => {
    jest.useFakeTimers();
    const pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });

    (requestPasswordReset as jest.Mock).mockResolvedValueOnce({ error: null });

    render(<ForgotPasswordForm />);

    fireEvent.change(screen.getByPlaceholderText("you@example.com"), {
      target: { value: "user@example.com" },
    });
    fireEvent.click(screen.getByText("Reset password"));

    await waitFor(() => {
      expect(requestPasswordReset).toHaveBeenCalledWith({
        email: "user@example.com",
        redirectTo: "/reset-password",
      });
    });

    jest.advanceTimersByTime(1500);
    expect(pushMock).toHaveBeenCalledWith("/login");

    jest.useRealTimers();
  });
});

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ResetPasswordForm from "@/components/resetPasswordForm";
import { resetPassword } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";

// ✅ Mock module next/navigation
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

jest.mock("@/lib/auth-client", () => ({
  resetPassword: jest.fn(),
  useSession: jest.fn(() => ({})),
}));

describe("ResetPasswordForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call resetPassword with newPassword and token from URL", async () => {
    const pushMock = jest.fn();

    // Mock router dan search params
    (useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
      back: jest.fn(),
    });
    (useSearchParams as jest.Mock).mockReturnValue({
      get: (key: string) => (key === "token" ? "mocked_token_123" : null),
    });

    // Mock API success
    (resetPassword as any).mockResolvedValueOnce({ error: null });

    render(<ResetPasswordForm />);

    // Isi field password dan confirm password
    fireEvent.change(screen.getByPlaceholderText("Enter new password"), {
      target: { value: "newPassword123" },
    });
    fireEvent.change(screen.getByPlaceholderText("Confirm new password"), {
      target: { value: "newPassword123" },
    });

    // Submit form
    fireEvent.click(screen.getByText("Reset Password"));

    await waitFor(() => {
      expect(resetPassword).toHaveBeenCalledWith({
        newPassword: "newPassword123",
        token: "mocked_token_123",
      });
    });
  });

  it("should show success message and redirect after 1.5s on success", async () => {
    jest.useFakeTimers();
    const pushMock = jest.fn();

    (useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
      back: jest.fn(),
    });
    (useSearchParams as jest.Mock).mockReturnValue({
      get: () => "mocked_token_456",
    });

    (resetPassword as any).mockResolvedValueOnce({ error: null });

    render(<ResetPasswordForm />);

    fireEvent.change(screen.getByPlaceholderText("Enter new password"), {
      target: { value: "validPassword" },
    });
    fireEvent.change(screen.getByPlaceholderText("Confirm new password"), {
      target: { value: "validPassword" },
    });

    fireEvent.click(screen.getByText("Reset Password"));

    // Muncul pesan sukses
    await waitFor(() => {
      expect(
        screen.getByText(/successfully sent password reset request/i)
      ).toBeInTheDocument();
    });

    // Simulasikan waktu 1.5 detik
    jest.advanceTimersByTime(1500);

    expect(pushMock).toHaveBeenCalledWith("/login");
    jest.useRealTimers();
  });

  it("should show error message when resetPassword returns error", async () => {
    const pushMock = jest.fn();

    (useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
      back: jest.fn(),
    });
    (useSearchParams as jest.Mock).mockReturnValue({
      get: () => "mocked_token_789",
    });

    (resetPassword as any).mockResolvedValueOnce({
      error: { message: "Invalid token" },
    });

    render(<ResetPasswordForm />);

    fireEvent.change(screen.getByPlaceholderText("Enter new password"), {
      target: { value: "abc123" },
    });
    fireEvent.change(screen.getByPlaceholderText("Confirm new password"), {
      target: { value: "abc123" },
    });

    fireEvent.click(screen.getByText("Reset Password"));

    await waitFor(() => {
      expect(screen.getByText("Invalid token")).toBeInTheDocument();
    });
  });

  it("should show validation error when passwords do not match", async () => {
    render(<ResetPasswordForm />);

    fireEvent.change(screen.getByPlaceholderText("Enter new password"), {
      target: { value: "abc123" },
    });
    fireEvent.change(screen.getByPlaceholderText("Confirm new password"), {
      target: { value: "different123" },
    });

    fireEvent.click(screen.getByText("Reset Password"));

    await waitFor(() => {
      expect(screen.getByText("Passwords do not match")).toBeInTheDocument();
    });
  });
});

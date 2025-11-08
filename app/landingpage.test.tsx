import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "./page";
import { useSession } from "@/lib/auth-client";
import { redirect } from "next/navigation";

jest.mock("@/components/Iridescence", () => {
  return function DummyIridescence() {
    return <div data-testid="iridescence-mock" />;
  };
});

jest.mock("@/components/ScrollFloat", () => {
  return function DummyScrollFloat({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return <>{children}</>;
  };
});

jest.mock("react-intersection-observer", () => ({
  useInView: () => ({
    ref: jest.fn(),
    inView: true,
  }),
}));

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

jest.mock("@/lib/auth-client", () => ({
  useSession: jest.fn(),
  signOut: jest.fn(),
}));

describe("Landing Page (Home)", () => {
  beforeEach(() => {
    (redirect as unknown as jest.Mock).mockClear();
    (useSession as unknown as jest.Mock).mockClear();
  });

  it("should render landing page when user is not authenticated", () => {
    (useSession as unknown as jest.Mock).mockReturnValue({
      data: null,
      status: "unauthenticated",
    });

    render(<Home />);

    expect(screen.getByText("Guide")).toBeInTheDocument();
    expect(redirect).not.toHaveBeenCalled();
  });

  it("should redirect to /dashboard when user is authenticated", () => {
    (useSession as unknown as jest.Mock).mockReturnValue({
      data: { user: { id: "123", name: "Adib" } },
      status: "authenticated",
    });

    render(<Home />);

    expect(redirect).toHaveBeenCalledWith("/dashboard");
  });
});

/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import "@testing-library/jest-dom";
import ThemeEditor from "@/components/ui/themeEditor";

// 🧩 Mock komponen eksternal (biar test tidak error karena komponen UI kompleks)
jest.mock("@/components/ui/avatar", () => () => (
  <div data-testid="mock-avatar" />
));
jest.mock("@/components/ui/button", () => ({
  Button: ({ children, ...props }: any) => (
    <button {...props}>{children}</button>
  ),
}));
jest.mock("@/components/ui/card", () => ({
  Card: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  CardContent: ({ children }: any) => <div>{children}</div>,
  CardHeader: ({ children }: any) => <div>{children}</div>,
  CardTitle: ({ children }: any) => <h2>{children}</h2>,
  CardDescription: ({ children }: any) => <p>{children}</p>,
}));

jest.mock("@/components/mainNavbar", () => () => (
  <nav data-testid="mock-navbar" />
));

// 🧩 Mock fetch
global.fetch = jest.fn();

const mockUser = {
  id: "123",
  name: "Kevin",
  username: "kevin123",
  bio: "Hello World!",
  image: "/images/test.png",
  links: [{ id: 1, title: "My Link", url: "https://example.com" }],
  theme: {
    backgroundCard: "rgba(255,255,255,1)",
    buttonColor: "rgba(0,0,0,1)",
    buttonFont: "font-mono",
    buttonFontSize: "text-lg",
    buttonFontColor: "#ffffff",
    titleColor: "#111111",
    bioColor: "#77767B",
  },
};

describe("ThemeEditor Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders user information correctly", () => {
    render(<ThemeEditor user={mockUser as any} />);
    expect(screen.getByText(mockUser.name)).toBeInTheDocument();
    expect(screen.getByText(`@${mockUser.username}`)).toBeInTheDocument();
    expect(screen.getByText(mockUser.bio)).toBeInTheDocument();
  });

  it("renders links inside preview card", () => {
    render(<ThemeEditor user={mockUser as any} />);
    expect(screen.getByText("My Link")).toBeInTheDocument();
  });

  it("changes title color when color input changes", () => {
    render(<ThemeEditor user={mockUser as any} />);
    const titleColorInput = screen.getByLabelText("Title Color");
    fireEvent.change(titleColorInput, { target: { value: "#ff0000" } });
    expect((titleColorInput as HTMLInputElement).value).toBe("#ff0000");
  });
  it("calls fetch API when Save Theme is clicked", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({ success: true }),
    });

    render(<ThemeEditor user={mockUser as any} />);
    const saveButton = screen.getByText("Save Theme");

    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "/api/theme/update",
        expect.any(Object)
      );
    });
  });
});

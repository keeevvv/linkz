import { filterVisibleLinks } from "./DashboardClient";

interface Link {
  id: number;
  title: string;
  visible: boolean;
}

describe("filterVisibleLinks", () => {
  const sampleLinks: Link[] = [
    { id: 1, title: "Google", visible: true },
    { id: 2, title: "GitHub", visible: false },
    { id: 3, title: "YouTube", visible: true },
  ];

  test("should return only visible links when visibleOnly = true", () => {
    const result = filterVisibleLinks(sampleLinks, true);
    expect(result).toHaveLength(2);
    expect(result.every((link) => link.visible)).toBe(true);
  });

  test("should return all links when visibleOnly = false", () => {
    const result = filterVisibleLinks(sampleLinks, false);
    expect(result).toHaveLength(3);
  });
});

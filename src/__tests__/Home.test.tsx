/**
 * 🧪 Ana Sayfa Bileşeni Testi
 *
 * Bu test dosyası, ana sayfa bileşeninin doğru render edilip edilmediğini kontrol eder.
 * CI/CD pipeline'ında her push'ta otomatik olarak çalışır.
 */

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

describe("Home Page", () => {
  it("should render the Next.js logo", () => {
    render(<Home />);

    // Next.js logosu var mı kontrol et
    const logo = screen.getByAltText("Next.js logo");
    expect(logo).toBeInTheDocument();
  });

  it("should render the getting started text", () => {
    render(<Home />);

    // "get started" metni var mı kontrol et (yeni Next.js versiyonu)
    const getStartedText = screen.getByText(
      /To get started, edit the page\.tsx file\./i
    );
    expect(getStartedText).toBeInTheDocument();
  });

  it("should have deploy link", () => {
    render(<Home />);

    // Deploy linki var mı kontrol et
    const deployLink = screen.getByRole("link", { name: /Deploy now/i });
    expect(deployLink).toBeInTheDocument();
    expect(deployLink).toHaveAttribute(
      "href",
      expect.stringContaining("vercel.com")
    );
  });

  it("should have documentation link", () => {
    render(<Home />);

    // Documentation linki var mı kontrol et
    const docsLink = screen.getByRole("link", { name: /Documentation/i });
    expect(docsLink).toBeInTheDocument();
    expect(docsLink).toHaveAttribute(
      "href",
      expect.stringContaining("nextjs.org/docs")
    );
  });

  it("should render Templates and Learning links", () => {
    render(<Home />);

    // Templates linki var mı kontrol et
    const templatesLink = screen.getByRole("link", { name: /Templates/i });
    expect(templatesLink).toBeInTheDocument();

    // Learning linki var mı kontrol et
    const learningLink = screen.getByRole("link", { name: /Learning/i });
    expect(learningLink).toBeInTheDocument();
  });
});

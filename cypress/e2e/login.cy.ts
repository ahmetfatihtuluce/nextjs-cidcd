describe("Login Page E2E Tests", () => {
  beforeEach(() => {
    // Her testten önce session'ı temizle
    cy.window().then((win) => {
      win.sessionStorage.clear();
    });
    cy.visit("/login");
  });

  describe("UI Elements", () => {
    it("should display login form with all elements", () => {
      cy.get("h1").should("contain", "Hoş Geldiniz");
      cy.get('[data-testid="username-input"]').should("be.visible");
      cy.get('[data-testid="password-input"]').should("be.visible");
      cy.get('[data-testid="login-button"]').should("be.visible");
    });

    it("should have correct placeholder texts", () => {
      cy.get('[data-testid="username-input"]').should(
        "have.attr",
        "placeholder",
        "Kullanıcı adınızı girin"
      );
      cy.get('[data-testid="password-input"]').should(
        "have.attr",
        "placeholder",
        "Şifrenizi girin"
      );
    });

    it("should display demo credentials", () => {
      cy.contains("test / test123").should("be.visible");
    });
  });

  describe("Form Validation", () => {
    it("should require username field", () => {
      cy.get('[data-testid="password-input"]').type("test123");
      cy.get('[data-testid="login-button"]').click();
      // HTML5 validation should prevent submission
      cy.url().should("include", "/login");
    });

    it("should require password field", () => {
      cy.get('[data-testid="username-input"]').type("test");
      cy.get('[data-testid="login-button"]').click();
      // HTML5 validation should prevent submission
      cy.url().should("include", "/login");
    });
  });

  describe("Login Functionality", () => {
    it("should show error message for invalid credentials", () => {
      cy.get('[data-testid="username-input"]').type("wronguser");
      cy.get('[data-testid="password-input"]').type("wrongpass");
      cy.get('[data-testid="login-button"]').click();

      cy.get('[data-testid="error-message"]')
        .should("be.visible")
        .and("contain", "Geçersiz kullanıcı adı veya şifre");
    });

    it("should show error for wrong username", () => {
      cy.get('[data-testid="username-input"]').type("wronguser");
      cy.get('[data-testid="password-input"]').type("test123");
      cy.get('[data-testid="login-button"]').click();

      cy.get('[data-testid="error-message"]').should("be.visible");
    });

    it("should show validation error when submitting empty form", () => {
      cy.get('[data-testid="login-button"]').click();
      cy.url().should("include", "/login");
      // HTML5 validation çalışmalı
    });

    it("should show error for wrong password", () => {
      cy.get('[data-testid="username-input"]').type("test");
      cy.get('[data-testid="password-input"]').type("wrongpass");
      cy.get('[data-testid="login-button"]').click();

      cy.get('[data-testid="error-message"]').should("be.visible");
    });

    it("should login successfully with correct credentials", () => {
      cy.get('[data-testid="username-input"]').type("test");
      cy.get('[data-testid="password-input"]').type("test123");
      cy.get('[data-testid="login-button"]').click();

      // Should redirect to dashboard
      cy.url().should("include", "/dashboard");
    });

    it("should show loading state while logging in", () => {
      cy.get('[data-testid="username-input"]').type("test");
      cy.get('[data-testid="password-input"]').type("test123");
      cy.get('[data-testid="login-button"]').click();

      // Button should be disabled during loading
      cy.get('[data-testid="login-button"]').should("be.disabled");
    });
  });
});

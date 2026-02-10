describe("Dashboard Page E2E Tests", () => {
  beforeEach(() => {
    // Login yapmadan önce session'ı ayarla
    cy.window().then((win) => {
      win.sessionStorage.setItem("isLoggedIn", "true");
      win.sessionStorage.setItem("username", "test");
    });
    cy.visit("/dashboard");
  });

  describe("Access Control", () => {
    it("should redirect to login if not authenticated", () => {
      // Session'ı temizle
      cy.window().then((win) => {
        win.sessionStorage.clear();
      });
      cy.visit("/dashboard");

      // Should redirect to login
      cy.url().should("include", "/login");
    });
  });

  describe("UI Elements", () => {
    it("should display dashboard header", () => {
      cy.get("h1").should("contain", "Dashboard");
    });

    it("should display welcome message with username", () => {
      cy.get('[data-testid="welcome-message"]')
        .should("be.visible")
        .and("contain", "test");
    });

    it("should display logout button", () => {
      cy.get('[data-testid="logout-button"]')
        .should("be.visible")
        .and("contain", "Çıkış Yap");
    });

    it("should display statistics cards", () => {
      cy.get('[data-testid="total-users"]').should("contain", "1,234");
      cy.get('[data-testid="active-sessions"]').should("contain", "56");
      cy.get('[data-testid="successful-ops"]').should("contain", "98.5%");
    });

    it("should display recent activities section", () => {
      cy.contains("Son Aktiviteler").should("be.visible");
      cy.contains("Yeni kullanıcı kaydı").should("be.visible");
      cy.contains("Sistem güncellemesi tamamlandı").should("be.visible");
    });
  });

  describe("Logout Functionality", () => {
    it("should logout and redirect to login page", () => {
      cy.get('[data-testid="logout-button"]').click();

      // Should redirect to login
      cy.url().should("include", "/login");
    });

    it("should clear session after logout", () => {
      cy.get('[data-testid="logout-button"]').click();

      // Verify session is cleared
      cy.window().then((win) => {
        const isLoggedIn = win.sessionStorage.getItem("isLoggedIn");
        const username = win.sessionStorage.getItem("username");
        cy.wrap(isLoggedIn).should("be.null");
        cy.wrap(username).should("be.null");
      });
    });
  });
});

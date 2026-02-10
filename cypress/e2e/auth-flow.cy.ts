describe("Full Authentication Flow E2E Tests", () => {
  beforeEach(() => {
    // Her testten önce session'ı temizle
    cy.window().then((win) => {
      win.sessionStorage.clear();
    });
  });

  it("should complete full login flow", () => {
    // 1. Login sayfasına git
    cy.visit("/login");
    cy.url().should("include", "/login");

    // 2. Credentials gir
    cy.get('[data-testid="username-input"]').type("test");
    cy.get('[data-testid="password-input"]').type("test123");

    // 3. Login butonuna tıkla
    cy.get('[data-testid="login-button"]').click();

    // 4. Dashboard'a yönlendirildiğini doğrula
    cy.url().should("include", "/dashboard");

    // 5. Welcome message'ı kontrol et
    cy.get('[data-testid="welcome-message"]').should("contain", "test");
  });

  it("should complete full logout flow", () => {
    // 1. Login yap
    cy.visit("/login");
    cy.get('[data-testid="username-input"]').type("test");
    cy.get('[data-testid="password-input"]').type("test123");
    cy.get('[data-testid="login-button"]').click();

    // 2. Dashboard'da olduğunu doğrula
    cy.url().should("include", "/dashboard");

    // 3. Logout yap
    cy.get('[data-testid="logout-button"]').click();

    // 4. Login sayfasına yönlendirildiğini doğrula
    cy.url().should("include", "/login");
  });

  it("should persist session on page reload", () => {
    // 1. Login yap
    cy.visit("/login");
    cy.get('[data-testid="username-input"]').type("test");
    cy.get('[data-testid="password-input"]').type("test123");
    cy.get('[data-testid="login-button"]').click();

    // 2. Dashboard'da olduğunu doğrula
    cy.url().should("include", "/dashboard");

    // 3. Sayfayı yenile
    cy.reload();

    // 4. Hala dashboard'da olduğunu doğrula
    cy.url().should("include", "/dashboard");
    cy.get('[data-testid="welcome-message"]').should("contain", "test");
  });

  it("should protect dashboard route without authentication", () => {
    // Direkt dashboard'a gitmeye çalış
    cy.visit("/dashboard");

    // Login sayfasına yönlendirilmeli
    cy.url().should("include", "/login");
  });

  it("should handle multiple failed login attempts", () => {
    cy.visit("/login");

    // İlk başarısız deneme
    cy.get('[data-testid="username-input"]').type("wrong1");
    cy.get('[data-testid="password-input"]').type("wrong1");
    cy.get('[data-testid="login-button"]').click();
    cy.get('[data-testid="error-message"]').should("be.visible");

    // İkinci başarısız deneme - alanları temizle ve tekrar dene
    cy.get('[data-testid="username-input"]').clear().type("wrong2");
    cy.get('[data-testid="password-input"]').clear().type("wrong2");
    cy.get('[data-testid="login-button"]').click();
    cy.get('[data-testid="error-message"]').should("be.visible");

    // Doğru bilgilerle giriş yap
    cy.get('[data-testid="username-input"]').clear().type("test");
    cy.get('[data-testid="password-input"]').clear().type("test123");
    cy.get('[data-testid="login-button"]').click();

    // Başarılı giriş
    cy.url().should("include", "/dashboard");
  });
});

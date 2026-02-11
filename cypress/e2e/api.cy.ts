describe("API - /api/users", () => {
  const baseUrl = "http://localhost:4023/api/users";

  describe("GET /api/users", () => {
    it("should return all users", () => {
      cy.request("GET", baseUrl).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an("array");
        expect(response.body.length).to.equal(3);
      });
    });

    it("should have correct user structure", () => {
      cy.request("GET", baseUrl).then((response) => {
        const user = response.body[0];
        expect(user).to.have.property("id");
        expect(user).to.have.property("name");
        expect(user).to.have.property("email");
        expect(user).to.have.property("role");
      });
    });

    it("should return user by ID", () => {
      cy.request("GET", `${baseUrl}?id=1`).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body.id).to.equal(1);
        expect(response.body.name).to.equal("Test User");
        expect(response.body.email).to.equal("test@example.com");
      });
    });

    it("should return 404 for non-existent user", () => {
      cy.request({
        method: "GET",
        url: `${baseUrl}?id=999`,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal("User not found");
      });
    });

    it("should filter users by role", () => {
      cy.request("GET", `${baseUrl}?role=admin`).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an("array");
        expect(response.body.length).to.be.greaterThan(0);
        response.body.forEach((user: { role: string }) => {
          expect(user.role).to.equal("admin");
        });
      });
    });
  });

  describe("POST /api/users", () => {
    it("should create new user with valid data", () => {
      const newUser = {
        name: "New User",
        email: "new@example.com",
        role: "user",
      };

      cy.request("POST", baseUrl, newUser).then((response) => {
        expect(response.status).to.equal(201);
        expect(response.body.name).to.equal("New User");
        expect(response.body.email).to.equal("new@example.com");
        expect(response.body.id).to.be.a("number");
      });
    });

    it("should return 400 for missing name", () => {
      const invalidUser = {
        email: "test@example.com",
        role: "user",
      };

      cy.request({
        method: "POST",
        url: baseUrl,
        body: invalidUser,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(400);
        expect(response.body.error).to.include("Missing required fields");
      });
    });

    it("should return 400 for invalid email format", () => {
      const invalidUser = {
        name: "Test User",
        email: "invalid-email",
        role: "user",
      };

      cy.request({
        method: "POST",
        url: baseUrl,
        body: invalidUser,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(400);
        expect(response.body.error).to.include("Invalid email format");
      });
    });

    it("should return 400 for missing role", () => {
      const invalidUser = {
        name: "Test User",
        email: "test@example.com",
      };

      cy.request({
        method: "POST",
        url: baseUrl,
        body: invalidUser,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(400);
        expect(response.body.error).to.include("Missing required fields");
      });
    });
  });

  describe("DELETE /api/users", () => {
    it("should delete user by ID", () => {
      cy.request("DELETE", `${baseUrl}?id=1`).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body.message).to.equal("User deleted successfully");
        expect(response.body.id).to.equal(1);
      });
    });

    it("should return 400 when ID is missing", () => {
      cy.request({
        method: "DELETE",
        url: baseUrl,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(400);
        expect(response.body.error).to.equal("User ID is required");
      });
    });

    it("should return 404 for non-existent user", () => {
      cy.request({
        method: "DELETE",
        url: `${baseUrl}?id=999`,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal("User not found");
      });
    });
  });
});

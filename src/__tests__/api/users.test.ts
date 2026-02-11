import { GET, POST, DELETE } from "@/app/api/users/route";
import { NextRequest } from "next/server";

describe("API Routes - /api/users", () => {
  describe("GET requests", () => {
    it("should return all users", async () => {
      const request = new NextRequest("http://localhost:3000/api/users");
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toEqual(200);
      expect(Array.isArray(data)).toEqual(true);
      expect(data.length).toEqual(3);
    });

    it("should return user by ID", async () => {
      const request = new NextRequest(
        "http://localhost:3000/api/users?id=1"
      );
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.id).toBe(1);
      expect(data.name).toBe("Test User");
      expect(data.email).toBe("test@example.com");
    });

    it("should return 404 for non-existent user", async () => {
      const request = new NextRequest(
        "http://localhost:3000/api/users?id=999"
      );
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data.error).toBe("User not found");
    });

    it("should filter users by role", async () => {
      const request = new NextRequest(
        "http://localhost:3000/api/users?role=admin"
      );
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(Array.isArray(data)).toBe(true);
      expect(data.every((u: { role: string }) => u.role === "admin")).toBe(
        true
      );
    });
  });

  describe("POST requests", () => {
    it("should create new user with valid data", async () => {
      const body = {
        name: "New User",
        email: "new@example.com",
        role: "user",
      };

      const request = new NextRequest("http://localhost:3000/api/users", {
        method: "POST",
        body: JSON.stringify(body),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.name).toBe("New User");
      expect(data.email).toBe("new@example.com");
      expect(data.id).toBeDefined();
    });

    it("should return 400 for missing name", async () => {
      const body = {
        email: "test@example.com",
        role: "user",
      };

      const request = new NextRequest("http://localhost:3000/api/users", {
        method: "POST",
        body: JSON.stringify(body),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toContain("Missing required fields");
    });

    it("should return 400 for invalid email format", async () => {
      const body = {
        name: "Test User",
        email: "invalid-email",
        role: "user",
      };

      const request = new NextRequest("http://localhost:3000/api/users", {
        method: "POST",
        body: JSON.stringify(body),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toContain("Invalid email format");
    });

    it("should return 400 for missing role", async () => {
      const body = {
        name: "Test User",
        email: "test@example.com",
      };

      const request = new NextRequest("http://localhost:3000/api/users", {
        method: "POST",
        body: JSON.stringify(body),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toContain("Missing required fields");
    });
  });

  describe("DELETE requests", () => {
    it("should delete user by ID", async () => {
      const request = new NextRequest(
        "http://localhost:3000/api/users?id=1",
        {
          method: "DELETE",
        }
      );

      const response = await DELETE(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.message).toBe("User deleted successfully");
      expect(data.id).toBe(1);
    });

    it("should return 400 when ID is missing", async () => {
      const request = new NextRequest("http://localhost:3000/api/users", {
        method: "DELETE",
      });

      const response = await DELETE(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe("User ID is required");
    });

    it("should return 404 for non-existent user delete", async () => {
      const request = new NextRequest(
        "http://localhost:3000/api/users?id=999",
        {
          method: "DELETE",
        }
      );

      const response = await DELETE(request);
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data.error).toBe("User not found");
    });
  });
});

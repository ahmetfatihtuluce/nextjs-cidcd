import { NextRequest, NextResponse } from "next/server";

// Mock data
const mockUsers = [
  {
    id: 1,
    name: "Test User",
    email: "test@example.com",
    role: "admin",
  },
  {
    id: 2,
    name: "Demo User",
    email: "demo@example.com",
    role: "user",
  },
  {
    id: 3,
    name: "Guest User",
    email: "guest@example.com",
    role: "guest",
  },
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const role = searchParams.get("role");

    // Filter by ID
    if (id) {
      const user = mockUsers.find((u) => u.id === parseInt(id));
      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
      return NextResponse.json(user);
    }

    // Filter by role
    if (role) {
      const filteredUsers = mockUsers.filter((u) => u.role === role);
      return NextResponse.json(filteredUsers);
    }

    // Return all users
    return NextResponse.json(mockUsers);
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validation
    if (!body.name || !body.email || !body.role) {
      return NextResponse.json(
        { error: "Missing required fields: name, email, role" },
        { status: 400 }
      );
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Create new user
    const newUser = {
      id: mockUsers.length + 1,
      name: body.name,
      email: body.email,
      role: body.role,
    };

    return NextResponse.json(newUser, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const user = mockUsers.find((u) => u.id === parseInt(id));
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // In real app, delete from database
    return NextResponse.json(
      { message: "User deleted successfully", id: parseInt(id) },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

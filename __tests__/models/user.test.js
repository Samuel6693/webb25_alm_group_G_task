import { describe, it, expect } from "vitest";
import "../test-setup"; // Ensure this is imported to set up the in-memory MongoDB environment
import User from "../../src/models/User"; // Import the User model to test

describe("User Model", () => {
  it("should create a user", async () => {
    const user = await User.create({
      username: "testuser",
      email: "test@test.com",
    });

    expect(user).toBeDefined();
    expect(user.username).toBe("testuser");
    expect(user.email).toBe("test@test.com");
  });

  // TODO: Test that email must be unique
  // TODO: Test that username must be unique
  // TODO: Test that email format is validated
  // TODO: Test that profileImage is a valid URL
});

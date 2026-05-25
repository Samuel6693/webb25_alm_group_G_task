import "../test-setup.js";
import { describe, it, expect, beforeEach } from "vitest";
import User from "../../src/models/User.js";

beforeEach(async () => {
  await User.deleteMany({});
});
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
  it("email must be unique", async () => {
    await User.create({
      email: "test@example.com",
      username: "user1",
    });

    await expect(
      User.create({
        email: "test@example.com",
        username: "user2",
      })
    ).rejects.toThrow();
  });

  it("username must be unique", async () => {
    await User.create({
      email: "user1@example.com",
      username: "sameusername",
    });

    await expect(
      User.create({
        email: "user2@example.com",
        username: "sameusername",
      })
    ).rejects.toThrow();
  });

  it("email format is validated", async () => {
    await expect(
      User.create({
        email: "not-an-email",
        username: "user3",
      })
    ).rejects.toThrow();
  });
  // TODO: Test that profileImage is a valid URL
});
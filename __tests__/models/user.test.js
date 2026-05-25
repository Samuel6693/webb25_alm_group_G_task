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
      profileImage: "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg",
    });

    expect(user).toBeDefined();
    expect(user.username).toBe("testuser");
    expect(user.email).toBe("test@test.com");
  });
  
  it("email must be unique", async () => {
    await User.create({
      email: "test@example.com",
      username: "user1",
      profileImage: "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg",
    });

    await expect(
      User.create({
        email: "test@example.com",
        username: "user2",
        profileImage: "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg",
      })
    ).rejects.toThrow();
  });

  it("username must be unique", async () => {
    await User.create({
      email: "user1@example.com",
      username: "sameusername",
      profileImage: "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg",
    });

    await expect(
      User.create({
        email: "user2@example.com",
        username: "sameusername",
        profileImage: "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg",
      })
    ).rejects.toThrow();
  });

  it("email format is validated", async () => {
    await expect(
      User.create({
        email: "not-an-email",
        username: "user4",
        profileImage: "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg",
      })
    ).rejects.toThrow();
  });

  it("profileImage format is validated", async () => {
    await expect(
      User.create({
        email: "user4@example1.com",
        username: "user4",
        profileImage: "not-a-valid-image-url",
      })
    ).rejects.toThrow();
  });

  it("should accept a valid profileImage URL", async () => {
    const user = await User.create({
      username: "imageuser",
      email: "image@test.com",
      profileImage: "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg",
    });

    expect(user.profileImage).toBe(
      "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"
    );
  });

  it("should reject an invalid profileImage URL", async () => {
    await expect(
      User.create({
        username: "badimageuser",
        email: "badimage@test.com",
        profileImage: "not-a-valid-url",
      })
    ).rejects.toThrow();
  });
});
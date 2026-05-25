import "../test-setup.js";
import { describe, it, expect } from "vitest";
import User from "../../src/models/User.js";
import Accommodation from "../../src/models/Accommodation.js";

describe("Accommodation Model", () => {
    it("should create an accommodation with all required fields", async () => {
        const user = await User.create({
            username: "testuser",
            email: "test@test.com",
            profileImage: "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg",
        });

        const accommodation = await Accommodation.create({
            address: "Test Street 1",
            city: "Stockholm",
            country: "Sweden",
            postalCode: "12345",
            rent: 9000,
            rooms: 2,
            userId: user._id,
        });

        expect(accommodation).toBeDefined();
        expect(accommodation.address).toBe("Test Street 1");
        expect(accommodation.city).toBe("Stockholm");
        expect(accommodation.country).toBe("Sweden");
        expect(accommodation.postalCode).toBe("12345");
        expect(accommodation.rent).toBe(9000);
        expect(accommodation.rooms).toBe(2);
        expect(accommodation.userId.toString()).toBe(user._id.toString());
    });

    it("should require address, city, country, postalCode, rent, rooms and userId", async () => {
        await expect(Accommodation.create({})).rejects.toThrow();
    });

    it("should reference a user through userId", async () => {
        const user = await User.create({
            username: "owneruser",
            email: "owner@test.com",
            profileImage: "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg",
        });

        const accommodation = await Accommodation.create({
            address: "Owner Street 5",
            city: "Göteborg",
            country: "Sweden",
            postalCode: "54321",
            rent: 7500,
            rooms: 1,
            userId: user._id,
        });

        const populatedAccommodation = await Accommodation.findById(
            accommodation._id
        ).populate("userId");

        expect(populatedAccommodation.userId.username).toBe("owneruser");
        expect(populatedAccommodation.userId.email).toBe("owner@test.com");
        expect(populatedAccommodation.userId.profileImage).toBe("https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg");
    });

    it("should delete accommodations when the user is deleted", async () => {
        const user = await User.create({
            username: "deleteuser",
            email: "delete@test.com",
            profileImage: "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg",
        });

        await Accommodation.create({
            address: "Delete Street 1",
            city: "Stockholm",
            country: "Sweden",
            postalCode: "12345",
            rent: 9000,
            rooms: 2,
            userId: user._id,
        });

        await User.findByIdAndDelete(user._id);

        const accommodations = await Accommodation.find({ userId: user._id });

        expect(accommodations).toHaveLength(0);
    });
});

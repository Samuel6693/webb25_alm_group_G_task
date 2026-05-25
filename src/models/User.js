import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+.\S+$/, "Invalid email format"],
    },

    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    profileImage: {
      type: String,
      required: true,
      match: [
        /^https?:\/\/.*\.(jpg|jpeg|png|gif|bmp|webp)$/i,
        "Profile image must be a valid image URL",
      ],
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
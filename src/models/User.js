import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
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
        /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i,
        "Profile image must be a valid image URL",
      ],
    },
  },
  { timestamps: true }
);

userSchema.pre("findOneAndDelete", async function (next) {
  const user = await this.model.findOne(this.getFilter());

  if (user) {
    const Accommodation = mongoose.model("Accommodation");
    await Accommodation.deleteMany({ userId: user._id });
  }

  next();
});

export default mongoose.model("User", userSchema);

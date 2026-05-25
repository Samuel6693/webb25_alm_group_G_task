import express from "express";
import connectDB from "./config/database.js";
import UserRouter from "./routes/User.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/users", UserRouter);

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});

export default app;

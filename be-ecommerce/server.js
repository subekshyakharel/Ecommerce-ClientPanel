import express from "express";
import cors from "cors";
import morgan from "morgan";
import { dbConnect } from "./src/config/dbconfig.js";
import { errorHandler } from "./src/middlewares/errorHandler.js"; // ✅ Correct import
import { responseClient } from "./src/middlewares/responseClient.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Routes
import authRoute from "./src/routes/authRoute.js";
import userRoute from "./src/routes/userRoute.js";
import orderRoute from "./src/routes/orderRoute.js";
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/order", orderRoute);

// Server status route
app.get("/", (req, res) => {
  const message = "Its live";
  responseClient({ req, res, message });
});

// Error handler (should be after all routes)
app.use(errorHandler);

// Database connection & server start
dbConnect()
  .then(() => {
    app.listen(PORT, (error) => {
      if (error) {
        console.log(error);
      } else {
        console.log(`Server is running at http://localhost:${PORT}`);
      }
    });
  })
  .catch((error) => console.log(error));

import express from "express";
import { database } from "./db/db.js";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import productRouter from "./routes/productRoutes.js";
import categoryRouter from "./routes/categoryRoutes.js";
import landingRouter from "./routes/landingRoutes.js";
import fabricRouter from "./routes/fabricRoutes.js";
import addressRoute from "./routes/AddressRoute.js";
import OrderRoute from "./routes/OrderRoute.js";
import personalDetailsRoute from "./routes/PersonalDetailsRoutes.js";
import UserRoute from "./routes/UserRoute.js";
import ClickRouter from "./routes/clickRoutes.js";
import cartRouter from "./routes/cartRoutes.js";
import AgentOrderRoute from "./routes/AgentOrderRoute.js";
import bodyParser from "body-parser";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// Middleware

app.use(express.json({ limit: "500mb" }));
app.use(express.urlencoded({ limit: "500mb", extended: true }));

// const isProduction = process.env.NODE_ENV === "production";

app.use(cors());

app.use(bodyParser.json());

database();
app.get("/", (req, res) => {
  res.send("API is running....");
});
// API Routes
app.use("/uploads", express.static("uploads"));

app.use("/api/v1/products", productRouter);
app.use("/api/v1/landing", landingRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/fabric", fabricRouter);
app.use("/api/v1/stats", ClickRouter);
app.use("/api/v1/cart", cartRouter);
app.use(addressRoute);
app.use(personalDetailsRoute);
app.use("/orders", OrderRoute);
app.use("/api", UserRoute);
app.use("/agent", AgentOrderRoute);

// Start the server
app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});

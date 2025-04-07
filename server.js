import express from "express";
import cors from "cors";
import connectDB from "./src/config/db.js";
import dotenv from "dotenv";

import userRoutes from "./src/routes/user.Routes.js";
import adminRoutes from "./src/routes/admin.Routes.js";
import shopRoutes from "./src/routes/shop.Routes.js";
// import contactRoutes from "./src/routes/contact.Routes.js";
import cartRoutes from "./src/routes/cart.Routes.js";
import orderRoutes from "./src/routes/order.Routes.js";

dotenv.config();

const app = express();

app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// IN case Fail Config db.js
connectDB()
    .then(() => {
        app.listen(process.env.PORT || 5000, () => {
            console.log("SERVER RUNNING ON PORT:", process.env.PORT);
        });
    })
    .catch((err) => {
        console.log("MONGODB CONNECTION FAILED: ", err);
    });

app.use("/api/users", userRoutes);

app.use("/api/admin", adminRoutes);

app.use("/api/shop", shopRoutes);

// app.use("/api/contact", contactRoutes);

app.use("/api/user/cart", cartRoutes);

app.use("/api/user/order", orderRoutes)
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"
import { errorController } from "./middlewares/error.middleware.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(
    {
        origin: "http://localhost:5173",
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"]
    }
));
app.use(cookieParser())


// Import routes
import userRoutes from "./routes/user.route.js"
import addressRoutes from "./routes/address.route.js"


// Export routes
app.use("/api/v1/users", userRoutes)
app.use("/api/v1/addresses", addressRoutes)


app.use(errorController)


export { app }
import express from "express";
import basicRoutes from "./routes/basicRoutes";
import { AppDataSource } from "./config/data-source";

const app = express();
app.use(express.json());
app.use("/api", basicRoutes);

const PORT = 3000;

AppDataSource.initialize()
    .then(() => {
        console.log("📦 Data Source has been initialized");
        app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
    })
    .catch((err) => {
        console.error("❌ Error during Data Source initialization", err);
    });

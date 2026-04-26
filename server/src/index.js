import express from "express";
import cors from "cors";
import connect_DB from "./db/index.js";
import cookieParser from "cookie-parser";

const app = express();

connect_DB();

app.use(cors({
  origin: true,
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser())

import authRouter from "./routes/user.route.js";
import aiRouter from "./routes/ai.route.js";
import adminRouter from "./routes/admin.route.js";

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/ai", aiRouter);
app.use("/api/v1/admin", adminRouter);

app.get("/", (req, res) => {
    res.send("✅ Hello 👋, This is the backend of CareerWithAI!");
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> {
    console.log(`\n ✅ Server is screaming on port ${PORT}`);
    
})
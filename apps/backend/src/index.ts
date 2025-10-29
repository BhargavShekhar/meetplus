import express from "express";
import cors from "cors";
import "dotenv/config";
import tokenRouter from "./routers/token.routes.js"

const port = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use(cors());

app.get("/check", (req, res) => {
    res.json({ msg: "pong" });
})

app.use("/api/token", tokenRouter);

app.listen(port, () => {
    console.log(`---- server runnning on port ${port} ----`);
})
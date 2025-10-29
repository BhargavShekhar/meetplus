import express from "express";
import request from "supertest"
import router from "../routers/token.routes.js"

const app = express();

app.use(express.json());
app.use("/api/token", router);

describe('POST /token', () => {
    it("should return a valid token", async () => {
        const res = await request(app).post("/api/token").send({ username: "test", roomName: "demo-room" })

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("token");
    })

    it("should not return a valid token without body", async () => {
        const res = await request(app)
            .post("/api/token")
            .send({});

        expect(res.statusCode).toBe(400);
    })
})
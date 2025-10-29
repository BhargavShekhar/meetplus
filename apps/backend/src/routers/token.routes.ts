import { Router } from "express";
import { generateToken } from "../helpers/generateToken.js";

const router: Router = Router();

router.post("/", async (req, res) => {
    try {
        const { username: participantName, roomName } = req.body;

        if (!participantName || !roomName) {
            res.status(400).json({ msg: "please send userName and roomName" });
            return;
        }

        const token = await generateToken({ participantName, roomName });

        res.json({ token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "could not generate token" })
    }
})

export default router;
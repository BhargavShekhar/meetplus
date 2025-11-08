import axios from "axios";
import { AgentDispatchClient, RoomServiceClient } from "livekit-server-sdk";
import { NextRequest, NextResponse } from "next/server";

const livekitUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL!;
const apiKey = process.env.LIVEKIT_API_KEY!;
const apiSecret = process.env.LIVEKIT_API_SECRET!;

export async function POST(req: NextRequest) {
    const { roomName } = await req.json();

    if (!roomName) {
        return NextResponse.json({ error: 'roomName is required' }, { status: 400 });
    }

    try {
        const config = {
            headers: {
                Authorization: `Basic ${Buffer.from(
                    `${apiKey}:${apiSecret}`
                ).toString("base64")}`,
                "Content-Type": "application/json",
            }
        }

        const response = await axios.post(`${livekitUrl}/jobs`, {
            agentName: "bot-worker",
            roomName: roomName
        }, config)

        NextResponse.json({ response })
    } catch (error) {
        console.log(error);
        NextResponse.json({ msg: "please try again later" }, { status: 500 });
    }
}
import { generateToken } from "@/lib/helper/generateToken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    const body = await req.json();
    const { identity, roomCode } = body;

    if (!identity || !roomCode) {
        return NextResponse.json({ error: "roomCode and identity are required strings" }, { status: 400 });
    }

    try {
        const token = await generateToken({ identity, roomCode });

        return NextResponse.json({ token });
    } catch (error) {
        return NextResponse.json({ error: "could not get token please try again later" }, { status: 500 });
    }
}
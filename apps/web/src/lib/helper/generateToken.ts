import { AccessToken } from "livekit-server-sdk";

const apiKey = process.env.LIVEKIT_API_KEY || "devkey";
const secret = process.env.LIVEKIT_API_SECRET || "secret";

export const generateToken = async ({
    roomCode,
    identity
}: {
    roomCode: string,
    identity: string
}): Promise<string> => {

    const at = new AccessToken(apiKey, secret, {
        identity
    })

    at.addGrant({ roomJoin: true, room: roomCode });

    const token = await at.toJwt();

    return token;
}
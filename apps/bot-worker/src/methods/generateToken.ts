import { AccessToken } from "livekit-server-sdk";

type tokenProps = {
  roomCode: string;
}

export const generateBotToken = async ({ roomCode }: tokenProps) => {
  const at = new AccessToken(process.env.LIVEKIT_API_KEY, process.env.LIVEKIT_API_SECRET, {
    identity: "meetplus-bot",
  });

  at.addGrant({
    roomJoin: true,
    room: roomCode,
    canPublish: false,
    canSubscribe: true
  });

  const token = at.toJwt();

  return token;
}
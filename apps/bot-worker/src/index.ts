if (typeof globalThis.ErrorEvent === "undefined") {
  globalThis.ErrorEvent = class ErrorEvent extends Error implements NodeErrorEvent {
    type: string;
    error?: unknown;

    constructor(type: string, options?: { error?: unknown; message?: string }) {
      super(options?.message || type);
      this.name = "ErrorEvent";
      this.type = type;
      this.error = options?.error;
    }
  };
}

import {
  defineAgent,
  JobContext,
  Worker,
  WorkerOptions,
  initializeLogger,
} from "@livekit/agents";
import { RoomEvent, Track } from "livekit-client";
import "dotenv/config"

initializeLogger({ pretty: true, level: "debug" });

const agentEntryPoint = async (ctx: JobContext) => {
  const roomName = ctx.job.room?.name;

  if (!roomName) {
    console.error("No room name found in job context or metadata");
    return;
  }

  console.log("Connecting to room:", roomName);

  try {
    await ctx.connect();

    const room = ctx.room;

    console.log("bot connected");

    room.on(RoomEvent.ParticipantConnected, (p) => {
      console.log(`👤 Participant connected: ${p.identity}`);
    })

    room.on(RoomEvent.TrackSubscribed, (track, pub, participant) => {
      // @ts-ignore
      if (track?.kind === Track.Kind.Audio) {
        console.log(`Subscribed to audio from ${participant.identity}`)
      }

    })

    await ctx.shutdown();
    console.log("🛑 Shutdown signal received, disconnecting bot...");
  } catch (err) {
    console.error("❌ Error in agent entry point:", err);
  } finally {
    await ctx.room?.disconnect();
  }

  // room.disconnect();
}

const agent = defineAgent({
  entry: agentEntryPoint,
})

const workerOptions: WorkerOptions = {
  // @ts-ignore
  agent: {
    "bot-worker": agent
  },
  wsURL: process.env.LIVEKIT_URL!,
  apiKey: process.env.LIVEKIT_API_KEY!,
  apiSecret: process.env.LIVEKIT_API_SECRET!,
}

if (!workerOptions.wsURL || !workerOptions.apiKey || !workerOptions.apiSecret) {
  throw new Error("Missing LiveKit environment variables. Check your .env file.");
}

const worker = new Worker(workerOptions);

worker.run();

console.log("====--- Worker Running ---====");
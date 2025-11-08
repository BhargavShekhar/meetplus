import { RoomServiceClient } from "livekit-server-sdk";

export default async function page() {
    const client = new RoomServiceClient(
        process.env.NEXT_PUBLIC_LIVEKIT_URL!,
        process.env.LIVEKIT_API_SECRET,
        process.env.NEXT_PUBLIC_Key
    )

    const partiipant = await client.listParticipants("demo-room");

    console.log(partiipant);

    return (
        <div>
            <h1>List of participant are in console</h1> 
        </div>
    )
}
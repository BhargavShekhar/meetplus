import { Meet } from "@/components/meet/ui/Meet";
import axios from "axios";
import { headers } from "next/headers";

interface Props {
    searchParams: {
        username: string,
        roomCode: string
    }
}

export default async function page({ searchParams }: Props) {
    const { username: identity, roomCode } = await searchParams;

    const heardersList = await headers();

    const host = heardersList.get("host");

    const protocol = host?.includes("localhost") ? "http" : "https";

    const baseUrl = `${protocol}://${host}`;

    try {
        const res = await axios.post(`${baseUrl}/api/token`, {
            identity,
            roomCode
        })

        const { token } = res.data;

        return < Meet token={token} />
    } catch (error) {
        return (
            <div>
                Please try agian later
            </div>
        )
    }

}
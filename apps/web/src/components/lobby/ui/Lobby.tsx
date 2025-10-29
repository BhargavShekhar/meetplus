"use client"

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const Lobby = () => {
    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");

    const router = useRouter();

    const handleSubmit = () => {
        router.push(`/meet?username=${username}&room=${room}`)
    }

    return (
        <div className="h-screen w-full flex flex-col justify-center items-center">
            <div className="flex flex-col gap-2.5 w-1/4 shadow-md">
                <Input
                    placeholder="Username"
                    type="text"
                    onChange={(e) => setUsername(e.target.value)}
                />
                <Input
                    placeholder="Room"
                    type="text"
                    onChange={(e) => setRoom(e.target.value)}
                />
                <Button
                    variant={"outline"}
                    type="submit"
                    onClick={handleSubmit}
                >
                    Submit
                </Button>
            </div>
        </div>
    )
}
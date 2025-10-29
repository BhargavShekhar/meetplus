"use client";

import { useState } from 'react';
import { LiveKitRoom, VideoConference } from "@livekit/components-react";
import '@livekit/components-styles';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

interface Props {
    identity: string;
}

export const Meet = ({ identity }: Props) => {
    const [token, setToken] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isJoining, setIsJoining] = useState(false);
    
    const [inputRoomName, setInputRoomName] = useState<string>("");
    const [joinedRoomName, setJoinedRoomName] = useState<string | null>(null);

    const handleJoin = async (roomToJoin: string) => {
        if (!roomToJoin) {
            setError("Please enter a room name or create a new one.");
            return;
        }

        setIsJoining(true);
        setError(null);
        setJoinedRoomName(roomToJoin);

        try {
            const response = await axios.post(`/api/token`, {
                identity,
                roomName: roomToJoin
            });

            if (response.status !== 200 || !response.data?.token) {
                 throw new Error(`Failed to get token: ${response.status}`);
            }
            setToken(response.data.token);

        } catch (err: any) {
            console.error("Error fetching token:", err);
            setError(err.message || "Could not get token. Check console.");
            setIsJoining(false);
            setJoinedRoomName(null);
        }
    };

    const handleCreateRoom = () => {
        const newRoomName = uuidv4();
        setInputRoomName(newRoomName);
        console.log("Creating and joining new room:", newRoomName);
        handleJoin(newRoomName);
    };

    const handleDisconnect = () => {
        setToken(null);
        setIsJoining(false);
        setJoinedRoomName(null);
        console.log("Disconnected from room");
    };


    if (!token) {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', gap: '1rem', padding: '1rem' }}>
                <h2>Create or Join a Meeting</h2>
                <p>Joining as: <strong>{identity}</strong></p>

                <div style={{ display: 'flex', gap: '0.5rem', width: '100%', maxWidth: '400px' }}>
                    <input
                        type="text"
                        placeholder="Enter Room Name to Join"
                        value={inputRoomName}
                        onChange={(e) => setInputRoomName(e.target.value)}
                        disabled={isJoining}
                        style={{ padding: '0.75rem', flexGrow: 1, fontSize: '1rem' }}
                    />
                    <button
                        onClick={() => handleJoin(inputRoomName)}
                        disabled={isJoining || !inputRoomName}
                        style={{ padding: '0.75rem', fontSize: '1rem' }}
                    >
                        {isJoining && joinedRoomName === inputRoomName ? "Joining..." : "Join"}
                    </button>
                </div>

                <div style={{ color: '#888', margin: '0.5rem 0' }}>
                    <p>--- OR ---</p>
                </div>

                <button
                    onClick={handleCreateRoom}
                    disabled={isJoining}
                    style={{ padding: '0.75rem', fontSize: '1rem', width: '100%', maxWidth: '400px' }}
                >
                    {isJoining && !joinedRoomName ? "Creating..." : "Create New Room"}
                </button>
                
                {error && <p style={{ color: 'red', marginTop: '1rem' }}>Error: {error}</p>}
            </div>
        );
    }

    return (
        <LiveKitRoom
            token={token}
            serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL!}
            connect={true}
            video={true}
            audio={true}
            data-lk-theme="default" 
            style={{ height: '100vh' }}
            onDisconnected={handleDisconnect}
        >
            <VideoConference />
        </LiveKitRoom>
    );
};
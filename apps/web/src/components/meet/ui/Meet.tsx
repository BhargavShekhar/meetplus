"use client";

import { useState } from 'react';
import { LiveKitRoom, VideoConference } from "@livekit/components-react";
import '@livekit/components-styles';
import { v4 as uuidv4 } from 'uuid';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Video, Loader2, AlertCircle, Plus, LogIn, Copy, Check } from 'lucide-react';   
import { Alert, AlertDescription } from '@/components/ui/alert';

interface Props {
    identity: string;
}

export const Meet = ({ identity }: Props) => {
    const [token, setToken] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isJoining, setIsJoining] = useState(false);
    const [isCopied, setIsCopied] = useState(false);

    const [inputRoomName, setInputRoomName] = useState<string>("");
    const [joinedRoomName, setJoinedRoomName] = useState<string | null>(null);
    
    const [createdRoomName, setCreatedRoomName] = useState<string | null>(null);

    const handleJoin = async (roomToJoin: string) => {
        if (!roomToJoin) {
            setError("Please enter a room name or create a new one.");
            return;
        }

        setIsJoining(true);
        setError(null);
        setJoinedRoomName(roomToJoin);

        try {
            const response = await fetch(`/api/token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    identity,
                    roomName: roomToJoin
                })
            });

            if (!response.ok) {
                throw new Error(`Failed to get token: ${response.status}`);
            }

            const data = await response.json();

            if (!data?.token) {
                throw new Error('No token received from server');
            }

            setToken(data.token);

        } catch (err: any) {
            console.error("Error fetching token:", err);
            setError(err.message || "Could not get token. Check console.");
            setIsJoining(false);
            setJoinedRoomName(null);
        }
    };

    const handleCreateRoom = () => {
        const newRoomName = uuidv4();
        setCreatedRoomName(newRoomName);
        setError(null);
        console.log("Created new room code:", newRoomName);
    };

    const handleCopy = () => {
        if (!createdRoomName) return;
        navigator.clipboard.writeText(createdRoomName);
        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false);
        }, 2000);
    };

    const handleDisconnect = () => {
        setToken(null);
        setIsJoining(false);
        setJoinedRoomName(null);
        setCreatedRoomName(null);
        console.log("Disconnected from room");
    };

    if (!token) {
        return (
            <div className="min-h-screen w-full bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-md"
                >
                    <Card className="shadow-xl border-slate-200">
                        <CardHeader className="space-y-1 pb-4">
                            <div className="flex items-center justify-center mb-2">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                    className="p-3 bg-linear-to-br from-blue-500 to-indigo-600 rounded-full"
                                >
                                    <Video className="w-6 h-6 text-white" />
                                </motion.div>
                            </div>
                            <CardTitle className="text-2xl font-bold text-center">
                                Join Meeting
                            </CardTitle>
                            <CardDescription className="text-center">
                                Joining as <span className="font-semibold text-slate-700">{identity}</span>
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-6 overflow-hidden">
                            <AnimatePresence mode="wait">
                                {!createdRoomName && (
                                    <motion.div
                                        key="join-create"
                                        initial={{ opacity: 0, x: -50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 50 }}
                                        transition={{ duration: 0.3 }}
                                        className="space-y-6"
                                    >
                                        <div className="space-y-3">
                                            <div className="flex gap-2">
                                                <Input
                                                    type="text"
                                                    placeholder="Enter room code"
                                                    value={inputRoomName}
                                                    onChange={(e) => setInputRoomName(e.target.value)}
                                                    disabled={isJoining}
                                                    className="flex-1"
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter' && inputRoomName) {
                                                            handleJoin(inputRoomName);
                                                        }
                                                    }}
                                                />
                                                <Button
                                                    onClick={() => handleJoin(inputRoomName)}
                                                    disabled={isJoining || !inputRoomName}
                                                    className="bg-linear-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
                                                >
                                                    {isJoining && joinedRoomName === inputRoomName ? (
                                                        <Loader2 className="w-4 h-4 animate-spin" />
                                                    ) : (
                                                        <LogIn className="w-4 h-4" />
                                                    )}
                                                </Button>
                                            </div>
                                        </div>

                                        <div className="relative">
                                            <div className="absolute inset-0 flex items-center">
                                                <Separator className="w-full" />
                                            </div>
                                            <div className="relative flex justify-center text-xs uppercase">
                                                <span className="bg-white px-2 text-slate-500">Or</span>
                                            </div>
                                        </div>

                                        <Button
                                            onClick={handleCreateRoom}
                                            disabled={isJoining}
                                            variant="outline"
                                            className="w-full border-2 hover:bg-slate-50 hover:border-slate-300 transition-all"
                                        >
                                            <Plus className="w-4 h-4 mr-2" />
                                            Create new room
                                        </Button>
                                    </motion.div>
                                )}

                                {createdRoomName && (
                                    <motion.div
                                        key="start-meet"
                                        initial={{ opacity: 0, x: 50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -50 }}
                                        transition={{ duration: 0.3 }}
                                        className="space-y-4 pt-2"
                                    >
                                        <p className="text-sm text-slate-600 text-center">
                                            Your new room is ready. Share this code:
                                        </p>
                                        
                                        <div className="flex gap-2">
                                            <Input
                                                type="text"
                                                value={createdRoomName}
                                                readOnly
                                                className="font-mono text-center bg-slate-50"
                                            />
                                            <Button variant="outline" size="icon" onClick={handleCopy}>
                                                {isCopied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                                            </Button>
                                        </div>

                                        <Button
                                            onClick={() => handleJoin(createdRoomName)}
                                            disabled={isJoining}
                                            className="w-full bg-linear-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
                                        >
                                            {isJoining ? (
                                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            ) : (
                                                <LogIn className="w-4 h-4 mr-2" />
                                            )}
                                            Start Meet
                                        </Button>

                                        <Button
                                            onClick={() => setCreatedRoomName(null)}
                                            disabled={isJoining}
                                            variant="ghost"
                                            className="w-full text-slate-600"
                                        >
                                            Back
                                        </Button>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <AnimatePresence mode="wait">
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="mt-4!"
                                    >
                                        <Alert variant="destructive">
                                            <AlertCircle className="h-4 w-4" />
                                            <AlertDescription>{error}</AlertDescription>
                                        </Alert>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </CardContent>
                    </Card>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-center text-sm text-slate-500 mt-4"
                    >
                        Your video and audio will be enabled by default
                    </motion.p>
                </motion.div>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="h-screen w-full"
        >
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
        </motion.div>
    );
};
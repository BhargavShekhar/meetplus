"use client"

import { useCallback, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Video, Users, Sparkles, Plus, LogIn, Copy, Check } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from "next/navigation";

export default function Lobby() {
    const [username, setUsername] = useState("");
    const [roomCode, setRoomCode] = useState("");
    const [createdRoomCode, setCreatedRoomCode] = useState("");
    const [isCopied, setIsCopied] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [showRoomOptions, setShowRoomOptions] = useState(false);

    const router = useRouter();

    const handleCreateRoom = () => {
        if (!username.trim()) return;
        const newRoomCode = uuidv4();
        setCreatedRoomCode(newRoomCode);
    };

    const handleJoinRoom = () => {
        if (!username.trim() || !roomCode.trim()) return;
        router.push(`/meet?username=${encodeURIComponent(username)}&roomCode=${encodeURIComponent(roomCode)}`);
    };

    const handleStartMeet = () => {
        if (!username.trim() || !createdRoomCode) return;
        router.push(`/meet?username=${encodeURIComponent(username)}&roomCode=${encodeURIComponent(createdRoomCode)}`);
    }

    const handleCopy = () => {
        if (!createdRoomCode) return;
        navigator.clipboard.writeText(createdRoomCode);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    const handleContinue = () => {
        if (username.trim()) {
            setShowRoomOptions(true);
        }
    };

    const handleBack = () => {
        setShowRoomOptions(false);
        setCreatedRoomCode("");
        setRoomCode("");
        setIsCopied(false);
    };

    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-black">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-pulse"
                    style={{ animationDuration: '4s' }}></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/3 rounded-full blur-3xl animate-pulse"
                    style={{ animationDuration: '6s', animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-white/4 rounded-full blur-3xl animate-pulse"
                    style={{ animationDuration: '5s', animationDelay: '2s' }}></div>
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
                {/* Hero Section */}
                <div className="text-center mb-12 animate-[fadeIn_1s_ease-out]">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <Video className="w-10 h-10 text-white" />
                        <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight">
                            MeetPlus
                        </h1>
                    </div>
                    <p className="text-xl md:text-2xl text-gray-400 font-light tracking-wide animate-[fadeIn_1s_ease-out_0.3s_both]">
                        Connect. Collaborate. Communicate.
                    </p>

                    {/* Feature Pills */}
                    <div className="flex flex-wrap items-center justify-center gap-3 mt-8 animate-[fadeIn_1s_ease-out_0.6s_both]">
                        <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-gray-300 text-sm border border-white/10">
                            <Users className="w-4 h-4" />
                            <span>Multi-person video</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-gray-300 text-sm border border-white/10">
                            <Sparkles className="w-4 h-4" />
                            <span>Crystal clear quality</span>
                        </div>
                    </div>
                </div>

                {/* Main Card */}
                <div className="w-full max-w-md animate-[slideUp_0.8s_ease-out_0.4s_both]">
                    <Card className="backdrop-blur-xl bg-zinc-900/80 border-white/10 shadow-2xl hover:shadow-white/5 transition-all duration-500">
                        <CardHeader className="space-y-1 pb-4">
                            <CardTitle className="text-2xl font-semibold text-center text-white">
                                {!showRoomOptions ? "Enter your name to join a meeting" : "Join or Create Meeting"}
                            </CardTitle>
                            <CardDescription className="text-center text-gray-400">
                                {!showRoomOptions
                                    ? "Start connecting with your team in seconds"
                                    : `Joining as ${username}`
                                }
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {!showRoomOptions ? (
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Input
                                            type="text"
                                            placeholder="Your name"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            className="h-12 text-base bg-black/50 border-white/20 text-white placeholder:text-gray-500 focus:border-white focus:ring-white/20 transition-all duration-300"
                                        />
                                    </div>
                                    <Button
                                        onClick={handleContinue}
                                        className="w-full h-12 text-base font-medium bg-white text-black hover:bg-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                                        disabled={!username.trim()}
                                    >
                                        Continue
                                    </Button>

                                    <div className="mt-6 pt-6 border-t border-white/10">
                                        <p className="text-center text-sm text-gray-500">
                                            No account needed. Just enter your name and start.
                                        </p>
                                    </div>
                                </div>
                            ) : !createdRoomCode ? (
                                <div className="space-y-6">
                                    <div className="space-y-3">
                                        <div className="flex gap-2">
                                            <Input
                                                type="text"
                                                placeholder="Enter room code"
                                                value={roomCode}
                                                onChange={(e) => setRoomCode(e.target.value)}
                                                className="flex-1 bg-black/50 border-white/20 text-white placeholder:text-gray-500 focus:border-white focus:ring-white/20"
                                            />
                                            <Button
                                                onClick={handleJoinRoom}
                                                disabled={!roomCode.trim()}
                                                className="bg-white text-black hover:bg-gray-200"
                                            >
                                                <LogIn className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="relative">
                                        <div className="absolute inset-0 flex items-center">
                                            <Separator className="w-full bg-white/10" />
                                        </div>
                                        <div className="relative flex justify-center text-xs uppercase">
                                            <span className="bg-zinc-900 px-2 text-gray-500">Or</span>
                                        </div>
                                    </div>

                                    <Button
                                        onClick={handleCreateRoom}
                                        variant="outline"
                                        className="w-full border-white/20 text-white hover:bg-white/10 hover:border-white/30 transition-all"
                                    >
                                        <Plus className="w-4 h-4 mr-2" />
                                        Create new room
                                    </Button>

                                    <Button
                                        onClick={handleBack}
                                        variant="ghost"
                                        className="w-full text-gray-400 hover:text-white hover:bg-white/5"
                                    >
                                        Back
                                    </Button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <p className="text-sm text-gray-400 text-center">
                                        Your new room is ready. Share this code:
                                    </p>

                                    <div className="flex gap-2">
                                        <Input
                                            type="text"
                                            value={createdRoomCode}
                                            readOnly
                                            className="font-mono text-center bg-black/50 border-white/20 text-white"
                                        />
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={handleCopy}
                                            className="border-white/20 hover:bg-white/10"
                                        >
                                            {isCopied ? (
                                                <Check className="w-4 h-4 text-green-400" />
                                            ) : (
                                                <Copy className="w-4 h-4 text-white" />
                                            )}
                                        </Button>
                                    </div>

                                    <Button
                                        onClick={handleStartMeet}
                                        onMouseEnter={() => setIsHovered(true)}
                                        onMouseLeave={() => setIsHovered(false)}
                                        className="w-full h-12 text-base font-medium bg-white text-black hover:bg-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                                    >
                                        <span className="flex items-center justify-center gap-2">
                                            Start Meet
                                            <Video className={`w-5 h-5 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
                                        </span>
                                    </Button>

                                    <Button
                                        onClick={() => setCreatedRoomCode("")}
                                        variant="ghost"
                                        className="w-full text-gray-400 hover:text-white hover:bg-white/5"
                                    >
                                        Back
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Footer */}
                <div className="mt-12 text-center text-gray-500 text-sm animate-[fadeIn_1s_ease-out_1s_both]">
                    <p>Trusted by thousands of teams worldwide</p>
                </div>
            </div>

            <style jsx>
                {`
                    @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                    }
                    
                    @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                    }
                `}
            </style>
        </div>
    );
}
"use client"

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Video, Users, Sparkles, Plus, LogIn, Copy, Check, ArrowLeft, ArrowRight } from "lucide-react";
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
        <div className="relative min-h-screen w-full overflow-hidden bg-linear-to-br from-slate-950 via-slate-900 to-slate-950">
            {/* Enhanced Animated Background */}
            <div className="absolute inset-0 overflow-hidden">
                {/* linear Orbs */}
                <div className="absolute top-20 -left-20 w-96 h-96 bg-linear-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"
                    style={{ animationDuration: '4s' }}></div>
                <div className="absolute bottom-20 -right-20 w-[500px] h-[500px] bg-linear-to-br from-purple-500/15 to-pink-500/15 rounded-full blur-3xl animate-pulse"
                    style={{ animationDuration: '6s', animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-linear-to-br from-indigo-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse"
                    style={{ animationDuration: '5s', animationDelay: '2s' }}></div>

                {/* Grid Pattern Overlay */}
                <div className="absolute inset-0 bg-[linear-linear(to_right,#80808012_1px,transparent_1px),linear-linear(to_bottom,#80808012_1px,transparent_1px)] bg-bg-size-[64px_64px]"></div>

                {/* Vignette Effect */}
                <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-slate-950/50"></div>
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
                {/* Enhanced Hero Section */}
                <div className="text-center mb-16 animate-[fadeIn_1s_ease-out]">
                    <div className="flex items-center justify-center gap-3 mb-6 group">
                        <div className="relative">
                            <div className="absolute inset-0 bg-white/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                            <div className="relative bg-linear-to-br from-white to-gray-300 p-3 rounded-2xl shadow-2xl transform group-hover:scale-110 transition-transform duration-500">
                                <Video className="w-10 h-10 text-slate-900" />
                            </div>
                        </div>
                        <h1 className="text-6xl md:text-7xl font-bold bg-linear-to-r from-white via-gray-200 to-white bg-clip-text text-transparent tracking-tight">
                            Swap Sphere
                        </h1>
                    </div>
                    <p className="text-2xl md:text-3xl text-gray-400 font-light tracking-wide mb-2 animate-[fadeIn_1s_ease-out_0.3s_both]">
                        Connect. Collaborate. Communicate.
                    </p>
                    <p className="text-sm text-gray-500 animate-[fadeIn_1s_ease-out_0.5s_both]">
                        Professional video meetings made simple
                    </p>

                    {/* Enhanced Feature Pills */}
                    <div className="flex flex-wrap items-center justify-center gap-3 mt-10 animate-[fadeIn_1s_ease-out_0.6s_both]">
                        <div className="group flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-white/10 to-white/5 backdrop-blur-md rounded-full text-gray-300 text-sm border border-white/20 hover:border-white/40 hover:bg-white/15 transition-all duration-300 shadow-lg hover:shadow-xl cursor-default">
                            <Users className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                            <span>Multi-person video</span>
                        </div>
                        <div className="group flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-white/10 to-white/5 backdrop-blur-md rounded-full text-gray-300 text-sm border border-white/20 hover:border-white/40 hover:bg-white/15 transition-all duration-300 shadow-lg hover:shadow-xl cursor-default">
                            <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                            <span>Crystal clear quality</span>
                        </div>
                    </div>
                </div>

                {/* Enhanced Main Card */}
                <div className="w-full max-w-md animate-[slideUp_0.8s_ease-out_0.4s_both]">
                    <Card className="backdrop-blur-2xl bg-linear-to-br from-slate-900/90 to-slate-900/70 border-white/20 shadow-2xl hover:shadow-white/10 transition-all duration-500 overflow-hidden group">
                        {/* Card Glow Effect */}
                        <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                        <CardHeader className="space-y-2 pb-6 relative">
                            <CardTitle className="text-2xl font-semibold text-center bg-linear-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                                {!showRoomOptions ? "Welcome to MeetPlus" : "Join or Create Meeting"}
                            </CardTitle>
                            <CardDescription className="text-center text-gray-400 text-base">
                                {!showRoomOptions
                                    ? "Enter your name to get started"
                                    : <span className="inline-flex items-center gap-2">
                                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                        Joining as <span className="font-semibold text-white">{username}</span>
                                    </span>
                                }
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="relative">
                            {!showRoomOptions ? (
                                <div className="space-y-6">
                                    <div className="space-y-3">
                                        <label className="text-sm font-medium text-gray-300 block">Your Name</label>
                                        <Input
                                            type="text"
                                            placeholder="Enter your full name"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && handleContinue()}
                                            className="h-14 text-base bg-black/30 border-white/30 text-white placeholder:text-gray-500 focus:border-white focus:ring-2 focus:ring-white/20 transition-all duration-300 rounded-xl"
                                        />
                                    </div>
                                    <Button
                                        onClick={handleContinue}
                                        className="w-full h-14 text-base font-semibold bg-linear-to-r from-white to-gray-200 text-slate-900 hover:from-gray-100 hover:to-gray-300 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] rounded-xl group"
                                        disabled={!username.trim()}
                                    >
                                        <span className="flex items-center gap-2">
                                            Continue
                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                                        </span>
                                    </Button>

                                    <div className="mt-8 pt-6 border-t border-white/10">
                                        <p className="text-center text-sm text-gray-500 leading-relaxed">
                                            No account required • Instant access • Secure connections
                                        </p>
                                    </div>
                                </div>
                            ) : !createdRoomCode ? (
                                <div className="space-y-6">
                                    <div className="space-y-3">
                                        <label className="text-sm font-medium text-gray-300 block">Room Code</label>
                                        <div className="flex gap-2">
                                            <Input
                                                type="text"
                                                placeholder="Enter meeting code"
                                                value={roomCode}
                                                onChange={(e) => setRoomCode(e.target.value)}
                                                onKeyDown={(e) => e.key === 'Enter' && handleJoinRoom()}
                                                className="flex-1 h-12 bg-black/30 border-white/30 text-white placeholder:text-gray-500 focus:border-white focus:ring-2 focus:ring-white/20 rounded-xl"
                                            />
                                            <Button
                                                onClick={handleJoinRoom}
                                                disabled={!roomCode.trim()}
                                                className="h-12 px-6 bg-linear-to-r from-white to-gray-200 text-slate-900 hover:from-gray-100 hover:to-gray-300 rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed group"
                                            >
                                                <LogIn className="w-5 h-5 group-hover:translate-x-0.5 transition-transform duration-300" />
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="relative py-4">
                                        <div className="absolute inset-0 flex items-center">
                                            <Separator className="w-full bg-linear-to-r from-transparent via-white/20 to-transparent" />
                                        </div>
                                        <div className="relative flex justify-center text-xs uppercase">
                                            <span className="bg-slate-900 px-4 text-gray-400 font-medium tracking-wider">Or</span>
                                        </div>
                                    </div>

                                    <Button
                                        onClick={handleCreateRoom}
                                        variant="outline"
                                        className="w-full h-12 border-white/30 bg-white/5 text-white hover:bg-white/10 hover:border-white/50 transition-all duration-300 rounded-xl group"
                                    >
                                        <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                                        Create new room
                                    </Button>

                                    <Button
                                        onClick={handleBack}
                                        variant="ghost"
                                        className="w-full h-12 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl group"
                                    >
                                        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
                                        Back
                                    </Button>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    <div className="bg-linear-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-4 text-center">
                                        <div className="flex items-center justify-center gap-2 mb-2">
                                            <Check className="w-5 h-5 text-green-400" />
                                            <p className="text-sm font-semibold text-green-400">Room Created Successfully!</p>
                                        </div>
                                        <p className="text-xs text-gray-400">Share this code with participants</p>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-300 block">Meeting Code</label>
                                        <div className="flex gap-2">
                                            <Input
                                                type="text"
                                                value={createdRoomCode}
                                                readOnly
                                                className="font-mono text-center text-lg font-semibold bg-black/30 border-white/30 text-white rounded-xl h-14 tracking-wider"
                                            />
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                onClick={handleCopy}
                                                className="h-14 w-14 border-white/30 hover:bg-white/10 rounded-xl group"
                                            >
                                                {isCopied ? (
                                                    <Check className="w-5 h-5 text-green-400" />
                                                ) : (
                                                    <Copy className="w-5 h-5 text-black group-hover:scale-110 transition-transform duration-300" />
                                                )}
                                            </Button>
                                        </div>
                                        {isCopied && (
                                            <p className="text-xs text-green-400 text-center animate-[fadeIn_0.3s_ease-out]">
                                                Code copied to clipboard!
                                            </p>
                                        )}
                                    </div>

                                    <Button
                                        onClick={handleStartMeet}
                                        onMouseEnter={() => setIsHovered(true)}
                                        onMouseLeave={() => setIsHovered(false)}
                                        className="w-full h-14 text-base font-semibold bg-linear-to-r from-white to-gray-200 text-slate-900 hover:from-gray-100 hover:to-gray-300 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] rounded-xl group"
                                    >
                                        <span className="flex items-center justify-center gap-2">
                                            Start Meeting
                                            <Video className={`w-5 h-5 transition-transform duration-300 ${isHovered ? 'translate-x-1 scale-110' : ''}`} />
                                        </span>
                                    </Button>

                                    <Button
                                        onClick={() => setCreatedRoomCode("")}
                                        variant="ghost"
                                        className="w-full h-12 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl group"
                                    >
                                        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
                                        Back
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Enhanced Footer */}
                <div className="mt-16 text-center animate-[fadeIn_1s_ease-out_1s_both]">
                    <div className="flex items-center justify-center gap-2 text-gray-500 text-sm mb-3">
                        <div className="flex -space-x-2">
                            <div className="w-8 h-8 rounded-full bg-linear-to-br from-blue-400 to-blue-600 border-2 border-slate-900"></div>
                            <div className="w-8 h-8 rounded-full bg-linear-to-br from-purple-400 to-purple-600 border-2 border-slate-900"></div>
                            <div className="w-8 h-8 rounded-full bg-linear-to-br from-pink-400 to-pink-600 border-2 border-slate-900"></div>
                        </div>
                    </div>
                    <p className="text-gray-500 text-sm">Trusted by thousands of teams worldwide</p>
                    <p className="text-gray-600 text-xs mt-2">Secure • Reliable • Fast</p>
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
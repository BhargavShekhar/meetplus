"use client";

import { LiveKitRoom, VideoConference } from "@livekit/components-react";
import '@livekit/components-styles';
import { motion } from 'framer-motion';

interface Props {
    token: string
}

export const Meet = ({ token }: Props) => {
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
            >
                <VideoConference />
            </LiveKitRoom>
        </motion.div>
    );
};
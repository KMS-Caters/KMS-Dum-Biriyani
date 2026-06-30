"use client";

import { useEffect, useRef } from "react";

type Props = {
    latestOrderId: number;
};

export default function OrderNotifier({
    latestOrderId,
}: Props) {
    const previousId = useRef(latestOrderId);

    useEffect(() => {
        if (latestOrderId > previousId.current) {

            const audio = new Audio("/sounds/bell.mp3");
            audio.play().catch(() => {});

            if (Notification.permission === "granted") {
                new Notification("🍗 New KMS Order", {
                    body: `Order #${latestOrderId} received`,
                });
            }

            previousId.current = latestOrderId;
        }
    }, [latestOrderId]);

    useEffect(() => {
        if (Notification.permission === "default") {
            Notification.requestPermission();
        }
    }, []);

    return null;
}

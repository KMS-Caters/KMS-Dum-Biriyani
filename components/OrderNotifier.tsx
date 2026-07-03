"use client";

import { useEffect, useRef } from "react";

type Props = {
    latestOrderId: number;
};

export default function OrderNotifier({ latestOrderId }: Props) {
    const previousId = useRef(latestOrderId);

    useEffect(() => {
        if (latestOrderId > previousId.current) {

            const audio = new Audio("/sounds/bell.mp3");
            audio.play().catch(() => {});

            if (
                typeof window !== "undefined" &&
                "Notification" in window &&
                Notification.permission === "granted"
            ) {
                new Notification("🍗 New KMS Order", {
                    body: `Order #${latestOrderId} received`,
                });
            }

            previousId.current = latestOrderId;
        }
    }, [latestOrderId]);

    useEffect(() => {
        if (
            typeof window !== "undefined" &&
            "Notification" in window &&
            Notification.permission === "default"
        ) {
            Notification.requestPermission().catch(() => {});
        }
    }, []);

    return null;
}

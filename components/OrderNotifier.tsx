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

            previousId.current = latestOrderId;
        }
    }, [latestOrderId]);

    return null;
}

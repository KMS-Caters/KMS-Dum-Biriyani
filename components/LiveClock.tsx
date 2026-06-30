"use client";

import { useEffect, useState } from "react";

export default function LiveClock() {
    const [now, setNow] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setNow(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="bg-zinc-900 rounded-xl p-4 h-full flex flex-col items-center justify-center">

        <h2 className="text-6xl lg:text-7xl font-bold text-cyan-400 text-center">
        {now.toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        })}
        </h2>

        <p className="text-zinc-400 text-xl mt-2 text-center">
        {now.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        })}
        </p>

        </div>
    );
}

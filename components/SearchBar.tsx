"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";

export default function SearchBar() {
    const [open, setOpen] = useState(false);

    return (
        <div className="flex items-center gap-3">

        {open && (
            <input
            autoFocus
            type="text"
            placeholder="Search..."
            className="bg-zinc-800 px-4 py-2 rounded-lg w-64 outline-none"
            />
        )}

        <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-lg hover:bg-zinc-800  hover:text-green-400 transition"
        >
        {open ? <X size={30} /> : <Search size={30} />}        </button>

        </div>
    );
}

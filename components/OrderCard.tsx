"use client";
import { FaRegCopy, FaMapMarkerAlt } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
type OrderCardProps = {
    id: number;
    customerName: string;
    phoneNumber: string;

    chickenDumQty: number;
    muttonDumQty: number;

    chicken65Size: string | null;

    pineappleKesariQty: number;

    totalAmount: number;

    deliveryDate: string | null;
    deliveryTime: string | null;

    latitude: number | null;
    longitude: number | null;

    deliveryAddress: string | null;

    status: string;
};

export default function OrderCard(props: OrderCardProps) {
    const area =
    props.deliveryAddress
    ?.split(",")
    .map((x) => x.trim())
    .find(
        (x) =>
        !x.match(/^\d+$/) &&
        !x.toLowerCase().includes("india")
    ) || props.deliveryAddress;

    async function updateStatus(status: string) {
        await fetch(`/api/orders/${props.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ status }),
        });

        window.location.reload();
    }

    return ( <div className="bg-zinc-900 rounded-2xl p-5 border border-zinc-800 shadow-lg">


    <div className="flex justify-between items-start">

    <div>
    <p className="text-xs text-zinc-500">
    Order #{props.id}
    </p>

    <h2 className="text-xl font-bold">
    {props.customerName}
    </h2>

    <p className="text-zinc-400">
    {props.phoneNumber}
    </p>
    </div>

    <div className="flex items-center gap-3">

    <button
    onClick={() =>
        window.open(
            `https://wa.me/91${props.phoneNumber}`,
            "_blank"
        )
    }
    title="WhatsApp"
    >
    <FaWhatsapp
    size={22}
    className="text-green-500 hover:scale-110 transition"
    />
    </button>

    <button
    title="Open Maps"
    >
    <FaMapMarkerAlt
    size={20}
    className="text-red-500 hover:scale-110 transition"
    />
    </button>

    <button
    onClick={() => navigator.clipboard.writeText(props.phoneNumber)}
    title="Copy Phone"
    >
    <FaRegCopy
    size={19}
    className="text-zinc-300 hover:scale-110 transition"
    />
    </button>

    </div>

    </div>

    <div className="mt-5 border-t border-zinc-800 pt-4 space-y-2">

    {props.chickenDumQty > 0 && (
        <p>
        🍗 Chicken Dum × {props.chickenDumQty}
        </p>
    )}

    {props.muttonDumQty > 0 && (
        <p>
        🥩 Mutton Dum × {props.muttonDumQty}
        </p>
    )}

    {props.chicken65Size && (
        <p>
        🍗 Chicken 65 ({props.chicken65Size})
        </p>
    )}

    {props.pineappleKesariQty > 0 && (
        <p>
        🍍 Pineapple Kesari × {props.pineappleKesariQty}
        </p>
    )}

    </div>

    <div className="mt-4 text-sm text-zinc-400">

    <p>
    📅 {
        props.deliveryDate
        ? new Date(props.deliveryDate).toLocaleDateString(
            "en-GB",
            {
                day: "2-digit",
                month: "2-digit",
                year: "2-digit",
            }
        )
        : "-"
    }{" "}
    {props.deliveryTime}
    </p>
    <p className="mt-1">
    📍 {area}
    </p>

    </div>

    <div className="flex gap-2 mt-4">

    <button
    onClick={() => {
        const lat = props.latitude;
        const lng = props.longitude;

        if (!lat || !lng) {
            alert("Location not available");
            return;
        }

        const label = encodeURIComponent(props.deliveryAddress ?? "Customer");

        const intent =
        `intent://maps.google.com/maps?q=${lat},${lng}(${label})` +
        `#Intent;scheme=https;action=android.intent.action.VIEW;end`;

        window.location.href = intent;
    }}
    </button>
    {props.status === "NEW" && (
        <button
        onClick={() => updateStatus("READY")}
        className="flex-1 bg-green-600 hover:bg-green-700 py-2 rounded-lg font-semibold"
        >
        Ready
        </button>
    )}

    {props.status === "READY" && (
        <button
        onClick={() => updateStatus("OUT_FOR_DELIVERY")}
        className="flex-1 bg-yellow-600 hover:bg-yellow-700 py-2 rounded-lg font-semibold"
        >
        Dispatched
        </button>
    )}

    {props.status === "OUT_FOR_DELIVERY" && (
        <button
        onClick={() => updateStatus("DELIVERED")}
        className="flex-1 bg-purple-600 hover:bg-purple-700 py-2 rounded-lg font-semibold"
        >
        Delivered
        </button>
    )}

    {props.status === "DELIVERED" && (
        <button
        disabled
        className="flex-1 bg-zinc-700 py-2 rounded-lg font-semibold"
        >
        Completed
        </button>
    )}

    </div>


    </div>


    );
}

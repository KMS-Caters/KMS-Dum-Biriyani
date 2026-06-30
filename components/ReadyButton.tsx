"use client";

type Props = {
    id: number;
};

export default function ReadyButton({ id }: Props) {
    async function markReady() {
        await fetch(`/api/orders/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                status: "READY",
            }),
        });

        window.location.reload();
    }

    return (
        <button
        onClick={markReady}
        className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg"
        >
        Ready
        </button>
    );
}

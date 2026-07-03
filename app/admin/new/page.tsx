
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import ReadyButton from "@/components/ReadyButton";

export default async function NewOrdersPage() {
    const orders = await prisma.order.findMany({
        where: {
            status: "NEW",
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    async function updateStatus(id: number) {
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
        <main className="min-h-screen bg-zinc-950 text-white p-6">
        <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">
        New Orders
        </h1>

        <Link
        href="/admin"
        className="bg-zinc-800 px-4 py-2 rounded-lg"
        >
        Dashboard
        </Link>
        </div>

        <div className="overflow-x-auto">
        <table className="w-full border border-zinc-700">
        <thead className="bg-zinc-900">
        <tr>
        <th className="p-3 text-left">ID</th>
        <th className="p-3 text-left">Customer</th>
        <th className="p-3 text-left">Phone</th>
        <th className="p-3 text-left">Amount</th>
        <th className="p-3 text-left">Time</th>
        <th className="p-3 text-left">Items</th>
        <th className="p-3 text-center">Action</th>
        </tr>
        </thead>

        <tbody>
        {orders.map((order: any) => (
            <tr
            key={order.id}
            className="border-t border-zinc-800"
            >
            <td className="p-3">
            #{order.id}
            </td>

            <td className="p-3">
            {order.customerName}
            </td>

            <td className="p-3">
            {order.phoneNumber}
            </td>

            <td className="p-3">
            ₹{order.totalAmount}
            </td>

            <td className="p-3">
            {new Date(order.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            })}
            </td>

            <td className="p-3">
            {order.chickenDumQty > 0 && (
                <div>Chicken Dum × {order.chickenDumQty}</div>
            )}

            {order.muttonDumQty > 0 && (
                <div>Mutton Dum × {order.muttonDumQty}</div>
            )}

            {order.chicken65Size && (
                <div>Chicken 65 ({order.chicken65Size})</div>
            )}

            {order.pineappleKesariQty > 0 && (
                <div>Kesari × {order.pineappleKesariQty}</div>
            )}
            </td>

            <td className="p-3 text-center">

            <input
            type="hidden"
            name="id"
            value={order.id}
            />

            <input
            type="hidden"
            name="id"
            value={order.id}
            />


            <ReadyButton id={order.id} />

            </td>
            </tr>
        ))}
        </tbody>
        </table>
        </div>
        </main>
    );
}

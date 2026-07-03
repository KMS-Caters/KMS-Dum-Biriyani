import OrderCard from "@/components/OrderCard";
import { prisma } from "@/lib/prisma";
import LiveClock from "@/components/LiveClock";
import Link from "next/link";
import AutoRefresh from "@/components/AutoRefresh";
import SearchBar from "@/components/SearchBar";
import OrderNotifier from "@/components/OrderNotifier";


export default async function AdminPage() {
        const orders = await prisma.order.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });

        const latestOrderId =
        orders.length > 0 ? orders[0].id : 0;

        const today = new Date().toISOString().split("T")[0];

        const todaysOrders = orders.filter(
            (order: any) =>
            order.createdAt.toISOString().split("T")[0] === today
        );

        const todaysRevenue = todaysOrders.reduce(
            (sum: number, order: any) => sum + order.totalAmount,
                                                  0
        );

        const chickenSold = todaysOrders.reduce(
            (sum: number, order: any) => sum + order.chickenDumQty,
                                                0
        );

        const muttonSold = todaysOrders.reduce(
            (sum: number, order: any) => sum + order.muttonDumQty,
                                               0
        );

        const kesariSold = todaysOrders.reduce(
            (sum: number, order: any) => sum + order.pineappleKesariQty,
                                               0
        );

        const chicken65Grams = todaysOrders.reduce((sum: number, order: any) => {
            switch (order.chicken65Size) {
                case "100g":
                    return sum + 100;
                case "150g":
                    return sum + 150;
                case "250g":
                    return sum + 250;
                case "500g":
                    return sum + 500;
                case "1kg":
                    return sum + 1000;
                default:
                    return sum;
            }
        }, 0);

        const chicken65Kg =
        chicken65Grams >= 1000
        ? `${(chicken65Grams / 1000).toFixed(2)} kg`
        : `${chicken65Grams} g`;

        const newOrders = orders.filter(
            (o: any) => o.status === "NEW"
        );

        const readyOrders = orders.filter(
            (o: any) => o.status === "READY"
        );

        const outOrders = orders.filter(
            (o: any) => o.status === "OUT_FOR_DELIVERY"
        );

        const deliveredOrders = orders.filter(
            (o: any) => o.status === "DELIVERED"
        );

        const revenue = orders.reduce(
            (sum: number, order: any) => sum + order.totalAmount,0
        );

        type Props = {
            orders: any[];
        };

        return ( <main className="min-h-screen bg-zinc-950 text-white p-6">


        <AutoRefresh />


        <OrderNotifier latestOrderId={latestOrderId} />


        <div className="flex justify-between items-center mb-8">
            <h1 className="text-6xl font-bold">
            KMS Dashboard
            </h1>

            <SearchBar />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

            <LiveClock />

        <div className="bg-zinc-900 p-4 rounded-xl">
            <p className="text-zinc-400 ">
            Today's Orders
            </p>

            <h2 className="text-3xl font-bold">
            {todaysOrders.length}
            </h2>
        </div>



        <div className="bg-zinc-900 p-4 rounded-xl">
            <p className="text-zinc-400">
            Pending
            </p>

            <h2 className="text-3xl font-bold text-yellow-400">
            {newOrders.length +
                readyOrders.length +
                outOrders.length}
                </h2>
        </div>

        <div className="bg-zinc-900 p-4 rounded-xl">
                <p className="text-zinc-400">
                Delivered
                </p>

                <h2 className="text-3xl font-bold text-blue-400">
                {deliveredOrders.length}
                </h2>
        </div>

        </div>

                <div className="grid lg:grid-cols-4 gap-6">

                <section>
                <Link href="/admin/new">
                <h2 className="text-xl font-bold mb-4 text-red-400 hover:underline cursor-pointer">
                NEW ({newOrders.length})
                </h2>
                </Link>


        <div className="space-y-4">
                {newOrders.map((order: any) => (
                    <OrderCard
                    key={order.id}
                    {...order}
                    />
                ))}
        </div>
                </section>



                <section>
                <h2 className="text-xl font-bold mb-4 text-yellow-400">
                READY ({readyOrders.length})
                </h2>

        <div className="space-y-4">
                {readyOrders.map((order: any) => (
                    <OrderCard
                    key={order.id}
                    {...order}
                    />
                ))}
        </div>
                </section>

                <section>
                <h2 className="text-xl font-bold mb-4 text-blue-400">
                OUT ({outOrders.length})
                </h2>

        <div className="space-y-4">
                {outOrders.map((order: any) => (
                    <OrderCard
                    key={order.id}
                    {...order}
                    />
                ))}
        </div>
                </section>

                <section>
                <h2 className="text-xl font-bold mb-4 text-green-400">
                DELIVERED ({deliveredOrders.length})
                </h2>

        <div className="space-y-4">
                {deliveredOrders.map((order: any) => (
                    <OrderCard
                    key={order.id}
                    {...order}
                    />
                ))}
        </div>
                </section>

        </div>



        <div className="bg-zinc-900 p-5 rounded-xl mt-8">
                <p className="text-zinc-400">
                Today's Revenue
                </p>

                <h2 className="text-3xl font-bold text-green-400">
                ₹{todaysRevenue}
                </h2>
        </div>



        <div className="mt-8 bg-zinc-900 rounded-xl p-6">
                <h2 className="text-2xl font-bold mb-6">
                Analytics
                </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <div>
            <p className="text-zinc-400">Chicken Dum</p>
                <p className="text-3xl font-bold">{chickenSold}</p>
        </div>

        <div>
                <p className="text-zinc-400">Mutton Dum</p>
                <p className="text-3xl font-bold">{muttonSold}</p>
        </div>

        <div>
                <p className="text-zinc-400">Chicken 65</p>
                <p className="text-3xl font-bold">
                {chicken65Kg}
                </p>
        </div>

        <div>
                <p className="text-zinc-400">Kesari</p>
                <p className="text-3xl font-bold">{kesariSold}</p>
        </div>
        </div>
        </div>


        <div className="mt-8 bg-zinc-900 rounded-xl p-5">
                <p className="text-zinc-400">
                Total Revenue
                </p>

                <h2 className="text-4xl font-bold text-green-400">
                ₹{revenue}
                </h2>
        </div>

                </main>

            );



}

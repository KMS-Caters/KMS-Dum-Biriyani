import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const orders = await prisma.order.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });


        return NextResponse.json(orders);


    } catch (error) {
        console.error(error);


        return NextResponse.json(
            { error: "Failed to fetch orders" },
            { status: 500 }
        );


    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();


        const order = await prisma.order.create({
            data: {
                customerName: body.customerName,
                phoneNumber: body.phoneNumber,

                chickenDumQty: body.chickenDumQty,
                muttonDumQty: body.muttonDumQty,

                chicken65Size: body.chicken65Size,

                pineappleKesariQty: body.pineappleKesariQty,

                deliveryDate: body.deliveryDate,
                deliveryTime: body.deliveryTime,

                deliveryAddress: body.deliveryAddress,

                latitude: body.latitude,
                longitude: body.longitude,

                paymentMode: body.paymentMode,

                notes: body.notes,

                totalAmount: body.totalAmount,
            },
        });

        return NextResponse.json(order);


    } catch (error) {
        console.error(error);


        return NextResponse.json(
            { error: "Failed to create order" },
            { status: 500 }
        );


    }
}

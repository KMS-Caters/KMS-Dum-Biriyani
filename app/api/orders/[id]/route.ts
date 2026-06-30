import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const body = await request.json();
        const { id } = await params;


        const order = await prisma.order.update({
            where: {
                id: Number(id),
            },
            data: {
                status: body.status,
            },
        });

        return NextResponse.json(order);


    } catch (error) {
        console.error(error);


        return NextResponse.json(
            { error: "Failed to update order" },
            { status: 500 }
        );


    }
}

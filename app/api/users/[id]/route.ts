import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type { users } from "@prisma/client";

const prisma = new PrismaClient();

export const PATCH = async (request: Request, { params }: { params: { id: string } }) => {
    const body: users = await request.json();
    const user = await prisma.users.update({
        where: {
            id: Number(params.id)
        },
        data: {
            name: body.name,
            position: body.position,
            gender: body.gender,
            email: body.email
        }
    })
    return NextResponse.json(user, { status: 200 })
}

export const DELETE = async (request: Request, { params }: { params: { id: string } }) => {
    const user = await prisma.users.delete({
        where: {
            id: Number(params.id)
        }
    })
    return NextResponse.json(user, { status: 200 });
}
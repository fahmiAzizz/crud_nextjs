import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type { users } from "@prisma/client";

const prisma = new PrismaClient();

export const POST = async (request: Request) => {
    const body: users = await request.json();
    const user = await prisma.users.create({
        data: {
            name: body.name,
            position: body.position,
            gender: body.gender,
            email: body.email
        }
    });
    return NextResponse.json(user, { status: 201 });
}
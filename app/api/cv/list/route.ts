import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const cvs = await prisma.masterCV.findMany({
            where: { userId: session.user.id },
            select: {
                id: true,
                name: true,
                createdAt: true,
                updatedAt: true,
            },
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json({ cvs });
    } catch (error) {
        console.error("Error fetching CVs:", error);
        return NextResponse.json(
            { error: "Failed to fetch CVs" },
            { status: 500 }
        );
    }
}

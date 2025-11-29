import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { generatePDF } from "@/lib/pdf-generator";

export async function GET(req: Request) {
    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const optimizationId = searchParams.get("id");

        if (!optimizationId) {
            return NextResponse.json(
                { error: "Missing optimization ID" },
                { status: 400 }
            );
        }

        const optimization = await prisma.optimization.findFirst({
            where: {
                id: optimizationId,
                userId: session.user.id,
            },
        });

        if (!optimization) {
            return NextResponse.json(
                { error: "Optimization not found" },
                { status: 404 }
            );
        }

        const optimizedCV = optimization.optimizedCV as any;
        const pdfBuffer = generatePDF(optimizedCV);

        const fileName = optimization.roleTitle
            ? `${optimization.roleTitle.replace(/[^a-z0-9]/gi, "_")}_Resume.pdf`
            : "Optimized_Resume.pdf";

        return new NextResponse(pdfBuffer, {
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": `attachment; filename="${fileName}"`,
            },
        });
    } catch (error) {
        console.error("PDF generation error:", error);
        return NextResponse.json(
            { error: "Failed to generate PDF" },
            { status: 500 }
        );
    }
}

import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { put } from "@vercel/blob";
import { parseResumeWithAI } from "@/lib/openai";
import pdf from "pdf-parse";
import mammoth from "mammoth";

export async function POST(req: Request) {
    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const formData = await req.formData();
        const file = formData.get("file") as File;
        const name = formData.get("name") as string;

        if (!file || !name) {
            return NextResponse.json(
                { error: "Missing file or name" },
                { status: 400 }
            );
        }

        // Upload file to Vercel Blob
        const blob = await put(file.name, file, {
            access: "public",
        });

        // Extract text from file
        const buffer = await file.arrayBuffer();
        let extractedText = "";

        if (file.type === "application/pdf") {
            const pdfData = await pdf(Buffer.from(buffer));
            extractedText = pdfData.text;
        } else if (
            file.type ===
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ) {
            const result = await mammoth.extractRawText({
                buffer: Buffer.from(buffer),
            });
            extractedText = result.value;
        } else {
            return NextResponse.json(
                { error: "Unsupported file type" },
                { status: 400 }
            );
        }

        if (!extractedText || extractedText.trim().length < 50) {
            return NextResponse.json(
                { error: "Could not extract text from file" },
                { status: 400 }
            );
        }

        // Parse with OpenAI
        const parsedData = await parseResumeWithAI(extractedText);

        // Save to database
        const masterCV = await prisma.masterCV.create({
            data: {
                userId: session.user.id,
                name,
                fileUrl: blob.url,
                parsedData,
            },
        });

        return NextResponse.json({
            cvId: masterCV.id,
            message: "Resume uploaded and parsed successfully",
        });
    } catch (error) {
        console.error("CV parse error:", error);
        return NextResponse.json(
            { error: "Failed to process resume" },
            { status: 500 }
        );
    }
}

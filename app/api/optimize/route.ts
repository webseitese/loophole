import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { canUserOptimize, checkAndResetUsage } from "@/lib/usage-reset";
import { calculateATSScore } from "@/lib/ats-calculator";
import { optimizeResumeWithAI, generateCoverLetters } from "@/lib/openai";

export async function POST(req: Request) {
    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { masterCVId, jobDescription, companyName, roleTitle, jobUrl } =
            await req.json();

        if (!masterCVId || !jobDescription) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Check usage limits
        const { canOptimize, reason } = await canUserOptimize(session.user.id);
        if (!canOptimize) {
            return NextResponse.json({ error: reason }, { status: 403 });
        }

        // Get master CV
        const masterCV = await prisma.masterCV.findFirst({
            where: {
                id: masterCVId,
                userId: session.user.id,
            },
        });

        if (!masterCV) {
            return NextResponse.json({ error: "CV not found" }, { status: 404 });
        }

        const cvData = masterCV.parsedData as any;

        // Calculate ATS score BEFORE optimization
        const beforeScore = calculateATSScore(cvData, jobDescription);

        // Optimize resume with AI
        const { optimizedCV, improvementsMade, keywordsAdded } =
            await optimizeResumeWithAI(
                cvData,
                jobDescription,
                companyName,
                roleTitle
            );

        // Calculate ATS score AFTER optimization
        const afterScore = calculateATSScore(optimizedCV, jobDescription);

        // Generate cover letters for PRO/UNLIMITED users
        let coverLetters = null;
        const user = await prisma.user.findUnique({
            where: { id: session.user.id },
            select: { plan: true },
        });

        if (user && (user.plan === "PRO" || user.plan === "UNLIMITED")) {
            coverLetters = await generateCoverLetters(
                optimizedCV,
                jobDescription,
                companyName,
                roleTitle
            );
        }

        // Save optimization to database
        const optimization = await prisma.optimization.create({
            data: {
                userId: session.user.id,
                masterCVId,
                jobDescription,
                jobUrl,
                companyName,
                roleTitle,
                optimizedCV,
                coverLetters,
                atsScoreBefore: beforeScore.score,
                atsScoreAfter: afterScore.score,
                improvementsMade,
                keywordsAdded,
            },
        });

        // Increment usage counter
        await prisma.user.update({
            where: { id: session.user.id },
            data: {
                optimizationsUsedThisMonth: {
                    increment: 1,
                },
            },
        });

        return NextResponse.json({
            optimizationId: optimization.id,
            message: "Resume optimized successfully",
        });
    } catch (error) {
        console.error("Optimization error:", error);
        return NextResponse.json(
            { error: "Failed to optimize resume" },
            { status: 500 }
        );
    }
}

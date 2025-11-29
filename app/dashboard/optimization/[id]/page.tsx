import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Check, Download, ArrowRight } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default async function OptimizationResultPage({
    params,
}: {
    params: { id: string };
}) {
    const session = await auth();
    if (!session?.user) {
        redirect("/auth/login");
    }

    const optimization = await prisma.optimization.findFirst({
        where: {
            id: params.id,
            userId: session.user.id,
        },
        include: {
            masterCV: true,
        },
    });

    if (!optimization) {
        redirect("/dashboard");
    }

    const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: { plan: true },
    });

    const originalCV = optimization.masterCV.parsedData as any;
    const optimizedCV = optimization.optimizedCV as any;
    const improvements = optimization.improvementsMade as string[];
    const keywords = optimization.keywordsAdded as string[];
    const coverLetters = optimization.coverLetters as any;

    const scoreImprovement = optimization.atsScoreAfter - optimization.atsScoreBefore;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b">
                <div className="container mx-auto px-4 py-4">
                    <Link href="/dashboard">
                        <Button variant="ghost">← Back to Dashboard</Button>
                    </Link>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8 max-w-6xl">
                {/* Title Section */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">
                        {optimization.roleTitle || "Resume Optimization"}
                    </h1>
                    {optimization.companyName && (
                        <p className="text-xl text-gray-600">{optimization.companyName}</p>
                    )}
                    <p className="text-sm text-gray-500 mt-2">
                        Created {formatDate(optimization.createdAt)}
                    </p>
                </div>

                {/* ATS Score Comparison */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>ATS Score Improvement</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid md:grid-cols-3 gap-8 items-center">
                            {/* Before Score */}
                            <div className="text-center">
                                <p className="text-sm text-gray-600 mb-2">Before</p>
                                <div className="relative w-32 h-32 mx-auto">
                                    <svg className="w-full h-full transform -rotate-90">
                                        <circle
                                            cx="64"
                                            cy="64"
                                            r="56"
                                            stroke="#e5e7eb"
                                            strokeWidth="8"
                                            fill="none"
                                        />
                                        <circle
                                            cx="64"
                                            cy="64"
                                            r="56"
                                            stroke="#ef4444"
                                            strokeWidth="8"
                                            fill="none"
                                            strokeDasharray={`${(optimization.atsScoreBefore / 100) * 351.86} 351.86`}
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-3xl font-bold">
                                            {optimization.atsScoreBefore}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Arrow */}
                            <div className="text-center">
                                <ArrowRight className="h-12 w-12 text-primary mx-auto" />
                                <Badge variant="success" className="mt-4">
                                    +{scoreImprovement} points
                                </Badge>
                            </div>

                            {/* After Score */}
                            <div className="text-center">
                                <p className="text-sm text-gray-600 mb-2">After</p>
                                <div className="relative w-32 h-32 mx-auto">
                                    <svg className="w-full h-full transform -rotate-90">
                                        <circle
                                            cx="64"
                                            cy="64"
                                            r="56"
                                            stroke="#e5e7eb"
                                            strokeWidth="8"
                                            fill="none"
                                        />
                                        <circle
                                            cx="64"
                                            cy="64"
                                            r="56"
                                            stroke="#22c55e"
                                            strokeWidth="8"
                                            fill="none"
                                            strokeDasharray={`${(optimization.atsScoreAfter / 100) * 351.86} 351.86`}
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-3xl font-bold">
                                            {optimization.atsScoreAfter}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Download Buttons */}
                <div className="flex gap-4 mb-8">
                    <Link href={`/api/download/pdf?id=${optimization.id}`}>
                        <Button size="lg">
                            <Download className="mr-2 h-4 w-4" />
                            Download PDF
                        </Button>
                    </Link>
                    {user?.plan !== "FREE" && (
                        <Link href={`/api/download/docx?id=${optimization.id}`}>
                            <Button size="lg" variant="outline">
                                <Download className="mr-2 h-4 w-4" />
                                Download DOCX
                            </Button>
                        </Link>
                    )}
                </div>

                {/* Improvements */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>What We Improved ({improvements.length})</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2">
                            {improvements.map((improvement, index) => (
                                <li key={index} className="flex gap-3">
                                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                                    <span>{improvement}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>

                {/* Keywords */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>Keywords Added</CardTitle>
                        <CardDescription>
                            These keywords from the job description were integrated into your resume
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-2">
                            {keywords.map((keyword, index) => (
                                <Badge key={index} variant="secondary">
                                    {keyword}
                                </Badge>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Cover Letters (PRO/UNLIMITED only) */}
                {coverLetters && (
                    <Card className="mb-8">
                        <CardHeader>
                            <CardTitle>Cover Letters</CardTitle>
                            <CardDescription>
                                Three variants tailored to this job posting
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Tabs defaultValue="professional">
                                <TabsList className="grid w-full grid-cols-3">
                                    <TabsTrigger value="professional">Professional</TabsTrigger>
                                    <TabsTrigger value="enthusiastic">Enthusiastic</TabsTrigger>
                                    <TabsTrigger value="creative">Creative</TabsTrigger>
                                </TabsList>
                                <TabsContent value="professional" className="mt-4">
                                    <div className="bg-gray-50 p-6 rounded-lg">
                                        <p className="whitespace-pre-wrap">{coverLetters.professional}</p>
                                    </div>
                                    <Button className="mt-4" variant="outline">
                                        Copy to Clipboard
                                    </Button>
                                </TabsContent>
                                <TabsContent value="enthusiastic" className="mt-4">
                                    <div className="bg-gray-50 p-6 rounded-lg">
                                        <p className="whitespace-pre-wrap">{coverLetters.enthusiastic}</p>
                                    </div>
                                    <Button className="mt-4" variant="outline">
                                        Copy to Clipboard
                                    </Button>
                                </TabsContent>
                                <TabsContent value="creative" className="mt-4">
                                    <div className="bg-gray-50 p-6 rounded-lg">
                                        <p className="whitespace-pre-wrap">{coverLetters.creative}</p>
                                    </div>
                                    <Button className="mt-4" variant="outline">
                                        Copy to Clipboard
                                    </Button>
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>
                )}

                {/* Actions */}
                <div className="flex gap-4">
                    <Link href="/dashboard/optimize">
                        <Button size="lg">
                            <ArrowRight className="mr-2 h-4 w-4" />
                            Optimize for Another Job
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

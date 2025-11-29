import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Plus, Sparkles, TrendingUp } from "lucide-react";
import { formatRelativeDate } from "@/lib/utils";

export default async function DashboardPage() {
    const session = await auth();

    if (!session?.user) {
        redirect("/auth/login");
    }

    const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        include: {
            masterCVs: {
                orderBy: { createdAt: "desc" },
            },
            optimizations: {
                orderBy: { createdAt: "desc" },
                take: 5,
                include: {
                    masterCV: true,
                },
            },
        },
    });

    if (!user) {
        redirect("/auth/login");
    }

    const planLimits = {
        FREE: 3,
        PRO: 50,
        UNLIMITED: Infinity,
    };

    const usageLimit = planLimits[user.plan];
    const usagePercentage = user.plan === "UNLIMITED"
        ? 0
        : (user.optimizationsUsedThisMonth / usageLimit) * 100;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <Sparkles className="h-6 w-6 text-primary" />
                        <span className="text-xl font-bold">Resume Optimizer</span>
                    </div>
                    <nav className="flex items-center gap-4">
                        <Badge variant={user.plan === "FREE" ? "secondary" : "default"}>
                            {user.plan}
                        </Badge>
                        <Link href="/dashboard/billing">
                            <Button variant="ghost">Billing</Button>
                        </Link>
                        <form action={async () => {
                            "use server";
                            const { signOut } = await import("@/lib/auth");
                            await signOut();
                        }}>
                            <Button variant="ghost" type="submit">Sign out</Button>
                        </form>
                    </nav>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8">
                {/* Welcome Section */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">
                        Welcome back, {user.name || "there"}!
                    </h1>
                    <p className="text-gray-600">
                        Optimize your resumes and land your dream job
                    </p>
                </div>

                {/* Usage Stats */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>Usage This Month</CardTitle>
                        <CardDescription>
                            {user.plan === "UNLIMITED"
                                ? `${user.optimizationsUsedThisMonth} optimizations used`
                                : `${user.optimizationsUsedThisMonth} / ${usageLimit} optimizations used`
                            }
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {user.plan !== "UNLIMITED" && (
                            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                                <div
                                    className={`h-2 rounded-full ${usagePercentage >= 90 ? "bg-red-500" :
                                            usagePercentage >= 70 ? "bg-yellow-500" :
                                                "bg-green-500"
                                        }`}
                                    style={{ width: `${Math.min(usagePercentage, 100)}%` }}
                                />
                            </div>
                        )}
                        {user.plan === "FREE" && user.optimizationsUsedThisMonth >= 3 && (
                            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                                <p className="text-sm text-yellow-800">
                                    You've reached your monthly limit.
                                    <Link href="/pricing" className="font-semibold underline ml-1">
                                        Upgrade to PRO
                                    </Link> to get 50 optimizations per month!
                                </p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Quick Actions */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                        <Link href="/dashboard/cv/upload">
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                    <div className="bg-primary/10 p-3 rounded-lg">
                                        <Plus className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <CardTitle>Upload New Resume</CardTitle>
                                        <CardDescription>
                                            Add a master CV to get started
                                        </CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                        </Link>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                        <Link href="/dashboard/optimize">
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                    <div className="bg-green-100 p-3 rounded-lg">
                                        <Sparkles className="h-6 w-6 text-green-600" />
                                    </div>
                                    <div>
                                        <CardTitle>Optimize Resume</CardTitle>
                                        <CardDescription>
                                            Tailor your CV for a specific job
                                        </CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                        </Link>
                    </Card>
                </div>

                {/* Master CVs */}
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold">Your Master CVs</h2>
                        <Link href="/dashboard/cv/upload">
                            <Button>
                                <Plus className="h-4 w-4 mr-2" />
                                Upload New
                            </Button>
                        </Link>
                    </div>

                    {user.masterCVs.length === 0 ? (
                        <Card>
                            <CardContent className="py-12 text-center">
                                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                <p className="text-gray-600 mb-4">
                                    You haven't uploaded any resumes yet
                                </p>
                                <Link href="/dashboard/cv/upload">
                                    <Button>Upload Your First Resume</Button>
                                </Link>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {user.masterCVs.map((cv) => (
                                <Card key={cv.id} className="hover:shadow-lg transition-shadow">
                                    <Link href={`/dashboard/cv/${cv.id}`}>
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2">
                                                <FileText className="h-5 w-5" />
                                                {cv.name}
                                            </CardTitle>
                                            <CardDescription>
                                                Updated {formatRelativeDate(cv.updatedAt)}
                                            </CardDescription>
                                        </CardHeader>
                                    </Link>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>

                {/* Recent Optimizations */}
                <div>
                    <h2 className="text-2xl font-bold mb-4">Recent Optimizations</h2>

                    {user.optimizations.length === 0 ? (
                        <Card>
                            <CardContent className="py-12 text-center">
                                <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                <p className="text-gray-600 mb-4">
                                    No optimizations yet
                                </p>
                                <Link href="/dashboard/optimize">
                                    <Button>Create Your First Optimization</Button>
                                </Link>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="space-y-4">
                            {user.optimizations.map((opt) => (
                                <Card key={opt.id} className="hover:shadow-lg transition-shadow">
                                    <Link href={`/dashboard/optimization/${opt.id}`}>
                                        <CardHeader>
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <CardTitle>
                                                        {opt.roleTitle || "Untitled Position"}
                                                    </CardTitle>
                                                    <CardDescription>
                                                        {opt.companyName && `${opt.companyName} • `}
                                                        {formatRelativeDate(opt.createdAt)}
                                                    </CardDescription>
                                                </div>
                                                <div className="flex gap-2">
                                                    <Badge variant="outline">
                                                        {opt.atsScoreBefore} → {opt.atsScoreAfter}
                                                    </Badge>
                                                    <Badge variant="success">
                                                        +{opt.atsScoreAfter - opt.atsScoreBefore}
                                                    </Badge>
                                                </div>
                                            </div>
                                        </CardHeader>
                                    </Link>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

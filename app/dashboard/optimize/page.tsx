"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Sparkles } from "lucide-react";

export default function OptimizePage() {
    const router = useRouter();
    const [masterCVs, setMasterCVs] = useState<any[]>([]);
    const [selectedCV, setSelectedCV] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [roleTitle, setRoleTitle] = useState("");
    const [jobUrl, setJobUrl] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingCVs, setIsLoadingCVs] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchMasterCVs();
    }, []);

    async function fetchMasterCVs() {
        try {
            const response = await fetch("/api/cv/list");
            const data = await response.json();
            setMasterCVs(data.cvs || []);
        } catch (err) {
            console.error("Failed to fetch CVs:", err);
        } finally {
            setIsLoadingCVs(false);
        }
    }

    async function handleOptimize() {
        if (!selectedCV || jobDescription.length < 100) {
            setError("Please select a CV and provide a job description (min 100 characters)");
            return;
        }

        setIsLoading(true);
        setError("");

        try {
            const response = await fetch("/api/optimize", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    masterCVId: selectedCV,
                    jobDescription,
                    companyName: companyName || undefined,
                    roleTitle: roleTitle || undefined,
                    jobUrl: jobUrl || undefined,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to optimize resume");
            }

            // Redirect to results page
            router.push(`/dashboard/optimization/${data.optimizationId}`);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }

    if (isLoadingCVs) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (masterCVs.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="container mx-auto px-4 py-8 max-w-2xl">
                    <Card>
                        <CardContent className="py-12 text-center">
                            <Sparkles className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <h2 className="text-2xl font-bold mb-2">No Master CVs Found</h2>
                            <p className="text-gray-600 mb-6">
                                You need to upload a master CV before you can optimize it
                            </p>
                            <Link href="/dashboard/cv/upload">
                                <Button>Upload Your First Resume</Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8 max-w-3xl">
                <div className="mb-6">
                    <Link href="/dashboard">
                        <Button variant="ghost">← Back to Dashboard</Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Optimize Resume for Job</CardTitle>
                        <CardDescription>
                            Paste a job description and we'll tailor your resume to match it perfectly
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Select Master CV */}
                        <div className="space-y-2">
                            <Label htmlFor="masterCV">Select Master CV</Label>
                            <select
                                id="masterCV"
                                value={selectedCV}
                                onChange={(e) => setSelectedCV(e.target.value)}
                                className="w-full h-10 px-3 py-2 text-sm rounded-md border border-input bg-background ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                disabled={isLoading}
                            >
                                <option value="">Choose a resume...</option>
                                {masterCVs.map((cv) => (
                                    <option key={cv.id} value={cv.id}>
                                        {cv.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Job Description */}
                        <div className="space-y-2">
                            <Label htmlFor="jobDescription">
                                Job Description <span className="text-destructive">*</span>
                            </Label>
                            <Textarea
                                id="jobDescription"
                                placeholder="Paste the full job description here..."
                                value={jobDescription}
                                onChange={(e) => setJobDescription(e.target.value)}
                                className="min-h-[200px]"
                                disabled={isLoading}
                            />
                            <p className="text-xs text-muted-foreground">
                                {jobDescription.length} / 100 characters minimum
                            </p>
                        </div>

                        {/* Optional Fields */}
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="companyName">Company Name (Optional)</Label>
                                <Input
                                    id="companyName"
                                    placeholder="e.g., Google"
                                    value={companyName}
                                    onChange={(e) => setCompanyName(e.target.value)}
                                    disabled={isLoading}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="roleTitle">Role Title (Optional)</Label>
                                <Input
                                    id="roleTitle"
                                    placeholder="e.g., Senior Software Engineer"
                                    value={roleTitle}
                                    onChange={(e) => setRoleTitle(e.target.value)}
                                    disabled={isLoading}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="jobUrl">Job URL (Optional)</Label>
                            <Input
                                id="jobUrl"
                                type="url"
                                placeholder="https://..."
                                value={jobUrl}
                                onChange={(e) => setJobUrl(e.target.value)}
                                disabled={isLoading}
                            />
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md">
                                {error}
                            </div>
                        )}

                        {/* Optimize Button */}
                        <Button
                            onClick={handleOptimize}
                            disabled={!selectedCV || jobDescription.length < 100 || isLoading}
                            className="w-full"
                            size="lg"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Optimizing Your Resume...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="mr-2 h-4 w-4" />
                                    Optimize Resume
                                </>
                            )}
                        </Button>

                        <p className="text-xs text-center text-muted-foreground">
                            This will use one of your monthly optimizations
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
